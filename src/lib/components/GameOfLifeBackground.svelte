<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement;

	onMount(() => {
		const context = canvas.getContext('2d');
		if (!context) return;

		let animationFrame = 0;
		let resizeTimeout: ReturnType<typeof setTimeout> | undefined;
		let columns = 0;
		let rows = 0;
		let cellSize = 10;
		let intensity = new Float32Array();
		let nextIntensity = new Float32Array();
		let bufferIntensity = new Float32Array();
		let directionX = new Float32Array();
		let directionY = new Float32Array();
		let nextDirectionX = new Float32Array();
		let nextDirectionY = new Float32Array();
		let lastTimestamp = 0;
		let crawlTime = 0;
		const pointer = {
			x: 0,
			y: 0,
			cellX: 0,
			cellY: 0,
			targetStrength: 0,
			strength: 0,
			lastMovedAt: 0,
			isDown: false
		};

		function index(x: number, y: number) {
			return y * columns + x;
		}

		function randomBetween(min: number, max: number) {
			return min + Math.random() * (max - min);
		}

		function clamp(value: number, min: number, max: number) {
			return Math.min(max, Math.max(min, value));
		}

		function wrap(value: number, size: number) {
			return ((value % size) + size) % size;
		}

		function seedField() {
			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < columns; x += 1) {
					const cellIndex = index(x, y);
					const seedField =
						Math.sin(x * 0.052 + y * 0.031) +
						Math.cos((x - y) * 0.026) +
						Math.sin((x + y) * 0.018);
					intensity[cellIndex] = Math.max(0, seedField - 1.85) * 0.26;
					nextIntensity[cellIndex] = 0;
					bufferIntensity[cellIndex] = 0;
					const angle =
						Math.sin(x * 0.024) * 1.6 +
						Math.cos(y * 0.028) * 1.2 +
						Math.sin((x + y) * 0.012) * 1.4;
					directionX[cellIndex] = Math.cos(angle);
					directionY[cellIndex] = Math.sin(angle);
					nextDirectionX[cellIndex] = directionX[cellIndex];
					nextDirectionY[cellIndex] = directionY[cellIndex];
				}
			}
		}

		function resize() {
			const width = canvas.clientWidth || window.innerWidth;
			const height = canvas.clientHeight || window.innerHeight;

			cellSize = width < 640 ? 12 : width < 1024 ? 11 : 10;
			columns = Math.ceil(width / cellSize);
			rows = Math.ceil(height / cellSize);

			canvas.width = width;
			canvas.height = height;

			intensity = new Float32Array(columns * rows);
			nextIntensity = new Float32Array(columns * rows);
			bufferIntensity = new Float32Array(columns * rows);
			directionX = new Float32Array(columns * rows);
			directionY = new Float32Array(columns * rows);
			nextDirectionX = new Float32Array(columns * rows);
			nextDirectionY = new Float32Array(columns * rows);
			seedField();
		}

		function queueResize() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resize, 100);
		}

		function getPointerInfluence(x: number, y: number) {
			if (pointer.strength < 0.02) return 0;

			const radius = Math.max(4.5, Math.min(columns, rows) * 0.06);
			const distance = Math.hypot(x - pointer.cellX, y - pointer.cellY);
			const normalized = Math.max(0, 1 - distance / radius);

			return normalized * pointer.strength;
		}

		function addEnergy(cx: number, cy: number, radius: number, energy: number) {
			const minX = Math.max(0, Math.floor(cx - radius));
			const maxX = Math.min(columns - 1, Math.ceil(cx + radius));
			const minY = Math.max(0, Math.floor(cy - radius));
			const maxY = Math.min(rows - 1, Math.ceil(cy + radius));

			for (let y = minY; y <= maxY; y += 1) {
				for (let x = minX; x <= maxX; x += 1) {
					const distance = Math.hypot(x - cx, y - cy);
					if (distance > radius) continue;

					const falloff = Math.max(0, 1 - distance / radius);
					const cellIndex = index(x, y);
					intensity[cellIndex] = clamp(intensity[cellIndex] + falloff * energy, 0, 1);
				}
			}
		}

		function normalizeVector(x: number, y: number) {
			const magnitude = Math.hypot(x, y) || 1;
			return {
				x: x / magnitude,
				y: y / magnitude
			};
		}

		function addBilinear(target: Float32Array, x: number, y: number, value: number) {
			const wrappedX = wrap(x, columns);
			const wrappedY = wrap(y, rows);
			const x0 = Math.floor(wrappedX);
			const y0 = Math.floor(wrappedY);
			const x1 = (x0 + 1) % columns;
			const y1 = (y0 + 1) % rows;
			const fx = wrappedX - x0;
			const fy = wrappedY - y0;

			target[index(x0, y0)] += value * (1 - fx) * (1 - fy);
			target[index(x1, y0)] += value * fx * (1 - fy);
			target[index(x0, y1)] += value * (1 - fx) * fy;
			target[index(x1, y1)] += value * fx * fy;
		}

		function simulate(delta: number) {
			crawlTime += delta * 0.2;
			nextIntensity.fill(0);

			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < columns; x += 1) {
					const cellIndex = index(x, y);
					const current = intensity[cellIndex];
					const pointerInfluence = getPointerInfluence(x, y);
					const structure =
						Math.sin(x * 0.038 + crawlTime * 0.22) +
						Math.cos(y * 0.032 - crawlTime * 0.18) +
						Math.sin((x - y) * 0.017);
					const source = Math.max(0, structure - 2.15) * 0.03 + pointerInfluence * 0.018;
					const total = current + source;
					const dirX = directionX[cellIndex];
					const dirY = directionY[cellIndex];
					const drift = 0.34 * delta;
					const carried = total * 0.955;
					const linger = total * 0.03;

					nextIntensity[cellIndex] += linger;
					addBilinear(nextIntensity, x + dirX * drift, y + dirY * drift, carried);

					const neighborBiasX =
						intensity[index((x + 1) % columns, y)] - intensity[index((x - 1 + columns) % columns, y)];
					const neighborBiasY =
						intensity[index(x, (y + 1) % rows)] - intensity[index(x, (y - 1 + rows) % rows)];
					const turnFieldX =
						Math.sin(y * 0.021 + crawlTime * 0.16) * 0.18 +
						Math.cos((x + y) * 0.014 - crawlTime * 0.11) * 0.14;
					const turnFieldY =
						Math.cos(x * 0.019 - crawlTime * 0.14) * 0.18 +
						Math.sin((x - y) * 0.015 + crawlTime * 0.09) * 0.14;
					const nextDirection = normalizeVector(
						dirX * 0.92 + neighborBiasX * 0.38 + turnFieldX + pointerInfluence * 0.12,
						dirY * 0.92 + neighborBiasY * 0.38 + turnFieldY + pointerInfluence * 0.08
					);
					nextDirectionX[cellIndex] = nextDirection.x;
					nextDirectionY[cellIndex] = nextDirection.y;
				}
			}

			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < columns; x += 1) {
					const cellIndex = index(x, y);
					const center = nextIntensity[cellIndex];
					const left = nextIntensity[index((x - 1 + columns) % columns, y)];
					const right = nextIntensity[index((x + 1) % columns, y)];
					const up = nextIntensity[index(x, (y - 1 + rows) % rows)];
					const down = nextIntensity[index(x, (y + 1) % rows)];
					const diagonalA = nextIntensity[index((x - 1 + columns) % columns, (y - 1 + rows) % rows)];
					const diagonalB = nextIntensity[index((x + 1) % columns, (y - 1 + rows) % rows)];
					const diagonalC = nextIntensity[index((x - 1 + columns) % columns, (y + 1) % rows)];
					const diagonalD = nextIntensity[index((x + 1) % columns, (y + 1) % rows)];
					const pointerInfluence = getPointerInfluence(x, y);
					const localAverage =
						center * 0.5 +
						(left + right + up + down) * 0.095 +
						(diagonalA + diagonalB + diagonalC + diagonalD) * 0.03;
					const structure =
						Math.sin(x * 0.027 + y * 0.015 + crawlTime * 0.14) +
						Math.cos(y * 0.024 - x * 0.01 - crawlTime * 0.12);
					const replenish = Math.max(0, structure - 1.72) * 0.024;
					const pointerPulse = pointerInfluence * 0.018;
					const overlapBoost = Math.max(0, center - 0.15) * 0.12;

					bufferIntensity[cellIndex] = clamp(
						localAverage * 0.986 + replenish + pointerPulse + overlapBoost,
						0,
						1
					);
				}
			}

			[intensity, bufferIntensity] = [bufferIntensity, intensity];
			[directionX, nextDirectionX] = [nextDirectionX, directionX];
			[directionY, nextDirectionY] = [nextDirectionY, directionY];
		}

		function drawCell(x: number, y: number, value: number, pointerInfluence: number) {
			const px = x * cellSize;
			const py = y * cellSize;
			const centerX = px + cellSize / 2;
			const centerY = py + cellSize / 2;
			const normalized = clamp(value, 0, 1);
			const coreSize = Math.max(1, Math.floor(cellSize * (0.18 + normalized * 0.18)));
			const glowRadius = cellSize * (0.18 + normalized * 0.16 + pointerInfluence * 0.08);
			const alpha = 0.12 + normalized * 0.52;
			const hue = 142 - normalized * 10;

			context.beginPath();
			context.fillStyle = `hsla(${hue}, 92%, ${42 + normalized * 16}%, ${alpha * 0.22})`;
			context.arc(centerX, centerY, glowRadius, 0, Math.PI * 2);
			context.fill();

			context.fillStyle = `hsla(${hue}, 72%, ${58 + normalized * 10}%, ${0.2 + normalized * 0.58})`;
			context.fillRect(centerX - coreSize / 2, centerY - coreSize / 2, coreSize, coreSize);

			context.fillStyle = `hsla(50, 85%, 80%, ${0.06 + normalized * 0.08})`;
			context.fillRect(centerX - coreSize / 2, centerY - coreSize / 2, coreSize, 1);

			if (normalized > 0.74) {
				context.strokeStyle = `hsla(${hue - 10}, 80%, 72%, ${0.08 + (normalized - 0.72) * 0.45})`;
				context.lineWidth = 1;
				context.strokeRect(
					Math.floor(px) + 1.5,
					Math.floor(py) + 1.5,
					Math.max(1, cellSize - 3),
					Math.max(1, cellSize - 3)
				);
			}
		}

		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = 'hsla(170, 25%, 12%, 0.94)';
			context.fillRect(0, 0, canvas.width, canvas.height);

			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < columns; x += 1) {
					const value = intensity[index(x, y)];
					const pointerInfluence = getPointerInfluence(x, y);
					if (value < 0.06 && pointerInfluence < 0.05) continue;

					drawCell(x, y, value, pointerInfluence);
				}
			}

			context.strokeStyle = 'hsla(170, 20%, 30%, 0.12)';
			context.lineWidth = 1;

			for (let x = 0; x <= columns; x += 1) {
				const px = x * cellSize + 0.5;
				context.beginPath();
				context.moveTo(px, 0);
				context.lineTo(px, canvas.height);
				context.stroke();
			}

			for (let y = 0; y <= rows; y += 1) {
				const py = y * cellSize + 0.5;
				context.beginPath();
				context.moveTo(0, py);
				context.lineTo(canvas.width, py);
				context.stroke();
			}
		}

		function handlePointerMove(event: PointerEvent) {
			const bounds = canvas.getBoundingClientRect();
			pointer.x = event.clientX - bounds.left;
			pointer.y = event.clientY - bounds.top;
			pointer.cellX = clamp(Math.floor(pointer.x / cellSize), 0, Math.max(columns - 1, 0));
			pointer.cellY = clamp(Math.floor(pointer.y / cellSize), 0, Math.max(rows - 1, 0));
			pointer.targetStrength = 1;
			pointer.lastMovedAt = performance.now();

			if (pointer.isDown) {
				addEnergy(pointer.cellX, pointer.cellY, Math.max(3.5, Math.min(columns, rows) * 0.04), 0.42);
			}
		}

		function handlePointerLeave() {
			pointer.targetStrength = 0;
			pointer.isDown = false;
			document.body.classList.remove('painting-background');
		}

		function handlePointerDown(event: PointerEvent) {
			pointer.isDown = true;
			document.body.classList.add('painting-background');
			handlePointerMove(event);
			addEnergy(pointer.cellX, pointer.cellY, Math.max(4.5, Math.min(columns, rows) * 0.055), 0.95);
		}

		function handlePointerUp() {
			pointer.isDown = false;
			document.body.classList.remove('painting-background');
		}

		function animate(timestamp: number) {
			if (!lastTimestamp) lastTimestamp = timestamp;

			const elapsed = timestamp - lastTimestamp;
			const delta = clamp(elapsed / 16.6667, 0.65, 1.8);
			lastTimestamp = timestamp;

			const idleFor = timestamp - pointer.lastMovedAt;
			if (idleFor > 140) {
				pointer.targetStrength *= 0.94;
			}
			pointer.strength += (pointer.targetStrength - pointer.strength) * 0.1;

			simulate(delta);
			draw();
			animationFrame = window.requestAnimationFrame(animate);
		}

		resize();
		animationFrame = window.requestAnimationFrame(animate);
		window.addEventListener('resize', queueResize);
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerleave', handlePointerLeave);
		window.addEventListener('pointerdown', handlePointerDown);
		window.addEventListener('pointerup', handlePointerUp);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', queueResize);
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerleave', handlePointerLeave);
			window.removeEventListener('pointerdown', handlePointerDown);
			window.removeEventListener('pointerup', handlePointerUp);
			document.body.classList.remove('painting-background');
			clearTimeout(resizeTimeout);
		};
	});
</script>

<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full opacity-90"></canvas>
</div>

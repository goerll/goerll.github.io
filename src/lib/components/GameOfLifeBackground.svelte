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
		let current = new Uint8Array();
		let next = new Uint8Array();
		let lastTick = 0;
		const tickInterval = 190;
		const pointer = {
			x: 0,
			y: 0,
			targetStrength: 0,
			strength: 0,
			lastMovedAt: 0,
			cellX: 0,
			cellY: 0
		};

		function index(x: number, y: number) {
			return y * columns + x;
		}

		function getInfluenceRadius() {
			return Math.max(4, Math.round(Math.min(columns, rows) * 0.045));
		}

		function randomize() {
			const density = window.innerWidth < 768 ? 0.17 : 0.13;

			for (let i = 0; i < current.length; i += 1) {
				current[i] = Math.random() < density ? 1 : 0;
				next[i] = 0;
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

			current = new Uint8Array(columns * rows);
			next = new Uint8Array(columns * rows);
			randomize();
		}

		function getInfluence(x: number, y: number) {
			if (pointer.strength < 0.02) return 0;

			const dx = Math.abs(x - pointer.cellX);
			const dy = Math.abs(y - pointer.cellY);
			const radius = getInfluenceRadius();
			const distance = Math.hypot(dx, dy);
			const normalized = Math.max(0, 1 - distance / radius);

			return normalized * pointer.strength;
		}

		function seedCells() {
			const radius = getInfluenceRadius();

			for (let y = Math.max(0, pointer.cellY - radius); y <= Math.min(rows - 1, pointer.cellY + radius); y += 1) {
				for (let x = Math.max(0, pointer.cellX - radius); x <= Math.min(columns - 1, pointer.cellX + radius); x += 1) {
					const distance = Math.hypot(x - pointer.cellX, y - pointer.cellY);
					if (distance > radius) continue;

					const falloff = Math.max(0, 1 - distance / radius);
					if (Math.random() < 0.28 + falloff * 0.5) {
						current[index(x, y)] = 1;
					}
				}
			}
		}

		function queueResize() {
			clearTimeout(resizeTimeout);
			resizeTimeout = setTimeout(resize, 100);
		}

		function step() {
			let livingCells = 0;

			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < columns; x += 1) {
					let neighbors = 0;

					for (let offsetY = -1; offsetY <= 1; offsetY += 1) {
						for (let offsetX = -1; offsetX <= 1; offsetX += 1) {
							if (offsetX === 0 && offsetY === 0) continue;

							const nx = (x + offsetX + columns) % columns;
							const ny = (y + offsetY + rows) % rows;
							neighbors += current[index(nx, ny)];
						}
					}

					const cellIndex = index(x, y);
					const alive = current[cellIndex] === 1;
					const influence = getInfluence(x, y);
					const survivesByRule = alive && (neighbors === 2 || neighbors === 3);
					const survivesByHeat = alive && neighbors === 4 && influence > 0.45 && Math.random() < influence * 0.22;
					const bornByRule = !alive && neighbors === 3;
					const bornByHeat = !alive && neighbors === 2 && influence > 0.5 && Math.random() < influence * 0.3;
					const survives = survivesByRule || survivesByHeat;
					const isBorn = bornByRule || bornByHeat;
					const value = survives || isBorn ? 1 : 0;

					next[cellIndex] = value;
					livingCells += value;
				}
			}

			[current, next] = [next, current];

			// Re-seed when the board collapses or stabilizes into a sparse state.
			if (livingCells < (columns * rows) * 0.035) {
				randomize();
			}
		}

		function draw() {
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.fillStyle = 'hsla(170, 25%, 12%, 0.92)';
			context.fillRect(0, 0, canvas.width, canvas.height);

			for (let y = 0; y < rows; y += 1) {
				for (let x = 0; x < columns; x += 1) {
					const influence = getInfluence(x, y);
					if (current[index(x, y)] !== 1 && influence <= 0.06) continue;

					const px = x * cellSize;
					const py = y * cellSize;
					const inset = Math.max(1, Math.floor(cellSize * 0.16));
					const size = Math.max(1, cellSize - inset * 2);

					if (current[index(x, y)] === 1) {
						context.fillStyle = `hsla(142, 72%, ${62 + influence * 6}%, ${0.9 + influence * 0.04})`;
					} else {
						context.fillStyle = `hsla(142, 62%, 30%, ${influence * 0.22})`;
					}
					context.fillRect(px + inset, py + inset, size, size);

					context.fillStyle = `hsla(50, 85%, 80%, ${0.08 + influence * 0.08})`;
					context.fillRect(px + inset, py + inset, size, 1);
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
			pointer.cellX = Math.floor(pointer.x / cellSize);
			pointer.cellY = Math.floor(pointer.y / cellSize);
			pointer.targetStrength = 1;
			pointer.lastMovedAt = performance.now();
		}

		function handlePointerLeave() {
			pointer.targetStrength = 0;
		}

		function handlePointerDown(event: PointerEvent) {
			handlePointerMove(event);
			pointer.targetStrength = 1;
			seedCells();
		}

		function animate(timestamp: number) {
			const idleFor = timestamp - pointer.lastMovedAt;
			if (idleFor > 120) {
				pointer.targetStrength *= 0.94;
			}
			pointer.strength += (pointer.targetStrength - pointer.strength) * 0.12;

			if (timestamp - lastTick >= tickInterval) {
				step();
				lastTick = timestamp;
			}

			draw();
			animationFrame = window.requestAnimationFrame(animate);
		}

		resize();
		animationFrame = window.requestAnimationFrame(animate);
		window.addEventListener('resize', queueResize);
		window.addEventListener('pointermove', handlePointerMove);
		window.addEventListener('pointerleave', handlePointerLeave);
		window.addEventListener('pointerdown', handlePointerDown);

		return () => {
			window.cancelAnimationFrame(animationFrame);
			window.removeEventListener('resize', queueResize);
			window.removeEventListener('pointermove', handlePointerMove);
			window.removeEventListener('pointerleave', handlePointerLeave);
			window.removeEventListener('pointerdown', handlePointerDown);
			clearTimeout(resizeTimeout);
		};
	});
</script>

<div aria-hidden="true" class="pointer-events-none absolute inset-0 overflow-hidden">
	<canvas bind:this={canvas} class="absolute inset-0 h-full w-full opacity-80"></canvas>
</div>

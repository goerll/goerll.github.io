<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {
		console.log('Drift page mounted');

		const canvas = document.createElement('canvas');
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
		canvas.style.cssText = 'position: fixed; top: 0; left: 0; z-index: -10; background: red;';
		document.body.appendChild(canvas);

		const ctx = canvas.getContext('2d')!;
		ctx.fillStyle = 'green';
		ctx.fillRect(100, 100, 200, 200);

		let i = 0;
		function draw() {
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = 'lime';
			ctx.fillRect(i, 100, 50, 50);
			i += 2;
			requestAnimationFrame(draw);
		}
		draw();

		return () => {
			canvas.remove();
		};
	});
</script>

<h1>Drift</h1>

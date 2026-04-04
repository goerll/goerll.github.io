<script lang="ts">
	import '../app.css';
	import GameOfLifeBackground from '$lib/components/GameOfLifeBackground.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from '$app/stores';

	const navItems = [
		{ href: '/', label: 'Home' },
		{ href: '/work', label: 'Work' },
		{ href: '/projects', label: 'Projects' }
	];

	function isActive(href: string, currentPath: string): boolean {
		if (href === '/') return currentPath === '/';
		return currentPath.startsWith(href);
	}

	function usesSideBands(pathname: string): boolean {
		return pathname === '/work' || pathname === '/projects';
	}

	const sideBandCenterWidth = '66rem';
</script>

<svelte:head>
	<title>goerll.dev</title>
	<meta name="description" content="Personal portfolio of Estevão" />
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-background">
	<GameOfLifeBackground />
	{#if usesSideBands($page.url.pathname)}
		<div
			class="pointer-events-none absolute inset-y-0 inset-x-0 z-10 bg-card xl:left-1/2 xl:right-auto xl:-translate-x-1/2 xl:border-x xl:border-border/70"
			style={`width: min(100%, ${sideBandCenterWidth});`}
		></div>
	{/if}
	<header class="absolute inset-x-0 top-0 z-20">
		<div class="container mx-auto px-6 pt-4">
			<div class="flex h-16 items-center rounded-md border border-border/70 bg-card px-6 shadow-[0_0_0_1px_rgba(8,14,13,0.4),0_18px_48px_rgba(0,0,0,0.18)]">
				<Navbar {navItems} {isActive} pathname={$page.url.pathname} />
			</div>
		</div>
	</header>
	<main class="relative z-10 flex min-h-screen flex-col">
		<slot />
	</main>
</div>

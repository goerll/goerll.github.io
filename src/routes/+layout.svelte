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
</script>

<svelte:head>
	<title>goerll.dev</title>
	<meta name="description" content="Personal portfolio of Estevão" />
</svelte:head>

<div class="relative min-h-screen overflow-hidden bg-background">
	<GameOfLifeBackground />
	<header class="absolute inset-x-0 top-0 z-20">
		<div class="container mx-auto px-6 pt-4">
			<div class="flex h-16 items-center rounded-md border border-border/65 bg-card/55 px-6 backdrop-blur-xl shadow-[0_0_0_1px_rgba(8,14,13,0.36),0_18px_48px_rgba(0,0,0,0.18)]">
				<Navbar {navItems} {isActive} pathname={$page.url.pathname} />
			</div>
		</div>
	</header>
	<main class="relative z-10 flex min-h-screen flex-col">
		<slot />
	</main>
</div>

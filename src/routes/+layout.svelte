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

	<div class="relative min-h-screen bg-background">
		<header class="fixed inset-x-0 top-0 z-30">
			<div class="container mx-auto px-6 pt-4">
				<div class="flex h-16 items-center rounded-full border border-border/65 bg-card/55 pl-5 pr-8 backdrop-blur-xl shadow-[0_0_0_1px_rgba(8,14,13,0.36),0_18px_48px_rgba(0,0,0,0.18)]">
					<Navbar {navItems} {isActive} pathname={$page.url.pathname} />
				</div>
			</div>
		</header>
		<div class="relative overflow-hidden">
			<GameOfLifeBackground />
			<main class="relative z-10 flex min-h-screen flex-col pt-20">
				<slot />
			</main>
		</div>
	</div>

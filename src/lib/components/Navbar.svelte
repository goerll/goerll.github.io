<script lang="ts">
	import { resolve } from '$app/paths';
	import { cn } from '$lib/utils';

	interface Props {
		navItems: Array<{ href: string; label: string }>;
		isActive: (href: string, currentPath: string) => boolean;
		pathname: string;
	}

	let { navItems, isActive, pathname }: Props = $props();

	let navEl: HTMLDivElement | null = null;
	let itemEls = $state<(HTMLAnchorElement | null)[]>([]);
	let indicator = $state({ left: 0, width: 0, opacity: 0 });

	$effect(() => {
		pathname;
		navItems;
		itemEls;

		if (!navEl) return;

		const activeIndex = navItems.findIndex((item) => isActive(item.href, pathname));

		if (activeIndex < 0) {
			indicator.opacity = 0;
			return;
		}

		const update = () => {
			const activeEl = itemEls[activeIndex];
			if (!activeEl || !navEl) return;

			const navRect = navEl.getBoundingClientRect();
			const rect = activeEl.getBoundingClientRect();

			indicator.left = rect.left - navRect.left;
			indicator.width = rect.width;
			indicator.opacity = 1;
		};

		update();

		const resizeObserver = new ResizeObserver(update);
		resizeObserver.observe(navEl);

		for (const el of itemEls) {
			if (el) resizeObserver.observe(el);
		}

		return () => resizeObserver.disconnect();
	});
</script>

<div class="flex items-center">
	<div bind:this={navEl} class="relative hidden md:flex md:items-center md:gap-1">
		<span
			class="pointer-events-none absolute inset-y-0 rounded-full bg-white/10 shadow-sm ring-1 ring-white/15 backdrop-blur-md transition-[transform,width,opacity] duration-300 ease-out"
			style:transform={`translateX(${indicator.left}px)`}
			style:width={`${indicator.width}px`}
			style:opacity={indicator.opacity}
		></span>
		{#each navItems as item, index (item.href)}
			<a
				bind:this={itemEls[index]}
				href={resolve(item.href)}
				aria-current={isActive(item.href, pathname) ? 'page' : undefined}
				class={cn(
					'relative z-10 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200',
					isActive(item.href, pathname)
						? 'text-foreground'
						: 'text-muted-foreground hover:text-foreground'
				)}
			>
				{item.label}
			</a>
		{/each}
	</div>
</div>

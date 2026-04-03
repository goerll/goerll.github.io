<script lang="ts">
	import { cn } from '$lib/utils';

	interface Props {
		navItems: Array<{ href: string; label: string }>;
		isActive: (href: string, currentPath: string) => boolean;
		pathname: string;
	}

	let { navItems, isActive, pathname }: Props = $props();
</script>

<div class="flex items-center gap-6">
	<div class="hidden md:flex md:items-center md:space-x-6">
		{#each navItems as item}
			<a
				href={item.href}
				class={cn(
					'text-sm font-medium transition-colors hover:text-primary',
					isActive(item.href, pathname)
						? 'text-foreground'
						: 'text-muted-foreground'
				)}
			>
				{item.label}
			</a>
		{/each}
	</div>
</div>
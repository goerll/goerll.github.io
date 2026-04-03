<script lang="ts">
	interface Props {
		alt: string;
		src: string;
		class?: string;
	}

	let { alt, src, class: className }: Props = $props();
</script>

<img
	{alt}
	{src}
	class={className}
	loading="eager"
/>
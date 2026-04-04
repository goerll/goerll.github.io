<script lang="ts">
	import StaticImage from '$lib/components/StaticImage.svelte';
</script>

<div class="relative min-h-screen">
	<div class="relative z-10 mx-auto flex min-h-screen w-full max-w-[66rem] items-center px-6 py-24 sm:px-12 xl:px-12">
		<div class="flex w-full flex-col gap-6 md:gap-10">
			<nav aria-label="breadcrumb" class="hidden md:flex">
				<ol class="flex flex-wrap items-center gap-2 text-sm">
					<li class="inline-flex items-center gap-2 transition-colors hover:text-primary">
						<a href="/" class="transition-colors hover:text-primary">home</a>
					</li>
					<li class="text-muted-foreground">/</li>
					<li class="inline-flex items-center gap-2 transition-colors">
						<span class="text-foreground">work</span>
					</li>
				</ol>
			</nav>

			<div class="flex flex-col gap-8 w-full">
				<h1 class="text-3xl font-bold tracking-tight">work</h1>

				<div class="flex flex-col gap-6">
					<div class="flex flex-row gap-4 items-center rounded-md border border-border/70 bg-card p-4">
						<div class="relative h-14 w-14 flex-shrink-0">
							<StaticImage
								alt="Mouts TI logo"
								src="/assets/mouts_logo.jpg"
								class="rounded-md object-cover transition-transform duration-300 hover:scale-110"
							/>
						</div>
						<div class="flex flex-col w-full min-w-0">
							<div class="flex flex-row gap-4 justify-between items-baseline w-full">
								<div class="font-semibold text-base sm:text-lg truncate">Junior Software Developer</div>
								<div class="hidden sm:flex text-muted-foreground text-sm flex-shrink-0">Aug 2024 - Present</div>
							</div>
							<div class="text-muted-foreground text-sm">Mouts TI</div>
							<div class="sm:hidden text-muted-foreground text-xs">Aug 2024 - Present</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-8 w-full">
				<h1 class="text-3xl font-bold tracking-tight">education</h1>

				<div class="flex flex-col gap-6">
					<div class="flex flex-row gap-4 items-center rounded-md border border-border/70 bg-card p-4">
						<div class="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md bg-white p-1.5">
							<StaticImage
								alt="IFC logo"
								src="/assets/ifc_logo.png"
								class="transition-transform duration-300 hover:scale-110 object-contain h-full w-full"
							/>
						</div>
						<div class="flex flex-col w-full min-w-0">
							<div class="flex flex-row gap-4 justify-between items-baseline w-full">
								<div class="font-semibold text-base sm:text-lg truncate">
									Bachelor&apos;s in Computer Science
								</div>
								<div class="hidden sm:flex text-muted-foreground text-sm flex-shrink-0">
									Jan 2023 - Dec 2026
								</div>
							</div>
							<div class="text-muted-foreground text-sm">
								Catarinense Federal Institute (IFC)
							</div>
							<div class="sm:hidden text-muted-foreground text-xs">
								Jan 2023 - Dec 2026
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

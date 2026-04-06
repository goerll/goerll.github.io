<script lang="ts">
	import { ExternalLink, Star } from 'lucide-svelte';
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
						<span class="text-foreground">projects</span>
					</li>
				</ol>
			</nav>

			<div class="flex flex-col gap-8 w-full">
				<h1 class="text-3xl font-bold tracking-tight">projects</h1>

				<div class="flex flex-col gap-5">
					<div class="text-base font-medium text-muted-foreground">
						side projects
					</div>

					<div class="flex flex-row gap-4 items-start rounded-md border border-border/65 bg-card/52 p-4 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(8,14,13,0.3),0_18px_48px_rgba(0,0,0,0.14)]">
						<div class="relative h-14 w-14 flex-shrink-0">
							<a
								href="https://drawtomata.com"
								target="_blank"
								rel="noopener noreferrer"
								class="block h-full w-full overflow-hidden rounded-md transition-transform duration-300 hover:scale-105"
							>
								<div class="relative w-full h-full overflow-hidden bg-gradient-to-br from-pink-500/80 via-purple-600/80 to-blue-500/80">
									<StaticImage
										alt="Drawtomata logo"
										src="/assets/drawtomata_logo.png"
										class="object-contain p-1.5 bg-white/90"
									/>
								</div>
							</a>
						</div>

						<div class="flex flex-col w-full min-w-0 gap-1.5">
							<div class="flex flex-row items-center gap-3 w-full justify-between">
								<div class="flex flex-row items-center gap-2 flex-wrap min-w-0">
									<a
										class="font-semibold text-base sm:text-lg transition-colors hover:text-primary truncate"
										href="https://drawtomata.com"
										target="_blank"
										rel="noopener noreferrer"
									>
										Drawtomata
									</a>
								</div>
								<a
									href="https://drawtomata.com"
									target="_blank"
									rel="noopener noreferrer"
									class="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground transition hover:bg-secondary/80 flex-shrink-0"
								>
									<ExternalLink class="w-3 h-3" />
									<span>live</span>
								</a>
							</div>
							<div class="text-muted-foreground text-sm leading-relaxed">
								Internet&apos;s most feature full formal automata simulator for study of computation theory.
							</div>
						</div>
					</div>
				</div>

				<div class="flex flex-col gap-5">
					<div class="text-base font-medium text-muted-foreground">
						open source contributions
					</div>

					<div class="flex flex-row gap-4 items-start rounded-md border border-border/65 bg-card/52 p-4 backdrop-blur-2xl shadow-[0_0_0_1px_rgba(8,14,13,0.3),0_18px_48px_rgba(0,0,0,0.14)]">
						<div class="relative h-14 w-14 flex-shrink-0">
							<a
								href="https://github.com/krahets/hello-algo"
								target="_blank"
								rel="noopener noreferrer"
								class="block h-full w-full overflow-hidden rounded-md bg-white p-1.5 transition-transform duration-300 hover:scale-105"
							>
								<StaticImage
									alt="Hello Algo logo"
									src="/assets/hello_algo.png"
									class="object-contain"
								/>
							</a>
						</div>

						<div class="flex flex-col w-full min-w-0 gap-1.5">
							<div class="flex flex-row items-center gap-3 w-full justify-between">
								<div class="flex flex-row items-center gap-2 flex-wrap min-w-0">
									<a
										class="font-semibold text-base sm:text-lg transition-colors hover:text-primary truncate"
										href="https://github.com/krahets/hello-algo"
										target="_blank"
										rel="noopener noreferrer"
									>
										Hello Algo
									</a>
								</div>
								<div class="inline-flex items-center gap-1.5 rounded-md bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground flex-shrink-0">
									<Star class="w-3 h-3" />
									<span>119k</span>
								</div>
							</div>
							<div class="text-muted-foreground text-sm leading-relaxed">
								Enhanced explanation of AVL binary trees.
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

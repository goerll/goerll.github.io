<script lang="ts">
	import StaticImage from '$lib/components/StaticImage.svelte';

	const profileImage = '/assets/pfp.jpg';
</script>

<div class="relative flex flex-1 items-center justify-center overflow-hidden p-6 sm:p-12">
	<div class="relative z-10 hidden max-w-4xl flex-col gap-8 rounded-md border border-border/70 bg-card px-10 py-9 text-card-foreground shadow-[0_0_0_1px_rgba(8,14,13,0.4),0_24px_80px_rgba(0,0,0,0.24)] md:flex md:flex-row lg:gap-12">
		<div class="relative aspect-square md:h-[12em] lg:h-[14em] flex-shrink-0">
			<StaticImage
				alt="Profile picture"
				src={profileImage}
				class="rounded-md object-cover transition duration-500 ease-in-out hover:scale-105 hover:cursor-pointer"
			/>
		</div>

		<div class="flex flex-col justify-between h-[12em] lg:h-[14em]">
			<div class="flex flex-col gap-3 lg:gap-4 w-full">
				<div class="flex flex-col gap-1">
					<h1 class="text-3xl lg:text-5xl font-bold tracking-tight whitespace-nowrap">
						Estevão Goerll
					</h1>
					<h2 class="text-lg lg:text-2xl font-medium tracking-tight text-muted-foreground">
						Software Engineer
					</h2>
				</div>
				<p class="text-muted-foreground leading-relaxed">
					Getting nerdsniped by something new every week.<br />
					Junior Developer @ Mouts. Senior CS Student @ IFC.
				</p>
			</div>

			<div class="flex flex-row justify-between items-end gap-3">
				<div class="flex flex-row gap-3 items-center">
					<a
						href="/work"
					class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80"
					>
						work
					</a>
					<a
						href="/projects"
					class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80"
					>
						projects
					</a>
				</div>

				<div class="flex flex-row gap-2 items-end">
					<a
						href="https://github.com/goerll"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors h-9 w-9"
						aria-label="GitHub"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
					<a
						href="https://linkedin.com/in/goerll"
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors h-9 w-9"
						aria-label="LinkedIn"
					>
						<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								fill-rule="evenodd"
								d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
								clip-rule="evenodd"
							/>
						</svg>
					</a>
					<a
						href="mailto:goerll@pm.me"
						class="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors h-9 w-9"
						aria-label="Email"
					>
						<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								stroke-width={2}
								d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
							/>
						</svg>
					</a>
				</div>
			</div>
		</div>
	</div>

	<div class="relative z-10 flex w-full max-w-[22em] flex-col overflow-hidden rounded-md border border-border/70 bg-card shadow-[0_0_0_1px_rgba(8,14,13,0.4),0_20px_64px_rgba(0,0,0,0.22)] md:hidden">
		<div class="relative w-full aspect-[4/5]">
			<div class="h-full w-full z-0">
				<StaticImage
					alt="Profile picture"
					src={profileImage}
					class="object-cover"
				/>
			</div>

			<div class="absolute bottom-0 left-0 z-10 w-full bg-gradient-to-t from-black/80 to-transparent p-6 pt-12">
				<div class="flex flex-col gap-1">
					<div class="font-bold text-2xl tracking-tight whitespace-nowrap">
						Estevão Goerll
					</div>
					<div class="font-medium text-base tracking-tight text-muted-foreground">
						Software Engineer
					</div>
				</div>
			</div>
		</div>

		<div class="p-5 flex flex-col gap-4">
			<p class="text-sm text-muted-foreground">
				Getting nerdsniped by something new every week.
			</p>

			<div class="flex flex-row gap-2">
				<a href="/work" class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80">
					work
				</a>
				<a href="/projects" class="rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground transition hover:bg-secondary/80">
					projects
				</a>
			</div>

			<div class="flex flex-row gap-2 pt-1">
				<a
					href="https://github.com/goerll"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors h-9 w-9"
					aria-label="GitHub"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
				<a
					href="https://linkedin.com/in/goerll"
					target="_blank"
					rel="noopener noreferrer"
					class="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors h-9 w-9"
					aria-label="LinkedIn"
				>
					<svg class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							fill-rule="evenodd"
							d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
							clip-rule="evenodd"
						/>
					</svg>
				</a>
				<a
					href="mailto:goerll@pm.me"
					class="inline-flex items-center justify-center text-muted-foreground hover:text-primary transition-colors h-9 w-9"
					aria-label="Email"
				>
					<svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width={2}
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
				</a>
			</div>
		</div>
	</div>
</div>

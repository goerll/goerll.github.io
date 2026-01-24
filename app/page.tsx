import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center p-4 sm:p-24">
      <div className="hidden md:flex flex-col md:flex-row gap-6 lg:gap-10 p-10 rounded-3xl border bg-card text-card-foreground shadow-xl shadow-stone-200/50 dark:shadow-none max-w-4xl items-center lg:items-stretch">
        <div className="relative aspect-[4/5] md:h-[12em] lg:h-[16em] flex-shrink-0">
          <Image
            alt="Profile picture"
            src="/assets/pfp.jpg"
            fill
            className="rounded-xl border border-border transition ease-in-out hover:scale-110 duration-500 hover:cursor-pointer object-cover"
            priority
          />
        </div>

        <div className="flex flex-col justify-between">
          <div className="flex flex-col gap-2 lg:gap-5 w-full flex-1">
            <div className="flex flex-col gap-1">
              <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
                Estevão Goerll
              </h1>
              <h2 className="text-xl lg:text-3xl font-semibold tracking-tight text-muted-foreground">
                Software Engineer
              </h2>
            </div>
            <p className="text-muted-foreground">
              Building what I wish existed. Junior Developer @ Mouts. Senior Computer Science Student @ IFC.
            </p>
          </div>

          <div className="flex flex-row justify-between items-center gap-2 -ml-3">
            <div className="flex flex-row gap-2 items-center">
              <Link
                href="/work"
                className="px-3 py-2 rounded-md text-sm font-medium transition hover:scale-105 hover:bg-accent"
              >
                work
              </Link>
              <Link
                href="/projects"
                className="px-3 py-2 rounded-md text-sm font-medium transition hover:scale-105 hover:bg-accent"
              >
                projects
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="md:hidden flex flex-col rounded-3xl border border-border bg-card overflow-clip w-full max-w-[24em]">
        <div className="relative w-full aspect-[4/5]">
          <div className="h-full w-full z-0">
            <Image
              alt="Profile picture"
              src="/assets/pfp.jpg"
              fill
              className="object-cover"
              priority
            />
          </div>

          <div className="z-10 p-6 pt-12 absolute left-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent w-full">
            <div className="flex flex-col">
              <div className="font-semibold text-2xl tracking-tight">
                Estevão Goerll
              </div>
              <div className="font-medium text-lg tracking-tight text-muted-foreground">
                Software Engineer
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

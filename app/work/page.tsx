import Link from "next/link";
import Image from "next/image";

export default function WorkPage() {
  return (
    <div className="flex min-h-screen flex-col justify-center items-center p-8 md:p-24">
      <div className="flex flex-col gap-4 md:gap-12 max-w-3xl w-full">
        <nav aria-label="breadcrumb" className="hidden md:flex">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5 transition ease-in-out hover:scale-110">
              <Link href="/" className="transition-colors hover:text-primary">
                home
              </Link>
            </li>
            <li className="text-muted-foreground text-lg">/</li>
            <li className="inline-flex items-center gap-1.5 transition ease-in-out hover:scale-110">
              <Link href="/work" className="transition-colors text-muted-foreground hover:text-primary">
                work
              </Link>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 md:gap-10 w-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">work</h1>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-center">
                  <div className="relative h-12 aspect-square">
                    <Image
                      alt="Mouts TI logo"
                      src="/assets/mouts_logo.jpg"
                      fill
                      className="border shadow-sm transition hover:scale-110 ease-in-out object-cover"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row gap-4 justify-between items-baseline w-full">
                      <div className="font-semibold sm:text-lg">
                        Junior Software Developer
                      </div>
                      <div className="hidden sm:flex text-muted-foreground">
                        Aug 2024 - Present
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm sm:text-base">
                      Mouts TI
                    </div>
                    <div className="sm:hidden text-muted-foreground text-xs">
                      Aug 2024 - Present
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">education</h1>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="flex flex-row gap-4 items-center">
                  <div className="relative h-12 aspect-square bg-white border p-2">
                    <Image
                      alt="IFC logo"
                      src="/assets/ifc_logo.png"
                      fill
                      className="transition hover:scale-110 ease-in-out object-contain"
                    />
                  </div>
                  <div className="flex flex-col w-full">
                    <div className="flex flex-row gap-4 justify-between items-baseline w-full">
                      <div className="font-semibold sm:text-lg">
                        Bachelor&apos;s in Computer Science
                      </div>
                      <div className="hidden sm:flex text-muted-foreground">
                        Jan 2023 - Dec 2026 (expected)
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm sm:text-base">
                      Catarinense Federal Institute (IFC)
                    </div>
                    <div className="sm:hidden text-muted-foreground text-xs">
                      Jan 2023 - Dec 2026
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

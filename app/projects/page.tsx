import Link from "next/link";
import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";

export default function ProjectsPage() {
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
              <Link href="/projects" className="transition-colors text-muted-foreground hover:text-primary">
                projects
              </Link>
            </li>
          </ol>
        </nav>

        <div className="flex flex-col gap-6 md:gap-10 w-full">
          <div className="flex flex-col gap-5">
            <h1 className="text-3xl font-bold">projects</h1>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold text-muted-foreground mt-4 first:mt-0">
                  side projects
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 items-center">
                      <div className="relative h-12 aspect-square">
                        <a
                          href="https://drawtomata.com"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div className="relative w-full h-full rounded-lg shadow-lg transition hover:scale-110 ease-in-out overflow-hidden bg-gradient-to-br from-pink-500/80 via-purple-600/80 to-blue-500/80">
                            <Image
                              alt="Drawtomata logo"
                              src="/assets/drawtomata_logo.png"
                              fill
                              className="bg-white rounded-lg shadow-lg transition ease-in-out object-contain p-1"
                            />
                          </div>
                        </a>
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="flex flex-row gap-4 justify-between items-baseline w-full">
                          <div className="flex flex-row items-center gap-3 w-full justify-between">
                            <div className="flex flex-row items-center gap-2 flex-wrap">
                              <a
                                className="font-semibold sm:text-lg transition ease-in-out hover:scale-110 hover:text-blue-500"
                                href="https://drawtomata.com"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Drawtomata
                              </a>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                              <div className="flex flex-row gap-1.5 flex-wrap items-center">
                                <a
                                  href="https://drawtomata.com"
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-secondary/80 transition"
                                >
                                  <ExternalLink className="w-3 h-3" />
                                  <span>drawtomata.com</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-muted-foreground text-sm sm:text-base">
                          Internet&apos;s most feature full formal automata simulator for study of
                          computation theory.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="text-xl font-semibold text-muted-foreground mt-4 first:mt-0">
                  open source contributions
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-row gap-4 items-center">
                      <div className="relative h-12 aspect-square">
                        <a
                          href="https://github.com/krahets/hello-algo"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Image
                            alt="Hello Algo logo"
                            src="/assets/hello_algo.png"
                            fill
                            className="bg-white rounded-lg shadow-lg transition hover:scale-110 ease-in-out object-contain p-1"
                          />
                        </a>
                      </div>

                      <div className="flex flex-col w-full">
                        <div className="flex flex-row gap-4 justify-between items-baseline w-full">
                          <div className="flex flex-row items-center gap-3 w-full justify-between">
                            <div className="flex flex-row items-center gap-2 flex-wrap">
                              <a
                                className="font-semibold sm:text-lg transition ease-in-out hover:scale-110 hover:text-blue-500"
                                href="https://github.com/krahets/hello-algo"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                Hello Algo
                              </a>
                            </div>
                            <div className="flex flex-row items-center gap-2">
                              <div className="flex flex-row gap-1.5 flex-wrap items-center">
                                <div className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                                  <Star className="w-3 h-3" />
                                  <span>119k</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="text-muted-foreground text-sm sm:text-base">
                          Enhanced explanation of AVL binary trees.
                        </div>
                      </div>
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

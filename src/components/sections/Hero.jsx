import { ArrowUpRight } from 'lucide-react';
import { HERO_DATA } from "../../data/data.js";

export default function Hero() {
    return (
        <section class="soft-grid relative flex items-center px-5 py-36 lg:py-40 sm:px-8 lg:px-12" aria-label="Hero section">
            <div class="md:mt-24 lg:mt-32 mx-auto w-full max-w-360">
                <div class="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-black/60 reveal">
                    <span class="inline-block size-2 rounded-full bg-green-500 ring-4 ring-black/5" aria-hidden="true"></span>
                    {HERO_DATA.availability}
                </div>

                <h1 class="max-w-312.5 font-semibold leading-[.80] md:tracking-[-.085em] tracking-tighter text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] reveal reveal-d1">
                    {HERO_DATA.firstName}<br/>
                    <span class="text-black/30">{HERO_DATA.lastName}</span>
                </h1>

                <div class="mt-10 md:mt-20 grid gap-8 lg:grid-cols-[1fr_380px] reveal reveal-d2">
                    <p class="max-w-2xl text-xl leading-snug tracking-[-.02em] sm:text-2xl">
                        {HERO_DATA.tagline} &nbsp;
                        <span class="underline decoration-black/20 underline-offset-4">{HERO_DATA.techStack}</span>.
                    </p>
                    <div class="flex flex-col justify-end lg:items-end">
                        <p class="max-w-xs text-sm leading-relaxed text-black/75 lg:text-right">
                            {HERO_DATA.bio}
                        </p>
                        <div class="mt-6 flex gap-2">
                            <a 
                                href="#work" 
                                aria-label="Scroll down to explore selected work" 
                                class="flex items-center rounded-full bg-black px-5 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-white transition hover:bg-black/80"
                            >
                                Explore work <ArrowUpRight size={17} strokeWidth={1.5}/>
                            </a>
                            <a 
                                href="#contact" 
                                aria-label="Jump to contact section" 
                                class="flex items-center rounded-full border border-black/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[.12em] transition hover:bg-black/5"
                            >
                                Contact <ArrowUpRight size={15} strokeWidth={1.5}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
import { ArrowUpRight } from 'lucide-react';
import { HERO_DATA } from "../../data/data.js";

const ctaLabels = {
    fr: {
        explore: "Voir les projets",
        contact: "Contact"
    },
    en: {
        explore: "Explore work",
        contact: "Contact"
    }
};

export default function Hero({ lang = 'en' }) {
    const data = HERO_DATA[lang] || HERO_DATA.en;
    const cta = ctaLabels[lang] || ctaLabels.en;

    return (
        <section className="soft-grid relative flex items-center px-5 py-36 sm:px-8 sm:py-44 lg:px-12 lg:py-52 xl:py-64" aria-label="Hero section">
            <div className="md:mt-24 lg:mt-32 mx-auto w-full max-w-360">
                <div className="mb-8 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.16em] text-black/60 reveal">
                    <span className="inline-block size-2 rounded-full bg-green-500 ring-4 ring-black/5" aria-hidden="true"></span>
                    {data.availability}
                </div>

                <h1 className="max-w-312.5 font-semibold leading-[.80] md:tracking-[-.085em] tracking-tighter text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] reveal reveal-d1">
                    {data.firstName}<br/>
                    <span className="text-black/30">{data.lastName}</span>
                </h1>

                <div className="mt-10 md:mt-20 grid gap-8 lg:grid-cols-[1fr_380px] reveal reveal-d2">
                    <p className="max-w-2xl text-xl leading-snug tracking-[-.02em] sm:text-2xl">
                        {data.tagline} &nbsp;
                        <span className="underline decoration-black/20 underline-offset-4">{data.techStack}</span>.
                    </p>
                    <div className="flex flex-col justify-end lg:items-end">
                        <p className="max-w-xs text-sm leading-relaxed text-black/75 lg:text-right">
                            {data.bio}
                        </p>
                        <div className="mt-6 flex gap-2">
                            <a 
                                href="#work" 
                                aria-label="Scroll down to explore selected work" 
                                className="flex items-center rounded-full bg-black px-5 py-3 font-mono text-[10px] uppercase tracking-[.12em] text-acid transition hover:bg-black/80"
                            >
                                {cta.explore} <ArrowUpRight size={17} strokeWidth={1.5}/>
                            </a>
                            <a 
                                href="#contact" 
                                aria-label="Jump to contact section" 
                                className="flex items-center rounded-full border border-black/15 px-5 py-3 font-mono text-[10px] uppercase tracking-[.12em] transition hover:bg-black/5"
                            >
                                {cta.contact} <ArrowUpRight size={15} strokeWidth={1.5}/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
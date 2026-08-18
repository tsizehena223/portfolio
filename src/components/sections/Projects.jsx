import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/data.js';

gsap.registerPlugin(ScrollTrigger);

const uiLabels = {
    fr: {
        section: "01 / Projets sélectionnés",
        headingTitle: "Conçu pour le web,",
        headingSubtitle: "façonné par le contexte.",
        selectedWork: "Projet sélectionné"
    },
    en: {
        section: "01 / Selected work",
        headingTitle: "Built for the web,",
        headingSubtitle: "shaped by context.",
        selectedWork: "Selected work"
    }
};

export default function Projects({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const projectList = PROJECTS[lang] || PROJECTS.en || PROJECTS;

    const containerRef = useRef(null);
    const cardRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const cards = cardRefs.current.filter(Boolean);

            cards.forEach((card, index) => {
                // Apply a sticky stacking scale effect except for the last card
                if (index < cards.length - 1) {
                    gsap.to(card, {
                        scale: 0.92,
                        opacity: 0.4,
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: 'top top+=100', // Start scaling when pinned near top
                            end: 'bottom top+=100', // Finish scaling as next card slides over
                            scrub: true,
                        }
                    });
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, [projectList]);

    return (
        <section id="work" ref={containerRef} className="relative w-full px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div className="mx-auto max-w-360">
                
                {/* Header */}
                <div className="mb-16 grid gap-8 lg:grid-cols-[.55fr_1fr] lg:items-end">
                    <span className="font-mono text-[12px] uppercase tracking-[.16em] text-black/65">
                        {labels.section}
                    </span>
                    <h2 className="max-w-4xl text-4xl md:text-end font-semibold leading-[.95] tracking-[-.055em] sm:text-7xl">
                        {labels.headingTitle}<br/>
                        <span className="text-black/25">{labels.headingSubtitle}</span>
                    </h2>
                </div>

                {/* Vertical Sticky Stack Container */}
                <div className="relative flex flex-col gap-12 lg:gap-16">
                    {projectList.map((item, index) => (
                        <article 
                            key={item.no} 
                            ref={(el) => (cardRefs.current[index] = el)}
                            style={{ top: `calc(100px + ${index * 12}px)` }}
                            className="sticky group grid w-full overflow-hidden rounded-4xl border border-black/10 bg-white shadow-2xl backdrop-blur-md lg:grid-cols-[1.15fr_.85fr] origin-top will-change-transform"
                        >
                            <div className={`relative min-h-90 overflow-hidden ${item.tone} p-6 text-white transition-all duration-700 lg:min-h-135`}>
                                {/* Grain / dot texture */}
                                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '16px 16px' }} />

                                {/* Soft light */}
                                <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/6 blur-3xl transition-transform duration-1000 group-hover:translate-x-8 group-hover:-translate-y-8" />

                                <div className="relative flex h-full flex-col justify-between">
                                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.16em] text-white/60">
                                        <span>{item.no}</span>
                                        <span>{item.year}</span>
                                    </div>

                                    <div>
                                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/50">{item.tag}</p>
                                        <h3 className="max-w-xl text-3xl font-medium leading-[1.05] tracking-[-.04em] sm:text-6xl lg:text-7xl text-white/80">{item.title}</h3>
                                    </div>
                                </div>

                                {/* Project number */}
                                <span className="pointer-events-none absolute -bottom-8 -right-2 font-mono text-[11rem] font-bold leading-none -tracking-widest text-white/[0.035] transition-transform duration-700 group-hover:-translate-y-3">
                                    {item.no}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="flex min-h-80 flex-col justify-between p-6 sm:p-8 lg:min-h-135 lg:p-10">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[10px] uppercase tracking-[.16em] text-black/35">{labels.selectedWork}</span>
                                        <span className="font-mono text-[10px] uppercase tracking-[.16em] text-black/25">{item.year}</span>
                                    </div>
                                    <p className="mt-10 max-w-md text-lg leading-[1.45] tracking-[-.015em] text-black/65 lg:text-xl">{item.text}</p>
                                </div>

                                <div className="mt-16 border-t border-black/10 pt-5">
                                    <div className="flex items-end justify-between gap-6">
                                        <span className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[.14em] text-black/40">{item.tech}</span>
                                        <span className="grid size-12 shrink-0 place-items-center rounded-full bg-black text-acid transition-all duration-300">
                                            <ArrowUpRight size={17} strokeWidth={1.5} />
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>

            </div>
        </section>
    );
}

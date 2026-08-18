import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EXPERIENCES } from "../../data/data.js";

gsap.registerPlugin(ScrollTrigger);

const uiLabels = {
    fr: {
        section: "03 / Expérience",
        headingTitle: "Une pratique",
        headingSubtitle: "en constante évolution."
    },
    en: {
        section: "03 / Experience",
        headingTitle: "A growing",
        headingSubtitle: "practice."
    }
};

export default function Experiences({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const experienceList = EXPERIENCES[lang] || EXPERIENCES.en || EXPERIENCES;

    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const rowRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Vertical Progress Line Scroll Animation
            gsap.fromTo(
                lineRef.current,
                { scaleY: 0 },
                {
                    scaleY: 1,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 70%',
                        end: 'bottom 80%',
                        scrub: true,
                    }
                }
            );

            // 2. Staggered Row Entrance Animation
            const rows = rowRefs.current.filter(Boolean);
            rows.forEach((row) => {
                const num = row.querySelector('.row-num');
                const content = row.querySelector('.row-content');
                const date = row.querySelector('.row-date');

                gsap.from([num, content, date], {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: row,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [experienceList]);

    return (
        <section 
            id="experience" 
            ref={sectionRef} 
            className="border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36"
        >
            <div className="mx-auto max-w-360">
                {/* Header */}
                <div className="mb-14 grid gap-8 lg:grid-cols-[.55fr_1fr]">
                    <span className="font-mono text-[12px] uppercase tracking-[.16em] text-black/65">
                        {labels.section}
                    </span>
                    <h2 className="text-5xl text-end font-semibold leading-none tracking-[-.055em] sm:text-7xl">
                        {labels.headingTitle}<br/>
                        <span className="text-black/25">{labels.headingSubtitle}</span>
                    </h2>
                </div>

                {/* Experience List Container */}
                <div className="relative">
                    {/* Top Static Line */}
                    <div className="h-px w-full bg-black/10" />

                    {/* Animated Drawing Line */}
                    <div 
                        ref={lineRef} 
                        className="absolute left-0 top-0 h-full w-full border-t-2 border-black origin-top will-change-transform" 
                    />

                    {experienceList.map((exp, i) => (
                        <article 
                            key={exp.company + i} 
                            ref={(el) => (rowRefs.current[i] = el)}
                            className="group relative grid gap-4 border-b border-black/10 py-8 transition-colors duration-500 hover:bg-black/2 sm:grid-cols-[.2fr_1fr_.3fr] lg:py-10 px-2 rounded-lg"
                        >
                            <span className="row-num font-mono text-[12px] text-black/35 group-hover:text-black transition-colors duration-300">
                                0{i + 1}
                            </span>

                            <div className="row-content">
                                <h3 className="text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                                    {exp.company}
                                </h3>
                                <p className="mt-1 text-sm font-medium text-black/50 group-hover:text-black/80 transition-colors duration-300">
                                    {exp.role}
                                </p>
                                <p className="mt-5 max-w-xl text-sm leading-relaxed text-black/60 group-hover:text-black/90 transition-colors duration-300">
                                    {exp.desc}
                                </p>
                            </div>

                            <span className="row-date font-mono text-[12px] uppercase tracking-widest text-black/40 sm:text-right group-hover:text-black/80 transition-colors duration-300">
                                {exp.date}
                            </span>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}
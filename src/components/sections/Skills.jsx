import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SKILLS } from "../../data/data.js";

gsap.registerPlugin(ScrollTrigger);

const uiLabels = {
    fr: {
        section: "04 / Compétences",
        heading: "Un stack technique pratique, avec une attention particulière aux interfaces."
    },
    en: {
        section: "04 / Capabilities",
        heading: "A practical stack, with an eye for the interface."
    }
};

export default function Skills({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const skillsList = SKILLS[lang] || SKILLS.en || SKILLS;

    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const badgeRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const badges = badgeRefs.current.filter(Boolean);

            // 1. Heading Fade & Lift Reveal
            gsap.fromTo(
                headingRef.current,
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: headingRef.current,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    }
                }
            );

            // 2. Staggered Elastic Pop-in for Skill Badges
            gsap.fromTo(
                badges,
                { scale: 0, opacity: 0, y: 20 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: {
                        amount: 0.8,
                        grid: "auto",
                        from: "random"
                    },
                    ease: "back.out(1.7)",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [skillsList]);

    // Micro Magnetic Mouse Hover Effect on Badges
    const handleMouseMove = (e, index) => {
        const badge = badgeRefs.current[index];
        if (!badge) return;

        const rect = badge.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(badge, {
            x: x * 0.35,
            y: y * 0.35,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (index) => {
        const badge = badgeRefs.current[index];
        if (!badge) return;

        gsap.to(badge, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)"
        });
    };

    return (
        <section 
            ref={sectionRef}
            className="white-dot-grid border-t border-black/10 bg-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32 overflow-hidden" 
            aria-label="Capabilities and skills"
        >
            <div className="mx-auto max-w-360">
                <div className="grid gap-12 lg:grid-cols-[.55fr_1fr]">
                    <span className="font-mono text-[12px] uppercase tracking-[.16em] text-white/70">
                        {labels.section}
                    </span>
                    <div>
                        <h2 
                            ref={headingRef} 
                            className="max-w-4xl text-4xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl will-change-transform"
                        >
                            {labels.heading}
                        </h2>

                        <ul className="mt-12 flex flex-wrap gap-3 p-0 list-none" aria-label="Skills list">
                            {skillsList.map((skill, index) => (
                                <li key={skill + index}>
                                    <span 
                                        ref={(el) => (badgeRefs.current[index] = el)}
                                        onMouseMove={(e) => handleMouseMove(e, index)}
                                        onMouseLeave={() => handleMouseLeave(index)}
                                        className="inline-block cursor-pointer rounded-full border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-[12px] uppercase tracking-widest text-white/80 backdrop-blur-sm transition-colors duration-300 hover:border-white hover:bg-white hover:text-black will-change-transform select-none"
                                    >
                                        {skill}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
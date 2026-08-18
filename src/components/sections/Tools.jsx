import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { KEYWORDS } from "../../data/data.js";

gsap.registerPlugin(ScrollTrigger);

const labels = {
    fr: {
        title: "ARCHITECTURE & TECH STACK",
        section: "01 / EXPERTISE"
    },
    en: {
        title: "ARCHITECTURE & TECH STACK",
        section: "01 / EXPERTISE"
    }
};

export default function Tools({ lang = 'en' }) {
    const keywordsList = KEYWORDS[lang] || KEYWORDS.en || KEYWORDS;
    const currentLabels = labels[lang] || labels.en;

    const sectionRef = useRef(null);
    const gridRef = useRef(null);

    // Scramble / Decrypt effect logic
    const handleMouseEnter = (e, originalText) => {
        const target = e.currentTarget.querySelector('.tech-label');
        if (!target) return;

        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*';
        let iterations = 0;

        const interval = setInterval(() => {
            target.innerText = originalText
                .split('')
                .map((char, index) => {
                    if (char === ' ') return ' ';
                    if (index < iterations) return originalText[index];
                    return chars[Math.floor(Math.random() * chars.length)];
                })
                .join('');

            if (iterations >= originalText.length) {
                clearInterval(interval);
            }
            iterations += 1 / 2;
        }, 30);
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Entry Reveal Timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.fromTo(
                gridRef.current.children,
                { opacity: 0, y: 40, rotateX: -15 },
                {
                    opacity: 1,
                    y: 0,
                    rotateX: 0,
                    duration: 0.8,
                    stagger: 0.1,
                    ease: 'power3.out'
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [lang]);

    return (
        <section 
            ref={sectionRef}
            className="w-full border-y border-white/10 bg-black py-20 px-5 sm:px-8 lg:px-12 overflow-hidden select-none"
        >
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-12 flex flex-col justify-between gap-4 border-b border-white/10 pb-6 sm:flex-row sm:items-end">
                    <span className="font-mono text-xs uppercase tracking-[.25em] text-white/40">
                        {currentLabels.section}
                    </span>
                    <h3 className="font-mono text-sm uppercase tracking-[.2em] text-white/70">
                        {currentLabels.title}
                    </h3>
                </div>

                {/* Grid List */}
                <div 
                    ref={gridRef} 
                    className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4 perspective-1000"
                >
                    {keywordsList.map((keyword, index) => (
                        <div
                            key={`${keyword}-${index}`}
                            onMouseEnter={(e) => handleMouseEnter(e, keyword)}
                            className="group relative flex items-center justify-between border-b border-white/10 py-6 px-4 transition-all duration-300 hover:bg-white/3 hover:border-white/40 cursor-default"
                        >
                            {/* Left Side: Number & Name */}
                            <div className="flex items-center gap-6">
                                <span className="font-mono text-xs text-white/30 transition-colors group-hover:text-white/80">
                                    // {String(index + 1).padStart(2, '0')}
                                </span>
                                <span className="tech-label font-mono text-lg sm:text-xl font-semibold uppercase tracking-[.15em] text-white transition-transform duration-300 group-hover:translate-x-2">
                                    {keyword}
                                </span>
                            </div>

                            {/* Right Side: Status Badge */}
                            <div className="flex items-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                                <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                                <span className="font-mono text-[10px] uppercase tracking-[.2em] text-white/60">
                                    CORE
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
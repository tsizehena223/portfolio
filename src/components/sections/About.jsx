import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG, ABOUT_DATA } from "../../data/data.js";

gsap.registerPlugin(ScrollTrigger);

const uiLabels = {
    fr: {
        section: "03 / À propos"
    },
    en: {
        section: "03 / About"
    }
};

export default function About({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const config = SITE_CONFIG[lang] || SITE_CONFIG.en || SITE_CONFIG;
    const about = ABOUT_DATA[lang] || ABOUT_DATA.en || ABOUT_DATA;

    const sectionRef = useRef(null);
    const metaRef = useRef(null);
    const headlineRef = useRef(null);
    const bodyRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            });

            // 1. Meta information slide-in
            tl.fromTo(
                metaRef.current,
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
            )
            // 2. Headline lift and reveal
            .fromTo(
                headlineRef.current,
                { y: 40, opacity: 0, rotateX: -10 },
                { y: 0, opacity: 1, rotateX: 0, duration: 1, ease: 'power4.out' },
                '-=0.5'
            );

            // 3. Scroll-linked body text fade-in scrub
            gsap.fromTo(
                bodyRef.current,
                { opacity: 0.2, y: 25 },
                {
                    opacity: 1,
                    y: 0,
                    ease: 'none',
                    scrollTrigger: {
                        trigger: bodyRef.current,
                        start: 'top 85%',
                        end: 'top 55%',
                        scrub: true,
                    }
                }
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [lang]);

    return (
        <section 
            id="about" 
            ref={sectionRef} 
            className="bg-black text-white border-t border-white/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36 overflow-hidden"
        >
            <div className="mx-auto grid max-w-360 gap-14 lg:grid-cols-[.55fr_1fr]">
                <div ref={metaRef} className="will-change-transform">
                    <span className="font-mono text-[12px] uppercase tracking-[.16em] text-white/65">
                        {labels.section}
                    </span>
                    <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
                        {config.location}<br/>
                        {config.languages}
                    </p>
                </div>
                <div>
                    <h2 
                        ref={headlineRef} 
                        className="max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-.04em] sm:text-6xl text-white will-change-transform perspective-1000"
                    >
                        {about.headline}
                    </h2>
                    <p 
                        ref={bodyRef} 
                        className="mt-10 max-w-2xl text-lg leading-relaxed text-white/70 will-change-transform"
                    >
                        {about.body}
                    </p>
                </div>
            </div>
        </section>
    );
}
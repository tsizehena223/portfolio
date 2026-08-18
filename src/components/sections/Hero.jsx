import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, Code, Cpu, Layout, Terminal } from 'lucide-react';
import { HERO_DATA } from "../../data/data.js";

gsap.registerPlugin(ScrollTrigger);

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
    
    const sectionRef = useRef(null);
    const contentGroupRef = useRef(null);
    const titleGroupRef = useRef(null);
    const badgeRef = useRef(null);
    const roleRef = useRef(null);
    const ctaRef = useRef(null);
    const cardsRef = useRef([]);

    // Character split rendering with data-grey attribute for original color tracking
    const renderSplitText = (text, isLastName = false) => {
        const initialColor = isLastName ? 'text-black/30' : 'text-black';

        return text.split('').map((char, index) => (
            <span 
                key={`${char}-${index}`} 
                data-grey={isLastName ? "true" : "false"}
                onMouseEnter={handleCharHover}
                onMouseLeave={handleCharLeave}
                className={`char-item inline-block will-change-transform cursor-pointer ${initialColor}`}
            >
                {char === ' ' ? '\u00A0' : char}
            </span>
        ));
    };

    // Instant color swap + 3D motion on hover
    const handleCharHover = (e) => {
        const target = e.currentTarget;
        const isGrey = target.getAttribute('data-grey') === 'true';

        // Instant text color swap
        gsap.set(target, { color: isGrey ? '#000000' : 'rgba(0,0,0,0.3)' });

        // Smooth character pop motion
        gsap.to(target, {
            y: -18,
            rotateY: 15,
            scale: 1.15,
            duration: 0.3,
            ease: 'power2.out'
        });
    };

    const handleCharLeave = (e) => {
        const target = e.currentTarget;
        const isGrey = target.getAttribute('data-grey') === 'true';
        const initialColor = isGrey ? 'rgba(0,0,0,0.3)' : '#000000';

        // Instant restoration of the original text color
        gsap.set(target, { color: initialColor });

        // Reset transform smoothly
        gsap.to(target, {
            y: 0,
            rotateY: 0,
            scale: 1,
            duration: 0.5,
            ease: 'elastic.out(1, 0.4)'
        });
    };

    useEffect(() => {
        const ctx = gsap.context(() => {
            // 1. Entrance Sequence
            const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

            gsap.set('.char-item', { y: 100, opacity: 0, rotateX: -90 });
            gsap.set([badgeRef.current, '.reveal-bio', ctaRef.current], { y: 30, opacity: 0 });
            gsap.set(cardsRef.current, { scale: 0.6, opacity: 0, y: 50 });
            gsap.set(roleRef.current, { scale: 0.8, opacity: 0 });

            tl.to(badgeRef.current, { y: 0, opacity: 1, duration: 0.6 })
              .to(roleRef.current, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.4')
              .to('.char-item', {
                  y: 0,
                  opacity: 1,
                  rotateX: 0,
                  stagger: 0.02,
                  duration: 0.9,
                  ease: 'back.out(1.5)'
              }, '-=0.3')
              .to(cardsRef.current, {
                  scale: 1,
                  opacity: 0.85,
                  y: 0,
                  stagger: 0.1,
                  duration: 0.8,
                  ease: 'back.out(1.7)'
              }, '-=0.6')
              .to('.reveal-bio', { y: 0, opacity: 1, stagger: 0.1 }, '-=0.5')
              .to(ctaRef.current, { y: 0, opacity: 1 }, '-=0.6');

            // 2. Role Continuous Floating Animation
            gsap.to(roleRef.current, {
                y: -4,
                duration: 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.easeInOut'
            });

            // 3. Continuous Ambient Floating Loop for Background Cards
            cardsRef.current.forEach((card, index) => {
                gsap.to(card, {
                    y: `+=${18 + index * 6}`,
                    rotate: index % 2 === 0 ? 6 : -6,
                    duration: 2.8 + index * 0.5,
                    repeat: -1,
                    yoyo: true,
                    ease: 'sine.easeInOut'
                });
            });

            // 4. Mouse Parallax Motion
            const handleMouseMove = (e) => {
                const { clientX, clientY } = e;
                const { innerWidth, innerHeight } = window;
                
                const xPos = (clientX / innerWidth - 0.5) * 2;
                const yPos = (clientY / innerHeight - 0.5) * 2;

                gsap.to(contentGroupRef.current, {
                    x: xPos * 12,
                    y: yPos * 12,
                    rotateY: xPos * 4,
                    rotateX: -yPos * 4,
                    duration: 1.2,
                    ease: 'power2.out',
                    transformPerspective: 1000
                });

                cardsRef.current.forEach((card, i) => {
                    const depth = (i + 1) * 25;
                    gsap.to(card, {
                        x: -xPos * depth,
                        y: -yPos * depth,
                        duration: 1.5,
                        ease: 'power1.out'
                    });
                });
            };

            // 5. Scroll Trigger Title Shrink
            gsap.to(titleGroupRef.current, {
                scale: 0.9,
                opacity: 0.3,
                y: -60,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true
                }
            });

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);

        }, sectionRef);

        return () => ctx.revert();
    }, [lang]);

    return (
        <section 
            ref={sectionRef} 
            className="soft-grid relative flex items-center px-5 py-28 sm:px-8 sm:py-36 lg:px-12 lg:py-52 xl:py-64 2xl:py-72 overflow-hidden select-none bg-white text-black" 
            aria-label="Hero section"
        >
            {/* Content Group */}
            <div 
                ref={contentGroupRef} 
                className="relative z-10 mx-auto w-full max-w-6xl will-change-transform"
            >
                {/* Meta Bar */}
                <div ref={badgeRef} className="mb-6 flex flex-wrap items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.16em] text-black/60">
                    <div className="flex items-center gap-3">
                        <span className="inline-block size-2 rounded-full bg-emerald-500 ring-4 ring-black/5" aria-hidden="true" />
                        {data.availability}
                    </div>

                    {/* Role Badge: Black BG + White text on hover */}
                    <span 
                        ref={roleRef}
                        className="group relative inline-flex items-center overflow-hidden rounded-full border border-black/10 bg-black/5 px-4 py-1.5 font-semibold text-black/80 transition-all duration-200 ease-out hover:border-black hover:bg-black hover:text-white hover:shadow-lg cursor-pointer"
                    >
                        {/* Shimmer reflection highlight on hover */}
                        <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />
                        <span className="relative z-10">
                            {data.role || "Full-Stack Web Developer"}
                        </span>
                    </span>
                </div>

                {/* Typography Heading Group */}
                <div ref={titleGroupRef} className="will-change-transform">
                    <h1 className="font-semibold leading-[.82] tracking-tighter text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] xl:text-[11rem] perspective-1000">
                        <div className="overflow-hidden py-1">
                            {renderSplitText(data.firstName, false)}
                        </div>
                        <div className="overflow-hidden py-1 mt-1 md:mt-2">
                            {renderSplitText(data.lastName, true)}
                        </div>
                    </h1>
                </div>

                {/* Bio & CTAs */}
                <div className="mt-10 md:mt-16 grid gap-8 lg:grid-cols-[1fr_380px]">
                    <p className="reveal-bio max-w-2xl text-xl leading-snug tracking-[-.02em] sm:text-2xl">
                        {data.tagline} &nbsp;
                        <span className="underline decoration-black/20 underline-offset-4 font-mono text-lg">{data.techStack}</span>.
                    </p>

                    <div className="flex flex-col justify-end lg:items-end">
                        <p className="reveal-bio max-w-xs text-sm leading-relaxed text-black/70 lg:text-right">
                            {data.bio}
                        </p>
                        
                        <div ref={ctaRef} className="mt-6 flex gap-3">
                            <a 
                                href="#work" 
                                className="group flex items-center gap-2 rounded-full bg-black px-6 py-3.5 font-mono text-xs uppercase tracking-[.12em] text-white transition-all hover:bg-black/80 hover:shadow-lg"
                            >
                                {cta.explore} 
                                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                            <a 
                                href="#contact" 
                                className="group flex items-center gap-2 rounded-full border border-black/15 bg-white/50 px-6 py-3.5 font-mono text-xs uppercase tracking-[.12em] transition-all hover:bg-black/5"
                            >
                                {cta.contact} 
                                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </a>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
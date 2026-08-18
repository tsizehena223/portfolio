import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SITE_CONFIG } from "../../data/data.js";
import { Mail, Phone, Github, Linkedin, Facebook, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const uiLabels = {
    fr: {
        section: "06 / Contact",
        headingTitle: "Créons",
        headingSubtitle: "quelque chose ensemble.",
        body: "Vous avez une idée, un produit à construire ou un problème qui mérite d'être résolu ?",
        socialsTitle: "Réseaux & Contact"
    },
    en: {
        section: "06 / Contact",
        headingTitle: "Let's make",
        headingSubtitle: "something.",
        body: "Have an idea, a product to build, or a problem worth solving?",
        socialsTitle: "Connect & Socials"
    }
};

export default function Contact({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const config = SITE_CONFIG[lang] || SITE_CONFIG.en || SITE_CONFIG;
    const email = config.email || SITE_CONFIG.email;
    const phone = config.phone || SITE_CONFIG.phone;

    const socials = [
        { name: "GitHub", href: config.github, icon: Github },
        { name: "LinkedIn", href: config.linkedin, icon: Linkedin },
        { name: "Facebook", href: config.facebook, icon: Facebook },
    ].filter(item => Boolean(item.href));

    const sectionRef = useRef(null);
    const headingLine1Ref = useRef(null);
    const headingLine2Ref = useRef(null);
    const bodyRef = useRef(null);
    const buttonRefs = useRef([]);
    const socialRefs = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse"
                }
            });

            // 1. Kinetic Typography Lift-up Reveal
            tl.fromTo(
                [headingLine1Ref.current, headingLine2Ref.current],
                { yPercent: 100, rotateX: -20, opacity: 0 },
                {
                    yPercent: 0,
                    rotateX: 0,
                    opacity: 1,
                    duration: 1.1,
                    stagger: 0.15,
                    ease: "power4.out"
                }
            )
            // 2. Body Text & Direct Action CTAs Reveal
            .fromTo(
                [bodyRef.current, ...buttonRefs.current.filter(Boolean)],
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    ease: "power3.out"
                },
                "-=0.6"
            )
            // 3. Social Pills Pop-in
            .fromTo(
                socialRefs.current.filter(Boolean),
                { scale: 0.8, opacity: 0, y: 15 },
                {
                    scale: 1,
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                    stagger: 0.08,
                    ease: "back.out(1.5)"
                },
                "-=0.4"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, [lang]);

    // Magnetic Button Interaction
    const handleMouseMove = (e, el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        gsap.to(el, {
            x: x * 0.25,
            y: y * 0.25,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (el) => {
        if (!el) return;
        gsap.to(el, {
            x: 0,
            y: 0,
            duration: 0.5,
            ease: "elastic.out(1, 0.4)"
        });
    };

    return (
        <section 
            id="contact" 
            ref={sectionRef} 
            className="soft-grid-reverse border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36 overflow-hidden"
        >
            <div className="mx-auto max-w-360">
                <span className="font-mono text-[12px] uppercase tracking-[.16em] text-black/45">
                    {labels.section}
                </span>

                <div className="mt-10 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
                    {/* Oversized Masked Typography */}
                    <h2 className="max-w-5xl text-5xl md:text-9xl font-semibold leading-[.78] tracking-[-.08em] perspective-1000">
                        <div className="overflow-hidden py-1">
                            <span ref={headingLine1Ref} className="block will-change-transform">
                                {labels.headingTitle}
                            </span>
                        </div>
                        <div className="overflow-hidden py-1">
                            <span ref={headingLine2Ref} className="block text-black/25 will-change-transform">
                                {labels.headingSubtitle}
                            </span>
                        </div>
                    </h2>

                    {/* Contact CTAs */}
                    <div className="max-w-sm lg:pb-2">
                        <p ref={bodyRef} className="text-lg leading-relaxed text-black/60">
                            {labels.body}
                        </p>

                        <div className="mt-6 flex flex-col items-start gap-3">
                            {email && (
                                <a 
                                    ref={(el) => (buttonRefs.current[0] = el)}
                                    onMouseMove={(e) => handleMouseMove(e, buttonRefs.current[0])}
                                    onMouseLeave={() => handleMouseLeave(buttonRefs.current[0])}
                                    href={`mailto:${email}`} 
                                    aria-label={`Send an email to ${email}`} 
                                    className="inline-flex items-center rounded-full bg-black px-6 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-white transition-colors hover:bg-black/80 will-change-transform select-none"
                                >
                                    <Mail size={16} className="mr-2"/> {email} 
                                </a>
                            )}

                            {phone && (
                                <a 
                                    ref={(el) => (buttonRefs.current[1] = el)}
                                    onMouseMove={(e) => handleMouseMove(e, buttonRefs.current[1])}
                                    onMouseLeave={() => handleMouseLeave(buttonRefs.current[1])}
                                    href={`tel:${phone.replace(/\s+/g, '')}`} 
                                    aria-label={`Call ${phone}`} 
                                    className="inline-flex items-center rounded-full bg-black px-6 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-white transition-colors hover:bg-black/80 will-change-transform select-none"
                                >
                                    <Phone size={16} className="mr-2"/> {phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Social Links */}
                {socials.length > 0 && (
                    <div className="mt-16 pt-8">
                        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-black/40">
                            {labels.socialsTitle}
                        </span>
                        <ul className="mt-4 flex flex-wrap gap-4 sm:gap-6 p-0 list-none">
                            {socials.map((item, index) => {
                                const IconComponent = item.icon;
                                return (
                                    <li key={item.name}>
                                        <a 
                                            ref={(el) => (socialRefs.current[index] = el)}
                                            href={item.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label={`Visit ${item.name} profile`}
                                            className="group flex items-center gap-2 rounded-full border border-black/10 bg-black/2 px-4 py-2 font-mono text-[11px] uppercase tracking-[.12em] text-black/70 transition-colors hover:border-black/30 hover:bg-black/5 hover:text-black will-change-transform"
                                        >
                                            <IconComponent size={14} className="text-black/60 transition-transform group-hover:scale-110" />
                                            <span>{item.name}</span>
                                            <ArrowUpRight size={13} className="opacity-40 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
            </div>
        </section>
    );
}
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Menu, X, Globe, MessageCircle, ArrowUpRight } from 'lucide-react';

const linksData = {
    fr: [
        ['Projets', '#work'],
        ['À propos', '#about'],
        ['Expérience', '#experience'],
        ['Contact', '#contact']
    ],
    en: [
        ['Work', '#work'],
        ['About', '#about'],
        ['Experience', '#experience'],
        ['Contact', '#contact']
    ]
};

const ctaText = {
    fr: "Discutons",
    en: "Let's talk"
};

export default function Header({ lang = 'en' }) {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    const mobileMenuRef = useRef(null);

    const links = linksData[lang] || linksData.fr;
    const targetLang = lang === 'fr' ? 'en' : 'fr';

    // Track scroll depth
    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', fn, { passive: true });
        fn();
        return () => window.removeEventListener('scroll', fn);
    }, []);

    // Mobile Popup Animation
    useEffect(() => {
        if (open && mobileMenuRef.current) {
            gsap.fromTo(
                mobileMenuRef.current,
                { y: -8, opacity: 0, scale: 0.98 },
                { y: 0, opacity: 1, scale: 1, duration: 0.25, ease: 'power2.out' }
            );

            gsap.fromTo(
                '.mobile-popup-item',
                { y: 6, opacity: 0 },
                { y: 0, opacity: 1, stagger: 0.04, duration: 0.2, ease: 'power2.out', delay: 0.05 }
            );
        }
    }, [open]);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-10 transition-all duration-500 ${scrolled ? 'py-3' : 'py-5'}`}>
            <nav 
                aria-label="Main navigation" 
                className={`mx-auto flex max-w-360 items-center justify-between rounded-full border border-black/10 px-4 py-2.5 backdrop-blur-xl transition-all duration-300 ${scrolled ? 'bg-paper/80 shadow-xs' : 'bg-paper/40'}`}
            >
                {/* Brand Identifier */}
                <a href={`/${lang}/#top`} aria-label="Back to top" className="group flex items-center gap-2 font-mono text-sm font-medium tracking-tight">
                    <img src="/apple-touch-icon.png" alt="" aria-hidden="true" className="size-7 rounded-full object-cover transition-transform duration-300 group-hover:scale-105"/>
                    <span className="hidden md:block transition-colors group-hover:text-black/60">Tsizehena</span>
                </a>

                {/* Desktop Navigation Links */}
                <div className="hidden items-center gap-8 sm:flex">
                    {links.map(([label, href]) => (
                        <a 
                            key={href} 
                            href={href} 
                            aria-label={`Navigate to ${label} section`} 
                            className="group relative py-1 font-mono text-[11px] uppercase tracking-[.15em] text-black/65 transition-colors duration-300 hover:text-black"
                        >
                            {label}
                            <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-black transition-all duration-300 group-hover:w-full" />
                        </a>
                    ))}
                </div>

                {/* Right Side Actions (Desktop) */}
                <div className="hidden items-center gap-3 sm:flex">
                    <a 
                        href={`/${targetLang}/`} 
                        aria-label={`Switch language to ${targetLang.toUpperCase()}`} 
                        className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/2 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-black/70 transition-colors hover:border-black/25 hover:bg-black/5"
                    >
                        <Globe size={12} className="text-black/40" />
                        <span className={lang === 'en' ? 'font-bold text-black' : 'opacity-40'}>EN</span>
                        <span className="text-black/25">/</span>
                        <span className={lang === 'fr' ? 'font-bold text-black' : 'opacity-40'}>FR</span>
                    </a>

                    <a 
                        href="#contact" 
                        className="group flex items-center rounded-full bg-black px-4 py-2 font-mono text-[10px] uppercase tracking-[.14em] text-white transition-transform active:scale-95"
                    >
                        {ctaText[lang]}
                        <MessageCircle size={12} className="ml-1.5 transition-transform duration-300 group-hover:rotate-12"/>
                    </a>
                </div>

                {/* Mobile Controls */}
                <div className="flex items-center gap-2 sm:hidden">
                    <a href={`/${targetLang}/`} className="rounded-full border border-black/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.12em]">
                        <span className={lang === 'en' ? 'font-bold' : 'opacity-40'}>EN</span>
                        <span className="opacity-30">/</span>
                        <span className={lang === 'fr' ? 'font-bold' : 'opacity-40'}>FR</span>
                    </a>

                    <button 
                        aria-label={open ? "Close navigation menu" : "Open navigation menu"} 
                        aria-expanded={open} 
                        onClick={() => setOpen(!open)}
                        className="p-1.5 text-black transition-transform active:scale-90"
                    >
                        {open ? <X size={20}/> : <Menu size={20}/>}
                    </button>
                </div>
            </nav>

            {/* Compact Mobile Popup */}
            {open && (
                <div 
                    ref={mobileMenuRef}
                    className="mx-auto mt-2 max-w-360 rounded-2xl border border-black/10 bg-paper/95 p-4 shadow-lg backdrop-blur-xl sm:hidden"
                >
                    <nav className="flex flex-col gap-1">
                        {links.map(([label, href]) => (
                            <a 
                                key={href} 
                                href={href} 
                                onClick={() => setOpen(false)} 
                                className="mobile-popup-item flex items-center justify-between rounded-xl px-3 py-2.5 font-mono text-xs uppercase tracking-[.12em] text-black/80 transition-colors hover:bg-black/5 hover:text-black"
                            >
                                {label}
                                <ArrowUpRight size={13} className="opacity-40" />
                            </a>
                        ))}
                    </nav>

                    <div className="mobile-popup-item mt-3 border-t border-black/10 pt-3">
                        <a 
                            href="#contact" 
                            onClick={() => setOpen(false)} 
                            className="flex items-center justify-center rounded-full bg-black py-2.5 font-mono text-[10px] uppercase tracking-[.14em] text-white active:scale-98"
                        >
                            {ctaText[lang]}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
}

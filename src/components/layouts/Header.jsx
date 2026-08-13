import { useEffect, useState } from 'react';
import { Menu, X, Globe, MessageCircle } from 'lucide-react';

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

    const links = linksData[lang] || linksData.fr;
    const targetLang = lang === 'fr' ? 'en' : 'fr';

    useEffect(() => {
        const fn = () => setScrolled(window.scrollY > 24);
        window.addEventListener('scroll', fn, { passive: true });
        fn();
        return () => window.removeEventListener('scroll', fn);
    }, []);

    return (
        <header className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-10 transition-all ${scrolled ? 'py-3' : 'py-5'}`}>
            <nav aria-label="Main navigation" className={`mx-auto flex max-w-360 items-center justify-between rounded-full border border-black/10 px-4 py-2.5 backdrop-blur-xl transition ${scrolled ? 'bg-paper/85 shadow-sm' : 'bg-paper/55'}`}>
                <a href={`/${lang}/#top`} aria-label="Back to top" className="flex items-center gap-2 font-mono text-sm font-medium tracking-tight group">
                    <img src="/apple-touch-icon.png" alt="" aria-hidden="true" className="size-7 rounded-full object-cover transition-transform group-hover:scale-105"/>
                    <span className='hidden md:block'>Tsizehena</span>
                </a>

                {/* Desktop navigation links */}
                <div className="hidden items-center gap-7 sm:flex">
                    {links.map(([label, href]) => (
                        <a key={href} aria-label={`Navigate to ${label} section`} className="font-mono text-[10px] md:text-[12px] uppercase tracking-[.12em] text-black/70 transition hover:text-black" href={href}>
                            {label}
                        </a>
                    ))}
                </div>

                {/* Right side actions */}
                <div className="hidden items-center gap-3 sm:flex">
                    {/* Language Switcher Pill */}
                    <a href={`/${targetLang}/`} aria-label={`Switch language to ${targetLang.toUpperCase()}`} className="flex items-center gap-1.5 rounded-full border border-black/10 bg-black/3 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.14em] text-black/70 transition-all hover:border-black/30 hover:bg-black/5 hover:text-black">
                        <Globe size={12} className="text-black/50" />
                        <span className={lang === 'en' ? 'font-bold text-black' : 'opacity-40'}>EN</span>
                        <span className="text-black/30">/</span>
                        <span className={lang === 'fr' ? 'font-bold text-black' : 'opacity-40'}>FR</span>
                    </a>

                    <a href="#contact" className="flex items-center rounded-full bg-black px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-white transition hover:text-acid">
                        {ctaText[lang]} <MessageCircle size={12} className="ml-1"/>
                    </a>
                </div>

                {/* Mobile controls */}
                <div className="flex items-center gap-2 sm:hidden">
                    <a href={`/${targetLang}/`} aria-label={`Switch language to ${targetLang.toUpperCase()}`} className="flex items-center gap-1 rounded-full border border-black/10 bg-black/3 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[.12em] text-black/80">
                        <span className={lang === 'en' ? 'font-bold' : 'opacity-40'}>EN</span>
                        <span className="opacity-30">/</span>
                        <span className={lang === 'fr' ? 'font-bold' : 'opacity-40'}>FR</span>
                    </a>

                    {/* Mobile menu trigger */}
                    <button aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} className="p-1" onClick={() => setOpen(!open)}>
                        {open ? <X size={18}/> : <Menu size={18}/>}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu Dropdown */}
            {open && (
                <div className="mx-auto mt-2 max-w-360 rounded-3xl border border-black/10 bg-paper p-5 shadow-xl sm:hidden">
                    {links.map(([label, href]) => (
                        <a key={href} onClick={() => setOpen(false)} aria-label={`Navigate to ${label} section`} className="block border-b border-black/10 py-4 font-mono text-sm uppercase last:border-0" href={href}>
                            {label}
                            <span className="float-right" aria-hidden="true">↗</span>
                        </a>
                    ))}

                    <a href="#contact" className="mt-4 block rounded-2xl bg-black py-3 text-center font-mono text-xs uppercase tracking-[.12em] text-white">
                        {ctaText[lang]}
                    </a>
                </div>
            )}
        </header>
    );
}

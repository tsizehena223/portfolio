import { ArrowUp } from 'lucide-react';

const backToTopText = {
    fr: "Haut de page",
    en: "To top"
};

export default function Footer({ lang = 'en' }) {
    const label = backToTopText[lang] || backToTopText.en;

    return (
        <footer className="border-t border-black/10 px-5 py-6 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-360 flex-col items-center gap-4 font-mono text-[12px] uppercase tracking-[.12em] text-black/45 sm:flex-row sm:items-center sm:justify-between">
                <span>© {new Date().getFullYear()} Tsizehena</span>
                <a href="#top" aria-label="Scroll back to top of page" className="flex items-center gap-1 text-black transition hover:text-black/50">
                    <span>{label}</span>
                    <ArrowUp size={14} />
                </a>
            </div>
        </footer>
    );
}
import { ArrowUp } from 'lucide-react';

const backToTopText = {
    fr: "Haut de page",
    en: "Back to top"
};

export default function Footer({ lang = 'en' }) {
    const label = backToTopText[lang] || backToTopText.en;
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-black/10 bg-paper px-5 py-8 sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-360 flex-col items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[.16em] text-black/50 sm:flex-row">
                
                {/* Brand & Copyright with subtle status indicator */}
                <p className="m-0 px-1 bg-black text-acid">&copy; {currentYear} <span className="font-medium">Sarobidinirina Tsizehena</span></p>

                {/* Back to Top Link with Accent Hover */}
                <a 
                    href="#top" 
                    aria-label="Scroll back to top of page" 
                    className="group flex items-center gap-2 rounded-full border border-black/10 bg-black/2 px-4 py-2 text-black transition-all duration-200 hover:border-black hover:bg-black hover:text-acid"
                >
                    <span>{label}</span>
                    <ArrowUp 
                        size={13} 
                        className="transition-transform duration-200 group-hover:-translate-y-0.5" 
                    />
                </a>

            </div>
        </footer>
    );
}
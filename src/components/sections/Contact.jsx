import { SITE_CONFIG } from "../../data/data.js";
import { Contact, UserRound, Mail } from "lucide-react";

const uiLabels = {
    fr: {
        section: "05 / Contact",
        headingTitle: "Créons",
        headingSubtitle: "quelque chose ensemble.",
        body: "Vous avez une idée, un produit à construire ou un problème qui mérite d'être résolu ?"
    },
    en: {
        section: "05 / Contact",
        headingTitle: "Let's make",
        headingSubtitle: "something.",
        body: "Have an idea, a product to build, or a problem worth solving?"
    }
};

export default function Contact({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const config = SITE_CONFIG[lang] || SITE_CONFIG.en || SITE_CONFIG;

    return (
        <section id="contact" className="bg-grid border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div className="mx-auto max-w-360">
                <span className="font-mono text-[12px] uppercase tracking-[.16em] text-black/45">
                    {labels.section}
                </span>
                <div className="mt-10 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
                    <h2 className="max-w-5xl text-5xl md:text-9xl font-semibold leading-[.78] tracking-[-.08em]">
                        {labels.headingTitle}<br/>
                        <span className="text-black/25">{labels.headingSubtitle}</span>
                    </h2>
                    <div className="max-w-sm lg:pb-2">
                        <p className="text-lg leading-relaxed text-black/60">
                            {labels.body}
                        </p>
                        <a 
                            href={`mailto:${config.email || SITE_CONFIG.email}`} 
                            aria-label={`Send an email to ${config.email || SITE_CONFIG.email}`} 
                            className="mt-6 inline-flex rounded-full bg-black px-6 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-white transition hover:bg-black/80"
                        >
                            {config.email || SITE_CONFIG.email}
                            <Mail size={16} className="ml-2"/>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
import { SITE_CONFIG } from "../../data/data.js";
import { Mail, Phone, Github, Linkedin, Facebook, ArrowUpRight } from "lucide-react";

const uiLabels = {
    fr: {
        section: "05 / Contact",
        headingTitle: "Créons",
        headingSubtitle: "quelque chose ensemble.",
        body: "Vous avez une idée, un produit à construire ou un problème qui mérite d'être résolu ?",
        socialsTitle: "Réseaux & Contact"
    },
    en: {
        section: "05 / Contact",
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
        { 
            name: "GitHub", 
            href: config.github, 
            icon: Github 
        },
        { 
            name: "LinkedIn", 
            href: config.linkedin, 
            icon: Linkedin 
        },
        { 
            name: "Facebook", 
            href: config.facebook, 
            icon: Facebook 
        },
    ].filter(item => Boolean(item.href)); // Only render links that exist in data.js

    return (
        <section id="contact" className="soft-grid-reverse border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
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

                        <div className="mt-6 flex flex-col items-start gap-3">
                            {email && (
                                <a 
                                    href={`mailto:${email}`} 
                                    aria-label={`Send an email to ${email}`} 
                                    className="inline-flex items-center rounded-full bg-black px-6 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-white transition hover:bg-black/80"
                                >
                                    <Mail size={16} className="mr-2"/> {email} 
                                </a>
                            )}

                            {phone && (
                                <a 
                                    href={`tel:${phone.replace(/\s+/g, '')}`} 
                                    aria-label={`Call ${phone}`} 
                                    className="inline-flex items-center rounded-full bg-black px-6 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-white transition hover:bg-black/80"
                                >
                                    <Phone size={16} className="mr-2"/> {phone}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {socials.length > 0 && (
                    <div className="mt-16 pt-8">
                        <span className="font-mono text-[10px] uppercase tracking-[.18em] text-black/40">
                            {labels.socialsTitle}
                        </span>
                        <ul className="mt-4 flex flex-wrap gap-4 sm:gap-6 p-0 list-none">
                            {socials.map((item) => {
                                const IconComponent = item.icon;
                                return (
                                    <li key={item.name}>
                                        <a 
                                            href={item.href} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            aria-label={`Visit ${item.name} profile`}
                                            className="group flex items-center gap-2 rounded-full border border-black/10 bg-black/2 px-4 py-2 font-mono text-[11px] uppercase tracking-[.12em] text-black/70 transition hover:border-black/30 hover:bg-black/5 hover:text-black"
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
import { SITE_CONFIG, ABOUT_DATA } from "../../data/data.js";

const uiLabels = {
    fr: {
        section: "02 / À propos"
    },
    en: {
        section: "02 / About"
    }
};

export default function About({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const config = SITE_CONFIG[lang] || SITE_CONFIG.en || SITE_CONFIG;
    const about = ABOUT_DATA[lang] || ABOUT_DATA.en || ABOUT_DATA;

    return (
        <section id="about" className="dot-grid border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div className="mx-auto grid max-w-360 gap-14 lg:grid-cols-[.55fr_1fr]">
                <div>
                    <span className="font-mono text-[12px] uppercase tracking-[.16em] text-black/65">
                        {labels.section}
                    </span>
                    <p className="mt-5 max-w-xs text-sm leading-relaxed text-black/50">
                        {config.location}<br/>
                        {config.languages}
                    </p>
                </div>
                <div>
                    <p className="max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-.04em] sm:text-6xl">
                        {about.headline}
                    </p>
                    <p className="mt-10 max-w-2xl text-lg leading-relaxed text-black/60">
                        {about.body}
                    </p>
                </div>
            </div>
        </section>
    );
}
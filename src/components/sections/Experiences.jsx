import { EXPERIENCES } from "../../data/data.js";

const uiLabels = {
    fr: {
        section: "03 / Expérience",
        headingTitle: "Une pratique",
        headingSubtitle: "en constante évolution."
    },
    en: {
        section: "03 / Experience",
        headingTitle: "A growing",
        headingSubtitle: "practice."
    }
};

export default function Experiences({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const experienceList = EXPERIENCES[lang] || EXPERIENCES.en || EXPERIENCES;

    return (
        <section id="experience" className="border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div className="mx-auto max-w-360">
                <div className="mb-14 grid gap-8 lg:grid-cols-[.55fr_1fr]">
                    <span className="font-mono text-[12px] uppercase tracking-[.16em] text-black/65">
                        {labels.section}
                    </span>
                    <h2 className="text-5xl text-end font-semibold leading-none tracking-[-.055em] sm:text-7xl">
                        {labels.headingTitle}<br/>
                        <span className="text-black/25">{labels.headingSubtitle}</span>
                    </h2>
                </div>
                <div className="border-t border-black/15">
                    {experienceList.map((exp, i) => 
                        <article key={exp.company + i} className="grid gap-4 border-b border-black/10 py-7 sm:grid-cols-[.2fr_1fr_.3fr] lg:py-9">
                            <span className="font-mono text-[12px] text-black/35">0{i+1}</span>
                            <div>
                                <h3 className="text-xl font-semibold tracking-tight">{exp.company}</h3>
                                <p className="mt-1 text-sm text-black/50">{exp.role}</p>
                                <p className="mt-5 max-w-xl text-sm leading-relaxed text-black/60">{exp.desc}</p>
                            </div>
                            <span className="font-mono text-[12px] uppercase tracking-widest text-black/40 sm:text-right">{exp.date}</span>
                        </article>
                    )}
                </div>
            </div>
        </section>
    );
}
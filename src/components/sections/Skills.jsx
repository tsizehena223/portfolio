import { SKILLS } from "../../data/data.js";

const uiLabels = {
    fr: {
        section: "04 / Compétences",
        heading: "Un stack technique pratique, avec une attention particulière aux interfaces."
    },
    en: {
        section: "04 / Capabilities",
        heading: "A practical stack, with an eye for the interface."
    }
};

export default function Skills({ lang = 'en' }) {
    const labels = uiLabels[lang] || uiLabels.en;
    const skillsList = SKILLS[lang] || SKILLS.en || SKILLS;

    return (
        <section className="white-dot-grid border-t border-black/10 bg-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32" aria-label="Capabilities and skills">
            <div className="mx-auto max-w-360">
                <div className="grid gap-12 lg:grid-cols-[.55fr_1fr]">
                    <span className="font-mono text-[12px] uppercase tracking-[.16em] text-white/70">
                        {labels.section}
                    </span>
                    <div>
                        <h2 className="max-w-4xl text-4xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">
                            {labels.heading}
                        </h2>
                        <ul className="mt-12 flex flex-wrap gap-2 p-0 list-none" aria-label="Skills list">
                            {skillsList.map((skill, index) => 
                                <li key={skill + index}>
                                    <span className="inline-block rounded-full border border-white/15 px-4 py-2 font-mono text-[12px] uppercase tracking-widest text-white/70">
                                        {skill}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
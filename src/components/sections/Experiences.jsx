import { EXPERIENCES } from "../../data/data.js";

export default function Experiences() {
    return (
        <section id="experience" class="border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div class="mx-auto max-w-360">
                <div class="mb-14 grid gap-8 lg:grid-cols-[.55fr_1fr]">
                    <span class="font-mono text-[12px] uppercase tracking-[.16em] text-black/65">03 / Experience</span>
                    <h2 class="text-5xl font-semibold leading-none tracking-[-.055em] sm:text-7xl">
                        A growing<br/><span class="text-black/25">practice.</span>
                    </h2>
                </div>
                <div class="border-t border-black/15">
                    {EXPERIENCES.map((exp, i) => 
                        <article class="grid gap-4 border-b border-black/10 py-7 sm:grid-cols-[.2fr_1fr_.3fr] lg:py-9">
                            <span class="font-mono text-[12px] text-black/35">0{i+1}</span>
                            <div>
                                <h3 class="text-xl font-semibold tracking-tight">{exp.company}</h3>
                                <p class="mt-1 text-sm text-black/50">{exp.role}</p>
                                <p class="mt-5 max-w-xl text-sm leading-relaxed text-black/60">{exp.desc}</p>
                            </div>
                            <span class="font-mono text-[12px] uppercase tracking-widest text-black/40 sm:text-right">{exp.date}</span>
                        </article>
                    )}
                </div>
            </div>
        </section>
    )
}
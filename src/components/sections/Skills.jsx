import { SKILLS } from "../../data/data.js";

export default function Skills() {
    return (
        <section class="white-dot-grid border-t border-black/10 bg-black px-5 py-24 text-white sm:px-8 lg:px-12 lg:py-32" aria-label="Capabilities and skills">
            <div class="mx-auto max-w-360">
                <div class="grid gap-12 lg:grid-cols-[.55fr_1fr]">
                    <span class="font-mono text-[12px] uppercase tracking-[.16em] text-white/70">04 / Capabilities</span>
                    <div>
                        <h2 class="max-w-4xl text-4xl font-medium leading-[.98] tracking-[-.045em] sm:text-6xl">
                            A practical stack, with an eye for the interface.
                        </h2>
                        <ul class="mt-12 flex flex-wrap gap-2 p-0 list-none" aria-label="Skills list">
                            {SKILLS.map(skill => 
                                <li>
                                    <span class="inline-block rounded-full border border-white/15 px-4 py-2 font-mono text-[12px] uppercase tracking-widest text-white/70">
                                        {skill}
                                    </span>
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}
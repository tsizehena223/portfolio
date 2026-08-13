import { SITE_CONFIG, ABOUT_DATA } from "../../data/data.js";

export default function About() {
    return (
        <section id="about" class="dot-grid border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div class="mx-auto grid max-w-360 gap-14 lg:grid-cols-[.55fr_1fr]">
                <div>
                    <span class="font-mono text-[12px] uppercase tracking-[.16em] text-black/65">02 / About</span>
                    <p class="mt-5 max-w-xs text-sm leading-relaxed text-black/50">
                        {SITE_CONFIG.location}<br/>
                        {SITE_CONFIG.languages}
                    </p>
                </div>
                <div>
                    <p class="max-w-5xl text-4xl font-medium leading-[1.05] tracking-[-.04em] sm:text-6xl">
                        {ABOUT_DATA.headline}
                    </p>
                    <p class="mt-10 max-w-2xl text-lg leading-relaxed text-black/60">
                        {ABOUT_DATA.body}
                    </p>
                </div>
            </div>
        </section>
    )
}
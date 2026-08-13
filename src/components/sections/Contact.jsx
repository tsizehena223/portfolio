import { SITE_CONFIG } from "../../data/data.js";

export default function Contact() {
    return (
        <section id="contact" class="bg-grid border-t border-black/10 px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div class="mx-auto max-w-360">
                <span class="font-mono text-[12px] uppercase tracking-[.16em] text-black/45">05 / Contact</span>
                <div class="mt-10 flex flex-col justify-between gap-12 lg:flex-row lg:items-end">
                    <h2 class="max-w-5xl text-5xl md:text-9xl font-semibold leading-[.78] tracking-[-.08em]">
                        Let's make<br/>
                        <span class="text-black/25">something.</span>
                    </h2>
                    <div class="max-w-sm lg:pb-2">
                        <p class="text-lg leading-relaxed text-black/60">Have an idea, a product to build, or a problem worth solving?</p>
                        <a 
                            href={`mailto:${SITE_CONFIG.email}`} 
                            aria-label={`Send an email to ${SITE_CONFIG.email}`} 
                            class="mt-6 inline-flex rounded-full bg-black px-6 py-4 font-mono text-[12px] uppercase tracking-[.14em] text-white transition hover:bg-black/80"
                        >
                            {SITE_CONFIG.email} <span aria-hidden="true" class="ml-1">↗</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    )
}
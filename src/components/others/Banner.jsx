import { KEYWORDS } from "../../data/data.js";

export default function Banner() {
    return (
        <div class="flex justify-center border-y border-black/10 bg-black py-3" aria-hidden="true">
            <div class="w-full max-w-6xl overflow-hidden text-white">
                <div class="marquee flex w-max gap-8 whitespace-nowrap font-mono text-[10px] uppercase tracking-[.2em]">
                    {KEYWORDS.concat(KEYWORDS).map((keyword) => (
                        <>
                            <span class="text-md md:text-lg">{keyword}</span>
                            <span class="text-md md:text-lg text-white/50">*</span>
                        </>
                    ))}
                </div>
            </div>
        </div>
    ) 
}
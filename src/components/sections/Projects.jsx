import { ArrowUpRight } from 'lucide-react';
import { PROJECTS } from '../../data/data.js';

export default function Projects() {
    return (
        <section id="work" class="px-5 py-24 sm:px-8 lg:px-12 lg:py-36">
            <div class="mx-auto max-w-360">
                <div class="mb-14 grid gap-8 lg:grid-cols-[.55fr_1fr] lg:items-end">
                    <span class="font-mono text-[12px] uppercase tracking-[.16em] text-black/65">01 / Selected work</span>
                    <h2 class="max-w-4xl text-4xl md:text-end font-semibold leading-[.95] tracking-[-.055em] sm:text-7xl">
                        Built for the web,<br/>
                        <span class="text-black/25">shaped by context.</span>
                    </h2>
                </div>

                <div className="space-y-6">
                    {PROJECTS.map((item) => (
                        <article key={item.no} className="group grid overflow-hidden rounded-4xl border border-black/10 bg-white/40 lg:grid-cols-[1.15fr_.85fr]">
                            <div className={`relative min-h-90 overflow-hidden ${item.tone} p-6 text-white transition-all duration-700 lg:min-h-135`}>
                                {/* Subtle grain / dot texture */}
                                <div className="absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 1px)', backgroundSize: '16px 16px',}} />

                                {/* Soft light */}
                                <div className="absolute -right-24 -top-24 size-80 rounded-full bg-white/6 blur-3xl transition-transform duration-1000 group-hover:translate-x-8 group-hover:-translate-y-8" />

                                <div className="relative flex h-full flex-col justify-between">
                                    <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[.16em] text-white/60">
                                        <span>{item.no}</span>
                                        <span>{item.year}</span>
                                    </div>

                                    <div>
                                        <p className="mb-3 font-mono text-[10px] uppercase tracking-[.18em] text-white/50">{item.tag}</p>
                                        <h3 className="max-w-xl text-3xl font-medium leading-[1.05] tracking-[-.04em] sm:text-6xl lg:text-7xl text-white/80">{item.title}</h3>
                                    </div>
                                </div>

                                {/* Large project number */}
                                <span className="pointer-events-none absolute -bottom-8 -right-2 font-mono text-[11rem] font-bold leading-none -tracking-widest text-white/[0.035] transition-transform duration-700 group-hover:-translate-y-3">
                                    {item.no}
                                </span>
                            </div>

                            {/* Details */}
                            <div className="flex min-h-80 flex-col justify-between p-6 sm:p-8 lg:min-h-135 lg:p-10">
                                <div>
                                    <div className="flex items-center justify-between">
                                        <span className="font-mono text-[10px] uppercase tracking-[.16em] text-black/35">Selected work</span>
                                        <span className="font-mono text-[10px] uppercase tracking-[.16em] text-black/25">{item.year}</span>
                                    </div>
                                    <p className="mt-10 max-w-md text-lg leading-[1.45] tracking-[-.015em] text-black/65 lg:text-xl">{item.text}</p>
                                </div>

                                <div className="mt-16 border-t border-black/10 pt-5">
                                    <div className="flex items-end justify-between gap-6">
                                        <span className="max-w-xs font-mono text-[10px] uppercase leading-relaxed tracking-[.14em] text-black/40">{item.tech}</span>
                                        <span className="grid size-12 shrink-0 place-items-center rounded-full border border-black/10 transition-all duration-300 group-hover:bg-black group-hover:text-white"><ArrowUpRight size={17} strokeWidth={1.5}/></span>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section> 
    );
}

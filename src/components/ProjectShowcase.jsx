import { ArrowUpRight } from 'lucide-react';

const items = [
  { no:'01', title:'Symfony × React applications', tag:'E261 Consulting', year:'2025—26', text:'Web development across Symfony and ReactJS, with an emphasis on translating interface concepts into working products.', tech:'Symfony / ReactJS / PHP', tone:'from-neutral-900 via-neutral-700 to-neutral-500' },
  { no:'02', title:'Application architecture & evolution', tag:'Cap’s Digit', year:'2024—25', text:'Contributed to the architecture of a Symfony application, then maintained and evolved the product through an alternating work-study role.', tech:'Symfony / PHP / Architecture', tone:'from-stone-300 via-stone-500 to-stone-900' },
  { no:'03', title:'Independent web builds', tag:'Next-Rocket', year:'2024', text:'Part-time freelance web development spanning JavaScript, WordPress and Bubble, adapting quickly to different product contexts.', tech:'JavaScript / WordPress / Bubble', tone:'from-lime-100 via-lime-300 to-lime-500' },
];

export default function ProjectShowcase() {
  return <div className="space-y-4">
    {items.map((item) => <article key={item.no} className="group grid overflow-hidden rounded-4xl border border-black/10 bg-white/55 lg:grid-cols-[1.2fr_.8fr]">
      <div className={`relative min-h-82.5 overflow-hidden bg-linear-to-br ${item.tone} p-6 text-white transition-transform duration-700 group-hover:scale-[1.015] lg:min-h-130`}>
        <div className="absolute inset-0 opacity-25" style={{backgroundImage:'radial-gradient(circle at 20% 20%, white 0 1px, transparent 1px)', backgroundSize:'18px 18px'}} />
        <div className="relative flex h-full flex-col justify-between">
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[.14em]"><span>{item.no}</span><span>{item.year}</span></div>
          <div><p className="mb-3 font-mono text-[10px] uppercase tracking-[.16em] text-white/65">{item.tag}</p><h3 className="max-w-2xl text-4xl font-semibold leading-[.95] tracking-[-.05em] sm:text-6xl">{item.title}</h3></div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
        <div><span className="font-mono text-[10px] uppercase tracking-[.16em] text-black/40">Selected work</span><p className="mt-8 max-w-md text-lg leading-relaxed text-black/70">{item.text}</p></div>
        <div className="mt-14 flex items-end justify-between gap-6"><span className="font-mono text-[10px] uppercase tracking-[.14em] text-black/50">{item.tech}</span><span className="grid size-12 shrink-0 place-items-center rounded-full border border-black/15 transition group-hover:bg-black group-hover:text-white"><ArrowUpRight size={17}/></span></div>
      </div>
    </article>)}
  </div>;
}

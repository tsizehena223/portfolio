import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const links = [['Work','#work'],['About','#about'],['Experience','#experience'],['Contact','#contact']];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', fn, { passive: true });
    fn(); return () => window.removeEventListener('scroll', fn);
  }, []);
  return <header className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 lg:px-10 transition-all ${scrolled ? 'py-3' : 'py-5'}`}>
    <nav className={`mx-auto flex max-w-360 items-center justify-between rounded-full border border-black/10 px-4 py-2.5 backdrop-blur-xl transition ${scrolled ? 'bg-paper/85 shadow-sm' : 'bg-paper/55'}`}>
      <a href="#top" className="font-mono text-xs font-medium tracking-tight">TSIZEHENA<span className="ml-1 text-black/35">/26</span></a>
      <div className="hidden items-center gap-7 sm:flex">
        {links.map(([label, href]) => <a key={href} className="font-mono text-[11px] uppercase tracking-[.12em] text-black/60 transition hover:text-black" href={href}>{label}</a>)}
      </div>
      <a href="mailto:tsizehena223@gmail.com" className="hidden rounded-full bg-black px-4 py-2 font-mono text-[10px] uppercase tracking-[.12em] text-white sm:block">Let's talk ↗</a>
      <button aria-label="Toggle menu" className="sm:hidden" onClick={() => setOpen(!open)}>{open ? <X size={18}/> : <Menu size={18}/>}</button>
    </nav>
    {open && <div className="mx-auto mt-2 max-w-360 rounded-3xl border border-black/10 bg-paper p-5 shadow-xl sm:hidden">
      {links.map(([label, href]) => <a key={href} onClick={() => setOpen(false)} className="block border-b border-black/10 py-4 font-mono text-sm uppercase last:border-0" href={href}>{label}<span className="float-right">↗</span></a>)}
    </div>}
  </header>;
}

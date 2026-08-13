export default function Footer() {
    return (
        <footer class="border-t border-black/10 px-5 py-6 sm:px-8 lg:px-12">
            <div class="mx-auto items-center flex max-w-360 flex-col gap-4 font-mono text-[12px] uppercase tracking-[.12em] text-black/45 sm:flex-row sm:items-center sm:justify-between">
                <span>© {new Date().getFullYear()} Tsizehena</span>
                <a 
                  href="#top" 
                  aria-label="Scroll back to top of page" 
                  class="text-black transition hover:text-black/50"
                >
                  To top <span aria-hidden="true">↑</span>
                </a>
            </div>
        </footer>
    )
}
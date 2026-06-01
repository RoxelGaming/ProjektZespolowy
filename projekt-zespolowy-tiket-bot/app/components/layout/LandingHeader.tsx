import Link from 'next/link';

export default function LandingHeader() {
  
  // Tu też usunęliśmy getPath()

  return (
    <header className="max-w-6xl w-full mx-auto px-6 py-4 flex justify-between items-center border-b border-[#1e222b]">
      <div className="flex items-center gap-3">
        <div className="relative w-9 h-9 overflow-hidden rounded-xl">
          {/* Używamy czystej ścieżki do loga! Next.js zajmie się resztą w configu */}
          <img 
            src="/LOGO.png" 
            alt="TicketBot Logo" 
            className="object-cover w-full h-full"
          />
        </div>
        <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-[#9ca3af] bg-clip-text text-transparent">
          TicketBot
        </span>
      </div>
      <Link 
        href="/dashboard" 
        className="bg-[#1e222b] hover:bg-[#2a2f3d] text-sm font-semibold px-4 py-2 rounded-xl transition border border-[#2e3545]"
      >
        Panel
      </Link>
    </header>
  );
}
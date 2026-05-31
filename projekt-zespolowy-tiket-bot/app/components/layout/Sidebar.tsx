'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const params = useParams(); // To wyciąga [serverId] z adresu URL!
  
  const serverId = params?.serverId as string;

  // Funkcja pomagająca z przedrostkiem produkcyjnym (tak jak w globalnym layout)
  const getPath = (path: string) => {
    const basePath = process.env.NODE_ENV === 'production' ? '/projektzespolowy' : '';
    return `${basePath}${path}`;
  };

  return (
    <aside className="w-64 border-r border-[#1e222b] bg-[#161920] p-6 flex flex-col gap-8 shrink-0">
      {/* ... sekcja z logo i tytułem serwera ... */}
      <div className="text-xl font-bold text-white flex items-center gap-2.5">
        <span className="bg-[#5865F2] p-2 rounded-xl text-sm">🛡️</span> Zarządzanie
      </div>

      <nav className="flex flex-col gap-1.5">
        {/* PODGLĄD (Overview) - Zauważ, że link prowadzi teraz do /dashboard/[serverId] */}
        <NavItem 
          href={`/dashboard/${serverId}`} 
          label="📊 Przegląd panelu" 
          active={pathname === `/dashboard/${serverId}` || pathname === `/dashboard/${serverId}/`} 
        />
        
        {/* USTAWIENIA - Link prowadzi do /dashboard/[serverId]/settings */}
        <NavItem 
          href={`/dashboard/${serverId}/settings`} 
          label="⚙️ Ustawienia bota" 
          active={pathname.includes('/settings')} 
        />

        {/* TICKETY - Link prowadzi do /dashboard/[serverId]/tickets */}
        <NavItem 
          href={`/dashboard/${serverId}/tickets`} 
          label="🎫 Aktywne Tickety" 
          active={pathname.includes('/tickets')} 
        />
        
        {/* Tutaj możesz dodać kolejne zakładki np. Transcripts, Staff Teams */}
      </nav>

      {/* Przycisk powrotu do wyboru serwerów */}
      <div className="mt-auto pt-6 border-t border-[#1e222b]">
        <Link href={getPath('/dashboard')} className="text-sm font-medium text-red-400 hover:text-red-300 transition flex items-center gap-2">
          ← Zmień serwer
        </Link>
      </div>
    </aside>
  );

  // Komponent wewnętrzny do renderowania linków
  function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
    const basePath = process.env.NODE_ENV === 'production' ? '/projektzespolowy' : '';
    return (
      <Link 
        href={`${basePath}${href}`} 
        className={`px-4 py-3 rounded-xl text-sm font-medium transition duration-200 block ${
          active 
            ? 'bg-[#5865F2] text-white shadow-lg shadow-[#5865f2]/10 font-semibold' 
            : 'text-[#9ca3af] hover:bg-[#1e222b] hover:text-white'
        }`}
      >
        {label}
      </Link>
    );
  }
}
'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();
  const params = useParams(); 
  
  const serverId = params?.serverId as string;

  return (
    <aside className="w-64 border-r border-[#1e222b] bg-[#161920] p-6 flex flex-col gap-8 shrink-0">
      <div className="text-xl font-bold text-white flex items-center gap-2.5">
        <span className="bg-[#5865F2] p-2 rounded-xl text-sm">🛡️</span> Zarządzanie
      </div>

      <nav className="flex flex-col gap-1.5">
        <NavItem 
          href={`/dashboard/${serverId}`} 
          label="📊 Przegląd panelu" 
          active={pathname === `/dashboard/${serverId}` || pathname === `/dashboard/${serverId}/`} 
        />
        
        <NavItem 
          href={`/dashboard/${serverId}/settings`} 
          label="⚙️ Ustawienia bota" 
          active={pathname.includes('/settings')} 
        />

        <NavItem 
          href={`/dashboard/${serverId}/tickets`} 
          label="🎫 Aktywne Tickety" 
          active={pathname.includes('/tickets')} 
        />
      </nav>

      <div className="mt-auto pt-6 border-t border-[#1e222b]">
        <Link href="/dashboard" className="text-sm font-medium text-red-400 hover:text-red-300 transition flex items-center gap-2">
          ← Zmień serwer
        </Link>
      </div>
    </aside>
  );

  function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
    return (
      <Link 
        href={href} 
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
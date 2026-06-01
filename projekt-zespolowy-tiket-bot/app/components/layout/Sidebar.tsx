'use client';

import Link from 'next/link';
import { usePathname, useParams } from 'next/navigation';
import SidebarNavItem from './SidebarNavItem';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const serverId = params?.serverId as string;

  return (
    <>
      {/* Ciemne tło rozmywające (Backdrop) dla mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Kontener Sidebaru */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 h-full bg-[#161920] border-r border-[#1e222b] p-6 
        flex flex-col gap-8 shrink-0 select-none
        transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Nagłówek Sidebaru */}
        <div className="flex items-center justify-between">
          <div className="text-xl font-bold text-white flex items-center gap-2.5">
            <span className="bg-[#5865F2] p-2 rounded-xl text-sm shadow-md shadow-[#5865f2]/20">
              {serverId ? '🛡️' : '🤖'}
            </span> 
            {serverId ? 'Zarządzanie' : 'TicketBot'}
          </div>
          
          <button onClick={onClose} className="md:hidden text-[#9ca3af] hover:text-white p-1 rounded-md bg-[#1e222b]">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Nawigacja */}
        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto">
          {serverId ? (
            <>
              <SidebarNavItem href={`/dashboard/${serverId}`} label="📊 Przegląd panelu" active={pathname === `/dashboard/${serverId}` || pathname === `/dashboard/${serverId}/`} onClick={onClose} />
              
              {/* TUTAJ DODALIŚMY NOWY LINK DO KREATORA PANELI: */}
              <SidebarNavItem href={`/dashboard/${serverId}/panels`} label="📝 Kreator Paneli" active={pathname.includes('/panels')} onClick={onClose} />
              
              <SidebarNavItem href={`/dashboard/${serverId}/settings`} label="⚙️ Ustawienia bota" active={pathname.includes('/settings')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/tickets`} label="🎫 Aktywne Tickety" active={pathname.includes('/tickets')} onClick={onClose} />
            </>
          ) : (
            <>
              <SidebarNavItem href="/dashboard" label="🛡️ Wybór Serwerów" active={pathname === '/dashboard' || pathname === '/dashboard/'} onClick={onClose} />
              <SidebarNavItem href="/dashboard/security" label="🔑 Bezpieczeństwo konta" active={pathname.includes('/security')} onClick={onClose} />
              <SidebarNavItem href="/dashboard/gdpr" label="⚖️ Wnioski RODO / GDPR" active={pathname.includes('/gdpr')} onClick={onClose} />
            </>
          )}
        </nav>

        {/* Dolna sekcja z czystymi linkami */}
        <div className="pt-6 border-t border-[#1e222b]">
          {serverId ? (
            <Link href="/dashboard" onClick={onClose} className="text-sm font-medium text-red-400 hover:text-red-300 transition flex items-center gap-2">
              ← Zmień serwer
            </Link>
          ) : (
            <Link href="/" onClick={onClose} className="text-sm font-medium text-[#6b7280] hover:text-white transition flex items-center gap-2">
              ← Strona główna
            </Link>
          )}
        </div>
      </aside>
    </>
  );
}
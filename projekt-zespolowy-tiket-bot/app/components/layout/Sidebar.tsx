'use client';

import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import SidebarNavItem from './SidebarNavItem';
import { useToast } from '../../contexts/ToastContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  
  const serverId = params?.serverId as string;

  const handleLogout = () => {
    addToast('Pomyślnie wylogowano z konta.', 'info');
    router.push('/');
    onClose();
  };

  return (
    <>
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 h-full bg-[#161920] border-r border-[#1e222b] p-6 
        flex flex-col gap-6 shrink-0 select-none
        transform transition-transform duration-300 ease-in-out
        md:static md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="flex flex-col gap-5">
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

          {serverId ? (
            <Link href="/dashboard" onClick={onClose} className="text-xs font-bold text-[#9ca3af] hover:text-white bg-[#101216] border border-[#1e222b] hover:border-[#2e3545] py-2 px-3 rounded-lg transition-all flex items-center gap-2 w-fit group">
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Powrót do serwerów
            </Link>
          ) : (
            <Link href="/" onClick={onClose} className="text-xs font-bold text-[#9ca3af] hover:text-white bg-[#101216] border border-[#1e222b] hover:border-[#2e3545] py-2 px-3 rounded-lg transition-all flex items-center gap-2 w-fit group">
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              Strona główna bota
            </Link>
          )}
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {serverId ? (
            <>
              <SidebarNavItem href={`/dashboard/${serverId}`} label="📊 Przegląd panelu" active={pathname === `/dashboard/${serverId}` || pathname === `/dashboard/${serverId}/`} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/panels`} label="📝 Kreator Paneli" active={pathname.includes('/panels')} onClick={onClose} />
              
              {/* ROZDZIELONE ZAKŁADKI STAFF I BLACKLIST */}
              <SidebarNavItem href={`/dashboard/${serverId}/staff`} label="👥 Zespoły Wsparcia" active={pathname.includes('/staff')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/blacklist`} label="⛔ Czarna Lista" active={pathname.includes('/blacklist')} onClick={onClose} />
              
              <SidebarNavItem href={`/dashboard/${serverId}/tickets`} label="🎫 Tickety" active={pathname.includes('/tickets')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/settings`} label="⚙️ Formularze" active={pathname.includes('/settings')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/import-export`} label="💾 Import / Export" active={pathname.includes('/import-export')} onClick={onClose} />
            </>
          ) : (
            <>
              <SidebarNavItem href="/dashboard" label="🛡️ Wybór Serwerów" active={pathname === '/dashboard' || pathname === '/dashboard/'} onClick={onClose} />
              <SidebarNavItem href="/dashboard/security" label="🔑 Bezpieczeństwo konta" active={pathname.includes('/security')} onClick={onClose} />
              <SidebarNavItem href="/dashboard/gdpr" label="⚖️ Wnioski RODO / GDPR" active={pathname.includes('/gdpr')} onClick={onClose} />
            </>
          )}
        </nav>

        <div className="flex flex-col mt-auto shrink-0 pr-2 md:pr-0">
          <a 
            href="https://docs.ticketbot.pl" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="px-4 py-3 mb-6 rounded-xl text-sm font-bold text-[#5865F2] bg-[#5865F2]/10 hover:bg-[#5865F2]/20 transition duration-200 flex items-center justify-between group"
          >
            📖 Dokumentacja 
            <svg className="w-4 h-4 text-[#5865F2] opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>

          <div className="pt-6 border-t border-[#1e222b]">
            <button 
              onClick={handleLogout}
              className="w-full bg-[#DA373C]/10 hover:bg-[#DA373C]/20 text-[#DA373C] font-bold py-2.5 px-4 rounded-xl text-sm transition-colors border border-[#DA373C]/20 flex items-center justify-center gap-2 group"
            >
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Wyloguj się
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
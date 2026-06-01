'use client';

import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import SidebarNavItem from './SidebarNavItem';
import { useToast } from '../../contexts/ToastContext';
import { useSettings } from '../../contexts/SettingsContext';
import AccessibilityPanel from '../ui/AccessibilityPanel';

const translations = {
  pl: {
    management: 'Zarządzanie',
    ticketBot: 'TicketBot',
    backToServer: 'Powrót do serwerów',
    home: 'Strona główna bota',
    overview: '📊 Przegląd panelu',
    panelCreator: '📝 Kreator Paneli',
    supportTeams: '👥 Zespoły Wsparcia',
    blacklist: '⛔ Czarna Lista',
    tickets: '🎫 Tickety',
    forms: '⚙️ Formularze',
    importExport: '💾 Import / Export',
    serverSelection: '🛡️ Wybór Serwerów',
    security: '🔑 Bezpieczeństwo konta',
    gdpr: '⚖️ Wnioski RODO',
    docs: '📖 Dokumentacja',
    logout: 'Wyloguj się',
    logoutMsg: 'Pomyślnie wylogowano z konta.',
  },
  en: {
    management: 'Management',
    ticketBot: 'TicketBot',
    backToServer: 'Back to servers',
    home: 'Bot Homepage',
    overview: '📊 Overview',
    panelCreator: '📝 Panel Creator',
    supportTeams: '👥 Support Teams',
    blacklist: '⛔ Blacklist',
    tickets: '🎫 Tickets',
    forms: '⚙️ Forms',
    importExport: '💾 Import / Export',
    serverSelection: '🛡️ Server Selection',
    security: '🔑 Account Security',
    gdpr: '⚖️ GDPR Requests',
    docs: '📖 Documentation',
    logout: 'Log out',
    logoutMsg: 'Successfully logged out.',
  }
};

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { addToast } = useToast();
  
  const { language, setLanguage, theme, setTheme } = useSettings();
  const t = translations[language];
  const [isA11yOpen, setIsA11yOpen] = useState(false);
  
  const serverId = params?.serverId as string;

  const handleLogout = () => {
    addToast(t.logoutMsg, 'info');
    router.push('/');
    onClose();
  };

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'pl' ? 'en' : 'pl');

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity" onClick={onClose} />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 h-full bg-surface-panel border-r border-border-subtle p-6 
        flex flex-col gap-6 shrink-0 select-none transform transition-all duration-300 ease-in-out
        md:static md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        <div className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <div className="text-xl font-bold text-text-main flex items-center gap-2.5">
              <span className="bg-brand-base text-white p-2 rounded-xl text-sm shadow-md shadow-brand-base/20">
                {serverId ? '🛡️' : '🤖'}
              </span> 
              {serverId ? t.management : t.ticketBot}
            </div>
            
            <button onClick={onClose} className="md:hidden text-text-muted hover:text-text-main p-1 rounded-md bg-surface-base">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {serverId ? (
            <Link href="/dashboard" onClick={onClose} className="text-xs font-bold text-text-muted hover:text-text-main bg-surface-base border border-border-subtle py-2 px-3 rounded-lg transition-all flex items-center gap-2 w-fit group">
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              {t.backToServer}
            </Link>
          ) : (
            <Link href="/" onClick={onClose} className="text-xs font-bold text-text-muted hover:text-text-main bg-surface-base border border-border-subtle py-2 px-3 rounded-lg transition-all flex items-center gap-2 w-fit group">
              <svg className="w-3.5 h-3.5 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              {t.home}
            </Link>
          )}
        </div>

        <nav className="flex flex-col gap-1.5 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {serverId ? (
            <>
              <SidebarNavItem href={`/dashboard/${serverId}`} label={t.overview} active={pathname === `/dashboard/${serverId}` || pathname === `/dashboard/${serverId}/`} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/panels`} label={t.panelCreator} active={pathname.includes('/panels')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/staff`} label={t.supportTeams} active={pathname.includes('/staff')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/blacklist`} label={t.blacklist} active={pathname.includes('/blacklist')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/tickets`} label={t.tickets} active={pathname.includes('/tickets')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/settings`} label={t.forms} active={pathname.includes('/settings')} onClick={onClose} />
              <SidebarNavItem href={`/dashboard/${serverId}/import-export`} label={t.importExport} active={pathname.includes('/import-export')} onClick={onClose} />
            </>
          ) : (
            <>
              <SidebarNavItem href="/dashboard" label={t.serverSelection} active={pathname === '/dashboard' || pathname === '/dashboard/'} onClick={onClose} />
              <SidebarNavItem href="/dashboard/security" label={t.security} active={pathname.includes('/security')} onClick={onClose} />
              <SidebarNavItem href="/dashboard/gdpr" label={t.gdpr} active={pathname.includes('/gdpr')} onClick={onClose} />
            </>
          )}
        </nav>

        <div className="flex flex-col mt-auto shrink-0 pr-2 md:pr-0">
          
          <div className="flex items-center gap-2 mb-4">
            <button onClick={toggleLanguage} className="flex-1 h-10 rounded-xl flex items-center justify-center font-bold text-sm bg-surface-base text-text-muted hover:text-text-main hover:bg-border-subtle transition-colors border border-border-subtle">
              {language === 'pl' ? 'EN' : 'PL'}
            </button>
            <button onClick={toggleTheme} className="flex-1 h-10 rounded-xl flex items-center justify-center text-lg bg-surface-base text-text-muted hover:text-yellow-500 hover:bg-border-subtle transition-colors border border-border-subtle">
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            <button onClick={() => setIsA11yOpen(true)} className="flex-1 h-10 rounded-xl flex items-center justify-center text-lg bg-surface-base text-text-muted hover:text-brand-base hover:bg-border-subtle transition-colors border border-border-subtle">
              ♿
            </button>
          </div>

          <a href="https://docs.ticketbot.pl" target="_blank" rel="noopener noreferrer" className="px-4 py-3 mb-6 rounded-xl text-sm font-bold text-brand-base bg-brand-base/10 hover:bg-brand-base/20 transition duration-200 flex items-center justify-between group">
            {t.docs} 
            <svg className="w-4 h-4 text-brand-base opacity-70 group-hover:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
          </a>

          <div className="pt-6 border-t border-border-subtle">
            <button onClick={handleLogout} className="w-full bg-status-error/10 hover:bg-status-error/20 text-status-error font-bold py-2.5 px-4 rounded-xl text-sm transition-colors border border-status-error/20 flex items-center justify-center gap-2 group">
              <svg className="w-4 h-4 transform group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              {t.logout}
            </button>
          </div>
        </div>
      </aside>

      <AccessibilityPanel isOpen={isA11yOpen} onClose={() => setIsA11yOpen(false)} />
    </>
  );
}
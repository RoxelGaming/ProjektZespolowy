'use client';

import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { useParams } from 'next/navigation';
import { useSettings } from '../contexts/SettingsContext';

const translations = {
  pl: { defaultServerName: 'Panel Zarządzania', defaultSub: 'Zarządzanie systemem' },
  en: { defaultServerName: 'Management Panel', defaultSub: 'System Management' }
};

export default function GlobalDashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const serverId = params?.serverId as string;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { language } = useSettings();
  const t = translations[language];

  return (
    <div className="flex h-screen w-full bg-surface-base text-text-main antialiased overflow-hidden">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 w-full min-w-0">
        <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-5 py-3 border-b border-border-subtle bg-surface-panel/80 backdrop-blur-xl shrink-0 shadow-sm transition-colors duration-300">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-brand-base flex items-center justify-center shadow-lg shadow-brand-base/30">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-text-main text-[15px] tracking-wide leading-none mb-1.5">
                {serverId ? t.defaultServerName : 'TicketBot'}
              </span>
              <span className="text-[10px] font-bold text-text-muted uppercase tracking-widest leading-none">
                {serverId ? `ID: ${serverId.substring(0, 5)}...` : t.defaultSub}
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 text-text-muted hover:text-text-main hover:bg-surface-base rounded-xl transition-all active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {serverId && (
          <div className="hidden md:block">
            <Topbar />
          </div>
        )}
        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 relative">
          <div className="w-full h-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
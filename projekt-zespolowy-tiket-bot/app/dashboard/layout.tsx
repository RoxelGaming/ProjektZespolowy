'use client';

import { useState } from 'react';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';
import { useParams } from 'next/navigation';

export default function GlobalDashboardLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const serverId = params?.serverId as string;
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-[#101216] text-[#f2f3f5] antialiased overflow-hidden">
      
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <div className="flex flex-col flex-1 w-full min-w-0">
        
        {/* PREMIUM MOBILNY NAGŁÓWEK (Tylko telefony) */}
        <div className="md:hidden sticky top-0 z-30 flex items-center justify-between px-5 py-3 border-b border-[#1e222b] bg-[#161920]/80 backdrop-blur-xl shrink-0 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5865F2] to-[#4752C4] flex items-center justify-center shadow-lg shadow-[#5865f2]/30">
              <span className="text-white text-lg">🤖</span>
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-white text-[15px] tracking-wide leading-none mb-1.5">
                {serverId ? 'Panel Zarządzania' : 'TicketBot'}
              </span>
              <span className="text-[10px] font-bold text-[#9ca3af] uppercase tracking-widest leading-none">
                {serverId ? `Serwer ID: ${serverId.substring(0, 5)}...` : 'Zarządzanie systemem'}
              </span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 -mr-2 text-[#9ca3af] hover:text-white hover:bg-[#1e222b] rounded-xl transition-all active:scale-95"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* ORYGINALNY TOPBAR (Tylko komputery) */}
        {serverId && (
          <div className="hidden md:block">
            <Topbar />
          </div>
        )}
        
        {/* KONTENER GŁÓWNY (100% szerokości ekranu) */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8 lg:p-10 relative">
          <div className="w-full h-full">
            {children}
          </div>
        </main>

      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
// Naprawiony import! 
import { useSettings } from '../contexts/SettingsContext';

const mockServers = [
  { id: '123456789', name: 'Projekt Zespołowy Dev', isManaged: true, memberCount: 15 },
  { id: '987654321', name: 'Support Community', isManaged: true, memberCount: 142 },
  { id: '555666777', name: 'GamerZone UJD', isManaged: false, memberCount: 89 },
];

const translations = {
  pl: {
    title: 'Wybór Serwera',
    subtitle: 'Wybierz serwer z autoryzacją Discord OAuth2, aby zarządzać systemem ticketów.',
    refresh: 'Odśwież listę',
    refreshing: 'Odświeżanie...',
    yourServers: 'Twoje Serwery (Aktywny bot)',
    members: 'członków zespołu',
    manage: 'Przejdź do zarządzania',
    otherServers: 'Pozostałe Serwery (Zaproś bota)',
    membersTotal: 'członków',
    invite: 'Autoryzuj i zaproś bota'
  },
  en: {
    title: 'Server Selection',
    subtitle: 'Select a server with Discord OAuth2 authorization to manage the ticket system.',
    refresh: 'Refresh list',
    refreshing: 'Refreshing...',
    yourServers: 'Your Servers (Active bot)',
    members: 'team members',
    manage: 'Go to management',
    otherServers: 'Other Servers (Invite bot)',
    membersTotal: 'members',
    invite: 'Authorize and invite bot'
  }
};

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);
  const { language } = useSettings();
  const t = translations[language];

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="flex justify-between items-center border-b border-border-subtle pb-5">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-tight">{t.title}</h1>
          <p className="text-text-muted text-sm mt-1">{t.subtitle}</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="bg-surface-panel hover:bg-surface-base text-sm font-semibold px-4 py-2.5 rounded-xl transition border border-border-subtle text-text-main flex items-center gap-2"
        >
          {loading ? t.refreshing : `🔄 ${t.refresh}`}
        </button>
      </div>

      <section>
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">{t.yourServers}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServers.filter(s => s.isManaged).map(server => (
            <div key={server.id} className="bg-surface-panel border border-border-subtle p-6 rounded-2xl hover:border-brand-base transition flex flex-col justify-between h-48 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 bg-surface-base rounded-2xl flex items-center justify-center text-lg font-bold text-brand-base border border-border-subtle group-hover:border-brand-base/50 transition">
                  {server.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-base leading-tight">{server.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{server.memberCount} {t.members}</p>
                </div>
              </div>
              
              <Link href={`/dashboard/${server.id}`} className="w-full text-center bg-brand-base hover:bg-brand-hover text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-lg shadow-brand-base/10">
                {t.manage}
              </Link>
            </div>
          ))}
        </div>
      </section>

      <section className="pt-4">
        <h2 className="text-xs font-bold text-text-muted uppercase tracking-widest mb-4">{t.otherServers}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServers.filter(s => !s.isManaged).map(server => (
            <div key={server.id} className="bg-surface-panel border border-border-subtle p-6 rounded-2xl flex flex-col justify-between h-48">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 bg-surface-base rounded-2xl flex items-center justify-center text-lg font-bold text-text-muted border border-border-subtle">
                  {server.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-text-main text-base leading-tight">{server.name}</h3>
                  <p className="text-xs text-text-muted mt-1">{server.memberCount} {t.membersTotal}</p>
                </div>
              </div>
              <button className="w-full bg-surface-base hover:bg-border-subtle text-text-muted hover:text-text-main font-semibold py-2.5 px-4 rounded-xl text-sm transition border border-border-subtle">
                {t.invite}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
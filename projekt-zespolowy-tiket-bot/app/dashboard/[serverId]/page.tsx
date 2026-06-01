'use client';

import { useSettings } from '../../contexts/SettingsContext';

const translations = {
  pl: {
    title: 'Przegląd panelu',
    subtitle: 'Witaj w centrum zarządzania Twoim Ticket Botem (ID Serwera:',
    open: 'Otwarte zgłoszenia',
    openSub: 'nowe w ciągu ostatniej godziny',
    closed: 'Zamknięte dzisiaj',
    closedSub: 'Średni czas reakcji: 14 min',
    active: 'Aktywne serwery',
    activeSub: 'Status bota: Online',
    latest: 'Ostatnia aktywność',
    latestSub: 'Tutaj w przyszłości pojawi się lista aktywnych ticketów pobierana bezpośrednio z bazy danych.'
  },
  en: {
    title: 'Dashboard Overview',
    subtitle: 'Welcome to the management center for your Ticket Bot (Server ID:',
    open: 'Open tickets',
    openSub: 'new in the last hour',
    closed: 'Closed today',
    closedSub: 'Average response time: 14 min',
    active: 'Active servers',
    activeSub: 'Bot status: Online',
    latest: 'Latest activity',
    latestSub: 'A list of active tickets fetched directly from the database will appear here in the future.'
  }
}

export default function ServerOverviewPage({ params }: { params: { serverId: string } }) {
  const { language } = useSettings();
  const t = translations[language];

  return (
    <div className="space-y-6 text-text-main animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-text-main">{t.title}</h1>
        <p className="text-text-muted mt-1">{t.subtitle} {params.serverId}).</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-surface-panel border border-border-subtle p-6 rounded-xl">
          <div className="text-text-muted text-sm font-medium">{t.open}</div>
          <div className="text-4xl font-bold mt-2 text-text-main">12</div>
          <div className="text-xs text-status-success mt-1">▲ 3 {t.openSub}</div>
        </div>
        <div className="bg-surface-panel border border-border-subtle p-6 rounded-xl">
          <div className="text-text-muted text-sm font-medium">{t.closed}</div>
          <div className="text-4xl font-bold mt-2 text-text-main">45</div>
          <div className="text-xs text-text-muted mt-1">{t.closedSub}</div>
        </div>
        <div className="bg-surface-panel border border-border-subtle p-6 rounded-xl">
          <div className="text-text-muted text-sm font-medium">{t.active}</div>
          <div className="text-4xl font-bold mt-2 text-status-success">1</div>
          <div className="text-xs text-text-muted mt-1">{t.activeSub}</div>
        </div>
      </div>

      <div className="bg-surface-panel border border-border-subtle rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-text-main">{t.latest}</h3>
        <div className="text-text-muted text-sm">{t.latestSub}</div>
      </div>
    </div>
  );
}
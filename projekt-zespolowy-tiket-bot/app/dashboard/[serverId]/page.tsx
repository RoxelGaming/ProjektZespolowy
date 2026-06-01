'use client';

import { useToast } from '../../contexts/ToastContext'; // Upewnij się, że ścieżka do kontekstu jest poprawna
import { useSettings } from '../../contexts/SettingsContext';

// Komponent przyjmuje 'params' z adresem URL, abyśmy wiedzieli w jakim serwerze jesteśmy
export default function ServerOverviewPage({ params }: { params: { serverId: string } }) {
  const { addToast } = useToast();
  const { language } = useSettings(); // Pobieranie aktualnego języka z kontekstu

  // ==========================================
  // SŁOWNIK TŁUMACZEŃ (PL / EN)
  // ==========================================
  const t = {
    title: language === 'pl' ? 'Przegląd panelu' : 'Dashboard Overview',
    subtitle: language === 'pl' 
      ? `Witaj w centrum zarządzania Twoim Ticket Botem (ID Serwera: ${params.serverId}).` 
      : `Welcome to the management center for your Ticket Bot (Server ID: ${params.serverId}).`,
    openTickets: language === 'pl' ? 'Otwarte zgłoszenia' : 'Open tickets',
    newTickets: language === 'pl' ? '▲ 3 nowe w ciągu ostatniej godziny' : '▲ 3 new in the last hour',
    closedToday: language === 'pl' ? 'Zamknięte dzisiaj' : 'Closed today',
    avgResponse: language === 'pl' ? 'Średni czas reakcji: 14 min' : 'Avg response time: 14 min',
    activeServers: language === 'pl' ? 'Aktywne serwery' : 'Active servers',
    botStatus: language === 'pl' ? 'Status bota: Online' : 'Bot status: Online',
    recentActivityTitle: language === 'pl' ? 'Ostatnia aktywność' : 'Recent activity',
    recentActivityDesc: language === 'pl' 
      ? 'Tutaj w przyszłości pojawi się lista aktywnych ticketów pobierana bezpośrednio z bazy danych.' 
      : 'A list of active tickets fetched directly from the database will appear here in the future.'
  };

  return (
    <div className="space-y-6 text-[#f2f3f5] animate-fadeIn">

      {/* Górna sekcja z powitaniem */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">{t.title}</h1>
        <p className="text-[#9ca3af] mt-1">{t.subtitle}</p>
      </div>

      {/* Siatka ze statystykami - Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Karta 1: Otwarte tickety */}
        <div className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
          <div className="text-[#9ca3af] text-sm font-medium">{t.openTickets}</div>
          <div className="text-4xl font-bold mt-2 text-white">12</div>
          <div className="text-xs text-emerald-400 mt-1">{t.newTickets}</div>
        </div>

        {/* Karta 2: Zamknięte zgłoszenia */}
        <div className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
          <div className="text-[#9ca3af] text-sm font-medium">{t.closedToday}</div>
          <div className="text-4xl font-bold mt-2 text-white">45</div>
          <div className="text-xs text-[#9ca3af] mt-1">{t.avgResponse}</div>
        </div>

        {/* Karta 3: Status bota */}
        <div className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
          <div className="text-[#9ca3af] text-sm font-medium">{t.activeServers}</div>
          <div className="text-4xl font-bold mt-2 text-emerald-400">1</div>
          <div className="text-xs text-[#9ca3af] mt-1">{t.botStatus}</div>
        </div>
        
      </div>

      {/* Dolna sekcja na listę ostatnich zgłoszeń */}
      <div className="bg-[#161920] border border-[#2e3545] rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">{t.recentActivityTitle}</h3>
        <div className="text-[#9ca3af] text-sm">
          {t.recentActivityDesc}
        </div>
      </div>
    </div>
  );
}
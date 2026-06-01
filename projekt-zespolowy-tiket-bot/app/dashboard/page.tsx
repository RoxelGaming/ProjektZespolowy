'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useToast } from '../contexts/ToastContext';
import { useSettings } from '../contexts/SettingsContext';

export default function DashboardPage() {
  const { addToast } = useToast();
  const { language } = useSettings(); // Pobieranie aktualnego języka z kontekstu
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ==========================================
  // SŁOWNIK TŁUMACZEŃ (PL / EN)
  // ==========================================
  const t = {
    refreshSuccess: language === 'pl' ? 'Lista serwerów została odświeżona.' : 'Server list has been refreshed.',
    authRedirect: language === 'pl' ? 'Przekierowanie do autoryzacji Discord...' : 'Redirecting to Discord authorization...',
    title: language === 'pl' ? 'Wybór Serwera' : 'Server Selection',
    subtitle: language === 'pl' ? 'Wybierz serwer, którym chcesz zarządzać, lub dodaj bota do nowego.' : 'Select a server you want to manage, or add the bot to a new one.',
    refreshing: language === 'pl' ? '⏳ Odświeżanie...' : '⏳ Refreshing...',
    refresh: language === 'pl' ? '🔄 Odśwież listę' : '🔄 Refresh list',
    addBot: language === 'pl' ? '➕ Dodaj Bota' : '➕ Add Bot',
    yourServers: language === 'pl' ? 'Twoje Serwery' : 'Your Servers',
    active: language === 'pl' ? 'Aktywny' : 'Active',
    goToDashboard: language === 'pl' ? 'Przejdź do panelu' : 'Go to dashboard',
    otherServers: language === 'pl' ? 'Pozostałe Serwery' : 'Other Servers',
    configureBot: language === 'pl' ? 'Skonfiguruj bota' : 'Configure bot',
  };

  // Funkcja obsługująca przycisk odświeżania (SCRUM-107)
  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Symulacja pobierania danych z API
    await new Promise(resolve => setTimeout(resolve, 1000));
    addToast(t.refreshSuccess, 'success');
    setIsRefreshing(false);
  };

  // Funkcja obsługująca przycisk autoryzacji (SCRUM-106)
  const handleAuthorize = () => {
    addToast(t.authRedirect, 'info');
    // Tutaj w przyszłości pojawi się przekierowanie na stronę OAuth2 Discorda
  };

  return (
    <div className="max-w-6xl space-y-8 animate-fadeIn">
      
      {/* Nagłówek i przyciski akcji */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1e222b] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{t.title}</h1>
          <p className="text-[#9ca3af] mt-2">{t.subtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="bg-[#1e222b] hover:bg-[#252a36] text-white font-medium py-2.5 px-4 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50 flex items-center gap-2"
          >
            {isRefreshing ? t.refreshing : t.refresh}
          </button>
          <button 
            onClick={handleAuthorize}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/20 flex items-center gap-2"
          >
            {t.addBot}
          </button>
        </div>
      </div>

      {/* Sekcja: Twoje Serwery (Skonfigurowane / SCRUM-102) */}
      <section>
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
          {t.yourServers}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          {/* Przykładowa Karta Serwera 1 */}
          <Link href="/dashboard/123456789" className="bg-[#161920] border border-[#1e222b] hover:border-[#5865F2] rounded-2xl p-5 transition-all group cursor-pointer block">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2e3545] rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                🎮
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-white font-bold truncate">Roxel Gaming</h3>
                <p className="text-xs text-[#9ca3af] mt-0.5">ID: 123456789</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-500/20">
                {t.active}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#1e222b] text-sm text-[#9ca3af] flex justify-between items-center group-hover:text-white transition-colors">
              {t.goToDashboard} <span>→</span>
            </div>
          </Link>

          {/* Przykładowa Karta Serwera 2 */}
          <Link href="/dashboard/987654321" className="bg-[#161920] border border-[#1e222b] hover:border-[#5865F2] rounded-2xl p-5 transition-all group cursor-pointer block">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2e3545] rounded-full flex items-center justify-center text-xl shrink-0 group-hover:scale-105 transition-transform">
                🛡️
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-white font-bold truncate">Community Support</h3>
                <p className="text-xs text-[#9ca3af] mt-0.5">ID: 987654321</p>
              </div>
              <div className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-2.5 py-1 rounded-md border border-emerald-500/20">
                {t.active}
              </div>
            </div>
            <div className="mt-5 pt-4 border-t border-[#1e222b] text-sm text-[#9ca3af] flex justify-between items-center group-hover:text-white transition-colors">
              {t.goToDashboard} <span>→</span>
            </div>
          </Link>

        </div>
      </section>

      {/* Sekcja: Pozostałe Serwery (Wymagają konfiguracji / SCRUM-104) */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#9ca3af]"></span>
          {t.otherServers}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 opacity-70 hover:opacity-100 transition-opacity duration-300">
          
          {/* Przykładowa Karta Nieaktywnego Serwera */}
          <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-5">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-[#2e3545] rounded-full flex items-center justify-center text-xl shrink-0">
                📝
              </div>
              <div className="flex-1 overflow-hidden">
                <h3 className="text-white font-bold truncate">Test Server</h3>
                <p className="text-xs text-[#9ca3af] mt-0.5">ID: 112233445</p>
              </div>
            </div>
            <button 
              onClick={handleAuthorize}
              className="w-full mt-5 bg-[#1e222b] hover:bg-[#252a36] text-white font-medium py-2 rounded-xl text-sm transition border border-[#2e3545]"
            >
              {t.configureBot}
            </button>
          </div>

        </div>
      </section>

    </div>
  );
}
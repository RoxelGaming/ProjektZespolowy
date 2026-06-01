'use client';

import { useToast } from '../../contexts/ToastContext'; // Upewnij się, że ścieżka do kontekstu jest poprawna

// Komponent przyjmuje 'params' z adresem URL, abyśmy wiedzieli w jakim serwerze jesteśmy
export default function ServerOverviewPage({ params }: { params: { serverId: string } }) {
  const { addToast } = useToast();

  return (
    <div className="space-y-6 text-[#f2f3f5] animate-fadeIn">

      {/* Górna sekcja z powitaniem */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">Przegląd panelu</h1>
        <p className="text-[#9ca3af] mt-1">Witaj w centrum zarządzania Twoim Ticket Botem (ID Serwera: {params.serverId}).</p>
      </div>

      {/* Siatka ze statystykami - Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Karta 1: Otwarte tickety */}
        <div className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
          <div className="text-[#9ca3af] text-sm font-medium">Otwarte zgłoszenia</div>
          <div className="text-4xl font-bold mt-2 text-white">12</div>
          <div className="text-xs text-emerald-400 mt-1">▲ 3 nowe w ciągu ostatniej godziny</div>
        </div>

        {/* Karta 2: Zamknięte zgłoszenia */}
        <div className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
          <div className="text-[#9ca3af] text-sm font-medium">Zamknięte dzisiaj</div>
          <div className="text-4xl font-bold mt-2 text-white">45</div>
          <div className="text-xs text-[#9ca3af] mt-1">Średni czas reakcji: 14 min</div>
        </div>

        {/* Karta 3: Status bota */}
        <div className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
          <div className="text-[#9ca3af] text-sm font-medium">Aktywne serwery</div>
          <div className="text-4xl font-bold mt-2 text-emerald-400">1</div>
          <div className="text-xs text-[#9ca3af] mt-1">Status bota: Online</div>
        </div>
        
      </div>

      {/* Dolna sekcja na listę ostatnich zgłoszeń */}
      <div className="bg-[#161920] border border-[#2e3545] rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 text-white">Ostatnia aktywność</h3>
        <div className="text-[#9ca3af] text-sm">
          Tutaj w przyszłości pojawi się lista aktywnych ticketów pobierana bezpośrednio z bazy danych.
        </div>
      </div>
    </div>
  );
}
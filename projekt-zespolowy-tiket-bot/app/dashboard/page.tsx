"use client"

import { useToast } from '../contexts/ToastContext';

export default function DashboardPage() {
  const { addToast } = useToast();

  return (
    <div className="space-y-6 text-text-main">

      {/* Przycisk testowy dla powiadomień */}
      <button 
        onClick={() => addToast('Właśnie zaktualizowaliśmy wszystkie kolory na zmienne globalne! Działa to perfekcyjnie.', 'success')}
        className="bg-brand-base hover:bg-brand-hover px-4 py-2 rounded-md font-medium transition-colors shadow-lg shadow-brand-base/20"
      >
        Przetestuj globalne powiadomienie
      </button>

      {/* Górna sekcja z powitaniem */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Przegląd panelu</h1>
        <p className="text-text-muted mt-1">Witaj w centrum zarządzania Twoim Ticket Botem.</p>
      </div>

      {/* Siatka ze statystykami — Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Karta 1: Otwarte tickety */}
        <div className="bg-surface-panel border border-border-subtle p-6 rounded-xl">
          <div className="text-text-muted text-sm font-medium">Otwarte zgłoszenia</div>
          <div className="text-4xl font-bold mt-2 text-brand-light">12</div>
          <div className="text-xs text-status-success mt-1">▲ 3 nowe w ciągu ostatniej godziny</div>
        </div>

        {/* Karta 2: Zamknięte zgłoszenia */}
        <div className="bg-surface-panel border border-border-subtle p-6 rounded-xl">
          <div className="text-text-muted text-sm font-medium">Zamknięte dzisiaj</div>
          <div className="text-4xl font-bold mt-2 text-text-main">45</div>
          <div className="text-xs text-text-muted mt-1">Średni czas reakcji: 14 min</div>
        </div>

        {/* Karta 3: Status bota */}
        <div className="bg-surface-panel border border-border-subtle p-6 rounded-xl">
          <div className="text-text-muted text-sm font-medium">Aktywne serwery</div>
          <div className="text-4xl font-bold mt-2 text-status-success">1</div>
          <div className="text-xs text-text-muted mt-1">Status bota: Online</div>
        </div>
        
      </div>

      {/* Dolna sekcja na listę ostatnich zgłoszeń */}
      <div className="bg-surface-panel border border-border-subtle rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Ostatnia aktywność</h3>
        <div className="text-text-muted text-sm">
          Tutaj w przyszłości pojawi się lista aktywnych ticketów pobierana bezpośrednio z bazy danych.
        </div>
      </div>
    </div>
  );
}
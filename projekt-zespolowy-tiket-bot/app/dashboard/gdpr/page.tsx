'use client';

import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

export default function GdprPage() {
  const { addToast } = useToast();
  const [requestType, setRequestType] = useState('all_tickets');
  const [scope, setScope] = useState('all_messages');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Żądanie przekazane. Proces ten może potrwać do 7 dni roboczych.', 'warning');
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      <div className="border-b border-[#1e222b] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Żądanie usunięcia danych (GDPR / RODO)</h1>
        <p className="text-[#9ca3af] text-sm mt-1">
          Formularz pozwala na permanentne i bezpowrotne wyczyszczenie Twoich danych osobowych.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#161920] border border-[#1e222b] p-8 rounded-2xl flex flex-col gap-6 max-w-4xl">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Wybierz Serwer</label>
              <select className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-pointer">
                <option>Projekt Zespołowy Dev</option>
                <option>Support Community</option>
                <option>GamerZone UJD</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3">Zakres zgłoszeń</label>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
                  <input type="radio" name="requestType" value="all_tickets" checked={requestType === 'all_tickets'} onChange={() => setRequestType('all_tickets')} className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545]" />
                  Usuń dane ze wszystkich zgłoszeń
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
                  <input type="radio" name="requestType" value="specific_ticket" checked={requestType === 'specific_ticket'} onChange={() => setRequestType('specific_ticket')} className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545]" />
                  Tylko konkretne ID zgłoszenia
                </label>
              </div>
              {requestType === 'specific_ticket' && (
                <div className="mt-4 animate-fadeIn">
                  <input type="text" placeholder="np. ticket-0042" className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" required />
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6 border-t md:border-t-0 md:border-l border-[#1e222b] pt-6 md:pt-0 md:pl-8">
            <div>
              <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3">Zakres danych</label>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
                  <input type="radio" name="scope" value="all_messages" checked={scope === 'all_messages'} onChange={() => setScope('all_messages')} className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545]" />
                  Wszystkie wiadomości i logi
                </label>
                <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
                  <input type="radio" name="scope" value="only_attachments" checked={scope === 'only_attachments'} onChange={() => setScope('only_attachments')} className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545]" />
                  Tylko załączniki multimedialne
                </label>
              </div>
            </div>

            <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-xs text-[#9ca3af] leading-relaxed">
              ⚠️ <span className="text-yellow-500 font-semibold">Uwaga:</span> Operacja ta jest całkowicie nieodwracalna w świetle przepisów RODO.
            </div>

            <button type="submit" className="w-full bg-[#DA373C] hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-red-600/10 mt-auto">
              Wyślij oficjalne żądanie
            </button>
          </div>
        </div>

      </form>
    </div>
  );
}
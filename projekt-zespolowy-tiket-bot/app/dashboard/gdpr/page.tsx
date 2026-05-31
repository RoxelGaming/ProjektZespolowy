'use client';

import { useState } from 'react';

export default function GdprPage() {
  const [requestType, setRequestType] = useState('all_tickets');
  const [scope, setScope] = useState('all_messages');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(true);
    setTimeout(() => setSuccess(false), 5000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Nagłówek i opis (SCRUM-259) */}
      <div className="border-b border-[#1e222b] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Żądanie usunięcia danych (GDPR / RODO)</h1>
        <p className="text-[#9ca3af] text-sm mt-1">
          Formularz pozwala na permanentne i bezpowrotne wyczyszczenie Twoich danych osobowych oraz transkrypcji przechowywanych przez bota.
        </p>
      </div>

      {/* Główny formularz (SCRUM-263) */}
      <form onSubmit={handleSubmit} className="bg-[#161920] border border-[#1e222b] p-8 rounded-2xl flex flex-col gap-6 max-w-2xl">
        
        {/* SCRUM-264: Wybór serwera, którego dotyczy żądanie */}
        <div>
          <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">
            Wybierz Serwer, którego dotyczy wniosek
          </label>
          <select className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition cursor-pointer">
            <option>Projekt Zespołowy Dev (Wszyscy członkowie)</option>
            <option>Support Community</option>
            <option>GamerZone UJD</option>
          </select>
        </div>

        {/* SCRUM-265: Zakres usuwania (Wszystkie tickety vs konkretne ID) */}
        <div>
          <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3">
            Zakres zgłoszeń (Typ żądania)
          </label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
              <input 
                type="radio" 
                name="requestType" 
                value="all_tickets"
                checked={requestType === 'all_tickets'}
                onChange={() => setRequestType('all_tickets')}
                className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              Usuń moje dane ze wszystkich zgłoszeń (ticketów) na tym serwerze
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
              <input 
                type="radio" 
                name="requestType" 
                value="specific_ticket"
                checked={requestType === 'specific_ticket'}
                onChange={() => setRequestType('specific_ticket')}
                className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              Tylko konkretny identyfikator (ID) zgłoszenia
            </label>
          </div>
        </div>

        {/* Warunkowe wyświetlanie pola dla konkretnego ID zgłoszenia */}
        {requestType === 'specific_ticket' && (
          <div className="transition duration-200">
            <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">
              Identyfikator zgłoszenia (ID)
            </label>
            <input 
              type="text" 
              placeholder="np. ticket-0042 lub dokładne ID z Discorda" 
              className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#5865F2] transition"
              required
            />
          </div>
        )}

        {/* SCRUM-266: Zakres danych (Wszystkie wiadomości vs same załączniki) */}
        <div className="border-t border-[#1e222b] pt-5">
          <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3">
            Zakres danych osobowych do wyczyszczenia
          </label>
          <div className="flex flex-col gap-3">
            <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
              <input 
                type="radio" 
                name="scope" 
                value="all_messages"
                checked={scope === 'all_messages'}
                onChange={() => setScope('all_messages')}
                className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              Wszystkie moje wiadomości, wpisy tekstowe i transkrypcje logów
            </label>
            <label className="flex items-center gap-3 cursor-pointer text-sm text-[#f2f3f5] select-none">
              <input 
                type="radio" 
                name="scope" 
                value="only_attachments"
                checked={scope === 'only_attachments'}
                onChange={() => setScope('only_attachments')}
                className="w-4 h-4 text-[#5865F2] bg-[#101216] border-[#2e3545] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              Tylko przesłane przeze mnie załączniki multimedialne (zdjęcia, pliki zip, dokumenty)
            </label>
          </div>
        </div>

        {/* Informacja prawna */}
        <div className="p-4 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-xs text-[#9ca3af] leading-relaxed">
          ⚠️ <span className="text-yellow-500 font-semibold">Uwaga:</span> Operacja wysłania żądania zapomnienia danych jest nieodwracalna. Po przetworzeniu wniosku administratorzy bota nie będą mieli technicznej możliwości przywrócenia historii Twoich rozmów.
        </div>

        {/* Przycisk akcji */}
        <button 
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition text-base shadow-lg shadow-red-600/10 mt-2"
        >
          Wyślij oficjalne żądanie zapomnienia
        </button>

        {/* Alert o sukcesie wizualnym */}
        {success && (
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-sm text-center animate-fadeIn">
            ✔ Wniosek GDPR został wygenerowany pomyślnie i przekazany do przetworzenia w systemie kolejek.
          </div>
        )}
      </form>
    </div>
  );
}
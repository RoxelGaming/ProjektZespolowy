"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useToast } from '../../../../contexts/ToastContext';

// Mock wiadomości z czatu
const MOCK_MESSAGES = [
  { id: 1, author: 'TicketBot', isBot: true, avatar: '🤖', time: 'Dzisiaj o 14:30', content: 'Witaj w zgłoszeniu! Opisz swój problem, a administracja odpowie wkrótce.' },
  { id: 2, author: 'Kowal#1234', isBot: false, avatar: '👨‍🔧', time: 'Dzisiaj o 14:32', content: 'Hej, mam problem z odebraniem nagrody za wczorajszy event. Wyrzuca mi błąd bazy danych.' },
  { id: 3, author: 'Admin', isBot: false, avatar: '🛡️', time: 'Dzisiaj o 14:45', content: 'Cześć! Podaj proszę swój dokładny ID z gry, sprawdzę to w logach.' },
];

export default function TicketDetailedViewPage() {
  const params = useParams();
  const router = useRouter();
  const serverId = params?.serverId as string;
  const ticketId = params?.ticketId as string;
  const { addToast } = useToast();

  const [labels, setLabels] = useState<string[]>(['High Priority']);
  const [newLabelInput, setNewLabelInput] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const handleAddLabel = () => {
    if (!newLabelInput.trim()) return;
    if (!labels.includes(newLabelInput.trim())) {
      setLabels([...labels, newLabelInput.trim()]);
      addToast(`Dodano etykietę: ${newLabelInput}`, 'info');
    }
    setNewLabelInput('');
  };

  const handleRemoveLabel = (label: string) => {
    setLabels(labels.filter(l => l !== label));
    addToast(`Usunięto etykietę: ${label}`, 'success');
  };

  const handleCloseTicket = async () => {
    if (isClosing) return;
    setIsClosing(true);
    // Symulacja API
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast('Ticket został pomyślnie zamknięty!', 'success');
    router.push(`/dashboard/${serverId}/tickets`); // Powrót do listy po zamknięciu
  };

  return (
    <div className="w-full h-[calc(100vh-8rem)] flex flex-col md:flex-row gap-6 animate-fadeIn text-white">
      
      {/* LEWA STRONA: SYMULTOR CZATU DISCORDA */}
      <div className="flex-1 bg-[#161920] border border-[#1e222b] rounded-2xl flex flex-col overflow-hidden shadow-sm">
        
        {/* Chat Header */}
        <div className="px-6 py-4 border-b border-[#1e222b] bg-[#101216] flex items-center gap-3 shrink-0">
          <Link href={`/dashboard/${serverId}/tickets`} className="text-[#9ca3af] hover:text-white transition mr-2">
            ← Wróć
          </Link>
          <span className="text-[#9ca3af] font-bold text-xl">#</span>
          <h2 className="font-bold text-lg">{ticketId}</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {MOCK_MESSAGES.map(msg => (
            <div key={msg.id} className="flex gap-4 group hover:bg-[#101216] -mx-4 px-4 py-2 rounded-xl transition-colors">
              <div className="w-10 h-10 rounded-full bg-[#1e222b] flex items-center justify-center shrink-0 border border-[#2e3545] text-xl">
                {msg.avatar}
              </div>
              <div className="flex flex-col">
                <div className="flex items-baseline gap-2">
                  <span className={`font-semibold ${msg.isBot ? 'text-[#5865F2]' : 'text-white'}`}>{msg.author}</span>
                  {msg.isBot && <span className="bg-[#5865F2] text-white text-[10px] uppercase font-bold px-1.5 py-0.5 rounded">BOT</span>}
                  <span className="text-xs text-[#6b7280] font-medium">{msg.time}</span>
                </div>
                <p className="text-[#d1d5db] leading-relaxed mt-1 text-[15px]">{msg.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 bg-[#101216] border-t border-[#1e222b] shrink-0">
          <div className="bg-[#1e222b] rounded-xl flex items-center px-4">
            <input 
              type="text" 
              placeholder={`Napisz na kanale #${ticketId}...`} 
              value={chatMessage} onChange={(e) => setChatMessage(e.target.value)}
              className="w-full bg-transparent border-none py-3.5 text-sm text-[#f2f3f5] focus:outline-none placeholder-[#6b7280]"
            />
            <button className="p-2 text-[#9ca3af] hover:text-white transition">
              <svg className="w-5 h-5 transform rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      </div>

      {/* PRAWA STRONA: PANEL AKCJI / SIDEBAR */}
      <div className="w-full md:w-80 flex flex-col gap-6 shrink-0">
        
        {/* Ticket Info Card */}
        <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm space-y-4">
          <h3 className="font-bold text-lg border-b border-[#1e222b] pb-2 text-white">Informacje</h3>
          
          <div className="flex flex-col gap-1">
            <span className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider">Otwierający</span>
            <div className="flex items-center gap-2 mt-1">
              <div className="w-6 h-6 rounded-full bg-[#101216] flex items-center justify-center text-xs">👨‍🔧</div>
              <span className="font-semibold text-sm">Kowal#1234</span>
            </div>
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <span className="text-xs text-[#9ca3af] font-bold uppercase tracking-wider">Kategoria Zapisu</span>
            <span className="text-sm font-medium">📂 Wsparcie Techniczne</span>
          </div>
        </div>

        {/* Labels Manager */}
        <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm flex-1">
          <h3 className="font-bold text-lg border-b border-[#1e222b] pb-2 text-white mb-4">Etykiety (Labels)</h3>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {labels.length === 0 && <span className="text-sm text-[#6b7280]">Brak przypisanych etykiet.</span>}
            {labels.map(label => (
              <div key={label} className="flex items-center gap-1.5 bg-[#1e222b] text-[#d1d5db] border border-[#2e3545] rounded-lg px-2.5 py-1 text-xs font-semibold group transition-colors hover:border-[#DA373C]/50">
                {label}
                <button onClick={() => handleRemoveLabel(label)} className="text-[#6b7280] hover:text-[#DA373C] ml-1 focus:outline-none">
                  ✕
                </button>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" placeholder="Nowa etykieta..." 
              value={newLabelInput} onChange={(e) => setNewLabelInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddLabel()}
              className="flex-1 bg-[#101216] border border-[#2e3545] rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-[#5865F2]"
            />
            <button onClick={handleAddLabel} className="bg-[#2e3545] hover:bg-[#3f4758] text-white px-3 py-2 rounded-xl text-sm font-bold transition-colors">
              +
            </button>
          </div>
        </div>

        {/* Destructive Actions */}
        <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm mt-auto border-t-4 border-t-[#DA373C]">
          <h3 className="font-bold text-lg text-white mb-4">Akcje Administracyjne</h3>
          <button 
            onClick={handleCloseTicket} disabled={isClosing}
            className="w-full bg-[#DA373C] hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-red-600/20 text-sm flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isClosing ? 'Zamykanie zgłoszenia...' : '🔒 Zamknij Ticket (Close)'}
          </button>
        </div>

      </div>

    </div>
  );
}
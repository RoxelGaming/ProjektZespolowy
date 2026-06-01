'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { useToast } from '../../../../contexts/ToastContext';

// ==========================================
// MOCK DATA (Rozbudowana makieta symulująca bazę danych)
// ==========================================
const MOCK_DB: Record<string, any> = {
  // Aktywne zgłoszenia
  '1024': { subject: 'Problem z płatnością VIP', author: 'Roxel', status: 'W trakcie', claimer: 'ArturZaton', avatar: 'https://cdn.discordapp.com/embed/avatars/0.png' },
  '1025': { subject: 'Zgłoszenie gracza za cheaty', author: 'GamerX', status: 'Oczekuje', claimer: null, avatar: 'https://cdn.discordapp.com/embed/avatars/1.png' },
  '1026': { subject: 'Pytanie o rekrutację', author: 'N00bSlayer', status: 'Oczekuje na gracza', claimer: 'Roxel', avatar: 'https://cdn.discordapp.com/embed/avatars/2.png' },
  // Zamknięte transkrypty (Archiwum)
  '0998': { subject: 'Odzyskanie hasła', author: 'Zguba', status: 'Zamknięte', claimer: 'ArturZaton', avatar: 'https://cdn.discordapp.com/embed/avatars/3.png' },
  '0999': { subject: 'Prośba o unmute', author: 'Spammer', status: 'Zamknięte', claimer: 'System', avatar: 'https://cdn.discordapp.com/embed/avatars/4.png' },
};

export default function TicketViewPage() {
  const params = useParams();
  const { addToast } = useToast();
  
  const serverId = params?.serverId as string;
  const ticketId = params?.ticketId as string;

  // Pobieranie danych konkretnego ticketa na podstawie adresu URL
  const ticketData = MOCK_DB[ticketId] || { 
    subject: 'Nieznane zgłoszenie', 
    author: 'Brak danych', 
    status: 'Zamknięte', 
    claimer: null, 
    avatar: 'https://cdn.discordapp.com/embed/avatars/0.png' 
  };

  // Stany komponentu
  const [ticketStatus, setTicketStatus] = useState(ticketData.status);
  const [claimer, setClaimer] = useState<string | null>(ticketData.claimer);
  const [closeReason, setCloseReason] = useState('');
  const [isClosing, setIsClosing] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false); // Stan dla pobierania PDF
  const [chatInput, setChatInput] = useState('');
  const [newNote, setNewNote] = useState('');
  
  const [internalNotes, setInternalNotes] = useState<{id: number, text: string, author: string}[]>([
    { id: 1, text: 'Użytkownik miał już podobne problemy w przeszłości.', author: 'System' }
  ]);

  // Synchronizacja stanu, jeśli użytkownik kliknie inny ticket bez przeładowania strony
  useEffect(() => {
    setTicketStatus(ticketData.status);
    setClaimer(ticketData.claimer);
  }, [ticketId, ticketData.status, ticketData.claimer]);

  // Generowanie dynamicznych wiadomości dla widoku
  const mockMessages = [
    {
      id: 1,
      type: 'system',
      author: 'TicketBot',
      authorAvatar: '🤖',
      timestamp: 'Dziś o 14:30',
      content: `Witaj w zgłoszeniu! Opisz dokładnie swój problem, a administracja odpowie najszybciej jak to możliwe.`,
      isEmbed: true,
    },
    {
      id: 2,
      type: 'user',
      author: ticketData.author,
      authorAvatar: ticketData.avatar,
      timestamp: 'Dziś o 14:31',
      content: ticketData.status === 'Zamknięte' ? 'Dziękuję za rozwiązanie mojego problemu. Można zamknąć.' : 'Hej, potrzebuję pomocy z moim zgłoszeniem.',
      isEmbed: false,
    }
  ];

  // ==========================================
  // FUNKCJE AKCJI
  // ==========================================
  const handleClaim = () => {
    setClaimer('Ty (Admin)');
    setTicketStatus('W trakcie');
    addToast('Zgłoszenie zostało przypisane do Ciebie.', 'success');
  };

  const handleCloseTicket = async () => {
    if (!closeReason) {
      addToast('Musisz podać powód zamknięcia zgłoszenia!', 'error');
      return;
    }
    setIsClosing(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setTicketStatus('Zamknięte');
    addToast('Zgłoszenie zostało pomyślnie zamknięte. Zapisywanie transkryptu...', 'success');
    setIsClosing(false);
  };

  const handleAddNote = () => {
    if (!newNote.trim()) return;
    setInternalNotes([...internalNotes, { id: Date.now(), text: newNote, author: 'Ty (Admin)' }]);
    setNewNote('');
    addToast('Notatka wewnętrzna dodana pomyślnie.', 'success');
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    addToast('Wiadomość wysłana do użytkownika na Discordzie.', 'success');
    setChatInput('');
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    addToast('Generowanie pliku PDF. Proszę czekać...', 'info');
    // Symulacja renderowania PDF z logów czatu
    await new Promise(resolve => setTimeout(resolve, 2500));
    addToast(`Transkrypt zgłoszenia #${ticketId} pobrano pomyślnie!`, 'success');
    setIsDownloading(false);
  };

  return (
    <div className="max-w-7xl h-[calc(100vh-8rem)] flex flex-col animate-fadeIn">
      
      {/* Przycisk powrotu i Nagłówek */}
      <div className="mb-4 shrink-0 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link 
            href={`/dashboard/${serverId}/tickets`}
            className="text-[#9ca3af] hover:text-white bg-[#101216] border border-[#1e222b] hover:border-[#2e3545] p-2 rounded-lg transition"
          >
            ← Powrót
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="text-[#9ca3af]">🎫</span> {ticketData.subject}
            </h1>
            <p className="text-[#9ca3af] text-sm">Zgłoszenie #{ticketId} • Utworzone przez {ticketData.author}</p>
          </div>
        </div>
        
        {/* Znacznik statusu */}
        <div className={`px-3 py-1.5 rounded-lg text-sm font-bold border ${
          ticketStatus === 'Zamknięte' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
          ticketStatus === 'W trakcie' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
          'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
        }`}>
          Status: {ticketStatus}
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-full overflow-hidden">
        
        {/* ========================================== */}
        {/* LEWA KOLUMNA: KLON CZATU DISCORDA          */}
        {/* ========================================== */}
        <div className="flex-1 flex flex-col bg-[#313338] border border-[#1e222b] rounded-2xl overflow-hidden shadow-lg">
          
          {/* Header Czatu */}
          <div className="bg-[#2b2d31] border-b border-[#1e222b] p-4 shadow-sm flex items-center gap-2 shrink-0">
            <span className="text-[#80848e] text-xl font-bold">#</span>
            <span className="text-white font-semibold">ticket-{ticketData.author.toLowerCase()}</span>
          </div>

          {/* Obszar Wiadomości */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar bg-[#313338]">
            
            {/* Wiadomość powitalna (Początek kanału) */}
            <div className="mt-8 mb-10">
              <div className="w-16 h-16 bg-[#5865F2] rounded-full flex items-center justify-center text-3xl mb-4">🎫</div>
              <h2 className="text-3xl font-bold text-white mb-2">Witaj na kanale zgłoszenia!</h2>
              <p className="text-[#9ca3af]">To jest początek historii zgłoszenia <strong className="text-white">{ticketData.subject}</strong>.</p>
            </div>

            {/* Renderowanie wiadomości */}
            {mockMessages.map((msg) => (
              <div key={msg.id} className="flex gap-4 group hover:bg-[#2e3035] p-2 -mx-2 rounded-lg transition-colors">
                <div className="w-10 h-10 rounded-full shrink-0 overflow-hidden bg-[#1e222b] flex items-center justify-center text-xl">
                  {msg.type === 'system' ? msg.authorAvatar : <img src={msg.authorAvatar} alt="avatar" className="w-full h-full object-cover" />}
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-2">
                    <span className="text-white font-medium hover:underline cursor-pointer">{msg.author}</span>
                    {msg.type === 'system' && <span className="bg-[#5865F2] text-white text-[10px] px-1.5 rounded font-bold uppercase tracking-wide">BOT</span>}
                    <span className="text-xs text-[#949ba4]">{msg.timestamp}</span>
                  </div>
                  
                  {msg.isEmbed ? (
                    <div className="mt-2 bg-[#2b2d31] border-l-4 border-[#5865F2] rounded-r-lg p-4 max-w-xl shadow-md">
                      <div className="text-white text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                    </div>
                  ) : (
                    <div className="text-[#dbdee1] mt-1 text-sm leading-relaxed">{msg.content}</div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pole wprowadzania wiadomości */}
          <div className="p-4 bg-[#313338] shrink-0">
            <form onSubmit={handleSendMessage} className="relative">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                disabled={ticketStatus === 'Zamknięte'}
                placeholder={ticketStatus === 'Zamknięte' ? 'Zgłoszenie jest zamknięte (Archiwum).' : `Napisz wiadomość do ${ticketData.author}...`}
                className="w-full bg-[#383a40] text-[#dbdee1] rounded-lg pl-4 pr-12 py-3 focus:outline-none focus:ring-0 placeholder-[#80848e] disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <button 
                type="submit"
                disabled={!chatInput.trim() || ticketStatus === 'Zamknięte'}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-[#9ca3af] hover:text-white disabled:opacity-50 disabled:hover:text-[#9ca3af] transition-colors"
              >
                ✉️
              </button>
            </form>
          </div>
        </div>

        {/* ========================================== */}
        {/* PRAWA KOLUMNA: PANEL INSPEKTORA (SIDEBAR)  */}
        {/* ========================================== */}
        <div className="w-full lg:w-80 shrink-0 flex flex-col gap-5 overflow-y-auto custom-scrollbar pr-2 pb-4">
          
          {/* Akcje Zgłoszenia */}
          <div className="bg-[#161920] border border-[#1e222b] rounded-xl p-5">
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider text-[#9ca3af]">Panel Kontrolny</h3>
            
            {/* Widok w zależności od statusu (Otwarte vs Zamknięte) */}
            {ticketStatus !== 'Zamknięte' ? (
              <>
                {/* Przypisywanie (Claim) - TYLKO DLA OTWARTYCH */}
                <div className="mb-4">
                  <div className="text-sm text-[#9ca3af] mb-2">Osoba przypisana:</div>
                  {claimer ? (
                    <div className="flex items-center gap-2 bg-[#1e222b] border border-[#2e3545] p-2.5 rounded-lg text-white text-sm font-bold">
                      <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-xs">{claimer.charAt(0)}</div>
                      {claimer}
                    </div>
                  ) : (
                    <button 
                      onClick={handleClaim}
                      className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded-lg text-sm transition shadow-md shadow-[#5865f2]/20"
                    >
                      🖐️ Przypisz do mnie (Claim)
                    </button>
                  )}
                </div>

                <hr className="border-[#1e222b] my-4" />

                {/* Zamykanie Zgłoszenia - TYLKO DLA OTWARTYCH */}
                <div>
                  <label className="block text-sm text-[#9ca3af] mb-2">Powód zamknięcia:</label>
                  <input 
                    type="text" 
                    value={closeReason}
                    onChange={(e) => setCloseReason(e.target.value)}
                    placeholder="np. Problem rozwiązany..."
                    className="w-full bg-[#101216] border border-[#2e3545] text-white text-sm rounded-lg px-3 py-2 mb-3 focus:outline-none focus:border-red-500 transition"
                  />
                  <button 
                    onClick={handleCloseTicket}
                    disabled={isClosing}
                    className="w-full bg-[#DA373C]/10 hover:bg-[#DA373C]/20 border border-[#DA373C]/50 text-[#DA373C] font-bold py-2 px-4 rounded-lg text-sm transition flex justify-center items-center gap-2"
                  >
                    {isClosing ? '⏳ Zamykanie...' : '🔒 Zamknij Zgłoszenie'}
                  </button>
                </div>
              </>
            ) : (
              // Widok DLA ZAMKNIĘTYCH TRANSKRYPTÓW
              <div className="flex flex-col gap-4">
                <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
                  <span className="text-red-400 font-bold text-sm flex items-center justify-center gap-2">
                    🔒 Zgłoszenie zarchiwizowane
                  </span>
                </div>
                
                {/* Nowy przycisk pobierania PDF */}
                <button 
                  onClick={handleDownloadPDF}
                  disabled={isDownloading}
                  className="w-full bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-4 rounded-xl text-sm transition border border-[#2e3545] hover:border-[#5865F2] disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                  {isDownloading ? '⏳ Generowanie pliku...' : '📥 Pobierz transkrypt (PDF)'}
                </button>
              </div>
            )}
          </div>

          {/* Wewnętrzne Notatki (Notes) */}
          <div className="bg-[#161920] border border-[#1e222b] rounded-xl p-5 flex-1 flex flex-col">
            <h3 className="text-white font-bold mb-4 uppercase text-xs tracking-wider text-[#9ca3af] flex items-center gap-2">
              📝 Notatki wewnętrzne
            </h3>
            
            <div className="flex-1 space-y-3 mb-4 overflow-y-auto max-h-60 custom-scrollbar pr-2">
              {internalNotes.map(note => (
                <div key={note.id} className="bg-yellow-500/10 border border-yellow-500/20 p-3 rounded-lg relative group">
                  <div className="text-xs font-bold text-yellow-500 mb-1">{note.author}</div>
                  <div className="text-sm text-[#d1d5db]">{note.text}</div>
                </div>
              ))}
            </div>

            {/* Dodawanie notatek dostępne nawet po zamknięciu ticketa */}
            <div className="mt-auto shrink-0">
              <textarea 
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                placeholder="Dodaj notatkę dla innych adminów..."
                className="w-full bg-[#101216] border border-[#2e3545] text-white text-sm rounded-lg px-3 py-2 min-h-[80px] resize-none focus:outline-none focus:border-yellow-500 transition mb-2"
              ></textarea>
              <button 
                onClick={handleAddNote}
                disabled={!newNote.trim()}
                className="w-full bg-[#1e222b] hover:bg-yellow-500/20 text-[#9ca3af] hover:text-yellow-500 border border-[#2e3545] hover:border-yellow-500/50 font-bold py-2 px-4 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                ➕ Dodaj notatkę
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
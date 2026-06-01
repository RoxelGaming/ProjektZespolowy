'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// ==========================================
// MOCK DATA (Przykładowe dane z bazy)
// ==========================================
const MOCK_OPEN_TICKETS = [
  { id: '1024', subject: 'Problem z płatnością VIP', author: 'Roxel', authorId: '123', claimer: 'ArturZaton', status: 'W trakcie', createdAt: '10 min temu' },
  { id: '1025', subject: 'Zgłoszenie gracza za cheaty', author: 'GamerX', authorId: '456', claimer: null, status: 'Oczekuje', createdAt: '1 godz. temu' },
  { id: '1026', subject: 'Pytanie o rekrutację', author: 'N00bSlayer', authorId: '789', claimer: 'Roxel', status: 'Oczekuje na gracza', createdAt: 'Wczoraj' },
];

const MOCK_TRANSCRIPTS = [
  { id: '0998', subject: 'Odzyskanie hasła', author: 'Zguba', closedBy: 'ArturZaton', reason: 'Rozwiązane', closedAt: '12.05.2026, 14:30' },
  { id: '0999', subject: 'Prośba o unmute', author: 'Spammer', closedBy: 'System', reason: 'Brak aktywności', closedAt: '13.05.2026, 09:15' },
];

export default function TicketsPage() {
  const params = useParams();
  const serverId = params?.serverId as string;

  // Stany dla zakładek i filtrów
  const [activeTab, setActiveTab] = useState<'open' | 'transcripts'>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [claimerFilter, setClaimerFilter] = useState('all');

  // Logika filtrowania dla otwartych ticketów
  const filteredOpenTickets = MOCK_OPEN_TICKETS.filter(ticket => {
    const matchesSearch = ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          ticket.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          ticket.id.includes(searchQuery);
    
    let matchesClaimer = true;
    if (claimerFilter === 'unassigned') matchesClaimer = ticket.claimer === null;
    if (claimerFilter === 'assigned') matchesClaimer = ticket.claimer !== null;
    if (claimerFilter === 'me') matchesClaimer = ticket.claimer === 'Roxel'; // Przykładowo, Ty to Roxel

    return matchesSearch && matchesClaimer;
  });

  // Logika filtrowania dla transkryptów
  const filteredTranscripts = MOCK_TRANSCRIPTS.filter(ticket => {
    return ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) || 
           ticket.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
           ticket.id.includes(searchQuery);
  });

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn">
      
      {/* Nagłówek */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">Zgłoszenia (Tickety)</h1>
        <p className="text-[#9ca3af] text-sm mt-1">Zarządzaj aktywnymi zgłoszeniami oraz przeglądaj archiwalne transkrypty z serwera.</p>
      </div>

      {/* System zakładek (Tabs) */}
      <div className="flex gap-6 border-b border-[#1e222b]">
        <button 
          onClick={() => setActiveTab('open')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'open' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'}`}
        >
          Aktywne Zgłoszenia
          <span className="ml-2 bg-[#5865F2] text-white text-[10px] px-2 py-0.5 rounded-full">{MOCK_OPEN_TICKETS.length}</span>
          {activeTab === 'open' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5865F2] rounded-t-md"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('transcripts')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'transcripts' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'}`}
        >
          Transkrypty (Archiwum)
          {activeTab === 'transcripts' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#5865F2] rounded-t-md"></div>}
        </button>
      </div>

      {/* Panel Filtrów (SCRUM-214) */}
      <div className="bg-[#161920] border border-[#1e222b] p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        
        {/* Wyszukiwarka tekstowa */}
        <div className="relative w-full md:w-96">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">🔍</span>
          <input 
            type="text" 
            placeholder="Szukaj po temacie, autorze lub ID..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#101216] border border-[#2e3545] text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-[#5865F2] transition"
          />
        </div>

        {/* Dropdowny filtrowania (Tylko dla aktywnych zgłoszeń) */}
        {activeTab === 'open' && (
          <div className="flex gap-3 w-full md:w-auto">
            <select 
              value={claimerFilter}
              onChange={(e) => setClaimerFilter(e.target.value)}
              className="bg-[#101216] border border-[#2e3545] text-[#9ca3af] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#5865F2] transition w-full md:w-auto cursor-pointer"
            >
              <option value="all">Wszyscy pracownicy</option>
              <option value="unassigned">Nieprzypisane</option>
              <option value="assigned">Przypisane</option>
              <option value="me">Moje zgłoszenia</option>
            </select>
            <select className="bg-[#101216] border border-[#2e3545] text-[#9ca3af] text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#5865F2] transition w-full md:w-auto cursor-pointer">
              <option value="newest">Najnowsze</option>
              <option value="oldest">Najstarsze</option>
            </select>
          </div>
        )}
      </div>

      {/* Główny kontener z tabelą */}
      <div className="bg-[#161920] border border-[#1e222b] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            
            {/* ZAKŁADKA: AKTYWNE ZGŁOSZENIA */}
            {activeTab === 'open' && (
              <>
                <thead className="bg-[#101216] border-b border-[#1e222b]">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Ticket</th>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Status</th>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Przypisano (Claim)</th>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Czas utworzenia</th>
                    <th className="px-6 py-4 font-semibold text-right text-[#9ca3af]">Akcja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e222b]/50">
                  {filteredOpenTickets.length > 0 ? (
                    filteredOpenTickets.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-[#1e222b]/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{ticket.subject}</div>
                          <div className="text-xs text-[#9ca3af]">#{ticket.id} • od: <span className="text-[#d1d5db]">{ticket.author}</span></div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                            ticket.status === 'Oczekuje' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' : 
                            ticket.status === 'W trakcie' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                            'bg-[#5865F2]/10 text-[#5865F2] border-[#5865F2]/20'
                          }`}>
                            {ticket.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {ticket.claimer ? (
                            <div className="flex items-center gap-2 text-white">
                              <div className="w-6 h-6 rounded-full bg-[#5865F2] flex items-center justify-center text-[10px] font-bold">
                                {ticket.claimer.charAt(0)}
                              </div>
                              {ticket.claimer}
                            </div>
                          ) : (
                            <span className="text-[#9ca3af] italic">Brak (Oczekuje)</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-[#9ca3af]">{ticket.createdAt}</td>
                        <td className="px-6 py-4 text-right">
                          <Link 
                            href={`/dashboard/${serverId}/tickets/${ticket.id}`}
                            className="bg-[#1e222b] hover:bg-[#5865F2] text-white hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold border border-[#2e3545] hover:border-[#5865F2] inline-block"
                          >
                            Zarządzaj ➔
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-[#9ca3af]">
                        <div className="text-3xl mb-2">📭</div>
                        Brak aktywnych zgłoszeń spełniających kryteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

            {/* ZAKŁADKA: TRANSKRYPTY */}
            {activeTab === 'transcripts' && (
              <>
                <thead className="bg-[#101216] border-b border-[#1e222b]">
                  <tr>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Ticket</th>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Powód zamknięcia</th>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Zamknięte przez</th>
                    <th className="px-6 py-4 font-semibold text-[#9ca3af]">Data zamknięcia</th>
                    <th className="px-6 py-4 font-semibold text-right text-[#9ca3af]">Akcja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e222b]/50">
                  {filteredTranscripts.length > 0 ? (
                    filteredTranscripts.map(ticket => (
                      <tr key={ticket.id} className="hover:bg-[#1e222b]/30 transition-colors">
                        <td className="px-6 py-4">
                          <div className="font-bold text-white">{ticket.subject}</div>
                          <div className="text-xs text-[#9ca3af]">#{ticket.id} • <span className="text-[#d1d5db]">{ticket.author}</span></div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-red-500/10 text-red-400 border border-red-500/20 px-2.5 py-1 rounded-md text-xs font-bold">
                            {ticket.reason}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#d1d5db]">{ticket.closedBy}</td>
                        <td className="px-6 py-4 text-[#9ca3af]">{ticket.closedAt}</td>
                        <td className="px-6 py-4 text-right">
                          <Link 
                            href={`/dashboard/${serverId}/tickets/${ticket.id}`}
                            className="bg-[#1e222b] hover:bg-[#5865F2] text-white hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold border border-[#2e3545] hover:border-[#5865F2] inline-block"
                          >
                            Otwórz transkrypt ➔
                          </Link>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-6 py-12 text-center text-[#9ca3af]">
                        <div className="text-3xl mb-2">🗄️</div>
                        Archiwum transkryptów jest puste.
                      </td>
                    </tr>
                  )}
                </tbody>
              </>
            )}

          </table>
        </div>
      </div>

    </div>
  );
}
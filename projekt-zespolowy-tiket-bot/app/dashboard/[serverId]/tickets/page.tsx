"use client"

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

type Ticket = {
  id: string;
  author: { name: string; avatar: string };
  category: string;
  date: string;
  status: 'Open' | 'Closed' | 'Pending';
  labels: string[];
};

const MOCK_LIVE_TICKETS: Ticket[] = [
  { id: 'TKT-001', author: { name: 'Kowal#1234', avatar: '👨‍🔧' }, category: 'Wsparcie Techniczne', date: '2026-06-01 14:30', status: 'Open', labels: ['High Priority'] },
  { id: 'TKT-002', author: { name: 'GamerGirl', avatar: '🎮' }, category: 'Zgłoś Gracza', date: '2026-06-01 15:45', status: 'Pending', labels: ['Oczekuje'] },
];

const MOCK_TRANSCRIPTS: Ticket[] = [
  { id: 'TKT-000', author: { name: 'StaryWyjadacz', avatar: '👴' }, category: 'Pytania', date: '2026-05-30 10:00', status: 'Closed', labels: ['Rozwiązane'] },
];

export default function TicketsListPage() {
  const params = useParams();
  const serverId = params?.serverId as string;

  const [activeTab, setActiveTab] = useState<'live' | 'transcripts'>('live');
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [showColumnsMenu, setShowColumnsMenu] = useState(false);
  
  // Stan widoczności kolumn
  const [columns, setColumns] = useState({
    id: true,
    author: true,
    category: true,
    date: true,
    status: true,
  });

  const toggleColumn = (key: keyof typeof columns) => {
    setColumns(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const currentData = activeTab === 'live' ? MOCK_LIVE_TICKETS : MOCK_TRANSCRIPTS;

  // Proste filtrowanie
  const filteredData = currentData.filter(ticket => {
    const matchesSearch = ticket.id.toLowerCase().includes(search.toLowerCase()) || ticket.author.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || ticket.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full space-y-8 pb-24 relative text-white animate-fadeIn">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Zarządzanie Zgłoszeniami</h1>
        <p className="text-[#9ca3af] mt-1">Przeglądaj, filtruj i odpowiadaj na tickety użytkowników swojego serwera.</p>
      </div>

      <div className="flex border-b border-[#1e222b]">
        <button onClick={() => setActiveTab('live')} className={`px-6 py-4 font-bold text-sm transition-all relative ${activeTab === 'live' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'}`}>
          🟢 Aktywne Tickety
          {activeTab === 'live' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#23A559] shadow-[0_0_10px_rgba(35,165,89,0.5)]"></div>}
        </button>
        <button onClick={() => setActiveTab('transcripts')} className={`px-6 py-4 font-bold text-sm transition-all relative ${activeTab === 'transcripts' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'}`}>
          🗄️ Transkrypcje (Zakończone)
          {activeTab === 'transcripts' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#5865F2] shadow-[0_0_10px_rgba(88,101,242,0.5)]"></div>}
        </button>
      </div>

      {/* PANEL FILTRÓW */}
      <div className="bg-[#161920] border border-[#1e222b] p-5 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-between shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto flex-1">
          <input 
            type="text" 
            placeholder="Szukaj po ID lub Nicku..." 
            value={search} onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:max-w-xs bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2]" 
          />
          <select 
            value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}
            className="w-full sm:max-w-xs bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-pointer"
          >
            <option value="All">Wszystkie kategorie</option>
            <option value="Wsparcie Techniczne">Wsparcie Techniczne</option>
            <option value="Zgłoś Gracza">Zgłoś Gracza</option>
            <option value="Pytania">Pytania</option>
          </select>
        </div>

        {/* Menu wyboru kolumn */}
        <div className="relative w-full md:w-auto flex justify-end">
          <button 
            onClick={() => setShowColumnsMenu(!showColumnsMenu)}
            className="bg-[#1e222b] hover:bg-[#2e3545] text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors border border-[#2e3545] flex items-center gap-2"
          >
            ⚙️ Kolumny
          </button>
          
          {showColumnsMenu && (
            <div className="absolute top-12 right-0 bg-[#161920] border border-[#1e222b] rounded-xl shadow-2xl p-3 z-20 w-48 animate-fadeIn">
              <h4 className="text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-2 px-2">Widoczność</h4>
              {Object.keys(columns).map((key) => (
                <label key={key} className="flex items-center gap-3 p-2 hover:bg-[#1e222b] rounded-lg cursor-pointer transition-colors">
                  <input 
                    type="checkbox" checked={columns[key as keyof typeof columns]} 
                    onChange={() => toggleColumn(key as keyof typeof columns)}
                    className="w-4 h-4 rounded bg-[#101216] border-[#2e3545] text-[#5865F2] focus:ring-0" 
                  />
                  <span className="text-sm font-medium capitalize text-[#d1d5db]">{key}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* DATA GRID (Tabela) */}
      <div className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden shadow-sm overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead className="bg-[#101216] text-[#9ca3af] text-xs uppercase tracking-wider font-bold">
            <tr>
              {columns.id && <th className="p-4 border-b border-[#1e222b]">Ticket ID</th>}
              {columns.author && <th className="p-4 border-b border-[#1e222b]">Otwierający</th>}
              {columns.category && <th className="p-4 border-b border-[#1e222b]">Kategoria</th>}
              {columns.date && <th className="p-4 border-b border-[#1e222b]">Data Otwarcia</th>}
              {columns.status && <th className="p-4 border-b border-[#1e222b]">Status / Etykiety</th>}
              <th className="p-4 border-b border-[#1e222b] text-right">Akcje</th>
            </tr>
          </thead>
          <tbody className="bg-[#161920]">
            {filteredData.length === 0 ? (
              <tr><td colSpan={6} className="p-8 text-center text-[#6b7280]">Brak zgłoszeń spełniających kryteria.</td></tr>
            ) : (
              filteredData.map(ticket => (
                <tr key={ticket.id} className="border-b border-[#1e222b] hover:bg-[#1e222b]/30 transition-colors group">
                  {columns.id && <td className="p-4 font-mono text-sm text-[#9ca3af] group-hover:text-white transition-colors">{ticket.id}</td>}
                  {columns.author && (
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#101216] border border-[#2e3545] flex items-center justify-center text-sm">{ticket.author.avatar}</div>
                      <span className="font-bold text-white text-sm">{ticket.author.name}</span>
                    </td>
                  )}
                  {columns.category && <td className="p-4 text-sm font-medium text-[#d1d5db]">{ticket.category}</td>}
                  {columns.date && <td className="p-4 text-sm text-[#9ca3af]">{ticket.date}</td>}
                  {columns.status && (
                    <td className="p-4">
                      <div className="flex flex-wrap gap-2">
                        {ticket.status === 'Open' && <span className="px-2 py-1 bg-[#23A559]/10 text-[#23A559] border border-[#23A559]/20 rounded-md text-xs font-bold">OPEN</span>}
                        {ticket.status === 'Closed' && <span className="px-2 py-1 bg-[#DA373C]/10 text-[#DA373C] border border-[#DA373C]/20 rounded-md text-xs font-bold">CLOSED</span>}
                        {ticket.status === 'Pending' && <span className="px-2 py-1 bg-[#FEE75C]/10 text-[#FEE75C] border border-[#FEE75C]/20 rounded-md text-xs font-bold">PENDING</span>}
                        {ticket.labels.map(l => (
                          <span key={l} className="px-2 py-1 bg-[#1e222b] text-[#d1d5db] border border-[#2e3545] rounded-md text-xs font-semibold">{l}</span>
                        ))}
                      </div>
                    </td>
                  )}
                  <td className="p-4 text-right">
                    <Link href={`/dashboard/${serverId}/tickets/${ticket.id}`} className="inline-block bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/20">
                      Podgląd (View)
                    </Link>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSettings } from '../../../contexts/SettingsContext';

const MOCK_OPEN_TICKETS = [
  { id: '1024', subject: 'Problem z płatnością VIP', author: 'Roxel', claimer: 'ArturZaton', status: 'W trakcie', createdAt: '10 min temu' },
  { id: '1025', subject: 'Zgłoszenie gracza za cheaty', author: 'GamerX', claimer: null, status: 'Oczekuje', createdAt: '1 godz. temu' },
];

const translations = {
  pl: {
    title: 'Zgłoszenia (Tickety)',
    subtitle: 'Zarządzaj aktywnymi zgłoszeniami oraz przeglądaj archiwalne transkrypty z serwera.',
    tabOpen: 'Aktywne Zgłoszenia',
    tabTranscripts: 'Transkrypty (Archiwum)',
    search: 'Szukaj po temacie, autorze lub ID...',
    allStaff: 'Wszyscy pracownicy',
    unassigned: 'Nieprzypisane',
    assigned: 'Przypisane',
    myTickets: 'Moje zgłoszenia',
    ticket: 'Ticket',
    status: 'Status',
    claimer: 'Przypisano',
    created: 'Czas utworzenia',
    action: 'Akcja',
    manage: 'Zarządzaj',
    unassignedLabel: 'Brak (Oczekuje)',
    empty: 'Brak aktywnych zgłoszeń spełniających kryteria.'
  },
  en: {
    title: 'Tickets',
    subtitle: 'Manage active tickets and browse archived transcripts from the server.',
    tabOpen: 'Active Tickets',
    tabTranscripts: 'Transcripts (Archive)',
    search: 'Search by subject, author or ID...',
    allStaff: 'All staff',
    unassigned: 'Unassigned',
    assigned: 'Assigned',
    myTickets: 'My tickets',
    ticket: 'Ticket',
    status: 'Status',
    claimer: 'Claimed by',
    created: 'Created at',
    action: 'Action',
    manage: 'Manage',
    unassignedLabel: 'None (Pending)',
    empty: 'No active tickets matching the criteria.'
  }
};

export default function TicketsPage() {
  const params = useParams();
  const serverId = params?.serverId as string;
  const { language } = useSettings();
  const t = translations[language];

  const [activeTab, setActiveTab] = useState<'open' | 'transcripts'>('open');
  const [searchQuery, setSearchQuery] = useState('');
  const [claimerFilter, setClaimerFilter] = useState('all');

  return (
    <div className="max-w-6xl space-y-6 animate-fadeIn">
      <div>
        <h1 className="text-2xl font-bold text-text-main tracking-tight">{t.title}</h1>
        <p className="text-text-muted text-sm mt-1">{t.subtitle}</p>
      </div>

      <div className="flex gap-6 border-b border-border-subtle">
        <button 
          onClick={() => setActiveTab('open')}
          className={`pb-3 text-sm font-semibold transition-colors relative ${activeTab === 'open' ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}
        >
          {t.tabOpen}
          <span className="ml-2 bg-brand-base text-white text-[10px] px-2 py-0.5 rounded-full">{MOCK_OPEN_TICKETS.length}</span>
          {activeTab === 'open' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-base rounded-t-md"></div>}
        </button>
      </div>

      <div className="bg-surface-panel border border-border-subtle p-4 rounded-xl flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder={t.search}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-base border border-border-subtle text-text-main text-sm rounded-lg px-4 py-2 focus:outline-none focus:border-brand-base transition"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <select 
            value={claimerFilter}
            onChange={(e) => setClaimerFilter(e.target.value)}
            className="bg-surface-base border border-border-subtle text-text-muted text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-brand-base transition w-full md:w-auto cursor-pointer"
          >
            <option value="all">{t.allStaff}</option>
            <option value="unassigned">{t.unassigned}</option>
            <option value="assigned">{t.assigned}</option>
            <option value="me">{t.myTickets}</option>
          </select>
        </div>
      </div>

      <div className="bg-surface-panel border border-border-subtle rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-surface-base border-b border-border-subtle">
              <tr>
                <th className="px-6 py-4 font-semibold text-text-muted">{t.ticket}</th>
                <th className="px-6 py-4 font-semibold text-text-muted">{t.status}</th>
                <th className="px-6 py-4 font-semibold text-text-muted">{t.claimer}</th>
                <th className="px-6 py-4 font-semibold text-text-muted">{t.created}</th>
                <th className="px-6 py-4 font-semibold text-right text-text-muted">{t.action}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-subtle">
              {MOCK_OPEN_TICKETS.length > 0 ? MOCK_OPEN_TICKETS.map(ticket => (
                <tr key={ticket.id} className="hover:bg-surface-base transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-text-main">{ticket.subject}</div>
                    <div className="text-xs text-text-muted">#{ticket.id} od: <span className="text-text-main">{ticket.author}</span></div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="bg-brand-base/10 text-brand-base border border-brand-base/20 px-2.5 py-1 rounded-md text-xs font-bold">
                      {ticket.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {ticket.claimer ? (
                      <div className="flex items-center gap-2 text-text-main">
                        <div className="w-6 h-6 rounded-full bg-brand-base text-white flex items-center justify-center text-[10px] font-bold">
                          {ticket.claimer.charAt(0)}
                        </div>
                        {ticket.claimer}
                      </div>
                    ) : (
                      <span className="text-text-muted italic">{t.unassignedLabel}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-text-muted">{ticket.createdAt}</td>
                  <td className="px-6 py-4 text-right">
                    <Link 
                      href={`/dashboard/${serverId}/tickets/${ticket.id}`}
                      className="bg-surface-base hover:bg-brand-base text-text-main hover:text-white transition-colors px-4 py-2 rounded-lg text-xs font-bold border border-border-subtle hover:border-brand-base inline-block"
                    >
                      {t.manage}
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-text-muted">
                    {t.empty}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
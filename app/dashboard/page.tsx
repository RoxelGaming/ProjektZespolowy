'use client';

import { useState } from 'react';
import Link from 'next/link';

// Przykładowe dane serwerów użytkownika pobrane z Discord API
const mockServers = [
  { id: '123456789', name: 'Projekt Zespołowy Dev', isManaged: true, memberCount: 15 },
  { id: '987654321', name: 'Support Community', isManaged: true, memberCount: 142 },
  { id: '555666777', name: 'GamerZone UJD', isManaged: false, memberCount: 89 },
];

export default function DashboardPage() {
  const [loading, setLoading] = useState(false);

  // Usunęliśmy funkcję getPath()!

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Nagłówek i odświeżanie */}
      <div className="flex justify-between items-center border-b border-[#1e222b] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Wybór Serwera</h1>
          <p className="text-[#9ca3af] text-sm mt-1">Wybierz serwer z autoryzacją Discord OAuth2, aby zarządzać systemem ticketów.</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="bg-[#1e222b] hover:bg-[#252a36] text-sm font-semibold px-4 py-2.5 rounded-xl transition border border-[#2e3545] text-white flex items-center gap-2"
        >
          {loading ? 'Odświeżanie...' : '🔄 Odśwież listę'}
        </button>
      </div>

      {/* Kontener Twoich Serwerów */}
      <section>
        <h2 className="text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-4">Twoje Serwery (Aktywny bot)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServers.filter(s => s.isManaged).map(server => (
            <div key={server.id} className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl hover:border-[#5865F2] transition flex flex-col justify-between h-48 group">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#1e222b] rounded-2xl flex items-center justify-center text-lg font-bold text-[#5865F2] border border-[#2e3545] group-hover:border-[#5865F2]/50 transition">
                  {server.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">{server.name}</h3>
                  <p className="text-xs text-[#6b7280] mt-1">{server.memberCount} członków zespołu</p>
                </div>
              </div>
              
              {/* Tutaj dajemy czysty link bez getPath! */}
              <Link href={`/dashboard/${server.id}`} className="w-full text-center bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/10">
                Przejdź do zarządzania
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Kontener Pozostałych Serwerów */}
      <section className="pt-4">
        <h2 className="text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-4">Pozostałe Serwery (Zaproś bota)</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockServers.filter(s => !s.isManaged).map(server => (
            <div key={server.id} className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col justify-between h-48">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 shrink-0 bg-[#1e222b] rounded-2xl flex items-center justify-center text-lg font-bold text-[#9ca3af] border border-[#2e3545]">
                  {server.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-white text-base leading-tight">{server.name}</h3>
                  <p className="text-xs text-[#6b7280] mt-1">{server.memberCount} członków</p>
                </div>
              </div>
              <button className="w-full bg-[#1e222b] hover:bg-[#252a36] text-[#9ca3af] hover:text-white font-semibold py-2.5 px-4 rounded-xl text-sm transition border border-[#2e3545]">
                Autoryzuj i zaproś bota
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
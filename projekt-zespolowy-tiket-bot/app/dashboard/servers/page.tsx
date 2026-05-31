'use client';

import { useState } from 'react';

// Przykładowe dane serwerów (w przyszłości będzie to fetch z API)
const mockServers = [
  { id: '1', name: 'Projekt Zespołowy Dev', isManaged: true, memberCount: 150 },
  { id: '2', name: 'Support Community', isManaged: true, memberCount: 4200 },
  { id: '3', name: 'GamerZone', isManaged: false, memberCount: 890 },
];

export default function ServersPage() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000); // Symulacja odświeżania
  };

  return (
    <div className="space-y-8">
      {/* Nagłówek strony */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Wybór Serwera</h1>
          <p className="text-[#9ca3af] text-sm">Wybierz serwer, którym chcesz zarządzać.</p>
        </div>
        <button 
          onClick={handleRefresh}
          className="bg-[#1e222b] hover:bg-[#2a2f3d] text-sm font-semibold px-4 py-2 rounded-xl transition border border-[#2e3545] text-white"
        >
          {loading ? 'Odświeżanie...' : '🔄 Odśwież listę'}
        </button>
      </div>

      {/* Sekcja: Twoje Serwery */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Twoje Serwery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockServers.filter(s => s.isManaged).map(server => (
            <ServerCard key={server.id} server={server} isManaged={true} />
          ))}
        </div>
      </section>

      {/* Sekcja: Pozostałe Serwery */}
      <section>
        <h2 className="text-lg font-semibold text-white mb-4">Pozostałe Serwery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockServers.filter(s => !s.isManaged).map(server => (
            <ServerCard key={server.id} server={server} isManaged={false} />
          ))}
        </div>
      </section>
    </div>
  );
}

// Komponent karty serwera
function ServerCard({ server, isManaged }: { server: any; isManaged: boolean }) {
  return (
    <div className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl hover:border-[#5865F2] transition group">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 bg-[#1e222b] rounded-full flex items-center justify-center text-xl font-bold text-[#5865F2]">
          {server.name.charAt(0)}
        </div>
        <div>
          <h3 className="font-bold text-white">{server.name}</h3>
          <p className="text-xs text-[#6b7280]">{server.memberCount} członków</p>
        </div>
      </div>
      
      {isManaged ? (
        <button className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded-lg text-sm transition">
          Zarządzaj
        </button>
      ) : (
        <button className="w-full bg-[#1e222b] hover:bg-[#2a2f3d] text-[#f2f3f5] font-semibold py-2 px-4 rounded-lg text-sm transition border border-[#2e3545]">
          Zaproś bota
        </button>
      )}
    </div>
  );
}
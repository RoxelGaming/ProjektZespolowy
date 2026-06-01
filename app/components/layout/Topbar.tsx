'use client';

import { useParams } from 'next/navigation';

// Dane testowe serwerów do dopasowania nazwy w nagłówku
const mockServers = [
  { id: '123456789', name: 'Projekt Zespołowy Dev' },
  { id: '987654321', name: 'Support Community' },
  { id: '555666777', name: 'GamerZone UJD' },
];

export default function Topbar() {
  const params = useParams();
  const serverId = params?.serverId as string;

  // Szukamy nazwy serwera na podstawie ID z adresu URL
  const currentServer = mockServers.find(s => s.id === serverId);
  const serverName = currentServer ? currentServer.name : 'Panel Zarządzania';

  return (
    <header className="h-16 bg-[#161920] border-b border-[#1e222b] flex items-center justify-center px-6 shrink-0">
      <span className="text-white font-semibold text-base tracking-wide select-none">
        {serverName}
      </span>
    </header>
  );
}
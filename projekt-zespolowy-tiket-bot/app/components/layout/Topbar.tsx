'use client';

import { useParams } from 'next/navigation';
import { useSettings } from '../../contexts/SettingsContext';

const translations = {
  pl: { defaultServerName: 'Panel Zarządzania' },
  en: { defaultServerName: 'Management Panel' }
};

const mockServers = [
  { id: '123456789', name: 'Projekt Zespołowy Dev' },
  { id: '987654321', name: 'Support Community' },
  { id: '555666777', name: 'GamerZone UJD' },
];

export default function Topbar() {
  const params = useParams();
  const serverId = params?.serverId as string;
  const { language } = useSettings();
  
  const currentServer = mockServers.find(s => s.id === serverId);
  const serverName = currentServer ? currentServer.name : translations[language].defaultServerName;

  return (
    <header className="h-16 bg-surface-panel border-b border-border-subtle flex items-center px-6 shrink-0 transition-colors duration-300">
      <span className="text-text-main font-semibold text-base tracking-wide select-none transition-colors">
        {serverName}
      </span>
    </header>
  );
}
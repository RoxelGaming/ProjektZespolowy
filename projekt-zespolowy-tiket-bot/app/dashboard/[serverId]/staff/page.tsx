'use client';

import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

const INITIAL_ROLES = [
  { id: '1', name: 'Administrator', color: '#DA373C', permissions: { viewTickets: true, claimTickets: true, closeTickets: true, deleteTranscripts: true, manageBot: true } },
  { id: '2', name: 'Support Team', color: '#5865F2', permissions: { viewTickets: true, claimTickets: true, closeTickets: true, deleteTranscripts: false, manageBot: false } },
];

const PERMISSION_LABELS: Record<string, { title: string, desc: string }> = {
  viewTickets: { title: 'Przeglądanie ticketów', desc: 'Widzi kanały zgłoszeń i archiwum.' },
  claimTickets: { title: 'Przypisywanie (Claim)', desc: 'Może przypisywać tickety do siebie.' },
  closeTickets: { title: 'Zamykanie zgłoszeń', desc: 'Może kończyć tickety i generować transkrypty.' },
  deleteTranscripts: { title: 'Usuwanie archiwum', desc: 'Może bezpowrotnie usuwać transkrypty z bazy.' },
  manageBot: { title: 'Zarządzanie panelem', desc: 'Pełen dostęp do edycji ustawień bota na tym serwerze.' },
};

const translations = {
  pl: {
    title: 'Zespoły Wsparcia',
    subtitle: 'Konfiguruj poziomy uprawnień dla poszczególnych ról administracyjnych na Twoim serwerze.',
    addRole: 'Dodaj nową rolę',
    saveRole: 'Zapisz uprawnienia',
    saving: 'Zapisywanie zmian...',
    noRoles: 'Brak dodanych ról administracyjnych.',
  },
  en: {
    title: 'Support Teams',
    subtitle: 'Configure permission levels for specific administrative roles on your server.',
    addRole: 'Add new role',
    saveRole: 'Save permissions',
    saving: 'Saving changes...',
    noRoles: 'No administrative roles added.',
  }
};

export default function StaffTeamsPage() {
  const { addToast } = useToast();
  const { language } = useSettings();
  const t = translations[language];
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [savingRoleId, setSavingRoleId] = useState<string | null>(null);

  const togglePermission = (roleId: string, permissionKey: string) => {
    setRoles(roles.map(role => role.id === roleId ? { ...role, permissions: { ...role.permissions, [permissionKey]: !role.permissions[permissionKey as keyof typeof role.permissions] } } : role));
  };

  const handleSaveRole = async (roleId: string, roleName: string) => {
    setSavingRoleId(roleId);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    addToast(`Zapisano dla: ${roleName}`, 'success');
    setSavingRoleId(null);
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-border-subtle pb-5">
        <div>
          <h1 className="text-2xl font-bold text-text-main tracking-tight">{t.title}</h1>
          <p className="text-text-muted text-sm mt-1">{t.subtitle}</p>
        </div>
        <button className="bg-brand-base hover:bg-brand-hover text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-lg flex items-center gap-2">
          ➕ {t.addRole}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-surface-panel border border-border-subtle rounded-2xl overflow-hidden flex flex-col">
            <div className="bg-surface-base border-b border-border-subtle p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full shadow-sm" style={{ backgroundColor: role.color }}></div>
                <h2 className="text-lg font-bold text-text-main">{role.name}</h2>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col gap-4">
              {Object.entries(role.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between group">
                  <div>
                    <div className="text-sm font-semibold text-text-main">{PERMISSION_LABELS[key].title}</div>
                    <div className="text-xs text-text-muted">{PERMISSION_LABELS[key].desc}</div>
                  </div>
                  <button onClick={() => togglePermission(role.id, key)} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shrink-0 ${value ? 'bg-brand-base' : 'bg-border-subtle'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${value ? 'translate-x-6' : 'translate-x-1'}`} />
                  </button>
                </div>
              ))}
            </div>
            <div className="p-4 border-t border-border-subtle bg-surface-base">
              <button onClick={() => handleSaveRole(role.id, role.name)} disabled={savingRoleId === role.id} className="w-full bg-surface-panel hover:bg-border-subtle text-text-main font-bold py-2.5 rounded-xl text-sm transition border border-border-subtle disabled:opacity-50">
                {savingRoleId === role.id ? t.saving : `💾 ${t.saveRole}`}
              </button>
            </div>
          </div>
        ))}
        {roles.length === 0 && <div className="col-span-full py-12 text-center text-text-muted">{t.noRoles}</div>}
      </div>
    </div>
  );
}
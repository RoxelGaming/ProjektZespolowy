'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';

// ==========================================
// MOCK DATA (Początkowe role i uprawnienia)
// ==========================================
const INITIAL_ROLES = [
  { 
    id: '1', 
    name: 'Administrator', 
    color: '#DA373C', 
    permissions: { viewTickets: true, claimTickets: true, closeTickets: true, deleteTranscripts: true, manageBot: true } 
  },
  { 
    id: '2', 
    name: 'Support Team', 
    color: '#5865F2', 
    permissions: { viewTickets: true, claimTickets: true, closeTickets: true, deleteTranscripts: false, manageBot: false } 
  },
  { 
    id: '3', 
    name: 'Trial Helper', 
    color: '#2ecc71', 
    permissions: { viewTickets: true, claimTickets: false, closeTickets: false, deleteTranscripts: false, manageBot: false } 
  },
];

// Słownik tłumaczący klucze uprawnień na czytelne etykiety i opisy
const PERMISSION_LABELS: Record<string, { title: string, desc: string }> = {
  viewTickets: { title: 'Przeglądanie ticketów', desc: 'Widzi kanały zgłoszeń i archiwum.' },
  claimTickets: { title: 'Przypisywanie (Claim)', desc: 'Może przypisywać tickety do siebie.' },
  closeTickets: { title: 'Zamykanie zgłoszeń', desc: 'Może kończyć tickety i generować transkrypty.' },
  deleteTranscripts: { title: 'Usuwanie archiwum', desc: 'Może bezpowrotnie usuwać transkrypty z bazy.' },
  manageBot: { title: 'Zarządzanie panelem', desc: 'Pełen dostęp do edycji ustawień bota na tym serwerze.' },
};

export default function StaffTeamsPage() {
  const params = useParams();
  const { addToast } = useToast();
  const serverId = params?.serverId as string;

  // Stany
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [savingRoleId, setSavingRoleId] = useState<string | null>(null);

  // ==========================================
  // FUNKCJE AKCJI
  // ==========================================

  // Funkcja przełączania uprawnień dla konkretnej roli
  const togglePermission = (roleId: string, permissionKey: string) => {
    setRoles(roles.map(role => {
      if (role.id === roleId) {
        return {
          ...role,
          permissions: {
            ...role.permissions,
            [permissionKey]: !role.permissions[permissionKey as keyof typeof role.permissions]
          }
        };
      }
      return role;
    }));
  };

  // Zapisywanie uprawnień do bazy (Symulacja)
  const handleSaveRole = async (roleId: string, roleName: string) => {
    setSavingRoleId(roleId);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Symulacja opóźnienia API
    addToast(`Zapisano nowe uprawnienia dla roli: ${roleName}`, 'success');
    setSavingRoleId(null);
  };

  // Dodawanie nowej roli
  const handleAddRole = () => {
    // Prosty prompt na potrzeby makiety (docelowo można tu zrobić Modal pobierający role z Discord API)
    const roleName = window.prompt('Wpisz nazwę nowej roli (np. Moderator):');
    if (roleName && roleName.trim() !== '') {
      const newRole = {
        id: Date.now().toString(),
        name: roleName,
        color: '#9ca3af',
        permissions: { viewTickets: true, claimTickets: false, closeTickets: false, deleteTranscripts: false, manageBot: false }
      };
      setRoles([...roles, newRole]);
      addToast('Nowa rola została dodana do listy.', 'success');
    }
  };

  // Usuwanie roli z panelu
  const handleRemoveRole = (roleId: string) => {
    if (window.confirm('Czy na pewno chcesz usunąć tę rolę z konfiguracji Ticket Bota? (Nie usunie to roli na Discordzie)')) {
      setRoles(roles.filter(r => r.id !== roleId));
      addToast('Rola usunięta z konfiguracji w panelu.', 'info');
    }
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn">
      
      {/* Nagłówek i przycisk akcji */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1e222b] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Zespoły Wsparcia (Staff Teams)</h1>
          <p className="text-[#9ca3af] text-sm mt-1">Konfiguruj poziomy uprawnień dla poszczególnych ról administracyjnych na Twoim serwerze.</p>
        </div>
        <button 
          onClick={handleAddRole}
          className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/20 flex items-center gap-2 whitespace-nowrap"
        >
          ➕ Dodaj nową rolę
        </button>
      </div>

      {/* Siatka z rolami */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {roles.map((role) => (
          <div key={role.id} className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden flex flex-col">
            
            {/* Header karty roli */}
            <div className="bg-[#101216] border-b border-[#1e222b] p-5 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full shadow-sm" 
                  style={{ backgroundColor: role.color }}
                ></div>
                <h2 className="text-lg font-bold text-white">{role.name}</h2>
                <span className="text-xs font-medium text-[#9ca3af] bg-[#1e222b] px-2 py-0.5 rounded-md">
                  ID: {role.id.length > 5 ? '...' + role.id.slice(-4) : role.id}
                </span>
              </div>
              
              <button 
                onClick={() => handleRemoveRole(role.id)}
                className="text-[#9ca3af] hover:text-[#DA373C] transition-colors p-1"
                title="Usuń rolę z panelu"
              >
                ✖
              </button>
            </div>

            {/* Lista przełączników (Toggles) uprawnień */}
            <div className="p-5 flex-1 flex flex-col gap-4">
              {Object.entries(role.permissions).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between group">
                  <div>
                    <div className="text-sm font-semibold text-white group-hover:text-[#d1d5db] transition-colors">
                      {PERMISSION_LABELS[key].title}
                    </div>
                    <div className="text-xs text-[#6b7280]">
                      {PERMISSION_LABELS[key].desc}
                    </div>
                  </div>

                  {/* Customowy przełącznik (Toggle Switch) */}
                  <button
                    onClick={() => togglePermission(role.id, key)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none shrink-0 ${
                      value ? 'bg-[#5865F2]' : 'bg-[#2e3545] hover:bg-[#3b4455]'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        value ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>

            {/* Dolny pasek z przyciskiem zapisu */}
            <div className="p-4 border-t border-[#1e222b] bg-[#1a1d24]">
              <button
                onClick={() => handleSaveRole(role.id, role.name)}
                disabled={savingRoleId === role.id}
                className="w-full bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-2.5 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {savingRoleId === role.id ? '⏳ Zapisywanie zmian...' : '💾 Zapisz uprawnienia'}
              </button>
            </div>
            
          </div>
        ))}

        {roles.length === 0 && (
          <div className="col-span-full py-12 text-center text-[#9ca3af] bg-[#161920] border border-[#1e222b] border-dashed rounded-2xl">
            <div className="text-4xl mb-3">👥</div>
            <p className="font-semibold">Brak dodanych ról administracyjnych.</p>
            <p className="text-sm mt-1">Kliknij "Dodaj nową rolę", aby rozpocząć konfigurację zespołu.</p>
          </div>
        )}
      </div>

    </div>
  );
}
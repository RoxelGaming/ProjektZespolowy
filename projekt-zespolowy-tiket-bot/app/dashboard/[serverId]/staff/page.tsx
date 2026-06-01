'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

// ==========================================
// MOCK DATA (Początkowe role i uprawnienia)
// ==========================================
const INITIAL_ROLES = [
  { 
    id: '222222222222222222', 
    name: 'Administrator', 
    color: '#DA373C', 
    permissions: { viewTickets: true, claimTickets: true, closeTickets: true, deleteTranscripts: true, manageBot: true } 
  },
  { 
    id: '444444444444444444', 
    name: 'Support Team', 
    color: '#5865F2', 
    permissions: { viewTickets: true, claimTickets: true, closeTickets: true, deleteTranscripts: false, manageBot: false } 
  },
  { 
    id: '555555555555555555', 
    name: 'Trial Helper', 
    color: '#2ecc71', 
    permissions: { viewTickets: true, claimTickets: false, closeTickets: false, deleteTranscripts: false, manageBot: false } 
  },
];

// Symulacja ról pobranych z API Discorda dla tego serwera
const MOCK_DISCORD_ROLES = [
  { id: '111111111111111111', name: 'Właściciel', color: '#FFD700' },
  { id: '222222222222222222', name: 'Administrator', color: '#DA373C' },
  { id: '333333333333333333', name: 'Moderator', color: '#E67E22' },
  { id: '444444444444444444', name: 'Support Team', color: '#5865F2' },
  { id: '555555555555555555', name: 'Trial Helper', color: '#2ecc71' },
  { id: '666666666666666666', name: 'VIP', color: '#9B59B6' },
  { id: '777777777777777777', name: 'Gracz', color: '#95A5A6' },
];

export default function StaffTeamsPage() {
  const params = useParams();
  const { addToast } = useToast();
  const { language } = useSettings(); // Pobieranie aktualnego języka
  const serverId = params?.serverId as string;

  // Stany ról
  const [roles, setRoles] = useState(INITIAL_ROLES);
  const [savingRoleId, setSavingRoleId] = useState<string | null>(null);

  // Stany modali (Okienek dialogowych)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState<string | null>(null);

  // Stany dla wyszukiwarki ról w modalu
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDiscordRole, setSelectedDiscordRole] = useState<{id: string, name: string, color: string} | null>(null);

  // ==========================================
  // SŁOWNIK TŁUMACZEŃ (PL / EN)
  // ==========================================
  const t = {
    title: language === 'pl' ? 'Zespoły Wsparcia (Staff Teams)' : 'Staff Teams',
    subtitle: language === 'pl' ? 'Konfiguruj poziomy uprawnień dla poszczególnych ról administracyjnych na Twoim serwerze.' : 'Configure permission levels for individual administrative roles on your server.',
    addRoleBtn: language === 'pl' ? '➕ Dodaj rolę z serwera' : '➕ Add server role',
    removeRoleTitle: language === 'pl' ? 'Usuń rolę z panelu' : 'Remove role from panel',
    savingBtn: language === 'pl' ? '⏳ Zapisywanie zmian...' : '⏳ Saving changes...',
    saveBtn: language === 'pl' ? '💾 Zapisz uprawnienia' : '💾 Save permissions',
    emptyTitle: language === 'pl' ? 'Brak dodanych ról administracyjnych.' : 'No administrative roles added.',
    emptyDesc: language === 'pl' ? 'Kliknij "Dodaj rolę z serwera", aby rozpocząć konfigurację zespołu.' : 'Click "Add server role" to start configuring the team.',
    promptNewRole: language === 'pl' ? 'Wyszukaj rolę z Discorda lub podaj jej ID:' : 'Search for a Discord role or enter its ID:',
    confirmRemove: language === 'pl' ? 'Czy na pewno chcesz usunąć tę rolę z konfiguracji Ticket Bota? (Nie usunie to roli na Discordzie)' : 'Are you sure you want to remove this role from the Ticket Bot configuration? (This will not remove the role on Discord)',
    toastSaveSuccess: language === 'pl' ? 'Zapisano nowe uprawnienia dla roli: ' : 'Saved new permissions for role: ',
    toastAddSuccess: language === 'pl' ? 'Rola została dodana do konfiguracji.' : 'Role has been added to configuration.',
    toastRemoveInfo: language === 'pl' ? 'Rola usunięta z konfiguracji w panelu.' : 'Role removed from panel configuration.',
    toastAlreadyAdded: language === 'pl' ? 'Ta rola jest już dodana do panelu!' : 'This role is already added to the panel!',
    
    // Teksty dla Modali
    modalTitleAdd: language === 'pl' ? 'Dodaj rolę administracyjną' : 'Add administrative role',
    modalTitleDelete: language === 'pl' ? 'Usuń rolę' : 'Delete role',
    cancelBtn: language === 'pl' ? 'Anuluj' : 'Cancel',
    confirmAddBtn: language === 'pl' ? 'Dodaj rolę' : 'Add role',
    confirmDeleteBtn: language === 'pl' ? 'Tak, usuń' : 'Yes, delete',
    searchRolePlh: language === 'pl' ? 'Wpisz nazwę lub ID roli...' : 'Enter role name or ID...',
    noRolesFound: language === 'pl' ? 'Nie znaleziono ról.' : 'No roles found.',
    customIdLabel: language === 'pl' ? 'Dodaj jako niestandardowe ID:' : 'Add as custom ID:',
  };

  // Dynamiczny słownik tłumaczący klucze uprawnień
  const PERMISSION_LABELS: Record<string, { title: string, desc: string }> = {
    viewTickets: { 
      title: language === 'pl' ? 'Przeglądanie ticketów' : 'View tickets', 
      desc: language === 'pl' ? 'Widzi kanały zgłoszeń i archiwum.' : 'Can see ticket channels and archive.' 
    },
    claimTickets: { 
      title: language === 'pl' ? 'Przypisywanie (Claim)' : 'Claiming tickets', 
      desc: language === 'pl' ? 'Może przypisywać tickety do siebie.' : 'Can assign tickets to themselves.' 
    },
    closeTickets: { 
      title: language === 'pl' ? 'Zamykanie zgłoszeń' : 'Close tickets', 
      desc: language === 'pl' ? 'Może kończyć tickety i generować transkrypty.' : 'Can close tickets and generate transcripts.' 
    },
    deleteTranscripts: { 
      title: language === 'pl' ? 'Usuwanie archiwum' : 'Delete transcripts', 
      desc: language === 'pl' ? 'Może bezpowrotnie usuwać transkrypty z bazy.' : 'Can permanently delete transcripts from the database.' 
    },
    manageBot: { 
      title: language === 'pl' ? 'Zarządzanie panelem' : 'Manage panel', 
      desc: language === 'pl' ? 'Pełen dostęp do edycji ustawień bota na tym serwerze.' : 'Full access to edit bot settings on this server.' 
    },
  };

  // Logika filtrowania ról do modala
  const filteredDiscordRoles = MOCK_DISCORD_ROLES.filter(r => 
    r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    r.id.includes(searchQuery)
  );

  // Rozpoznawanie, czy wpisano customowe ID Discorda (zazwyczaj 17-20 cyfr), którego nie ma na liście
  const isCustomId = /^\d{17,20}$/.test(searchQuery.trim()) && filteredDiscordRoles.length === 0;

  // ==========================================
  // FUNKCJE AKCJI
  // ==========================================

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

  const handleSaveRole = async (roleId: string, roleName: string) => {
    setSavingRoleId(roleId);
    await new Promise(resolve => setTimeout(resolve, 1500)); 
    addToast(`${t.toastSaveSuccess}${roleName}`, 'success');
    setSavingRoleId(null);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
    setSearchQuery('');
    setSelectedDiscordRole(null);
  };

  const handleConfirmAddRole = () => {
    if (selectedDiscordRole) {
      if (roles.some(r => r.id === selectedDiscordRole.id)) {
        addToast(t.toastAlreadyAdded, 'warning');
        return;
      }
      const newRole = {
        id: selectedDiscordRole.id,
        name: selectedDiscordRole.name,
        color: selectedDiscordRole.color,
        permissions: { viewTickets: true, claimTickets: false, closeTickets: false, deleteTranscripts: false, manageBot: false }
      };
      setRoles([...roles, newRole]);
      addToast(t.toastAddSuccess, 'success');
      closeAddModal();

    } else if (isCustomId) {
      if (roles.some(r => r.id === searchQuery.trim())) {
        addToast(t.toastAlreadyAdded, 'warning');
        return;
      }
      const newRole = {
        id: searchQuery.trim(),
        name: `Rola (${searchQuery.trim()})`,
        color: '#9ca3af',
        permissions: { viewTickets: true, claimTickets: false, closeTickets: false, deleteTranscripts: false, manageBot: false }
      };
      setRoles([...roles, newRole]);
      addToast(t.toastAddSuccess, 'success');
      closeAddModal();
    }
  };

  const handleConfirmRemoveRole = () => {
    if (roleToDelete) {
      setRoles(roles.filter(r => r.id !== roleToDelete));
      addToast(t.toastRemoveInfo, 'info');
      setRoleToDelete(null);
    }
  };

  return (
    <div className="max-w-5xl space-y-8 animate-fadeIn relative">
      
      {/* Nagłówek i przycisk akcji */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#1e222b] pb-5">
        <div>
          <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
          <p className="text-[#9ca3af] text-sm mt-1">{t.subtitle}</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 px-4 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/20 flex items-center gap-2 whitespace-nowrap"
        >
          {t.addRoleBtn}
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
                  ID: {role.id.length > 8 ? '...' + role.id.slice(-6) : role.id}
                </span>
              </div>
              
              <button 
                onClick={() => setRoleToDelete(role.id)}
                className="text-[#9ca3af] hover:text-[#DA373C] transition-colors p-1"
                title={t.removeRoleTitle}
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
                {savingRoleId === role.id ? t.savingBtn : t.saveBtn}
              </button>
            </div>
            
          </div>
        ))}

        {roles.length === 0 && (
          <div className="col-span-full py-12 text-center text-[#9ca3af] bg-[#161920] border border-[#1e222b] border-dashed rounded-2xl">
            <div className="text-4xl mb-3">👥</div>
            <p className="font-semibold">{t.emptyTitle}</p>
            <p className="text-sm mt-1">{t.emptyDesc}</p>
          </div>
        )}
      </div>

      {/* MODAL: WYSZUKIWANIE I DODAWANIE ROLI */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#161920] border border-[#1e222b] rounded-2xl w-full max-w-md p-6 shadow-2xl flex flex-col max-h-[90vh]">
            <h2 className="text-xl font-bold text-white mb-2">{t.modalTitleAdd}</h2>
            <p className="text-[#9ca3af] text-sm mb-5">{t.promptNewRole}</p>
            
            <div className="relative mb-6 flex flex-col overflow-hidden">
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedDiscordRole(null);
                }}
                placeholder={t.searchRolePlh}
                className="w-full bg-[#101216] border border-[#1e222b] rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#5865F2] transition-colors shrink-0"
                autoFocus
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && (selectedDiscordRole || isCustomId)) handleConfirmAddRole();
                  if (e.key === 'Escape') closeAddModal();
                }}
              />
              
              {/* Lista wyników filtrowania */}
              <div className="mt-3 overflow-y-auto custom-scrollbar bg-[#101216] border border-[#1e222b] rounded-xl flex flex-col p-1 gap-1 shrink-0 max-h-48">
                {filteredDiscordRoles.length > 0 ? (
                  filteredDiscordRoles.map(role => (
                    <button
                      key={role.id}
                      onClick={() => {
                        setSelectedDiscordRole(role);
                        setSearchQuery(role.name);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-colors ${
                        selectedDiscordRole?.id === role.id 
                        ? 'bg-[#5865F2]/20 border border-[#5865F2]/50' 
                        : 'hover:bg-[#1e222b] border border-transparent'
                      }`}
                    >
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: role.color }}></div>
                      <span className="font-semibold text-white text-sm truncate">{role.name}</span>
                      <span className="text-xs text-[#6b7280] ml-auto shrink-0">{role.id}</span>
                    </button>
                  ))
                ) : isCustomId ? (
                  <div className="flex items-center gap-3 px-3 py-3 rounded-lg text-left bg-[#5865F2]/10 border border-[#5865F2]/30">
                    <span className="text-[#9ca3af] text-sm">{t.customIdLabel}</span>
                    <span className="font-mono text-white text-sm font-bold">{searchQuery.trim()}</span>
                  </div>
                ) : (
                  <div className="px-3 py-6 text-center text-sm text-[#6b7280]">
                    {t.noRolesFound}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-auto shrink-0">
              <button 
                onClick={closeAddModal}
                className="px-4 py-2 rounded-xl text-sm font-medium text-[#9ca3af] hover:text-white hover:bg-[#1e222b] transition-colors"
              >
                {t.cancelBtn}
              </button>
              <button 
                onClick={handleConfirmAddRole}
                disabled={!selectedDiscordRole && !isCustomId}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#5865F2] hover:bg-[#4752C4] disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-lg shadow-[#5865f2]/20"
              >
                {t.confirmAddBtn}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: POTWIERDZENIE USUNIĘCIA */}
      {roleToDelete !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
          <div className="bg-[#161920] border border-[#1e222b] rounded-2xl w-full max-w-md p-6 shadow-2xl">
            <h2 className="text-xl font-bold text-white mb-2">{t.modalTitleDelete}</h2>
            <p className="text-[#9ca3af] text-sm mb-6 leading-relaxed">{t.confirmRemove}</p>

            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setRoleToDelete(null)}
                className="px-4 py-2 rounded-xl text-sm font-medium text-[#9ca3af] hover:text-white hover:bg-[#1e222b] transition-colors"
              >
                {t.cancelBtn}
              </button>
              <button 
                onClick={handleConfirmRemoveRole}
                className="px-4 py-2 rounded-xl text-sm font-bold text-white bg-[#DA373C] hover:bg-[#b02c30] transition-colors shadow-lg shadow-[#DA373C]/20"
              >
                {t.confirmDeleteBtn}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

// ==========================================
// MOCK DATA (Początkowe dane czarnej listy)
// ==========================================
const MOCK_BLOCKED_USERS = [
  { id: '8523910245', username: 'SpammerBoy', reason: 'Wysyłanie linków do scamów', blockedAt: '12.05.2026', blockedBy: 'ArturZaton' },
  { id: '9123849123', username: 'TrollFace', reason: 'Obrażanie administracji', blockedAt: '10.05.2026', blockedBy: 'System' },
];

const MOCK_BLOCKED_ROLES = [
  { id: '11223344', name: 'Muted', color: '#718096', reason: 'Rola wyciszonych nie może otwierać ticketów', blockedAt: '01.05.2026', blockedBy: 'Roxel' },
];

export default function BlacklistPage() {
  const params = useParams();
  const { addToast } = useToast();
  const { language } = useSettings(); // Pobieranie aktualnego języka
  const serverId = params?.serverId as string;

  // Stany list
  const [blockedUsers, setBlockedUsers] = useState(MOCK_BLOCKED_USERS);
  const [blockedRoles, setBlockedRoles] = useState(MOCK_BLOCKED_ROLES);

  // Stany formularzy dodawania
  const [newUserId, setNewUserId] = useState('');
  const [newUserReason, setNewUserReason] = useState('');
  const [newRoleId, setNewRoleId] = useState('');
  const [newRoleReason, setNewRoleReason] = useState('');

  // Stany dla Okna Modalnego (Zdejmowanie blokady)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToUnblock, setItemToUnblock] = useState<{ id: string, type: 'user' | 'role', name: string } | null>(null);

  // ==========================================
  // SŁOWNIK TŁUMACZEŃ (PL / EN)
  // ==========================================
  const t = {
    title: language === 'pl' ? 'Czarna Lista (Blacklist)' : 'Blacklist',
    subtitle: language === 'pl' 
      ? 'Zarządzaj użytkownikami i rolami, którzy mają całkowity zakaz tworzenia nowych zgłoszeń na Twoim serwerze.' 
      : 'Manage users and roles that are strictly forbidden from creating new tickets on your server.',
    blockedUsersTitle: language === 'pl' ? 'Zablokowani Użytkownicy' : 'Blocked Users',
    blockedRolesTitle: language === 'pl' ? 'Zablokowane Role' : 'Blocked Roles',
    
    // Użytkownicy
    userIdPlh: language === 'pl' ? 'ID Użytkownika (np. 123456789)' : 'User ID (e.g. 123456789)',
    blockBtn: language === 'pl' ? 'Zablokuj' : 'Block',
    userReasonPlh: language === 'pl' ? 'Opcjonalny powód blokady...' : 'Optional ban reason...',
    unblockBtn: language === 'pl' ? 'Odblokuj' : 'Unblock',
    blockedByPrefix: language === 'pl' ? 'Zablokowany:' : 'Blocked:',
    byPrefix: language === 'pl' ? 'przez' : 'by',
    emptyUsers: language === 'pl' ? 'Brak zablokowanych użytkowników' : 'No blocked users',
    unknownUser: language === 'pl' ? 'Nieznany Użytkownik' : 'Unknown User',
    noReason: language === 'pl' ? 'Brak podanego powodu' : 'No reason provided',
    youAdmin: language === 'pl' ? 'Ty (Admin)' : 'You (Admin)',
    
    // Role
    roleIdPlh: language === 'pl' ? 'ID Roli Discord (np. 9988776655)' : 'Discord Role ID (e.g. 9988776655)',
    roleReasonPlh: language === 'pl' ? 'Opcjonalny powód blokady roli...' : 'Optional role ban reason...',
    blockedRolePrefix: language === 'pl' ? 'Zablokowano:' : 'Blocked:',
    emptyRoles: language === 'pl' ? 'Brak zablokowanych ról' : 'No blocked roles',
    roleLabel: language === 'pl' ? 'Rola' : 'Role',

    // Modal
    modalTitle: language === 'pl' ? 'Potwierdź odblokowanie' : 'Confirm Unblock',
    modalDescStart: language === 'pl' ? 'Czy na pewno chcesz zdjąć blokadę dla' : 'Are you sure you want to lift the ban for',
    modalUser: language === 'pl' ? 'użytkownika' : 'user',
    modalRole: language === 'pl' ? 'roli' : 'role',
    modalDescEnd: language === 'pl' 
      ? 'Będą oni mogli ponownie tworzyć nowe tickety na serwerze.' 
      : 'They will be able to create new tickets on the server again.',
    cancelBtn: language === 'pl' ? 'Anuluj' : 'Cancel',
    confirmUnblockBtn: language === 'pl' ? 'Tak, odblokuj' : 'Yes, unblock',

    // Toasty
    toastUserBlocked: language === 'pl' ? 'Użytkownik został zablokowany i nie może już tworzyć zgłoszeń.' : 'The user has been blocked and can no longer create tickets.',
    toastRoleBlocked: language === 'pl' ? 'Rola została dodana do czarnej listy.' : 'The role has been added to the blacklist.',
    toastUnblockedSucc: language === 'pl' ? 'została pomyślnie usunięta.' : 'has been successfully removed.',
    toastBanFor: language === 'pl' ? 'Blokada dla' : 'Ban for'
  };

  // ==========================================
  // FUNKCJE AKCJI
  // ==========================================
  
  // Dodawanie użytkownika do czarnej listy
  const handleBlockUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserId.trim()) return;
    
    const newUser = {
      id: newUserId,
      username: t.unknownUser, // W prawdziwej apce bot pobrałby nick z Discord API
      reason: newUserReason || t.noReason,
      blockedAt: new Date().toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US'),
      blockedBy: t.youAdmin
    };

    setBlockedUsers([newUser, ...blockedUsers]);
    setNewUserId('');
    setNewUserReason('');
    addToast(t.toastUserBlocked, 'success');
  };

  // Dodawanie roli do czarnej listy
  const handleBlockRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleId.trim()) return;
    
    const newRole = {
      id: newRoleId,
      name: `${t.roleLabel} (${newRoleId})`, // W prawdziwej apce bot pobrałby nazwę roli z Discord API
      color: '#9ca3af',
      reason: newRoleReason || t.noReason,
      blockedAt: new Date().toLocaleDateString(language === 'pl' ? 'pl-PL' : 'en-US'),
      blockedBy: t.youAdmin
    };

    setBlockedRoles([newRole, ...blockedRoles]);
    setNewRoleId('');
    setNewRoleReason('');
    addToast(t.toastRoleBlocked, 'success');
  };

  // Otwieranie modalu potwierdzenia
  const requestUnblock = (id: string, type: 'user' | 'role', name: string) => {
    setItemToUnblock({ id, type, name });
    setIsModalOpen(true);
  };

  // Potwierdzenie i zdjęcie blokady
  const confirmUnblock = () => {
    if (!itemToUnblock) return;
    
    if (itemToUnblock.type === 'user') {
      setBlockedUsers(blockedUsers.filter(u => u.id !== itemToUnblock.id));
    } else {
      setBlockedRoles(blockedRoles.filter(r => r.id !== itemToUnblock.id));
    }
    
    addToast(`${t.toastBanFor} ${itemToUnblock.name} ${t.toastUnblockedSucc}`, 'success');
    setIsModalOpen(false);
    setItemToUnblock(null);
  };

  // Prosty tłumacz dla powodów z "bazy danych" (MOCK)
  const translateReason = (reason: string) => {
    if (language === 'pl') return reason;
    if (reason === 'Wysyłanie linków do scamów') return 'Sending scam links';
    if (reason === 'Obrażanie administracji') return 'Insulting administration';
    if (reason === 'Rola wyciszonych nie może otwierać ticketów') return 'Muted role cannot open tickets';
    return reason;
  }

  return (
    <div className="max-w-6xl space-y-8 animate-fadeIn relative">
      
      {/* Nagłówek */}
      <div className="border-b border-[#1e222b] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-[#DA373C]">⛔</span> {t.title}
        </h1>
        <p className="text-[#9ca3af] text-sm mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* ========================================== */}
        {/* SEKCJA: ZABLOKOWANI UŻYTKOWNICY            */}
        {/* ========================================== */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            👤 {t.blockedUsersTitle} ({blockedUsers.length})
          </h2>
          
          {/* Formularz blokowania */}
          <form onSubmit={handleBlockUser} className="bg-[#161920] border border-[#1e222b] rounded-xl p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder={t.userIdPlh}
                value={newUserId}
                onChange={(e) => setNewUserId(e.target.value)}
                className="flex-1 bg-[#101216] border border-[#2e3545] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#DA373C] transition"
              />
              <button 
                type="submit"
                disabled={!newUserId.trim()}
                className="bg-[#1e222b] hover:bg-[#DA373C]/20 border border-[#2e3545] hover:border-[#DA373C]/50 text-[#9ca3af] hover:text-[#DA373C] font-bold py-2 px-4 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                🔒 {t.blockBtn}
              </button>
            </div>
            <input 
              type="text" 
              placeholder={t.userReasonPlh}
              value={newUserReason}
              onChange={(e) => setNewUserReason(e.target.value)}
              className="w-full bg-[#101216] border border-[#2e3545] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#5865F2] transition"
            />
          </form>

          {/* Lista zablokowanych użytkowników */}
          <div className="bg-[#161920] border border-[#1e222b] rounded-xl overflow-hidden">
            {blockedUsers.length > 0 ? (
              <div className="divide-y divide-[#1e222b]">
                {blockedUsers.map(user => (
                  <div key={user.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1e222b]/30 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{user.username}</span>
                        <span className="text-xs text-[#9ca3af] bg-[#101216] px-1.5 py-0.5 rounded border border-[#2e3545]">{user.id}</span>
                      </div>
                      <div className="text-sm text-[#DA373C] mt-1 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {translateReason(user.reason)}
                      </div>
                      <div className="text-xs text-[#6b7280] mt-1">
                        {t.blockedByPrefix} {user.blockedAt} {t.byPrefix} {user.blockedBy}
                      </div>
                    </div>
                    <button 
                      onClick={() => requestUnblock(user.id, 'user', user.username)}
                      className="shrink-0 bg-[#1e222b] hover:bg-[#252a36] text-white font-medium py-1.5 px-3 rounded-lg text-xs transition border border-[#2e3545]"
                    >
                      {t.unblockBtn}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-[#9ca3af]">
                {t.emptyUsers}
              </div>
            )}
          </div>
        </section>

        {/* ========================================== */}
        {/* SEKCJA: ZABLOKOWANE ROLE                   */}
        {/* ========================================== */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            🛡️ {t.blockedRolesTitle} ({blockedRoles.length})
          </h2>
          
          {/* Formularz blokowania */}
          <form onSubmit={handleBlockRole} className="bg-[#161920] border border-[#1e222b] rounded-xl p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <input 
                type="text" 
                placeholder={t.roleIdPlh}
                value={newRoleId}
                onChange={(e) => setNewRoleId(e.target.value)}
                className="flex-1 bg-[#101216] border border-[#2e3545] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#DA373C] transition"
              />
              <button 
                type="submit"
                disabled={!newRoleId.trim()}
                className="bg-[#1e222b] hover:bg-[#DA373C]/20 border border-[#2e3545] hover:border-[#DA373C]/50 text-[#9ca3af] hover:text-[#DA373C] font-bold py-2 px-4 rounded-lg text-sm transition disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                🔒 {t.blockBtn}
              </button>
            </div>
            <input 
              type="text" 
              placeholder={t.roleReasonPlh}
              value={newRoleReason}
              onChange={(e) => setNewRoleReason(e.target.value)}
              className="w-full bg-[#101216] border border-[#2e3545] text-white text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-[#5865F2] transition"
            />
          </form>

          {/* Lista zablokowanych ról */}
          <div className="bg-[#161920] border border-[#1e222b] rounded-xl overflow-hidden">
            {blockedRoles.length > 0 ? (
              <div className="divide-y divide-[#1e222b]">
                {blockedRoles.map(role => (
                  <div key={role.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#1e222b]/30 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
                        <span className="font-bold text-white">{role.name}</span>
                        <span className="text-xs text-[#9ca3af] bg-[#101216] px-1.5 py-0.5 rounded border border-[#2e3545]">{role.id}</span>
                      </div>
                      <div className="text-sm text-[#DA373C] mt-1 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {translateReason(role.reason)}
                      </div>
                      <div className="text-xs text-[#6b7280] mt-1">
                        {t.blockedRolePrefix} {role.blockedAt} {t.byPrefix} {role.blockedBy}
                      </div>
                    </div>
                    <button 
                      onClick={() => requestUnblock(role.id, 'role', role.name)}
                      className="shrink-0 bg-[#1e222b] hover:bg-[#252a36] text-white font-medium py-1.5 px-3 rounded-lg text-xs transition border border-[#2e3545]"
                    >
                      {t.unblockBtn}
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-[#9ca3af]">
                {t.emptyRoles}
              </div>
            )}
          </div>
        </section>

      </div>

      {/* ========================================== */}
      {/* OKNO MODALNE (Zabezpieczenie odblokowania) */}
      {/* ========================================== */}
      {isModalOpen && itemToUnblock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 w-full max-w-md shadow-2xl shadow-black/50 transform transition-all scale-100">
            
            <div className="w-14 h-14 rounded-full bg-[#DA373C]/10 flex items-center justify-center mx-auto mb-4 border border-[#DA373C]/20">
              <span className="text-2xl">⚠️</span>
            </div>
            
            <h3 className="text-xl font-bold text-white text-center mb-2">{t.modalTitle}</h3>
            <p className="text-center text-[#9ca3af] mb-6">
              {t.modalDescStart} {itemToUnblock.type === 'user' ? t.modalUser : t.modalRole} <strong className="text-white">{itemToUnblock.name}</strong>? 
              <br/><br/>
              {t.modalDescEnd}
            </p>
            
            <div className="flex gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="flex-1 bg-[#1e222b] hover:bg-[#252a36] text-white font-medium py-2.5 rounded-xl transition border border-[#2e3545]"
              >
                {t.cancelBtn}
              </button>
              <button 
                onClick={confirmUnblock}
                className="flex-1 bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 rounded-xl transition shadow-lg shadow-[#5865f2]/20"
              >
                {t.confirmUnblockBtn}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
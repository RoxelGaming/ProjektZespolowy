'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

const MOCK_BLOCKED_USERS = [
  { id: '8523910245', username: 'SpammerBoy', reason: 'Wysyłanie linków do scamów', blockedAt: '12.05.2026', blockedBy: 'ArturZaton' },
  { id: '9123849123', username: 'TrollFace', reason: 'Obrażanie administracji', blockedAt: '10.05.2026', blockedBy: 'System' },
];

const MOCK_BLOCKED_ROLES = [
  { id: '11223344', name: 'Muted', color: '#718096', reason: 'Rola wyciszonych nie może otwierać ticketów', blockedAt: '01.05.2026', blockedBy: 'Roxel' },
];

const translations = {
  pl: {
    title: 'Czarna Lista (Blacklist)',
    subtitle: 'Zarządzaj użytkownikami i rolami, którzy mają całkowity zakaz tworzenia nowych zgłoszeń na Twoim serwerze.',
    blockedUsers: 'Zablokowani Użytkownicy',
    blockedRoles: 'Zablokowane Role',
    userIdPlaceholder: 'ID Użytkownika (np. 123456789)',
    roleIdPlaceholder: 'ID Roli Discord (np. 9988776655)',
    reasonPlaceholder: 'Opcjonalny powód blokady...',
    blockBtn: 'Zablokuj',
    unblockBtn: 'Odblokuj',
    noUsers: 'Brak zablokowanych użytkowników.',
    noRoles: 'Brak zablokowanych ról.',
    confirmUnblockTitle: 'Potwierdź odblokowanie',
    confirmUnblockDesc1: 'Czy na pewno chcesz zdjąć blokadę dla',
    confirmUnblockDesc2: 'Będą oni mogli ponownie tworzyć nowe tickety na serwerze.',
    cancel: 'Anuluj',
    confirmYes: 'Tak, odblokuj',
    blockedAt: 'Zablokowany:',
    by: 'przez',
  },
  en: {
    title: 'Blacklist',
    subtitle: 'Manage users and roles who are completely banned from creating new tickets on your server.',
    blockedUsers: 'Blocked Users',
    blockedRoles: 'Blocked Roles',
    userIdPlaceholder: 'User ID (e.g. 123456789)',
    roleIdPlaceholder: 'Discord Role ID (e.g. 9988776655)',
    reasonPlaceholder: 'Optional block reason...',
    blockBtn: 'Block',
    unblockBtn: 'Unblock',
    noUsers: 'No blocked users.',
    noRoles: 'No blocked roles.',
    confirmUnblockTitle: 'Confirm unblock',
    confirmUnblockDesc1: 'Are you sure you want to remove the block for',
    confirmUnblockDesc2: 'They will be able to create new tickets on the server again.',
    cancel: 'Cancel',
    confirmYes: 'Yes, unblock',
    blockedAt: 'Blocked:',
    by: 'by',
  }
};

export default function BlacklistPage() {
  const params = useParams();
  const { addToast } = useToast();
  const { language } = useSettings();
  const t = translations[language];

  const [blockedUsers, setBlockedUsers] = useState(MOCK_BLOCKED_USERS);
  const [blockedRoles, setBlockedRoles] = useState(MOCK_BLOCKED_ROLES);

  const [newUserId, setNewUserId] = useState('');
  const [newUserReason, setNewUserReason] = useState('');
  const [newRoleId, setNewRoleId] = useState('');
  const [newRoleReason, setNewRoleReason] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemToUnblock, setItemToUnblock] = useState<{ id: string, type: 'user' | 'role', name: string } | null>(null);

  const handleBlockUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserId.trim()) return;
    const newUser = {
      id: newUserId, username: 'Nieznany Użytkownik', reason: newUserReason || 'Brak podanego powodu',
      blockedAt: new Date().toLocaleDateString('pl-PL'), blockedBy: 'Ty (Admin)'
    };
    setBlockedUsers([newUser, ...blockedUsers]);
    setNewUserId(''); setNewUserReason('');
    addToast('Użytkownik został zablokowany.', 'success');
  };

  const handleBlockRole = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoleId.trim()) return;
    const newRole = {
      id: newRoleId, name: `Rola (${newRoleId})`, color: '#9ca3af', reason: newRoleReason || 'Brak podanego powodu',
      blockedAt: new Date().toLocaleDateString('pl-PL'), blockedBy: 'Ty (Admin)'
    };
    setBlockedRoles([newRole, ...blockedRoles]);
    setNewRoleId(''); setNewRoleReason('');
    addToast('Rola dodana do czarnej listy.', 'success');
  };

  const requestUnblock = (id: string, type: 'user' | 'role', name: string) => {
    setItemToUnblock({ id, type, name });
    setIsModalOpen(true);
  };

  const confirmUnblock = () => {
    if (!itemToUnblock) return;
    if (itemToUnblock.type === 'user') setBlockedUsers(blockedUsers.filter(u => u.id !== itemToUnblock.id));
    else setBlockedRoles(blockedRoles.filter(r => r.id !== itemToUnblock.id));
    addToast(`Blokada zdjęta pomyślnie.`, 'success');
    setIsModalOpen(false); setItemToUnblock(null);
  };

  return (
    <div className="max-w-6xl space-y-8 animate-fadeIn relative">
      <div className="border-b border-border-subtle pb-5">
        <h1 className="text-2xl font-bold text-text-main tracking-tight flex items-center gap-2">
          <span className="text-status-error">⛔</span> {t.title}
        </h1>
        <p className="text-text-muted text-sm mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            👤 {t.blockedUsers} ({blockedUsers.length})
          </h2>
          <form onSubmit={handleBlockUser} className="bg-surface-panel border border-border-subtle rounded-xl p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <input type="text" placeholder={t.userIdPlaceholder} value={newUserId} onChange={(e) => setNewUserId(e.target.value)} className="flex-1 bg-surface-base border border-border-subtle text-text-main text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-status-error transition" />
              <button type="submit" disabled={!newUserId.trim()} className="bg-surface-base hover:bg-status-error/20 border border-border-subtle hover:border-status-error/50 text-text-muted hover:text-status-error font-bold py-2 px-4 rounded-lg text-sm transition disabled:opacity-50 whitespace-nowrap">
                ➕ {t.blockBtn}
              </button>
            </div>
            <input type="text" placeholder={t.reasonPlaceholder} value={newUserReason} onChange={(e) => setNewUserReason(e.target.value)} className="w-full bg-surface-base border border-border-subtle text-text-main text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-brand-base transition" />
          </form>

          <div className="bg-surface-panel border border-border-subtle rounded-xl overflow-hidden">
            {blockedUsers.length > 0 ? (
              <div className="divide-y divide-border-subtle">
                {blockedUsers.map(user => (
                  <div key={user.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-base transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-text-main">{user.username}</span>
                        <span className="text-xs text-text-muted bg-surface-base px-1.5 py-0.5 rounded border border-border-subtle">{user.id}</span>
                      </div>
                      <div className="text-sm text-status-error mt-1 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {user.reason}
                      </div>
                      <div className="text-xs text-text-muted mt-1">{t.blockedAt} {user.blockedAt} {t.by} {user.blockedBy}</div>
                    </div>
                    <button onClick={() => requestUnblock(user.id, 'user', user.username)} className="shrink-0 bg-surface-base hover:bg-border-subtle text-text-main font-medium py-1.5 px-3 rounded-lg text-xs transition border border-border-subtle">
                      {t.unblockBtn}
                    </button>
                  </div>
                ))}
              </div>
            ) : (<div className="p-8 text-center text-text-muted">{t.noUsers}</div>)}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            🛡️ {t.blockedRoles} ({blockedRoles.length})
          </h2>
          <form onSubmit={handleBlockRole} className="bg-surface-panel border border-border-subtle rounded-xl p-4 flex flex-col gap-3">
            <div className="flex gap-3">
              <input type="text" placeholder={t.roleIdPlaceholder} value={newRoleId} onChange={(e) => setNewRoleId(e.target.value)} className="flex-1 bg-surface-base border border-border-subtle text-text-main text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-status-error transition" />
              <button type="submit" disabled={!newRoleId.trim()} className="bg-surface-base hover:bg-status-error/20 border border-border-subtle hover:border-status-error/50 text-text-muted hover:text-status-error font-bold py-2 px-4 rounded-lg text-sm transition disabled:opacity-50 whitespace-nowrap">
                ➕ {t.blockBtn}
              </button>
            </div>
            <input type="text" placeholder={t.reasonPlaceholder} value={newRoleReason} onChange={(e) => setNewRoleReason(e.target.value)} className="w-full bg-surface-base border border-border-subtle text-text-main text-sm rounded-lg px-3 py-2 focus:outline-none focus:border-brand-base transition" />
          </form>

          <div className="bg-surface-panel border border-border-subtle rounded-xl overflow-hidden">
            {blockedRoles.length > 0 ? (
              <div className="divide-y divide-border-subtle">
                {blockedRoles.map(role => (
                  <div key={role.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-surface-base transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
                        <span className="font-bold text-text-main">{role.name}</span>
                        <span className="text-xs text-text-muted bg-surface-base px-1.5 py-0.5 rounded border border-border-subtle">{role.id}</span>
                      </div>
                      <div className="text-sm text-status-error mt-1 font-medium flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        {role.reason}
                      </div>
                      <div className="text-xs text-text-muted mt-1">{t.blockedAt} {role.blockedAt} {t.by} {role.blockedBy}</div>
                    </div>
                    <button onClick={() => requestUnblock(role.id, 'role', role.name)} className="shrink-0 bg-surface-base hover:bg-border-subtle text-text-main font-medium py-1.5 px-3 rounded-lg text-xs transition border border-border-subtle">
                      {t.unblockBtn}
                    </button>
                  </div>
                ))}
              </div>
            ) : (<div className="p-8 text-center text-text-muted">{t.noRoles}</div>)}
          </div>
        </section>
      </div>

      {isModalOpen && itemToUnblock && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-surface-panel border border-border-subtle rounded-2xl p-6 w-full max-w-md shadow-2xl transform transition-all scale-100">
            <div className="w-14 h-14 rounded-full bg-status-error/10 flex items-center justify-center mx-auto mb-4 border border-status-error/20">
              <span className="text-2xl">🔓</span>
            </div>
            <h3 className="text-xl font-bold text-text-main text-center mb-2">{t.confirmUnblockTitle}</h3>
            <p className="text-center text-text-muted mb-6">
              {t.confirmUnblockDesc1} <strong className="text-text-main">{itemToUnblock.name}</strong>?<br/><br/>{t.confirmUnblockDesc2}
            </p>
            <div className="flex gap-3">
              <button onClick={() => setIsModalOpen(false)} className="flex-1 bg-surface-base hover:bg-border-subtle text-text-main font-medium py-2.5 rounded-xl transition border border-border-subtle">{t.cancel}</button>
              <button onClick={confirmUnblock} className="flex-1 bg-brand-base hover:bg-brand-hover text-white font-bold py-2.5 rounded-xl transition shadow-lg">{t.confirmYes}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
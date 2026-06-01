"use client"

import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext';

type BlacklistedUser = { id: string; username: string; reason: string; dateAdded: string; avatar: string };
type BlacklistedRole = { id: string; name: string; reason: string; dateAdded: string; color: string };

const INITIAL_USERS: BlacklistedUser[] = [
  { id: 'u1', username: 'ZlyTyp#1234', reason: 'Trolling na ticketach', dateAdded: '2026-05-31', avatar: '🤬' }
];

const INITIAL_ROLES: BlacklistedRole[] = [
  { id: 'br1', name: '@Muted', reason: 'Automatyczna blokada', dateAdded: '2026-05-30', color: '#4b5563' }
];

export default function BlacklistPage() {
  const { addToast } = useToast();

  const [activeBlacklistTab, setActiveBlacklistTab] = useState<'users' | 'roles'>('users');
  const [bUsers, setBUsers] = useState<BlacklistedUser[]>(INITIAL_USERS);
  const [bRoles, setBRoles] = useState<BlacklistedRole[]>(INITIAL_ROLES);

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    title: string;
    description: string;
    onConfirm: () => void;
  }>({ isOpen: false, title: '', description: '', onConfirm: () => {} });

  const closeModal = () => setModalConfig({ ...modalConfig, isOpen: false });

  const openModal = (title: string, description: string, action: () => void) => {
    setModalConfig({
      isOpen: true,
      title,
      description,
      onConfirm: () => {
        action();
        closeModal();
      }
    });
  };

  const handleRemoveBlacklistedUser = (userId: string) => {
    openModal(
      'Odblokowanie użytkownika',
      'Czy na pewno chcesz usunąć tego użytkownika z czarnej listy? Będzie mógł ponownie tworzyć zgłoszenia.',
      () => {
        setBUsers(bUsers.filter(u => u.id !== userId));
        addToast('Użytkownik został odblokowany.', 'success');
      }
    );
  };

  const handleRemoveBlacklistedRole = (roleId: string) => {
    openModal(
      'Odblokowanie roli',
      'Czy na pewno chcesz usunąć tę rolę z czarnej listy?',
      () => {
        setBRoles(bRoles.filter(r => r.id !== roleId));
        addToast('Rola została usunięta z czarnej listy.', 'success');
      }
    );
  };

  return (
    <div className="w-full space-y-8 pb-24 relative text-white animate-fadeIn">
      
      <div className="border-b border-[#1e222b] pb-6">
        <h1 className="text-3xl font-bold tracking-tight">Czarna Lista (Blacklist)</h1>
        <p className="text-[#9ca3af] mt-1">Zarządzaj użytkownikami i rolami, którym odebrano uprawnienia do otwierania zgłoszeń na Twoim serwerze.</p>
      </div>

      <div className="space-y-6 animate-fadeIn">
        <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-2 flex gap-2 w-fit mb-4">
          <button 
            onClick={() => setActiveBlacklistTab('users')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeBlacklistTab === 'users' ? 'bg-[#101216] text-white shadow-sm border border-[#2e3545]' : 'text-[#9ca3af] hover:text-white hover:bg-[#1e222b]/50'}`}
          >
            👤 Zablokowani Użytkownicy
          </button>
          <button 
            onClick={() => setActiveBlacklistTab('roles')}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeBlacklistTab === 'roles' ? 'bg-[#101216] text-white shadow-sm border border-[#2e3545]' : 'text-[#9ca3af] hover:text-white hover:bg-[#1e222b]/50'}`}
          >
            🛡️ Zablokowane Role
          </button>
        </div>

        <div className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-[#1e222b] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h3 className="font-bold text-lg text-white">
                {activeBlacklistTab === 'users' ? 'Użytkownicy na Czarnej Liście' : 'Role na Czarnej Liście'}
              </h3>
              <p className="text-xs text-[#9ca3af] mt-1">Osoby lub Role widniejące poniżej nie mogą otwierać nowych zgłoszeń.</p>
            </div>
            <button className="bg-[#DA373C] hover:bg-red-700 text-white font-bold py-2.5 px-5 rounded-xl text-sm transition shadow-lg shadow-red-600/20 border border-red-500/50 whitespace-nowrap">
              {activeBlacklistTab === 'users' ? '+ Zablokuj Użytkownika' : '+ Zablokuj Rolę'}
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-[#101216] text-[#9ca3af] text-xs uppercase tracking-wider font-bold">
                <tr>
                  <th className="p-4 border-b border-[#1e222b]">Nazwa</th>
                  <th className="p-4 border-b border-[#1e222b]">Powód Blokady</th>
                  <th className="p-4 border-b border-[#1e222b]">Data Dodania</th>
                  <th className="p-4 border-b border-[#1e222b] text-right">Akcje</th>
                </tr>
              </thead>
              <tbody className="bg-[#161920]">
                {activeBlacklistTab === 'users' && bUsers.map(user => (
                  <tr key={user.id} className="border-b border-[#1e222b] hover:bg-[#1e222b]/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#101216] border border-[#2e3545] flex items-center justify-center text-sm">{user.avatar}</div>
                      <span className="font-bold text-white text-sm">{user.username}</span>
                    </td>
                    <td className="p-4 text-sm text-[#d1d5db]">{user.reason}</td>
                    <td className="p-4 text-sm text-[#9ca3af]">{user.dateAdded}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleRemoveBlacklistedUser(user.id)} className="text-[#9ca3af] hover:text-red-500 p-2 hover:bg-red-500/10 rounded-xl transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}

                {activeBlacklistTab === 'roles' && bRoles.map(role => (
                  <tr key={role.id} className="border-b border-[#1e222b] hover:bg-[#1e222b]/30 transition-colors">
                    <td className="p-4 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
                      <span className="font-bold text-white text-sm">{role.name}</span>
                    </td>
                    <td className="p-4 text-sm text-[#d1d5db]">{role.reason}</td>
                    <td className="p-4 text-sm text-[#9ca3af]">{role.dateAdded}</td>
                    <td className="p-4 text-right">
                      <button onClick={() => handleRemoveBlacklistedRole(role.id)} className="text-[#9ca3af] hover:text-red-500 p-2 hover:bg-red-500/10 rounded-xl transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                      </button>
                    </td>
                  </tr>
                ))}
                
                {((activeBlacklistTab === 'users' && bUsers.length === 0) || (activeBlacklistTab === 'roles' && bRoles.length === 0)) && (
                  <tr><td colSpan={4} className="p-8 text-center text-[#6b7280]">Czarna lista jest pusta.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {modalConfig.isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#161920] border border-[#1e222b] rounded-2xl w-full max-w-md p-6 shadow-2xl transform scale-100">
            <h3 className="text-xl font-bold text-white mb-2">{modalConfig.title}</h3>
            <p className="text-sm text-[#9ca3af] mb-8 leading-relaxed">
              {modalConfig.description}
            </p>
            <div className="flex gap-3 justify-end">
              <button 
                onClick={closeModal}
                className="bg-[#101216] hover:bg-[#1e222b] text-white px-5 py-2.5 rounded-xl font-semibold text-sm transition-colors border border-[#2e3545]"
              >
                Anuluj
              </button>
              <button 
                onClick={modalConfig.onConfirm}
                className="bg-[#DA373C] hover:bg-red-700 text-white px-5 py-2.5 rounded-xl font-bold text-sm transition-colors shadow-lg shadow-red-600/20"
              >
                Potwierdź Odblokowanie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
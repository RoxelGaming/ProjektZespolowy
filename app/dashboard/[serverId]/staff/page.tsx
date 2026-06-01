"use client"

import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext';

type Permission = 'canClose' | 'canClaim' | 'canDelete' | 'canAddUsers';
type TeamRole = { id: string; name: string; color: string };
type StaffTeam = {
  id: string;
  name: string;
  roles: TeamRole[];
  permissions: Record<Permission, boolean>;
};

const INITIAL_TEAMS: StaffTeam[] = [
  {
    id: 't1',
    name: 'Support Tier 1',
    roles: [{ id: 'r1', name: '@Pomocnik', color: '#23A559' }],
    permissions: { canClose: true, canClaim: true, canDelete: false, canAddUsers: false }
  },
  {
    id: 't2',
    name: 'Administracja',
    roles: [{ id: 'r2', name: '@Admin', color: '#DA373C' }, { id: 'r3', name: '@Manager', color: '#FEE75C' }],
    permissions: { canClose: true, canClaim: true, canDelete: true, canAddUsers: true }
  }
];

export default function StaffTeamsPage() {
  const { addToast } = useToast();
  const [teams, setTeams] = useState<StaffTeam[]>(INITIAL_TEAMS);

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

  const togglePermission = (teamId: string, perm: Permission) => {
    setTeams(teams.map(t => {
      if (t.id === teamId) {
        return { ...t, permissions: { ...t.permissions, [perm]: !t.permissions[perm] } };
      }
      return t;
    }));
  };

  const handleAddMockRoleToTeam = (teamId: string) => {
    setTeams(teams.map(t => {
      if (t.id === teamId) {
        return { ...t, roles: [...t.roles, { id: Date.now().toString(), name: '@Nowa Rola', color: '#5865F2' }] };
      }
      return t;
    }));
    addToast('Dodano nową rolę do zespołu.', 'info');
  };

  const handleRemoveRoleFromTeam = (teamId: string, roleId: string) => {
    openModal(
      'Usuwanie roli z zespołu',
      'Czy na pewno chcesz odpiąć tę rolę? Użytkownicy posiadający tę rolę stracą uprawnienia zespołu.',
      () => {
        setTeams(teams.map(t => {
          if (t.id === teamId) {
            return { ...t, roles: t.roles.filter(r => r.id !== roleId) };
          }
          return t;
        }));
        addToast('Rola została odpięta pomyślnie.', 'success');
      }
    );
  };

  const Toggle = ({ checked, onChange, label }: { checked: boolean, onChange: () => void, label: string }) => (
    <div className="flex items-center justify-between p-3 bg-[#101216] border border-[#1e222b] rounded-xl hover:border-[#2e3545] transition-colors">
      <span className="text-sm font-semibold text-white">{label}</span>
      <button 
        onClick={onChange}
        className={`w-11 h-6 rounded-full transition-colors relative focus:outline-none shrink-0 ${checked ? 'bg-[#23A559]' : 'bg-[#2e3545]'}`}
      >
        <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${checked ? 'left-6' : 'left-1'}`} />
      </button>
    </div>
  );

  return (
    <div className="w-full space-y-8 pb-24 relative text-white animate-fadeIn">
      
      <div className="flex justify-between items-center border-b border-[#1e222b] pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Zespoły Wsparcia (Staff Teams)</h1>
          <p className="text-[#9ca3af] mt-1">Grupuj role Discord w specjalne zespoły i precyzyjnie przydzielaj im uprawnienia administracyjne.</p>
        </div>
        <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 px-5 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/20 whitespace-nowrap">
          + Utwórz nowy zespół
        </button>
      </div>

      <div className="space-y-6">
        {teams.map(team => (
          <div key={team.id} className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-[#1e222b]/40 px-6 py-4 border-b border-[#1e222b] flex justify-between items-center">
              <h3 className="font-bold text-lg">{team.name}</h3>
              <button className="text-[#9ca3af] hover:text-white transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </button>
            </div>

            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-bold text-[#9ca3af] uppercase tracking-wider">Przypisane Role</h4>
                  <button onClick={() => handleAddMockRoleToTeam(team.id)} className="text-xs bg-[#1e222b] hover:bg-[#2e3545] text-white px-3 py-1.5 rounded-lg transition-colors font-semibold border border-[#2e3545]">
                    + Dodaj Rolę
                  </button>
                </div>
                
                <div className="border border-[#1e222b] rounded-xl overflow-hidden bg-[#101216]">
                  <table className="w-full text-left border-collapse">
                    <tbody>
                      {team.roles.length === 0 && (
                        <tr><td className="p-4 text-center text-sm text-[#6b7280]">Brak przypisanych ról.</td></tr>
                      )}
                      {team.roles.map((role, idx) => (
                        <tr key={role.id} className={`${idx !== team.roles.length - 1 ? 'border-b border-[#1e222b]' : ''} hover:bg-[#161920] transition-colors`}>
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: role.color }}></div>
                              <span className="font-semibold text-sm">{role.name}</span>
                            </div>
                          </td>
                          <td className="p-3 text-right">
                            <button 
                              onClick={() => handleRemoveRoleFromTeam(team.id, role.id)}
                              className="text-red-500 hover:text-white p-1.5 hover:bg-red-500/20 rounded-lg transition-colors"
                              title="Usuń rolę z zespołu"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#9ca3af] uppercase tracking-wider mb-4">Uprawnienia Zespołu</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Toggle label="Zamykanie ticketów" checked={team.permissions.canClose} onChange={() => togglePermission(team.id, 'canClose')} />
                  <Toggle label="Przypisawanie (Claim)" checked={team.permissions.canClaim} onChange={() => togglePermission(team.id, 'canClaim')} />
                  <Toggle label="Usuwanie ticketów" checked={team.permissions.canDelete} onChange={() => togglePermission(team.id, 'canDelete')} />
                  <Toggle label="Dodawanie osób" checked={team.permissions.canAddUsers} onChange={() => togglePermission(team.id, 'canAddUsers')} />
                </div>
              </div>
            </div>
          </div>
        ))}
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
                Potwierdź i Usuń
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
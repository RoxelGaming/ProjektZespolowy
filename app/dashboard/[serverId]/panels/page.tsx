"use client"

import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext';

type PanelOption = {
  id: string;
  name: string;
  description: string;
};

// Przykładowe panele, które można dodać do Multi-Panelu
const AVAILABLE_PANELS: PanelOption[] = [
  { id: 'p1', name: 'Wsparcie Techniczne', description: 'Problemy z kontem lub działaniem bota' },
  { id: 'p2', name: 'Zgłoś Gracza', description: 'Zgłaszanie łamania regulaminu' },
  { id: 'p3', name: 'Pytania ogólne', description: 'Inne zapytania do administracji' },
];

export default function TicketsPanelPage() {
  const { addToast } = useToast();
  
  // Stany aplikacji
  const [activeTab, setActiveTab] = useState<'standard' | 'multi'>('standard');
  const [isSaving, setIsSaving] = useState(false);
  
  // Stany dla "Support Hours"
  const [supportHoursEnabled, setSupportHoursEnabled] = useState(false);
  
  // Stany dla "Multi-Panels"
  const [multiPanels, setMultiPanels] = useState<PanelOption[]>([]);
  const [selectedToAdd, setSelectedToAdd] = useState<string>('');

  // Obsługa zapisu
  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    
    // Symulacja zapisywania w bazie
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addToast('Panel zapisany pomyślnie!', 'success');
    setIsSaving(false);
  };

  // Obsługa dodawania/usuwania z Multi-Panelu
  const addPanelToMulti = () => {
    if (!selectedToAdd) return;
    if (multiPanels.find(p => p.id === selectedToAdd)) {
      addToast('Ten panel jest już na liście!', 'warning');
      return;
    }
    const panel = AVAILABLE_PANELS.find(p => p.id === selectedToAdd);
    if (panel) {
      setMultiPanels([...multiPanels, panel]);
      setSelectedToAdd('');
      addToast('Panel dodany do dropdownu.', 'info');
    }
  };

  const removePanelFromMulti = (id: string) => {
    setMultiPanels(multiPanels.filter(p => p.id !== id));
  };

  return (
    <div className="w-full space-y-8 pb-24 relative text-white animate-fadeIn">
      
      {/* NAGŁÓWEK */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kreator Paneli Zgłoszeń</h1>
        <p className="text-[#9ca3af] mt-1">Zaprojektuj interfejs otwierania ticketów i zdefiniuj zaawansowane reguły wsparcia.</p>
      </div>

      {/* SYSTEM ZAKŁADEK (TABS) */}
      <div className="flex border-b border-[#1e222b]">
        <button 
          onClick={() => setActiveTab('standard')}
          className={`px-6 py-4 font-semibold text-sm transition-all relative ${
            activeTab === 'standard' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'
          }`}
        >
          Kreator Standardowy
          {activeTab === 'standard' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#5865F2] shadow-[0_0_10px_rgba(88,101,242,0.5)]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('multi')}
          className={`px-6 py-4 font-semibold text-sm transition-all relative ${
            activeTab === 'multi' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'
          }`}
        >
          Multi-Panels (Dropdown)
          {activeTab === 'multi' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#5865F2] shadow-[0_0_10px_rgba(88,101,242,0.5)]"></div>}
        </button>
      </div>

      {/* ZAWARTOŚĆ ZAKŁADKI: STANDARD PANELS */}
      {activeTab === 'standard' && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* SEKCJA: Embed Builders */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Panel Message Builder */}
            <section className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e222b]/50 px-6 py-4 border-b border-[#1e222b]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-[#5865F2]">💬</span> Panel Message
                </h2>
                <p className="text-xs text-[#9ca3af] mt-0.5">Wiadomość publiczna na kanale, z której użytkownik otwiera ticket.</p>
              </div>
              <div className="p-6 space-y-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Tytuł wiadomości</label>
                  <input type="text" placeholder="np. Otwórz zgłoszenie" className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Opis Embedu</label>
                  <textarea placeholder="Kliknij przycisk poniżej, aby połączyć się z administracją..." className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors min-h-[120px] resize-y" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Kolor (HEX)</label>
                    <div className="flex gap-2">
                      <input type="color" defaultValue="#5865F2" className="w-12 h-11 rounded-lg cursor-pointer bg-transparent border-0 p-0" />
                      <input type="text" defaultValue="#5865F2" className="flex-1 bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Obraz (URL)</label>
                    <input type="text" placeholder="https://..." className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" />
                  </div>
                </div>
              </div>
            </section>

            {/* Welcome Message Builder */}
            <section className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e222b]/50 px-6 py-4 border-b border-[#1e222b]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-[#23A559]">👋</span> Welcome Message
                </h2>
                <p className="text-xs text-[#9ca3af] mt-0.5">Wiadomość powitalna wysyłana wewnątrz nowo otwartego kanału ticketa.</p>
              </div>
              <div className="p-6 space-y-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Tytuł powitania</label>
                  <input type="text" placeholder="np. Witaj w zgłoszeniu!" className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Treść powitania</label>
                  <textarea placeholder="Opisz dokładnie swój problem, a administracja odpowie najszybciej jak to możliwe." className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors min-h-[120px] resize-y" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Kolor (HEX)</label>
                    <div className="flex gap-2">
                      <input type="color" defaultValue="#2b2d31" className="w-12 h-11 rounded-lg cursor-pointer bg-transparent border-0 p-0" />
                      <input type="text" defaultValue="#2B2D31" className="flex-1 bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Obraz (URL)</label>
                    <input type="text" placeholder="https://..." className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* SEKCJA: Właściwości, Uprawnienia i Godziny Pracy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Właściwości */}
            <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-white mb-4">Właściwości Ticketa</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Kategoria zapisu</label>
                  <select className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-pointer">
                    <option>📂 Wsparce Techniczne</option>
                    <option>📂 Pytania i Odpowiedzi</option>
                    <option>📂 Ukryta Kategoria (Admin)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Format nazwy kanału</label>
                  <input type="text" defaultValue="ticket-{user}" className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" />
                </div>
              </div>
            </div>

            {/* Uprawnienia */}
            <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-white mb-4">Access Control (Role)</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Dozwolone role wsparcia</label>
                  <select multiple className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] h-[104px] cursor-pointer">
                    <option value="admin">@Administrator</option>
                    <option value="mod">@Moderator</option>
                    <option value="support">@Support Team</option>
                  </select>
                  <p className="text-[10px] text-[#6b7280] mt-2">Przytrzymaj CTRL aby wybrać wiele ról.</p>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">Support Hours</h3>
                  <p className="text-xs text-[#9ca3af] mt-0.5">Ogranicz czas działania panelu.</p>
                </div>
                {/* Własny komponent Toggle */}
                <button 
                  onClick={() => setSupportHoursEnabled(!supportHoursEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${supportHoursEnabled ? 'bg-[#23A559]' : 'bg-[#2e3545]'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${supportHoursEnabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div className={`space-y-4 transition-opacity duration-300 ${supportHoursEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Otwarte od</label>
                    <input type="time" defaultValue="08:00" className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-text [color-scheme:dark]" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">Do</label>
                    <input type="time" defaultValue="16:00" className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-text [color-scheme:dark]" />
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ZAWARTOŚĆ ZAKŁADKI: MULTI-PANELS */}
      {activeTab === 'multi' && (
        <div className="space-y-8 animate-fadeIn max-w-4xl">
          <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-2">Kreator Dropdownu</h2>
            <p className="text-sm text-[#9ca3af] mb-6">
              Multi-Panele pozwalają na osadzenie wielu standardowych kategorii pod jedną publiczną wiadomością na kanale. Użytkownik wybiera rodzaj problemu z rozwijanego menu.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <select 
                  value={selectedToAdd} 
                  onChange={(e) => setSelectedToAdd(e.target.value)}
                  className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-pointer"
                >
                  <option value="" disabled>-- Wybierz utworzony panel do dodania --</option>
                  {AVAILABLE_PANELS.map(panel => (
                    <option key={panel.id} value={panel.id}>{panel.name}</option>
                  ))}
                </select>
              </div>
              <button 
                onClick={addPanelToMulti}
                className="bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-6 rounded-xl text-sm transition border border-[#2e3545] shrink-0"
              >
                + Dodaj Opcję
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-3">Zbudowane Menu Rozwijane</h3>
              
              {multiPanels.length === 0 ? (
                <div className="text-center p-10 border border-dashed border-[#2e3545] rounded-xl text-[#6b7280] bg-[#101216]/50">
                  Brak przypisanych paneli. Menu jest puste.
                </div>
              ) : (
                multiPanels.map((panel, index) => (
                  <div key={panel.id} className="flex items-center justify-between p-4 bg-[#101216] border border-[#1e222b] rounded-xl group hover:border-[#2e3545] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 rounded-lg bg-[#1e222b] flex items-center justify-center font-bold text-[#9ca3af] text-xs">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm">{panel.name}</p>
                        <p className="text-xs text-[#9ca3af]">{panel.description}</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => removePanelFromMulti(panel.id)}
                      className="text-red-500 hover:text-white p-2 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}

      {/* FLOATING SAVE BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#161920]/80 backdrop-blur-md border-t border-[#1e222b] p-4 px-6 flex justify-end z-40">
        <button 
          onClick={handleSave} disabled={isSaving}
          className={`relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
            isSaving 
            ? 'bg-[#5865F2]/50 text-white/70 cursor-not-allowed' 
            : 'bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865f2]/20'
          }`}
        >
          {isSaving ? 'Zapisywanie widoku...' : 'Zapisz zmiany'}
        </button>
      </div>

    </div>
  );
}
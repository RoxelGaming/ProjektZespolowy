'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

type PanelOption = {
  id: string;
  name: string;
  description: string;
}

// Przykładowe panele, które można dodać do Multi-Panelu
const AVAILABLE_PANELS: PanelOption[] = [
  { id: 'p1', name: 'Wsparcie Techniczne', description: 'Problemy z kontem lub działaniem serwera' },
  { id: 'p2', name: 'Zgłoszenie Gracza', description: 'Zgłaszanie łamania regulaminu' },
  { id: 'p3', name: 'Pytania ogólne', description: 'Inne zapytania do administracji' },
  { id: 'p4', name: 'Współpraca', description: 'Zapytania biznesowe i partnerstwa' },
];

export default function TicketsPanelPage() {
  const { addToast } = useToast();
  const { language } = useSettings(); // Pobieranie aktualnego języka
  const params = useParams();
  const serverId = params?.serverId as string;

  // Stany główne
  const [activeTab, setActiveTab] = useState<'standard' | 'multi'>('standard');
  const [isSaving, setIsSaving] = useState(false);

  // ==========================================
  // SŁOWNIK TŁUMACZEŃ (PL / EN)
  // ==========================================
  const t = {
    title: language === 'pl' ? 'Kreator Paneli Zgłoszeń' : 'Ticket Panel Builder',
    subtitle: language === 'pl' ? 'Zaprojektuj interfejs otwierania ticketów na serwerze i zdefiniuj zaawansowane reguły wsparcia.' : 'Design the ticket opening interface on the server and define advanced support rules.',
    tabStandard: language === 'pl' ? 'Kreator Standardowy' : 'Standard Builder',
    tabMulti: language === 'pl' ? 'Multi-Panels (Dropdown)' : 'Multi-Panels (Dropdown)',
    
    // Standard Panel
    panelMessageTitle: language === 'pl' ? 'Panel Message' : 'Panel Message',
    panelMessageDesc: language === 'pl' ? 'Wiadomość publiczna na kanale, z której użytkownik klika przycisk otwarcia ticketa.' : 'Public message in the channel where the user clicks to open a ticket.',
    msgTitleLabel: language === 'pl' ? 'Tytuł wiadomości' : 'Message Title',
    msgTitlePlh: language === 'pl' ? 'np. Otwórz zgłoszenie' : 'e.g., Open a ticket',
    msgDescLabel: language === 'pl' ? 'Opis Embedu' : 'Embed Description',
    msgDescPlh: language === 'pl' ? 'Wpisz treść wiadomości...' : 'Enter message content...',
    colorLabel: language === 'pl' ? 'Kolor (HEX)' : 'Color (HEX)',
    imageLabel: language === 'pl' ? 'Obraz (URL)' : 'Image (URL)',
    livePreview: language === 'pl' ? 'Podgląd na żywo (Discord Preview)' : 'Live Preview (Discord Preview)',
    openTicketBtn: language === 'pl' ? 'Otwórz Ticket' : 'Open Ticket',
    welcomeMsgTitle: language === 'pl' ? 'Welcome Message' : 'Welcome Message',
    welcomeMsgDesc: language === 'pl' ? 'Wiadomość powitalna wysyłana wewnątrz nowo otwartego kanału ticketa.' : 'Welcome message sent inside the newly opened ticket channel.',
    welcomeTitleLabel: language === 'pl' ? 'Tytuł powitania' : 'Welcome Title',
    welcomeTitlePlh: language === 'pl' ? 'np. Witaj w zgłoszeniu!' : 'e.g., Welcome to the ticket!',
    welcomeDescLabel: language === 'pl' ? 'Treść powitania' : 'Welcome Content',
    welcomeDescPlh: language === 'pl' ? 'Opisz dokładnie swój problem...' : 'Describe your problem in detail...',
    botLabel: language === 'pl' ? 'BOT' : 'BOT',
    todayAt: language === 'pl' ? 'Dziś o 14:00' : 'Today at 2:00 PM',
    
    // Konfiguracja
    ticketProps: language === 'pl' ? 'Właściwości Ticketa' : 'Ticket Properties',
    categoryLabel: language === 'pl' ? 'Kategoria zapisu' : 'Save Category',
    cat1: language === 'pl' ? '📁 Wsparce Techniczne' : '📁 Technical Support',
    cat2: language === 'pl' ? '📁 Pytania i Odpowiedzi' : '📁 Q&A',
    cat3: language === 'pl' ? '🔒 Ukryta Kategoria (Admin)' : '🔒 Hidden Category (Admin)',
    formatLabel: language === 'pl' ? 'Format nazwy kanału' : 'Channel name format',
    accessControl: language === 'pl' ? 'Access Control (Role)' : 'Access Control (Roles)',
    allowedRolesLabel: language === 'pl' ? 'Dozwolone role wsparcia' : 'Allowed support roles',
    ctrlHint: language === 'pl' ? 'Przytrzymaj CTRL aby wybrać wiele ról z listy Discorda.' : 'Hold CTRL to select multiple roles from the Discord list.',
    supportHours: language === 'pl' ? 'Support Hours' : 'Support Hours',
    supportHoursDesc: language === 'pl' ? 'Ogranicz czas działania panelu.' : 'Limit the panel operating time.',
    openFrom: language === 'pl' ? 'Otwarte od' : 'Open from',
    openTo: language === 'pl' ? 'Do' : 'To',
    hoursHint: language === 'pl' ? '⚠️ Poza tymi godzinami przycisk tworzenia ticketa będzie nieaktywny.' : '⚠️ Outside these hours, the ticket creation button will be inactive.',
    
    // Multi Panels
    multiTitle: language === 'pl' ? 'Kreator Dropdownu' : 'Dropdown Builder',
    multiDesc: language === 'pl' ? 'Multi-Panele pozwalają na osadzenie wielu standardowych paneli pod jedną publiczną wiadomością na kanale. Użytkownik wybiera rodzaj problemu z rozwijanego menu (Discord Select Menu).' : 'Multi-Panels allow embedding multiple standard panels under a single public channel message. The user selects the issue type from a dropdown (Discord Select Menu).',
    selectOptionDefault: language === 'pl' ? '-- Wybierz panel do osadzenia w menu --' : '-- Select a panel to embed in the menu --',
    alreadyAdded: language === 'pl' ? '(Już dodano)' : '(Already added)',
    addOptionBtn: language === 'pl' ? '➕ Dodaj opcję' : '➕ Add option',
    builtMenuTitle: language === 'pl' ? 'Zbudowane Menu Rozwijane' : 'Built Dropdown Menu',
    optionsCount: language === 'pl' ? 'Opcji' : 'Options',
    emptyMenu: language === 'pl' ? 'Brak przypisanych paneli. Twoje menu jest puste.' : 'No panels assigned. Your menu is empty.',
    removeOptionTitle: language === 'pl' ? 'Usuń opcję z menu' : 'Remove option from menu',
    
    // Akcje
    toastSaved: language === 'pl' ? 'Konfiguracja paneli została pomyślnie zapisana!' : 'Panel configuration successfully saved!',
    toastWarningExist: language === 'pl' ? 'Ten panel jest już dodany do listy rozwijanej!' : 'This panel is already added to the dropdown list!',
    toastAdded: language === 'pl' ? 'został dodany do dropdownu.' : 'has been added to the dropdown.',
    savingBtn: language === 'pl' ? '⏳ Zapisywanie widoku...' : '⏳ Saving view...',
    saveBtn: language === 'pl' ? '💾 Zapisz konfigurację' : '💾 Save configuration'
  };

  // Helper function to translate mock panels
  const translatePanel = (panel: PanelOption) => {
    if (language === 'pl') return panel;
    if (panel.id === 'p1') return { ...panel, name: 'Technical Support', description: 'Account or server performance issues' };
    if (panel.id === 'p2') return { ...panel, name: 'Report a Player', description: 'Reporting rule violations' };
    if (panel.id === 'p3') return { ...panel, name: 'General Questions', description: 'Other inquiries to administration' };
    if (panel.id === 'p4') return { ...panel, name: 'Partnerships', description: 'Business and partnership inquiries' };
    return panel;
  };

  // Stany dla Embedów (Panel Message)
  const [panelEmbed, setPanelEmbed] = useState({
    title: language === 'pl' ? 'Otwórz zgłoszenie' : 'Open a ticket',
    description: language === 'pl' ? 'Kliknij przycisk poniżej, aby połączyć się z administracją serwera. Pamiętaj, aby opisać swój problem z góry!' : 'Click the button below to connect with server administration. Please describe your issue upfront!',
    color: '#5865F2',
    image: ''
  });

  // Stany dla Embedów (Welcome Message)
  const [welcomeEmbed, setWelcomeEmbed] = useState({
    title: language === 'pl' ? 'Witaj w zgłoszeniu!' : 'Welcome to the ticket!',
    description: language === 'pl' ? 'Opisz dokładnie swój problem, a administracja odpowie najszybciej jak to możliwe.' : 'Describe your problem in detail, and the administration will reply as soon as possible.',
    color: '#2B2D31',
    image: ''
  });

  // Stany Właściwości i Godzin Wsparcia
  const [supportHoursEnabled, setSupportHoursEnabled] = useState(false);
  const [supportHours, setSupportHours] = useState({ start: '08:00', end: '16:00' });
  const [ticketCategory, setTicketCategory] = useState(t.cat1);
  const [ticketNaming, setTicketNaming] = useState('ticket-{user}');

  // Stany dla "Multi-Panels"
  const [multiPanels, setMultiPanels] = useState<PanelOption[]>([]);
  const [selectedToAdd, setSelectedToAdd] = useState<string>('');

  // ==========================================
  // FUNKCJE AKCJI
  // ==========================================
  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast(t.toastSaved, 'success');
    setIsSaving(false);
  };

  const addPanelToMulti = () => {
    if (!selectedToAdd) return;
    if (multiPanels.find(p => p.id === selectedToAdd)) {
      addToast(t.toastWarningExist, 'warning');
      return;
    }
    const panel = AVAILABLE_PANELS.find(p => p.id === selectedToAdd);
    if (panel) {
      setMultiPanels([...multiPanels, panel]);
      setSelectedToAdd('');
      addToast(`Panel "${translatePanel(panel).name}" ${t.toastAdded}`, 'info');
    }
  };

  const removePanelFromMulti = (id: string) => {
    setMultiPanels(multiPanels.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-7xl space-y-8 pb-24 relative text-white animate-fadeIn">
      
      {/* NAGŁÓWEK */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-[#9ca3af] mt-1">{t.subtitle}</p>
      </div>

      {/* SYSTEM ZAKŁADEK (TABS) */}
      <div className="flex border-b border-[#1e222b]">
        <button 
          onClick={() => setActiveTab('standard')}
          className={`px-6 py-4 font-semibold text-sm transition-all relative ${
            activeTab === 'standard' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'
          }`}
        >
          {t.tabStandard}
          {activeTab === 'standard' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#5865F2] shadow-[0_0_10px_rgba(88,101,242,0.5)]"></div>}
        </button>
        <button 
          onClick={() => setActiveTab('multi')}
          className={`px-6 py-4 font-semibold text-sm transition-all relative ${
            activeTab === 'multi' ? 'text-white' : 'text-[#9ca3af] hover:text-[#d1d5db]'
          }`}
        >
          {t.tabMulti}
          {activeTab === 'multi' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-[#5865F2] shadow-[0_0_10px_rgba(88,101,242,0.5)]"></div>}
        </button>
      </div>

      {/* ZAWARTOŚĆ ZAKŁADKI: STANDARD PANELS */}
      {activeTab === 'standard' && (
        <div className="space-y-10 animate-fadeIn">
          
          {/* SEKCJA: Embed Builders */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            
            {/* Panel Message Builder z Live Preview */}
            <section className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="bg-[#1e222b]/50 px-6 py-4 border-b border-[#1e222b]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-[#5865F2]">📢</span> {t.panelMessageTitle}
                </h2>
                <p className="text-xs text-[#9ca3af] mt-0.5">{t.panelMessageDesc}</p>
              </div>
              <div className="p-6 space-y-5 flex-1">
                
                {/* Ożywione Pola Formularza */}
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.msgTitleLabel}</label>
                  <input 
                    type="text" 
                    value={panelEmbed.title}
                    onChange={(e) => setPanelEmbed({...panelEmbed, title: e.target.value})}
                    placeholder={t.msgTitlePlh} 
                    className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.msgDescLabel}</label>
                  <textarea 
                    value={panelEmbed.description}
                    onChange={(e) => setPanelEmbed({...panelEmbed, description: e.target.value})}
                    placeholder={t.msgDescPlh} 
                    className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors min-h-[100px] resize-y" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.colorLabel}</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={panelEmbed.color}
                        onChange={(e) => setPanelEmbed({...panelEmbed, color: e.target.value})}
                        className="w-12 h-11 rounded-lg cursor-pointer bg-transparent border-0 p-0" 
                      />
                      <input 
                        type="text" 
                        value={panelEmbed.color}
                        onChange={(e) => setPanelEmbed({...panelEmbed, color: e.target.value})}
                        className="flex-1 bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.imageLabel}</label>
                    <input 
                      type="text" 
                      value={panelEmbed.image}
                      onChange={(e) => setPanelEmbed({...panelEmbed, image: e.target.value})}
                      placeholder="https://..." 
                      className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" 
                    />
                  </div>
                </div>

                {/* PODGLĄD NA ŻYWO (LIVE PREVIEW) */}
                <div className="mt-6 border-t border-[#1e222b] pt-6">
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-3">{t.livePreview}</label>
                  <div className="bg-[#313338] rounded-xl p-4 shadow-inner border border-[#1e222b]/50">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#5865F2] flex items-center justify-center text-xl shrink-0">🤖</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-white text-base">TicketBot</span>
                          <span className="bg-[#5865F2] text-white text-[10px] px-1.5 py-0.5 rounded font-bold">{t.botLabel}</span>
                          <span className="text-xs text-[#949ba4]">{t.todayAt}</span>
                        </div>
                        
                        {/* Box Embedu */}
                        <div className="bg-[#2b2d31] border-l-4 rounded-r-lg p-4 mt-1" style={{ borderLeftColor: panelEmbed.color }}>
                          {panelEmbed.title && <h3 className="text-white font-bold mb-2">{panelEmbed.title}</h3>}
                          <div className="text-[#dbdee1] text-sm whitespace-pre-wrap leading-relaxed">{panelEmbed.description}</div>
                          {panelEmbed.image && (
                            <img src={panelEmbed.image} alt="Podgląd obrazka" className="mt-3 rounded-lg max-w-full h-auto max-h-48 object-cover border border-[#1e222b]" />
                          )}
                        </div>

                        {/* Przycisk pod Embedem */}
                        <div className="mt-2 inline-flex items-center justify-center gap-2 bg-[#2b2d31] border border-[#1e222b] text-[#dbdee1] hover:bg-[#313338] text-sm font-semibold px-4 py-2.5 rounded-lg cursor-pointer transition-colors shadow-sm">
                          📩 {t.openTicketBtn}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Welcome Message Builder */}
            <section className="bg-[#161920] border border-[#1e222b] rounded-2xl overflow-hidden shadow-sm flex flex-col h-fit">
              <div className="bg-[#1e222b]/50 px-6 py-4 border-b border-[#1e222b]">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <span className="text-[#23A559]">👋</span> {t.welcomeMsgTitle}
                </h2>
                <p className="text-xs text-[#9ca3af] mt-0.5">{t.welcomeMsgDesc}</p>
              </div>
              <div className="p-6 space-y-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.welcomeTitleLabel}</label>
                  <input 
                    type="text" 
                    value={welcomeEmbed.title}
                    onChange={(e) => setWelcomeEmbed({...welcomeEmbed, title: e.target.value})}
                    placeholder={t.welcomeTitlePlh} 
                    className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.welcomeDescLabel}</label>
                  <textarea 
                    value={welcomeEmbed.description}
                    onChange={(e) => setWelcomeEmbed({...welcomeEmbed, description: e.target.value})}
                    placeholder={t.welcomeDescPlh} 
                    className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition-colors min-h-[120px] resize-y" 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.colorLabel}</label>
                    <div className="flex gap-2">
                      <input 
                        type="color" 
                        value={welcomeEmbed.color}
                        onChange={(e) => setWelcomeEmbed({...welcomeEmbed, color: e.target.value})}
                        className="w-12 h-11 rounded-lg cursor-pointer bg-transparent border-0 p-0" 
                      />
                      <input 
                        type="text" 
                        value={welcomeEmbed.color}
                        onChange={(e) => setWelcomeEmbed({...welcomeEmbed, color: e.target.value})}
                        className="flex-1 bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.imageLabel}</label>
                    <input 
                      type="text" 
                      value={welcomeEmbed.image}
                      onChange={(e) => setWelcomeEmbed({...welcomeEmbed, image: e.target.value})}
                      placeholder="https://..." 
                      className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" 
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* SEKCJA: Właściwości, Uprawnienia i Godziny Pracy */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Właściwości */}
            <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-white mb-4">{t.ticketProps}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.categoryLabel}</label>
                  <select 
                    value={ticketCategory}
                    onChange={(e) => setTicketCategory(e.target.value)}
                    className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-pointer"
                  >
                    <option>{t.cat1}</option>
                    <option>{t.cat2}</option>
                    <option>{t.cat3}</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.formatLabel}</label>
                  <input 
                    type="text" 
                    value={ticketNaming}
                    onChange={(e) => setTicketNaming(e.target.value)}
                    className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2]" 
                  />
                </div>
              </div>
            </div>

            {/* Uprawnienia */}
            <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm">
              <h3 className="text-base font-bold text-white mb-4">{t.accessControl}</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.allowedRolesLabel}</label>
                  <select multiple className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] h-[104px] cursor-pointer custom-scrollbar">
                    <option value="admin">@Administrator</option>
                    <option value="mod">@Moderator</option>
                    <option value="support">@Support Team</option>
                    <option value="helper">@Trial Helper</option>
                  </select>
                  <p className="text-[10px] text-[#6b7280] mt-2">{t.ctrlHint}</p>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-6 shadow-sm transition-colors hover:border-[#2e3545]">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-base font-bold text-white">{t.supportHours}</h3>
                  <p className="text-xs text-[#9ca3af] mt-0.5">{t.supportHoursDesc}</p>
                </div>
                
                {/* Komponent Toggle dla godzin wsparcia */}
                <button 
                  onClick={() => setSupportHoursEnabled(!supportHoursEnabled)}
                  className={`w-12 h-6 rounded-full transition-colors relative focus:outline-none ${supportHoursEnabled ? 'bg-[#23A559]' : 'bg-[#2e3545]'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${supportHoursEnabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              {/* Pola czasowe z dynamiczną obsługą opacity/blokady */}
              <div className={`space-y-4 transition-all duration-300 ${supportHoursEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none grayscale'}`}>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.openFrom}</label>
                    <input 
                      type="time" 
                      value={supportHours.start}
                      onChange={(e) => setSupportHours({...supportHours, start: e.target.value})}
                      disabled={!supportHoursEnabled}
                      className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-text [color-scheme:dark]" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#9ca3af] uppercase tracking-wider mb-2">{t.openTo}</label>
                    <input 
                      type="time" 
                      value={supportHours.end}
                      onChange={(e) => setSupportHours({...supportHours, end: e.target.value})}
                      disabled={!supportHoursEnabled}
                      className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-text [color-scheme:dark]" 
                    />
                  </div>
                </div>
                <p className="text-xs text-yellow-500 font-medium">{t.hoursHint}</p>
              </div>
            </div>

          </div>

        </div>
      )}

      {/* ZAWARTOŚĆ ZAKŁADKI: MULTI-PANELS */}
      {activeTab === 'multi' && (
        <div className="space-y-8 animate-fadeIn max-w-4xl mx-auto">
          <div className="bg-[#161920] border border-[#1e222b] rounded-2xl p-8 shadow-sm">
            <h2 className="text-xl font-bold text-white mb-2">{t.multiTitle}</h2>
            <p className="text-sm text-[#9ca3af] mb-6">
              {t.multiDesc}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex-1">
                <select 
                  value={selectedToAdd} 
                  onChange={(e) => setSelectedToAdd(e.target.value)}
                  className="w-full bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] cursor-pointer"
                >
                  <option value="" disabled>{t.selectOptionDefault}</option>
                  {AVAILABLE_PANELS.map(panel => {
                    const translatedPanel = translatePanel(panel);
                    return (
                      <option key={panel.id} value={panel.id} disabled={multiPanels.some(p => p.id === panel.id)}>
                        {translatedPanel.name} {multiPanels.some(p => p.id === panel.id) ? t.alreadyAdded : ''}
                      </option>
                    )
                  })}
                </select>
              </div>
              <button 
                onClick={addPanelToMulti}
                className="bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-6 rounded-xl text-sm transition border border-[#2e3545] shrink-0"
              >
                {t.addOptionBtn}
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-xs font-bold text-[#6b7280] uppercase tracking-widest mb-3 flex items-center justify-between">
                {t.builtMenuTitle}
                <span className="text-[10px] bg-[#2e3545] px-2 py-0.5 rounded text-white">{multiPanels.length}/25 {t.optionsCount}</span>
              </h3>
              
              {multiPanels.length === 0 ? (
                <div className="text-center p-12 border border-dashed border-[#2e3545] rounded-xl text-[#6b7280] bg-[#101216]/50 transition-colors hover:border-[#4b5563]">
                  <div className="text-3xl mb-2">📥</div>
                  {t.emptyMenu}
                </div>
              ) : (
                <div className="space-y-2">
                  {multiPanels.map((panel, index) => {
                    const translatedPanel = translatePanel(panel);
                    return (
                      <div key={panel.id} className="flex items-center justify-between p-4 bg-[#101216] border border-[#1e222b] rounded-xl group hover:border-[#2e3545] transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-8 h-8 rounded-lg bg-[#1e222b] border border-[#2e3545] flex items-center justify-center font-bold text-[#9ca3af] text-xs">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-bold text-white text-sm">{translatedPanel.name}</p>
                            <p className="text-xs text-[#9ca3af]">{translatedPanel.description}</p>
                          </div>
                        </div>
                        <button 
                          onClick={() => removePanelFromMulti(panel.id)}
                          className="text-red-500 hover:text-white p-2 hover:bg-red-500/20 rounded-lg transition-colors cursor-pointer"
                          title={t.removeOptionTitle}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                        </button>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

      {/* FLOATING SAVE BUTTON */}
      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#161920]/80 backdrop-blur-md border-t border-[#1e222b] p-4 px-6 flex justify-end z-40">
        <button 
          onClick={handleSave} 
          disabled={isSaving}
          className={`relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
            isSaving 
            ? 'bg-[#5865F2]/50 text-white/70 cursor-not-allowed' 
            : 'bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865f2]/20'
          }`}
        >
          {isSaving ? t.savingBtn : t.saveBtn}
        </button>
      </div>

    </div>
  );
}
'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

type PanelOption = { id: string; name: string; description: string; };
const AVAILABLE_PANELS: PanelOption[] = [
  { id: 'p1', name: 'Wsparcie Techniczne', description: 'Problemy z kontem lub działaniem serwera' },
  { id: 'p2', name: 'Zgłoszenie Gracza', description: 'Zgłaszanie łamania regulaminu' },
  { id: 'p3', name: 'Pytania ogólne', description: 'Inne zapytania do administracji' },
];

const translations = {
  pl: {
    title: 'Kreator Paneli Zgłoszeń',
    subtitle: 'Zaprojektuj interfejs otwierania ticketów na serwerze i zdefiniuj zaawansowane reguły wsparcia.',
    tabStandard: 'Kreator Standardowy',
    tabMulti: 'Multi-Panels (Dropdown)',
    panelMsg: 'Panel Message',
    panelMsgDesc: 'Wiadomość publiczna na kanale, z której użytkownik klika przycisk otwarcia ticketa.',
    welcomeMsg: 'Welcome Message',
    welcomeMsgDesc: 'Wiadomość powitalna wysyłana wewnątrz nowo otwartego kanału ticketa.',
    titleLabel: 'Tytuł wiadomości',
    descLabel: 'Opisz Embedu',
    colorLabel: 'Kolor (HEX)',
    imageLabel: 'Obraz (URL)',
    preview: 'Podgląd na żywo',
    openTicket: 'Otwórz Ticket',
    properties: 'Właściwości Ticketa',
    catLabel: 'Kategoria zapisu',
    formatLabel: 'Format nazwy kanału',
    access: 'Access Control (Role)',
    rolesLabel: 'Dozwolone role wsparcia',
    hours: 'Support Hours',
    hoursDesc: 'Ogranicz czas działania panelu.',
    from: 'Otwarte od',
    to: 'Do',
    save: 'Zapisz konfigurację',
    saving: 'Zapisywanie widoku...',
  },
  en: {
    title: 'Ticket Panels Creator',
    subtitle: 'Design the ticket creation interface and define advanced support rules.',
    tabStandard: 'Standard Creator',
    tabMulti: 'Multi-Panels (Dropdown)',
    panelMsg: 'Panel Message',
    panelMsgDesc: 'Public channel message where user clicks to open a ticket.',
    welcomeMsg: 'Welcome Message',
    welcomeMsgDesc: 'Welcome message sent inside a newly opened ticket channel.',
    titleLabel: 'Message title',
    descLabel: 'Embed description',
    colorLabel: 'Color (HEX)',
    imageLabel: 'Image (URL)',
    preview: 'Live preview',
    openTicket: 'Open Ticket',
    properties: 'Ticket Properties',
    catLabel: 'Save category',
    formatLabel: 'Channel name format',
    access: 'Access Control (Roles)',
    rolesLabel: 'Allowed support roles',
    hours: 'Support Hours',
    hoursDesc: 'Limit panel operation time.',
    from: 'Open from',
    to: 'To',
    save: 'Save configuration',
    saving: 'Saving view...',
  }
};

export default function TicketsPanelPage() {
  const { addToast } = useToast();
  const { language } = useSettings();
  const t = translations[language];
  const [activeTab, setActiveTab] = useState<'standard' | 'multi'>('standard');
  const [isSaving, setIsSaving] = useState(false);
  const [panelEmbed, setPanelEmbed] = useState({ title: 'Otwórz zgłoszenie', description: 'Kliknij przycisk poniżej.', color: '#5865F2', image: '' });
  const [welcomeEmbed, setWelcomeEmbed] = useState({ title: 'Witaj!', description: 'Opisz problem.', color: '#2B2D31', image: '' });
  const [supportHoursEnabled, setSupportHoursEnabled] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast('Konfiguracja paneli zapisana!', 'success');
    setIsSaving(false);
  };

  return (
    <div className="max-w-7xl space-y-8 pb-24 relative text-text-main animate-fadeIn">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-text-muted mt-1">{t.subtitle}</p>
      </div>

      <div className="flex border-b border-border-subtle">
        <button onClick={() => setActiveTab('standard')} className={`px-6 py-4 font-semibold text-sm transition-all relative ${activeTab === 'standard' ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}>
          {t.tabStandard}
          {activeTab === 'standard' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-brand-base"></div>}
        </button>
        <button onClick={() => setActiveTab('multi')} className={`px-6 py-4 font-semibold text-sm transition-all relative ${activeTab === 'multi' ? 'text-text-main' : 'text-text-muted hover:text-text-main'}`}>
          {t.tabMulti}
          {activeTab === 'multi' && <div className="absolute bottom-[-1px] left-0 w-full h-[2px] bg-brand-base"></div>}
        </button>
      </div>

      {activeTab === 'standard' && (
        <div className="space-y-10 animate-fadeIn">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <section className="bg-surface-panel border border-border-subtle rounded-2xl overflow-hidden shadow-sm flex flex-col">
              <div className="bg-surface-base px-6 py-4 border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-main flex items-center gap-2"><span className="text-brand-base">📢</span> {t.panelMsg}</h2>
                <p className="text-xs text-text-muted mt-0.5">{t.panelMsgDesc}</p>
              </div>
              <div className="p-6 space-y-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-2">{t.titleLabel}</label>
                  <input type="text" value={panelEmbed.title} onChange={(e) => setPanelEmbed({...panelEmbed, title: e.target.value})} className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-brand-base transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-2">{t.descLabel}</label>
                  <textarea value={panelEmbed.description} onChange={(e) => setPanelEmbed({...panelEmbed, description: e.target.value})} className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-brand-base min-h-[100px]" />
                </div>
                {/* Podgląd na żywo */}
                <div className="mt-6 border-t border-border-subtle pt-6">
                  <label className="block text-xs font-bold text-text-muted uppercase mb-3">{t.preview}</label>
                  <div className="bg-[#313338] rounded-xl p-4 shadow-inner border border-[#1e222b]">
                    <div className="flex gap-3">
                      <div className="w-10 h-10 rounded-full bg-brand-base flex items-center justify-center text-xl shrink-0">🤖</div>
                      <div className="flex-1">
                        <div className="bg-[#2b2d31] border-l-4 rounded-r-lg p-4 mt-1" style={{ borderLeftColor: panelEmbed.color || 'var(--brand-base)' }}>
                          {panelEmbed.title && <h3 className="text-white font-bold mb-2">{panelEmbed.title}</h3>}
                          <div className="text-[#dbdee1] text-sm whitespace-pre-wrap">{panelEmbed.description}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            
            <section className="bg-surface-panel border border-border-subtle rounded-2xl overflow-hidden shadow-sm flex flex-col h-fit">
              <div className="bg-surface-base px-6 py-4 border-b border-border-subtle">
                <h2 className="text-lg font-semibold text-text-main flex items-center gap-2"><span className="text-status-success">👋</span> {t.welcomeMsg}</h2>
                <p className="text-xs text-text-muted mt-0.5">{t.welcomeMsgDesc}</p>
              </div>
              <div className="p-6 space-y-5 flex-1">
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-2">{t.titleLabel}</label>
                  <input type="text" value={welcomeEmbed.title} onChange={(e) => setWelcomeEmbed({...welcomeEmbed, title: e.target.value})} className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-brand-base transition-colors" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-text-muted uppercase mb-2">{t.descLabel}</label>
                  <textarea value={welcomeEmbed.description} onChange={(e) => setWelcomeEmbed({...welcomeEmbed, description: e.target.value})} className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-brand-base min-h-[120px]" />
                </div>
              </div>
            </section>
          </div>
        </div>
      )}

      {activeTab === 'multi' && (<div className="p-10 text-center text-text-muted">Multi-Panels view loaded.</div>)}

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-surface-panel/80 backdrop-blur-md border-t border-border-subtle p-4 px-6 flex justify-end z-40">
        <button onClick={handleSave} disabled={isSaving} className="bg-brand-base hover:bg-brand-hover text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg">
          {isSaving ? t.saving : t.save}
        </button>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { useSettings } from '../../contexts/SettingsContext';

const translations = {
  pl: {
    title: 'Bezpieczeństwo konta',
    subtitle: 'Zarządzaj metodami awaryjnego odzyskiwania dostępu do swojego profilu.',
    recovery: 'Kody odzyskiwania',
    recoveryDesc: 'Te kody pozwolą Ci bezpiecznie odzyskać dostęp.',
    copy: '📋 Skopiuj kody',
    gen: '⚡ Wygeneruj nowe',
    generating: '🔄 Generowanie...',
    emailTitle: 'Zapasowy adres E-mail',
    emailDesc: 'Adres wykorzystywany do przesyłania powiadomień bezpieczeństwa.',
    saveEmail: 'Zapisz e-mail'
  },
  en: {
    title: 'Account Security',
    subtitle: 'Manage methods for emergency recovery of your profile access.',
    recovery: 'Recovery codes',
    recoveryDesc: 'These codes will allow you to safely regain access.',
    copy: '📋 Copy codes',
    gen: '⚡ Generate new',
    generating: '🔄 Generating...',
    emailTitle: 'Backup E-mail address',
    emailDesc: 'Address used to send security notifications.',
    saveEmail: 'Save e-mail'
  }
};

export default function SecurityPage() {
  const { addToast } = useToast();
  const { language } = useSettings();
  const t = translations[language];
  
  const [email, setEmail] = useState('student@ujd.edu.pl');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState(['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456']);

  const handleGenerateNewCodes = () => {
    setIsGenerating(true);
    const generate = () => Array(2).fill(0).map(() => Array(4).fill(0).map(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.charAt(Math.floor(Math.random() * 36))).join('')).join('-');
    setTimeout(() => { setRecoveryCodes([generate(), generate(), generate(), generate()]); setIsGenerating(false); }, 800);
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      <div className="border-b border-border-subtle pb-5">
        <h1 className="text-2xl font-bold text-text-main tracking-tight">{t.title}</h1>
        <p className="text-text-muted text-sm mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <section className="bg-surface-panel border border-border-subtle p-6 rounded-2xl space-y-5">
          <div><h2 className="text-lg font-semibold text-text-main">{t.recovery}</h2><p className="text-sm text-text-muted mt-1">{t.recoveryDesc}</p></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recoveryCodes.map((code, index) => (
              <div key={index} className={`bg-surface-base border border-border-subtle px-4 py-3.5 rounded-xl font-mono text-center text-brand-base font-semibold text-base transition-all ${isGenerating ? 'opacity-40 scale-95' : 'opacity-100'}`}>{code}</div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={() => navigator.clipboard.writeText(recoveryCodes.join(', '))} disabled={isGenerating} className="bg-brand-base hover:bg-brand-hover text-white font-bold py-3 px-5 rounded-xl text-sm transition shadow-lg flex-1">{t.copy}</button>
            <button onClick={handleGenerateNewCodes} disabled={isGenerating} className="bg-surface-base hover:bg-border-subtle text-text-main font-semibold py-3 px-5 rounded-xl text-sm transition border border-border-subtle flex-1">{isGenerating ? t.generating : t.gen}</button>
          </div>
        </section>

        <section className="bg-surface-panel border border-border-subtle p-6 rounded-2xl space-y-4 h-fit">
          <div><h2 className="text-lg font-semibold text-text-main">{t.emailTitle}</h2><p className="text-sm text-text-muted mt-1">{t.emailDesc}</p></div>
          <div className="flex flex-col sm:flex-row gap-3">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="flex-1 bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-brand-base transition" />
            <button onClick={() => addToast('Zapisano', 'success')} className="bg-surface-base hover:bg-border-subtle text-text-main font-bold py-3 px-6 rounded-xl text-sm transition border border-border-subtle shrink-0">{t.saveEmail}</button>
          </div>
        </section>
      </div>
    </div>
  );
}
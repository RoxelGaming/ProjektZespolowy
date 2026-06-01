'use client';

import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';
import { useSettings } from '../../contexts/SettingsContext';

const translations = {
  pl: {
    title: 'Żądanie usunięcia danych (GDPR / RODO)',
    subtitle: 'Formularz pozwala na permanentne i bezpowrotne wyczyszczenie Twoich danych osobowych.',
    server: 'Wybierz Serwer',
    scope: 'Zakres zgłoszeń',
    allTickets: 'Usuń dane ze wszystkich zgłoszeń',
    specTicket: 'Tylko konkretne ID zgłoszenia',
    dataScope: 'Zakres danych',
    allMsgs: 'Wszystkie wiadomości i logi',
    attachOnly: 'Tylko załączniki multimedialne',
    warning: 'Uwaga: Operacja ta jest całkowicie nieodwracalna w świetle przepisów RODO.',
    submit: 'Wyślij oficjalne żądanie',
    success: 'Żądanie przekazane. Proces ten może potrwać do 7 dni roboczych.'
  },
  en: {
    title: 'Data Deletion Request (GDPR)',
    subtitle: 'This form allows for the permanent and irreversible clearing of your personal data.',
    server: 'Select Server',
    scope: 'Ticket scope',
    allTickets: 'Delete data from all tickets',
    specTicket: 'Only specific ticket ID',
    dataScope: 'Data scope',
    allMsgs: 'All messages and logs',
    attachOnly: 'Media attachments only',
    warning: 'Warning: This operation is completely irreversible under GDPR regulations.',
    submit: 'Send official request',
    success: 'Request submitted. This process can take up to 7 business days.'
  }
};

export default function GdprPage() {
  const { addToast } = useToast();
  const { language } = useSettings();
  const t = translations[language];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast(t.success, 'warning');
  };

  return (
    <div className="w-full space-y-6 animate-fadeIn">
      <div className="border-b border-border-subtle pb-5">
        <h1 className="text-2xl font-bold text-text-main tracking-tight">{t.title}</h1>
        <p className="text-text-muted text-sm mt-1">{t.subtitle}</p>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-panel border border-border-subtle p-8 rounded-2xl flex flex-col gap-6 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase mb-2">{t.server}</label>
              <select className="w-full bg-surface-base border border-border-subtle rounded-xl px-4 py-3 text-sm text-text-main focus:outline-none focus:border-brand-base">
                <option>Projekt Zespołowy Dev</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase mb-3">{t.scope}</label>
              <div className="flex flex-col gap-4 text-sm text-text-main">
                <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="req" defaultChecked className="w-4 h-4 text-brand-base" /> {t.allTickets}</label>
                <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="req" className="w-4 h-4 text-brand-base" /> {t.specTicket}</label>
              </div>
            </div>
          </div>

          <div className="space-y-6 border-t md:border-t-0 md:border-l border-border-subtle pt-6 md:pt-0 md:pl-8">
            <div>
              <label className="block text-xs font-bold text-text-muted uppercase mb-3">{t.dataScope}</label>
              <div className="flex flex-col gap-4 text-sm text-text-main">
                <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="scp" defaultChecked className="w-4 h-4 text-brand-base" /> {t.allMsgs}</label>
                <label className="flex items-center gap-3 cursor-pointer"><input type="radio" name="scp" className="w-4 h-4 text-brand-base" /> {t.attachOnly}</label>
              </div>
            </div>
            <div className="p-4 bg-status-warning/10 border border-status-warning/20 rounded-xl text-xs text-text-muted">{t.warning}</div>
            <button type="submit" className="w-full bg-status-error hover:bg-red-700 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-lg mt-auto">{t.submit}</button>
          </div>
        </div>
      </form>
    </div>
  );
}
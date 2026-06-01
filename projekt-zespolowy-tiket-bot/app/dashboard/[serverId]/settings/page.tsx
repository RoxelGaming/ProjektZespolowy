"use client"

import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

type FormField = { id: number; question: string; isRequired: boolean; };

const translations = {
  pl: {
    title: 'Formularze bota',
    subtitle: 'Zarządzaj konfiguracją i formularzami wejściowymi dla swoich ticketów.',
    generalForms: 'Formularze ogólne',
    langPrefix: 'Język i Prefiksy',
    mainPrefix: 'Główny prefiks',
    botLang: 'Język wiadomości bota',
    inputForm: 'Formularz wejściowy',
    addQuestion: '+ Dodaj pytanie',
    qPlaceholder: 'Treść pytania...',
    required: 'Wymagane',
    saveChanges: 'Zapisz zmiany',
    saving: 'Zapisywanie...',
    errEmpty: 'Wypełnij treść wszystkich pytań przed zapisaniem!',
    errLast: 'Musisz zostawić przynajmniej jedno pytanie!',
    delSuccess: 'Pytanie usunięte z kolejki.',
    saveSuccess: 'Ustawienia zostały pomyślnie zapisane w bazie!'
  },
  en: {
    title: 'Bot Forms',
    subtitle: 'Manage configurations and input forms for your tickets.',
    generalForms: 'General Forms',
    langPrefix: 'Language & Prefixes',
    mainPrefix: 'Main prefix',
    botLang: 'Bot language',
    inputForm: 'Input Form',
    addQuestion: '+ Add question',
    qPlaceholder: 'Question text...',
    required: 'Required',
    saveChanges: 'Save changes',
    saving: 'Saving...',
    errEmpty: 'Fill in all questions before saving!',
    errLast: 'You must leave at least one question!',
    delSuccess: 'Question removed from queue.',
    saveSuccess: 'Settings successfully saved to database!'
  }
};

export default function SettingsPage() {
  const { addToast } = useToast();
  const { language } = useSettings();
  const t = translations[language];

  const [customFields, setCustomFields] = useState<FormField[]>([{ id: 1, question: '', isRequired: false }]);
  const [isSaving, setIsSaving] = useState(false);

  const addField = () => setCustomFields([...customFields, { id: Date.now(), question: '', isRequired: false }]);
  
  const removeField = (id: number) => {
    if (customFields.length === 1) {
      addToast(t.errLast, 'warning');
      return;
    }
    setCustomFields(customFields.filter(field => field.id !== id));
    addToast(t.delSuccess, 'info');
  };

  const updateField = (id: number, key: keyof FormField, value: string | boolean) => {
    setCustomFields(customFields.map(field => field.id === id ? { ...field, [key]: value } : field));
  };

  const handleSave = async () => {
    if (isSaving) return;
    if (customFields.some(f => f.question.trim() === '')) {
      addToast(t.errEmpty, 'error');
      return;
    }
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    addToast(t.saveSuccess, 'success');
    setIsSaving(false);
  };

  return (
    <div className="w-full space-y-10 pb-24 relative text-text-main animate-fadeIn">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
        <p className="text-text-muted mt-1">{t.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* LEWA STRONA */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-border-subtle pb-2">{t.generalForms}</h2>
          
          <details open className="group bg-surface-panel border border-border-subtle rounded-xl overflow-hidden cursor-pointer shadow-sm">
            <summary className="p-4 font-medium hover:bg-surface-base transition-colors list-none flex justify-between items-center select-none">
              {t.langPrefix}
              <span className="text-text-muted group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="p-4 border-t border-border-subtle bg-surface-base space-y-5 cursor-default">
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">{t.mainPrefix}</label>
                <input type="text" defaultValue="!" className="w-full bg-surface-panel border border-border-subtle rounded-xl p-3 text-text-main focus:outline-none focus:border-brand-base transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-text-muted mb-1.5">{t.botLang}</label>
                <select className="w-full bg-surface-panel border border-border-subtle rounded-xl p-3 text-text-main focus:outline-none focus:border-brand-base transition-colors">
                  <option value="pl">Polski</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </details>
        </section>

        {/* PRAWA STRONA */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-border-subtle pb-2">
            <h2 className="text-xl font-semibold">{t.inputForm}</h2>
            <button onClick={addField} className="text-sm bg-brand-base/20 text-brand-base hover:bg-brand-base/30 px-4 py-2 rounded-xl transition-colors font-semibold">
              {t.addQuestion}
            </button>
          </div>
          
          <div className="space-y-4">
            {customFields.map((field, index) => (
              <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-5 bg-surface-panel border border-border-subtle rounded-xl shadow-sm">
                <div className="flex text-text-muted font-mono text-sm pt-2 sm:pt-0 font-bold">#{index + 1}</div>
                <div className="flex-1 w-full">
                  <input type="text" placeholder={t.qPlaceholder} value={field.question} onChange={(e) => updateField(field.id, 'question', e.target.value)} className="w-full bg-surface-base border border-border-subtle rounded-xl p-3 text-text-main focus:outline-none focus:border-brand-base transition-colors" />
                </div>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={field.isRequired} onChange={(e) => updateField(field.id, 'isRequired', e.target.checked)} className="w-4 h-4 rounded bg-surface-base border-border-subtle text-brand-base" />
                    <span className="text-sm text-text-muted select-none">{t.required}</span>
                  </label>
                  <button onClick={() => removeField(field.id)} className="text-status-error p-2 hover:bg-status-error/10 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-surface-panel/80 backdrop-blur-md border-t border-border-subtle p-4 px-6 flex justify-end z-40">
        <button 
          onClick={handleSave} disabled={isSaving}
          className={`relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${isSaving ? 'bg-brand-base/50 text-white/70 cursor-not-allowed' : 'bg-brand-base hover:bg-brand-hover text-white shadow-lg shadow-brand-base/20'}`}
        >
          {isSaving ? t.saving : t.saveChanges}
        </button>
      </div>
    </div>
  );
}
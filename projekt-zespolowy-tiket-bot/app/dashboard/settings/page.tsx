"use client"

import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

type FormField = {
  id: number;
  question: string;
  isRequired: boolean;
};

export default function SettingsPage() {
  const { addToast } = useToast();
  
  const [customFields, setCustomFields] = useState<FormField[]>([
    { id: 1, question: '', isRequired: false }
  ]);

  const [isSaving, setIsSaving] = useState(false);

  const addField = () => {
    setCustomFields([
      ...customFields, 
      { id: Date.now(), question: '', isRequired: false }
    ]);
  };

  const removeField = (id: number) => {
    setCustomFields(customFields.filter(field => field.id !== id));
  };

  const updateField = (id: number, key: keyof FormField, value: string | boolean) => {
    setCustomFields(customFields.map(field => 
      field.id === id ? { ...field, [key]: value } : field
    ));
  };

  const handleSave = async () => {
    if (isSaving) return;
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToast('Ustawienia zostały pomyślnie zapisane!', 'success');
    setIsSaving(false);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-24 relative text-text-main">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ustawienia bota</h1>
        <p className="text-text-muted mt-1">Zarządzaj konfiguracją i formularzami wejściowymi dla swoich ticketów.</p>
      </div>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold border-b border-border-subtle pb-2">Ustawienia ogólne</h2>
        
        <details className="group bg-surface-panel border border-border-subtle rounded-xl overflow-hidden cursor-pointer">
          <summary className="p-4 font-medium hover:bg-surface-base transition-colors list-none flex justify-between items-center">
            Język i Prefiksy
            <span className="text-text-muted group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="p-4 border-t border-border-subtle bg-surface-base/50 space-y-4 cursor-default">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Główny prefiks</label>
              <input type="text" defaultValue="!" className="w-full bg-surface-panel border border-border-subtle rounded-md p-2 text-text-main focus:outline-none focus:border-brand-base" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Język wiadomości bota</label>
              <select className="w-full bg-surface-panel border border-border-subtle rounded-md p-2 text-text-main focus:outline-none focus:border-brand-base">
                <option value="pl">Polski</option>
                <option value="en">English</option>
              </select>
            </div>
          </div>
        </details>

        <details className="group bg-surface-panel border border-border-subtle rounded-xl overflow-hidden cursor-pointer">
          <summary className="p-4 font-medium hover:bg-surface-base transition-colors list-none flex justify-between items-center">
            Limity Ticketów
            <span className="text-text-muted group-open:rotate-180 transition-transform">▼</span>
          </summary>
          <div className="p-4 border-t border-border-subtle bg-surface-base/50 space-y-4 cursor-default">
            <div>
              <label className="block text-sm font-medium text-text-muted mb-1">Maksymalna ilość otwartych ticketów na użytkownika</label>
              <input type="number" defaultValue="3" min="1" max="10" className="w-full bg-surface-panel border border-border-subtle rounded-md p-2 text-text-main focus:outline-none focus:border-brand-base" />
            </div>
          </div>
        </details>
      </section>

      <section className="space-y-4">
        <div className="flex justify-between items-center border-b border-border-subtle pb-2">
          <h2 className="text-xl font-semibold">Formularz wejściowy</h2>
          <button 
            onClick={addField}
            className="text-sm bg-brand-base/20 text-brand-light hover:bg-brand-base/30 px-3 py-1.5 rounded-md transition-colors font-medium"
          >
            + Dodaj pytanie
          </button>
        </div>
        
        <p className="text-sm text-text-muted">Pytania, na które użytkownik musi odpowiedzieć przed otwarciem zgłoszenia.</p>

        <div className="space-y-3">
          {customFields.length === 0 && (
            <div className="text-center p-8 border border-dashed border-border-subtle rounded-xl text-text-muted">
              Brak pytań. Kliknij "Dodaj pytanie", aby rozpocząć.
            </div>
          )}

          {customFields.map((field, index) => (
            <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-4 bg-surface-panel border border-border-subtle rounded-xl">
              <div className="flex text-text-muted font-mono text-sm pt-2 sm:pt-0">
                #{index + 1}
              </div>
              
              <div className="flex-1 w-full">
                <input 
                  type="text" 
                  placeholder="Treść pytania, np. Podaj swój nick w grze..." 
                  value={field.question}
                  onChange={(e) => updateField(field.id, 'question', e.target.value)}
                  className="w-full bg-surface-base border border-border-subtle rounded-md p-2 text-text-main focus:outline-none focus:border-brand-base placeholder-text-muted"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={field.isRequired}
                    onChange={(e) => updateField(field.id, 'isRequired', e.target.checked)}
                    className="w-4 h-4 rounded bg-surface-base border-border-subtle text-brand-base focus:ring-brand-base focus:ring-offset-surface-panel"
                  />
                  <span className="text-sm text-text-muted">Wymagane</span>
                </label>

                <button 
                  onClick={() => removeField(field.id)}
                  className="text-status-error hover:text-status-error/80 p-2 hover:bg-status-error/10 rounded-md transition-colors"
                  title="Usuń pytanie"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"></path>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-surface-base/80 backdrop-blur-md border-t border-border-subtle p-4 px-6 flex justify-end z-40">
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className={`
            relative flex items-center justify-center gap-2 px-6 py-2.5 rounded-md font-medium transition-all
            ${isSaving 
              ? 'bg-brand-base/50 text-text-main/70 cursor-not-allowed' 
              : 'bg-brand-base hover:bg-brand-hover text-text-main shadow-lg shadow-brand-base/20'
            }
          `}
        >
          {isSaving ? (
            <>
              <svg className="animate-spin h-5 w-5 text-text-main" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Zapisywanie...
            </>
          ) : (
            'Zapisz zmiany'
          )}
        </button>
      </div>

    </div>
  );
}
"use client"

import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext';

type FormField = { id: number; question: string; isRequired: boolean; };

export default function SettingsPage() {
  const { addToast } = useToast();
  const [customFields, setCustomFields] = useState<FormField[]>([{ id: 1, question: '', isRequired: false }]);
  const [isSaving, setIsSaving] = useState(false);

  const addField = () => setCustomFields([...customFields, { id: Date.now(), question: '', isRequired: false }]);
  
  const removeField = (id: number) => {
    // Zapobieganie usunięciu wszystkich pytań (przykład użycia 'warning')
    if (customFields.length === 1) {
      addToast('Musisz zostawić przynajmniej jedno pytanie!', 'warning');
      return;
    }
    setCustomFields(customFields.filter(field => field.id !== id));
    addToast('Pytanie usunięte z kolejki.', 'info');
  };
  
  const updateField = (id: number, key: keyof FormField, value: string | boolean) => {
    setCustomFields(customFields.map(field => field.id === id ? { ...field, [key]: value } : field));
  };

  const handleSave = async () => {
    if (isSaving) return;
    
    // Przykładowa symulacja błędu, jeśli pole jest puste
    if (customFields.some(f => f.question.trim() === '')) {
      addToast('Wypełnij treść wszystkich pytań przed zapisaniem!', 'error');
      return;
    }

    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    addToast('Ustawienia zostały pomyślnie zapisane w bazie!', 'success');
    setIsSaving(false);
  };

  return (
    // Zmiana na w-full, żeby kontener zajął całą przestrzeń
    <div className="w-full space-y-10 pb-24 relative text-white animate-fadeIn">
      
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Ustawienia bota</h1>
        <p className="text-[#9ca3af] mt-1">Zarządzaj konfiguracją i formularzami wejściowymi dla swoich ticketów.</p>
      </div>

      {/* Grid: 1 kolumna na mobile, 2 kolumny na dużych ekranach XL */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        
        {/* LEWA STRONA */}
        <section className="space-y-4">
          <h2 className="text-xl font-semibold border-b border-[#1e222b] pb-2">Ustawienia ogólne</h2>
          
          <details open className="group bg-[#161920] border border-[#1e222b] rounded-xl overflow-hidden cursor-pointer shadow-sm">
            <summary className="p-4 font-medium hover:bg-[#1e222b] transition-colors list-none flex justify-between items-center select-none">
              Język i Prefiksy
              <span className="text-[#9ca3af] group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="p-4 border-t border-[#1e222b] bg-[#101216] space-y-5 cursor-default">
              <div>
                <label className="block text-sm font-medium text-[#9ca3af] mb-1.5">Główny prefiks</label>
                <input type="text" defaultValue="!" className="w-full bg-[#161920] border border-[#1e222b] rounded-xl p-3 text-white focus:outline-none focus:border-[#5865F2] transition-colors" />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#9ca3af] mb-1.5">Język wiadomości bota</label>
                <select className="w-full bg-[#161920] border border-[#1e222b] rounded-xl p-3 text-white focus:outline-none focus:border-[#5865F2] transition-colors">
                  <option value="pl">Polski</option>
                  <option value="en">English</option>
                </select>
              </div>
            </div>
          </details>
        </section>

        {/* PRAWA STRONA */}
        <section className="space-y-4">
          <div className="flex justify-between items-center border-b border-[#1e222b] pb-2">
            <h2 className="text-xl font-semibold">Formularz wejściowy</h2>
            <button onClick={addField} className="text-sm bg-[#5865F2]/20 text-[#5865F2] hover:bg-[#5865F2]/30 px-4 py-2 rounded-xl transition-colors font-semibold">
              + Dodaj pytanie
            </button>
          </div>
          
          <div className="space-y-4">
            {customFields.map((field, index) => (
              <div key={field.id} className="flex flex-col sm:flex-row gap-4 items-start sm:items-center p-5 bg-[#161920] border border-[#1e222b] rounded-xl shadow-sm">
                <div className="flex text-[#9ca3af] font-mono text-sm pt-2 sm:pt-0 font-bold">#{index + 1}</div>
                <div className="flex-1 w-full">
                  <input type="text" placeholder="Treść pytania..." value={field.question} onChange={(e) => updateField(field.id, 'question', e.target.value)} className="w-full bg-[#101216] border border-[#1e222b] rounded-xl p-3 text-white focus:outline-none focus:border-[#5865F2] transition-colors" />
                </div>
                <div className="flex items-center gap-5">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={field.isRequired} onChange={(e) => updateField(field.id, 'isRequired', e.target.checked)} className="w-4 h-4 rounded bg-[#101216] border-[#1e222b] text-[#5865F2]" />
                    <span className="text-sm text-[#9ca3af] select-none">Wymagane</span>
                  </label>
                  <button onClick={() => removeField(field.id)} className="text-red-500 p-2 hover:bg-red-500/10 rounded-xl transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 md:left-64 bg-[#161920]/80 backdrop-blur-md border-t border-[#1e222b] p-4 px-6 flex justify-end z-40">
        <button 
          onClick={handleSave} disabled={isSaving}
          className={`relative flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${isSaving ? 'bg-[#5865F2]/50 text-white/70 cursor-not-allowed' : 'bg-[#5865F2] hover:bg-[#4752C4] text-white shadow-lg shadow-[#5865f2]/20'}`}
        >
          {isSaving ? 'Zapisywanie...' : 'Zapisz zmiany'}
        </button>
      </div>
    </div>
  );
}
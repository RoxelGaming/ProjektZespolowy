"use client"

import { useState } from 'react';
import { useToast } from '../../../contexts/ToastContext';

export default function ImportExportPage() {
  const { addToast } = useToast();
  
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importJson, setImportJson] = useState('');

  const handleExport = async () => {
    if (isExporting) return;
    setIsExporting(true);
    // Symulacja generowania pliku
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast('Configuration exported successfully!', 'success');
    setIsExporting(false);
  };

  const handleImport = async () => {
    if (!importJson.trim()) {
      addToast('Wklej kod JSON w pole tekstowe!', 'error');
      return;
    }
    if (isImporting) return;
    setIsImporting(true);
    // Symulacja ładowania do bazy danych
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToast('Settings imported successfully!', 'success');
    setIsImporting(false);
    setImportJson('');
  };

  return (
    <div className="w-full space-y-8 animate-fadeIn text-white">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Kopie Zapasowe i Migracja</h1>
        <p className="text-[#9ca3af] mt-1">Eksportuj konfigurację swojego bota do pliku lub przywróć ją z gotowego kodu JSON.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* KARTA EXPORTU */}
        <section className="bg-[#161920] border border-[#1e222b] rounded-2xl p-8 flex flex-col justify-between shadow-sm">
          <div>
            <div className="w-12 h-12 bg-[#5865F2]/10 rounded-xl flex items-center justify-center text-[#5865F2] mb-6">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </div>
            <h2 className="text-xl font-bold mb-2">Export Settings</h2>
            <p className="text-sm text-[#9ca3af] mb-8 leading-relaxed">
              Wygeneruj pełną kopię zapasową swoich ustawień, paneli, etykiet i filtrów. Zapisz plik na dysku, aby móc szybko odtworzyć serwer w przyszłości.
            </p>
          </div>
          
          <button 
            onClick={handleExport} disabled={isExporting}
            className="w-full bg-[#1e222b] hover:bg-[#2e3545] text-white font-bold py-3.5 px-4 rounded-xl transition-all border border-[#2e3545] flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isExporting ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5 text-[#5865F2]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Generowanie pliku...
              </span>
            ) : 'Pobierz Konfigurację (Download)'}
          </button>
        </section>

        {/* KARTA IMPORTU */}
        <section className="bg-[#161920] border border-[#1e222b] rounded-2xl p-8 flex flex-col shadow-sm">
          <div className="w-12 h-12 bg-[#23A559]/10 rounded-xl flex items-center justify-center text-[#23A559] mb-6">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <h2 className="text-xl font-bold mb-2">Import Settings</h2>
          <p className="text-sm text-[#9ca3af] mb-6">
            Wklej wygenerowany wcześniej kod JSON, aby błyskawicznie nadpisać obecną konfigurację. Uwaga: Ta akcja jest nieodwracalna.
          </p>

          <textarea 
            value={importJson}
            onChange={(e) => setImportJson(e.target.value)}
            placeholder='{"server_id": "123", "panels": [...]}' 
            className="w-full flex-1 bg-[#101216] border border-[#2e3545] rounded-xl p-4 text-sm text-[#9ca3af] font-mono focus:outline-none focus:border-[#5865F2] resize-none min-h-[140px] mb-6"
          />

          <button 
            onClick={handleImport} disabled={isImporting}
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3.5 px-4 rounded-xl transition-all shadow-lg shadow-[#5865f2]/20 flex items-center justify-center gap-2 disabled:opacity-50 mt-auto"
          >
            {isImporting ? 'Wgrywanie ustawień...' : 'Importuj (Overwrite Settings)'}
          </button>
        </section>

      </div>
    </div>
  );
}
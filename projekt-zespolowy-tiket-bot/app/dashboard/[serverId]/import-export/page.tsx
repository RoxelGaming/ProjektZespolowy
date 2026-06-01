'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

export default function ImportExportPage() {
  const { addToast } = useToast();
  const { language } = useSettings(); // Pobieranie aktualnego języka
  
  // Bezpieczne pobieranie parametrów (chroni przed błędem "params is a Promise")
  const params = useParams();
  const serverId = params?.serverId as string;

  // ==========================================
  // STANY DLA EKSPORTU
  // ==========================================
  const [isExportingDB, setIsExportingDB] = useState(false);
  const [isExportingSettings, setIsExportingSettings] = useState(false);

  // ==========================================
  // STANY DLA IMPORTU USTAWIEŃ (JSON)
  // ==========================================
  const [isImportingSettings, setIsImportingSettings] = useState(false);
  const [selectedSettingsFile, setSelectedSettingsFile] = useState<File | null>(null);
  const [isDraggingSettings, setIsDraggingSettings] = useState(false);
  const settingsFileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // STANY DLA IMPORTU BAZY DANYCH (SQL/JSON)
  // ==========================================
  const [isImportingDB, setIsImportingDB] = useState(false);
  const [selectedDBFile, setSelectedDBFile] = useState<File | null>(null);
  const [isDraggingDB, setIsDraggingDB] = useState(false);
  const dbFileInputRef = useRef<HTMLInputElement>(null);

  // ==========================================
  // SŁOWNIK TŁUMACZEŃ (PL / EN)
  // ==========================================
  const t = {
    title: language === 'pl' ? 'Narzędzia Importu / Eksportu' : 'Import / Export Tools',
    subtitle: language === 'pl' 
      ? `Zarządzaj kopiami zapasowymi serwera (ID: ${serverId}) oraz przenoś konfigurację bota.` 
      : `Manage backups for the server (ID: ${serverId}) and transfer bot configuration.`,
    
    // Eksport
    exportTitle: language === 'pl' ? 'Pobieranie danych (Eksport)' : 'Download data (Export)',
    exportDbTitle: language === 'pl' ? 'Baza Danych (Tickety i Logi)' : 'Database (Tickets & Logs)',
    exportDbDesc: language === 'pl' 
      ? 'Pobierz pełny zrzut bazy danych serwera. Plik zawiera wszystkie zgłoszenia, transkrypty i statystyki administracyjne.' 
      : 'Download a full database dump of the server. The file contains all tickets, transcripts, and admin stats.',
    exportDbBtn: language === 'pl' ? 'Pobierz zrzut bazy' : 'Download DB dump',
    exportDbLoading: language === 'pl' ? 'Przygotowywanie paczki...' : 'Preparing archive...',
    
    exportSetTitle: language === 'pl' ? 'Konfiguracja Bota' : 'Bot Configuration',
    exportSetDesc: language === 'pl' 
      ? 'Wygeneruj lekki plik `.json` zawierający tylko ustawienia paneli, formularze i role. Idealne do klonowania serwerów.' 
      : 'Generate a lightweight `.json` file containing only panel settings, forms, and roles. Perfect for cloning servers.',
    exportSetBtn: language === 'pl' ? 'Pobierz plik JSON' : 'Download JSON file',
    exportSetLoading: language === 'pl' ? 'Generowanie pliku...' : 'Generating file...',
    
    // Import
    importTitle: language === 'pl' ? 'Wgrywanie danych (Import)' : 'Upload data (Import)',
    importSetTitle: language === 'pl' ? 'Import Ustawień Bota' : 'Import Bot Settings',
    importSetDesc: language === 'pl' ? 'Wgraj plik konfiguracyjny `.json`.' : 'Upload the `.json` configuration file.',
    importSetWarning: language === 'pl' ? 'Obecne ustawienia paneli i ról zostaną nadpisane.' : 'Current panel and role settings will be overwritten.',
    importSetBtn: language === 'pl' ? 'Zatwierdź ustawienia' : 'Confirm settings',
    importSetLoading: language === 'pl' ? 'Wgrywanie...' : 'Uploading...',
    
    importDbTitle: language === 'pl' ? 'Przywracanie Bazy Danych' : 'Restore Database',
    importDbDesc: language === 'pl' ? 'Wgraj plik zrzutu bazy (`.sql`, `.db`, `.json`).' : 'Upload database dump file (`.sql`, `.db`, `.json`).',
    importDbWarning: language === 'pl' ? 'Obecne tickety i historia zostaną całkowicie zniszczone i zastąpione zrzutem!' : 'Current tickets and history will be completely destroyed and replaced by the dump!',
    importDbBtn: language === 'pl' ? 'Zatwierdź i nadpisz bazę' : 'Confirm and overwrite DB',
    importDbLoading: language === 'pl' ? 'Odtwarzanie bazy...' : 'Restoring database...',

    // Wspólne elementy strefy Dropzone
    dragSettingsFile: language === 'pl' ? 'Przeciągnij plik konfiguracyjny' : 'Drag and drop config file',
    dragDbFile: language === 'pl' ? 'Przeciągnij plik bazy danych' : 'Drag and drop database file',
    browseDisk: language === 'pl' ? 'Przeglądaj dysk' : 'Browse files',
    warningLabel: language === 'pl' ? 'Uwaga:' : 'Warning:',
    criticalLabel: language === 'pl' ? 'Krytyczne:' : 'Critical:',

    // Toasty (Komunikaty błędu i sukcesu)
    toastExpDbSucc: language === 'pl' ? 'Zrzut bazy danych (SQL/JSON) został wygenerowany i pobrany.' : 'Database dump (SQL/JSON) generated and downloaded.',
    toastExpSetSucc: language === 'pl' ? 'Ustawienia panelu zostały wyeksportowane do pliku JSON.' : 'Panel settings exported to JSON file.',
    toastInvalidSetFmt: language === 'pl' ? 'Niewłaściwy format! Ustawienia wymagają pliku .json' : 'Invalid format! Settings require a .json file.',
    toastSelSetFirst: language === 'pl' ? 'Wybierz najpierw plik z ustawieniami!' : 'Select a settings file first!',
    toastImpSetSucc: language === 'pl' ? 'Konfiguracja bota została nadpisana pomyślnie!' : 'Bot configuration successfully overwritten!',
    toastInvalidDbFmt: language === 'pl' ? 'Niewłaściwy format! Wymagany plik .sql, .db lub .json' : 'Invalid format! .sql, .db, or .json file required.',
    toastSelDbFirst: language === 'pl' ? 'Wybierz najpierw plik z bazą danych!' : 'Select a database file first!',
    toastImpDbSucc: language === 'pl' ? 'Baza danych została w pełni przywrócona!' : 'Database successfully restored!',
  };

  // ==========================================
  // FUNKCJE EKSPORTU
  // ==========================================
  const handleExportDB = async () => {
    setIsExportingDB(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToast(t.toastExpDbSucc, 'success');
    setIsExportingDB(false);
  };

  const handleExportSettings = async () => {
    setIsExportingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast(t.toastExpSetSucc, 'success');
    setIsExportingSettings(false);
  };

  // ==========================================
  // FUNKCJE IMPORTU: USTAWIENIA
  // ==========================================
  const handleDropSettings = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingSettings(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      if (file.name.endsWith('.json')) {
        setSelectedSettingsFile(file);
      } else {
        addToast(t.toastInvalidSetFmt, 'error');
      }
    }
  };

  const handleImportSettings = async () => {
    if (!selectedSettingsFile) {
      addToast(t.toastSelSetFirst, 'error');
      return;
    }
    setIsImportingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    addToast(t.toastImpSetSucc, 'success');
    setSelectedSettingsFile(null);
    setIsImportingSettings(false);
  };

  // ==========================================
  // FUNKCJE IMPORTU: BAZA DANYCH
  // ==========================================
  const handleDropDB = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingDB(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0];
      // Akceptujemy typowe formaty bazodanowe
      if (file.name.endsWith('.json') || file.name.endsWith('.sql') || file.name.endsWith('.db')) {
        setSelectedDBFile(file);
      } else {
        addToast(t.toastInvalidDbFmt, 'error');
      }
    }
  };

  const handleImportDB = async () => {
    if (!selectedDBFile) {
      addToast(t.toastSelDbFirst, 'error');
      return;
    }
    setIsImportingDB(true);
    await new Promise(resolve => setTimeout(resolve, 3500));
    addToast(t.toastImpDbSucc, 'success');
    setSelectedDBFile(null);
    setIsImportingDB(false);
  };

  return (
    <div className="max-w-6xl space-y-10 animate-fadeIn">
      
      {/* Nagłówek */}
      <div className="border-b border-[#1e222b] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">{t.title}</h1>
        <p className="text-[#9ca3af] text-sm mt-1">{t.subtitle}</p>
      </div>

      {/* SEKCJA 1: EKSPORT */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-[#5865F2]">📤</span> {t.exportTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Eksport Bazy Danych */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#1e222b] rounded-xl flex items-center justify-center text-xl mb-4 border border-[#2e3545]">
                🗄️
              </div>
              <h3 className="text-md font-semibold text-white">{t.exportDbTitle}</h3>
              <p className="text-sm text-[#9ca3af] mt-2 mb-6">
                {t.exportDbDesc}
              </p>
            </div>
            <button 
              onClick={handleExportDB}
              disabled={isExportingDB}
              className="w-full bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-4 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isExportingDB ? `⏳ ${t.exportDbLoading}` : `💾 ${t.exportDbBtn}`}
            </button>
          </section>

          {/* Eksport Ustawień */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#1e222b] rounded-xl flex items-center justify-center text-xl mb-4 border border-[#2e3545]">
                ⚙️
              </div>
              <h3 className="text-md font-semibold text-white">{t.exportSetTitle}</h3>
              <p className="text-sm text-[#9ca3af] mt-2 mb-6">
                {t.exportSetDesc}
              </p>
            </div>
            <button 
              onClick={handleExportSettings}
              disabled={isExportingSettings}
              className="w-full bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-4 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isExportingSettings ? `⏳ ${t.exportSetLoading}` : `📄 ${t.exportSetBtn}`}
            </button>
          </section>

        </div>
      </div>

      {/* SEKCJA 2: IMPORT */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-[#5865F2]">📥</span> {t.importTitle}
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Import Ustawień */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col">
            <h3 className="text-md font-semibold text-white mb-1">{t.importSetTitle}</h3>
            <p className="text-sm text-[#9ca3af] mb-4">{t.importSetDesc}</p>
            
            <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-xs text-[#9ca3af] mb-5">
              <strong className="text-yellow-500">{t.warningLabel}</strong> {t.importSetWarning}
            </div>

            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDraggingSettings(true); }}
              onDragLeave={() => setIsDraggingSettings(false)}
              onDrop={handleDropSettings}
              className={`flex-1 border-2 border-dashed rounded-xl p-6 text-center transition-all flex flex-col justify-center items-center ${
                isDraggingSettings ? 'border-[#5865F2] bg-[#5865f2]/5' : 'border-[#2e3545] hover:border-[#4b5563]'
              }`}
            >
              <div className="text-3xl mb-2">📄</div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {selectedSettingsFile ? selectedSettingsFile.name : t.dragSettingsFile}
              </h4>
              <input type="file" accept=".json" className="hidden" ref={settingsFileInputRef} onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) setSelectedSettingsFile(e.target.files[0]);
              }} />
              <button onClick={() => settingsFileInputRef.current?.click()} className="mt-3 text-[#9ca3af] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2e3545] bg-[#1e222b]">
                {t.browseDisk}
              </button>
            </div>

            <button 
              onClick={handleImportSettings} disabled={!selectedSettingsFile || isImportingSettings}
              className="mt-4 w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/10 disabled:opacity-50"
            >
              {isImportingSettings ? t.importSetLoading : t.importSetBtn}
            </button>
          </section>

          {/* Import Bazy Danych */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col">
            <h3 className="text-md font-semibold text-white mb-1">{t.importDbTitle}</h3>
            <p className="text-sm text-[#9ca3af] mb-4">{t.importDbDesc}</p>
            
            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-[#9ca3af] mb-5">
              <strong className="text-red-400">{t.criticalLabel}</strong> {t.importDbWarning}
            </div>

            <div 
              onDragOver={(e) => { e.preventDefault(); setIsDraggingDB(true); }}
              onDragLeave={() => setIsDraggingDB(false)}
              onDrop={handleDropDB}
              className={`flex-1 border-2 border-dashed rounded-xl p-6 text-center transition-all flex flex-col justify-center items-center ${
                isDraggingDB ? 'border-red-500 bg-red-500/5' : 'border-[#2e3545] hover:border-[#4b5563]'
              }`}
            >
              <div className="text-3xl mb-2">🗄️</div>
              <h4 className="text-sm font-semibold text-white mb-1">
                {selectedDBFile ? selectedDBFile.name : t.dragDbFile}
              </h4>
              <input type="file" accept=".json,.sql,.db" className="hidden" ref={dbFileInputRef} onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) setSelectedDBFile(e.target.files[0]);
              }} />
              <button onClick={() => dbFileInputRef.current?.click()} className="mt-3 text-[#9ca3af] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2e3545] bg-[#1e222b]">
                {t.browseDisk}
              </button>
            </div>

            <button 
              onClick={handleImportDB} disabled={!selectedDBFile || isImportingDB}
              className="mt-4 w-full bg-[#DA373C] hover:bg-[#c92f33] text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-[#DA373C]/10 disabled:opacity-50"
            >
              {isImportingDB ? t.importDbLoading : t.importDbBtn}
            </button>
          </section>

        </div>
      </div>

    </div>
  );
}
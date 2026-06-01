'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';
import { useSettings } from '../../../contexts/SettingsContext';

const translations = {
  pl: {
    title: 'Narzędzia Importu / Eksportu',
    subtitle: 'Zarządzaj kopiami zapasowymi serwera oraz przenoś konfigurację bota.',
    exportTitle: 'Pobieranie danych (Eksport)',
    exportDB: 'Baza Danych (Tickety i Logi)',
    exportDBDesc: 'Pobierz pełny zrzut bazy danych serwera. Plik zawiera wszystkie zgłoszenia, transkrypty i statystyki administracyjne.',
    exportDBBtn: 'Pobierz zrzut bazy',
    exportSettings: 'Konfiguracja Bota',
    exportSettingsDesc: 'Wygeneruj lekki plik .json zawierający tylko ustawienia paneli, formularze i role. Idealne do klonowania serwerów.',
    exportSettingsBtn: 'Pobierz plik JSON',
    importTitle: 'Wgrywanie danych (Import)',
    importSettings: 'Import Ustawień Bota',
    importSettingsDesc: 'Wgraj plik konfiguracyjny .json.',
    importSettingsWarn: 'Uwaga: Obecne ustawienia paneli i ról zostaną nadpisane.',
    importDB: 'Przywracanie Bazy Danych',
    importDBDesc: 'Wgraj plik zrzutu bazy (.sql, .db, .json).',
    importDBWarn: 'Krytyczne: Obecne tickety i historia zostaną całkowicie zniszczone i zastąpione zrzutem!',
    dragFile: 'Przeciągnij plik tutaj',
    browseDisk: 'Przeglądaj dysk',
    uploadBtn: 'Zatwierdź',
    loading: 'Przetwarzanie...',
  },
  en: {
    title: 'Import / Export Tools',
    subtitle: 'Manage server backups and transfer bot configurations.',
    exportTitle: 'Download Data (Export)',
    exportDB: 'Database (Tickets & Logs)',
    exportDBDesc: 'Download a full database dump. Includes all tickets, transcripts, and stats.',
    exportDBBtn: 'Download DB dump',
    exportSettings: 'Bot Configuration',
    exportSettingsDesc: 'Generate a lightweight .json file with panel settings, forms, and roles.',
    exportSettingsBtn: 'Download JSON',
    importTitle: 'Upload Data (Import)',
    importSettings: 'Import Bot Settings',
    importSettingsDesc: 'Upload a .json config file.',
    importSettingsWarn: 'Warning: Current panel settings and roles will be overwritten.',
    importDB: 'Restore Database',
    importDBDesc: 'Upload a dump file (.sql, .db, .json).',
    importDBWarn: 'Critical: Current tickets and history will be completely destroyed and replaced!',
    dragFile: 'Drag file here',
    browseDisk: 'Browse disk',
    uploadBtn: 'Confirm',
    loading: 'Processing...',
  }
};

export default function ImportExportPage() {
  const { addToast } = useToast();
  const params = useParams();
  const serverId = params?.serverId as string;
  const { language } = useSettings();
  const t = translations[language];
  
  const [isExportingDB, setIsExportingDB] = useState(false);
  const [isExportingSettings, setIsExportingSettings] = useState(false);
  const [isImportingSettings, setIsImportingSettings] = useState(false);
  const [selectedSettingsFile, setSelectedSettingsFile] = useState<File | null>(null);
  const [isDraggingSettings, setIsDraggingSettings] = useState(false);
  const settingsFileInputRef = useRef<HTMLInputElement>(null);
  const [isImportingDB, setIsImportingDB] = useState(false);
  const [selectedDBFile, setSelectedDBFile] = useState<File | null>(null);
  const [isDraggingDB, setIsDraggingDB] = useState(false);
  const dbFileInputRef = useRef<HTMLInputElement>(null);

  const handleExportDB = async () => {
    setIsExportingDB(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToast('Pobrano pomyślnie.', 'success');
    setIsExportingDB(false);
  };

  const handleExportSettings = async () => {
    setIsExportingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast('Eksport JSON zakończony.', 'success');
    setIsExportingSettings(false);
  };

  const handleDropSettings = (e: React.DragEvent) => {
    e.preventDefault(); setIsDraggingSettings(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0].name.endsWith('.json')) setSelectedSettingsFile(e.dataTransfer.files[0]);
  };

  const handleImportSettings = async () => {
    if (!selectedSettingsFile) return;
    setIsImportingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    addToast('Zaktualizowano.', 'success');
    setSelectedSettingsFile(null); setIsImportingSettings(false);
  };

  const handleDropDB = (e: React.DragEvent) => {
    e.preventDefault(); setIsDraggingDB(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) setSelectedDBFile(e.dataTransfer.files[0]);
  };

  const handleImportDB = async () => {
    if (!selectedDBFile) return;
    setIsImportingDB(true);
    await new Promise(resolve => setTimeout(resolve, 3500));
    addToast('Baza danych przywrócona.', 'success');
    setSelectedDBFile(null); setIsImportingDB(false);
  };

  return (
    <div className="max-w-6xl space-y-10 animate-fadeIn">
      <div className="border-b border-border-subtle pb-5">
        <h1 className="text-2xl font-bold text-text-main tracking-tight">{t.title}</h1>
        <p className="text-text-muted text-sm mt-1">{t.subtitle} (ID: {serverId})</p>
      </div>

      <div>
        <h2 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2"><span className="text-brand-base">📤</span> {t.exportTitle}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <section className="bg-surface-panel border border-border-subtle p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-surface-base rounded-xl flex items-center justify-center text-xl mb-4 border border-border-subtle">🗄️</div>
              <h3 className="text-md font-semibold text-text-main">{t.exportDB}</h3>
              <p className="text-sm text-text-muted mt-2 mb-6">{t.exportDBDesc}</p>
            </div>
            <button onClick={handleExportDB} disabled={isExportingDB} className="w-full bg-surface-base hover:bg-border-subtle text-text-main font-bold py-3 px-4 rounded-xl text-sm transition border border-border-subtle disabled:opacity-50">
              {isExportingDB ? t.loading : `💾 ${t.exportDBBtn}`}
            </button>
          </section>

          <section className="bg-surface-panel border border-border-subtle p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-surface-base rounded-xl flex items-center justify-center text-xl mb-4 border border-border-subtle">⚙️</div>
              <h3 className="text-md font-semibold text-text-main">{t.exportSettings}</h3>
              <p className="text-sm text-text-muted mt-2 mb-6">{t.exportSettingsDesc}</p>
            </div>
            <button onClick={handleExportSettings} disabled={isExportingSettings} className="w-full bg-surface-base hover:bg-border-subtle text-text-main font-bold py-3 px-4 rounded-xl text-sm transition border border-border-subtle disabled:opacity-50">
              {isExportingSettings ? t.loading : `📄 ${t.exportSettingsBtn}`}
            </button>
          </section>
        </div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-text-main mb-4 flex items-center gap-2"><span className="text-brand-base">📥</span> {t.importTitle}</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          <section className="bg-surface-panel border border-border-subtle p-6 rounded-2xl flex flex-col">
            <h3 className="text-md font-semibold text-text-main mb-1">{t.importSettings}</h3>
            <p className="text-sm text-text-muted mb-4">{t.importSettingsDesc}</p>
            <div className="p-3 bg-status-warning/10 border border-status-warning/20 rounded-xl text-xs text-text-muted mb-5">⚠️ <strong className="text-status-warning">{t.importSettingsWarn}</strong></div>
            <div onDragOver={(e) => { e.preventDefault(); setIsDraggingSettings(true); }} onDragLeave={() => setIsDraggingSettings(false)} onDrop={handleDropSettings} className={`flex-1 border-2 border-dashed rounded-xl p-6 text-center transition-all flex flex-col justify-center items-center ${isDraggingSettings ? 'border-brand-base bg-brand-base/5' : 'border-border-subtle'}`}>
              <div className="text-3xl mb-2">📄</div>
              <h4 className="text-sm font-semibold text-text-main mb-1">{selectedSettingsFile ? selectedSettingsFile.name : t.dragFile}</h4>
              <input type="file" accept=".json" className="hidden" ref={settingsFileInputRef} onChange={(e) => e.target.files && setSelectedSettingsFile(e.target.files[0])} />
              <button onClick={() => settingsFileInputRef.current?.click()} className="mt-3 text-text-muted hover:text-text-main text-xs font-semibold px-3 py-1.5 rounded-lg border border-border-subtle bg-surface-base">{t.browseDisk}</button>
            </div>
            <button onClick={handleImportSettings} disabled={!selectedSettingsFile || isImportingSettings} className="mt-4 w-full bg-brand-base hover:bg-brand-hover text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg disabled:opacity-50">{isImportingSettings ? t.loading : t.uploadBtn}</button>
          </section>

          <section className="bg-surface-panel border border-border-subtle p-6 rounded-2xl flex flex-col">
            <h3 className="text-md font-semibold text-text-main mb-1">{t.importDB}</h3>
            <p className="text-sm text-text-muted mb-4">{t.importDBDesc}</p>
            <div className="p-3 bg-status-error/10 border border-status-error/20 rounded-xl text-xs text-text-muted mb-5">⚠️ <strong className="text-status-error">{t.importDBWarn}</strong></div>
            <div onDragOver={(e) => { e.preventDefault(); setIsDraggingDB(true); }} onDragLeave={() => setIsDraggingDB(false)} onDrop={handleDropDB} className={`flex-1 border-2 border-dashed rounded-xl p-6 text-center transition-all flex flex-col justify-center items-center ${isDraggingDB ? 'border-status-error bg-status-error/5' : 'border-border-subtle'}`}>
              <div className="text-3xl mb-2">🗄️</div>
              <h4 className="text-sm font-semibold text-text-main mb-1">{selectedDBFile ? selectedDBFile.name : t.dragFile}</h4>
              <input type="file" accept=".json,.sql,.db" className="hidden" ref={dbFileInputRef} onChange={(e) => e.target.files && setSelectedDBFile(e.target.files[0])} />
              <button onClick={() => dbFileInputRef.current?.click()} className="mt-3 text-text-muted hover:text-text-main text-xs font-semibold px-3 py-1.5 rounded-lg border border-border-subtle bg-surface-base">{t.browseDisk}</button>
            </div>
            <button onClick={handleImportDB} disabled={!selectedDBFile || isImportingDB} className="mt-4 w-full bg-status-error hover:bg-red-600 text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg disabled:opacity-50">{isImportingDB ? t.loading : t.uploadBtn}</button>
          </section>

        </div>
      </div>
    </div>
  );
}
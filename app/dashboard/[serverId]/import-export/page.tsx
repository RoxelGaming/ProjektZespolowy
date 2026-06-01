'use client';

import { useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { useToast } from '../../../contexts/ToastContext';

export default function ImportExportPage() {
  const { addToast } = useToast();
  
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
  // FUNKCJE EKSPORTU
  // ==========================================
  const handleExportDB = async () => {
    setIsExportingDB(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    addToast('Zrzut bazy danych (SQL/JSON) został wygenerowany i pobrany.', 'success');
    setIsExportingDB(false);
  };

  const handleExportSettings = async () => {
    setIsExportingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    addToast('Ustawienia panelu zostały wyeksportowane do pliku JSON.', 'success');
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
        addToast('Niewłaściwy format! Ustawienia wymagają pliku .json', 'error');
      }
    }
  };

  const handleImportSettings = async () => {
    if (!selectedSettingsFile) {
      addToast('Wybierz najpierw plik z ustawieniami!', 'error');
      return;
    }
    setIsImportingSettings(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    addToast('Konfiguracja bota została nadpisana pomyślnie!', 'success');
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
        addToast('Niewłaściwy format! Wymagany plik .sql, .db lub .json', 'error');
      }
    }
  };

  const handleImportDB = async () => {
    if (!selectedDBFile) {
      addToast('Wybierz najpierw plik z bazą danych!', 'error');
      return;
    }
    setIsImportingDB(true);
    await new Promise(resolve => setTimeout(resolve, 3500));
    addToast('Baza danych została w pełni przywrócona!', 'success');
    setSelectedDBFile(null);
    setIsImportingDB(false);
  };

  return (
    <div className="max-w-6xl space-y-10 animate-fadeIn">
      {/* Nagłówek */}
      <div className="border-b border-[#1e222b] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Narzędzia Importu / Eksportu</h1>
        <p className="text-[#9ca3af] text-sm mt-1">Zarządzaj kopiami zapasowymi serwera (ID: {serverId}) oraz przenoś konfigurację bota.</p>
      </div>

      {/* SEKCJA 1: EKSPORT */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-[#5865F2]">📤</span> Pobieranie danych (Eksport)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Eksport Bazy Danych */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#1e222b] rounded-xl flex items-center justify-center text-xl mb-4 border border-[#2e3545]">
                🗄️
              </div>
              <h3 className="text-md font-semibold text-white">Baza Danych (Tickety i Logi)</h3>
              <p className="text-sm text-[#9ca3af] mt-2 mb-6">
                Pobierz pełny zrzut bazy danych serwera. Plik zawiera wszystkie zgłoszenia, transkrypty i statystyki administracyjne.
              </p>
            </div>
            <button 
              onClick={handleExportDB}
              disabled={isExportingDB}
              className="w-full bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-4 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isExportingDB ? '⏳ Przygotowywanie paczki...' : '💾 Pobierz zrzut bazy'}
            </button>
          </section>

          {/* Eksport Ustawień */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 bg-[#1e222b] rounded-xl flex items-center justify-center text-xl mb-4 border border-[#2e3545]">
                ⚙️
              </div>
              <h3 className="text-md font-semibold text-white">Konfiguracja Bota</h3>
              <p className="text-sm text-[#9ca3af] mt-2 mb-6">
                Wygeneruj lekki plik `.json` zawierający tylko ustawienia paneli, formularze i role. Idealne do klonowania serwerów.
              </p>
            </div>
            <button 
              onClick={handleExportSettings}
              disabled={isExportingSettings}
              className="w-full bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-4 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isExportingSettings ? '⏳ Generowanie pliku...' : '📄 Pobierz plik JSON'}
            </button>
          </section>
        </div>
      </div>

      {/* SEKCJA 2: IMPORT */}
      <div>
        <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
          <span className="text-[#5865F2]">📥</span> Wgrywanie danych (Import)
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Import Ustawień */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col">
            <h3 className="text-md font-semibold text-white mb-1">Import Ustawień Bota</h3>
            <p className="text-sm text-[#9ca3af] mb-4">Wgraj plik konfiguracyjny `.json`.</p>
            
            <div className="p-3 bg-yellow-500/5 border border-yellow-500/10 rounded-xl text-xs text-[#9ca3af] mb-5">
              ⚠️ <strong className="text-yellow-500">Uwaga:</strong> Obecne ustawienia paneli i ról zostaną nadpisane.
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
                {selectedSettingsFile ? selectedSettingsFile.name : 'Przeciągnij plik konfiguracyjny'}
              </h4>
              <input type="file" accept=".json" className="hidden" ref={settingsFileInputRef} onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) setSelectedSettingsFile(e.target.files[0]);
              }} />
              <button onClick={() => settingsFileInputRef.current?.click()} className="mt-3 text-[#9ca3af] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2e3545] bg-[#1e222b]">
                Przeglądaj dysk
              </button>
            </div>

            <button 
              onClick={handleImportSettings} disabled={!selectedSettingsFile || isImportingSettings}
              className="mt-4 w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/10 disabled:opacity-50"
            >
              {isImportingSettings ? 'Wgrywanie...' : 'Zatwierdź ustawienia'}
            </button>
          </section>

          {/* Import Bazy Danych */}
          <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl flex flex-col">
            <h3 className="text-md font-semibold text-white mb-1">Przywracanie Bazy Danych</h3>
            <p className="text-sm text-[#9ca3af] mb-4">Wgraj plik zrzutu bazy (`.sql`, `.db`, `.json`).</p>
            
            <div className="p-3 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-[#9ca3af] mb-5">
              ⚠️ <strong className="text-red-400">Krytyczne:</strong> Obecne tickety i historia zostaną całkowicie zniszczone i zastąpione zrzutem!
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
                {selectedDBFile ? selectedDBFile.name : 'Przeciągnij plik bazy danych'}
              </h4>
              <input type="file" accept=".json,.sql,.db" className="hidden" ref={dbFileInputRef} onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) setSelectedDBFile(e.target.files[0]);
              }} />
              <button onClick={() => dbFileInputRef.current?.click()} className="mt-3 text-[#9ca3af] hover:text-white text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#2e3545] bg-[#1e222b]">
                Przeglądaj dysk
              </button>
            </div>

            <button 
              onClick={handleImportDB} disabled={!selectedDBFile || isImportingDB}
              className="mt-4 w-full bg-[#DA373C] hover:bg-[#c92f33] text-white font-bold py-2.5 rounded-xl text-sm transition shadow-lg shadow-[#DA373C]/10 disabled:opacity-50"
            >
              {isImportingDB ? 'Odtwarzanie bazy...' : 'Zatwierdź i nadpisz bazę'}
            </button>
          </section>

        </div>
      </div>
    </div>
  );
}
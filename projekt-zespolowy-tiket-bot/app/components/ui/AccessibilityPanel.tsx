'use client';

import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const { 
    language, 
    fontSize, setFontSize, 
    contrast, setContrast, 
    letterSpacing, setLetterSpacing 
  } = useSettings();

  // Prosty słownik tłumaczeń (SCRUM-131)
  const t = {
    title: language === 'pl' ? 'Dostępność i wygląd' : 'Accessibility & Appearance',
    close: language === 'pl' ? 'Zamknij' : 'Close',
    fontSize: language === 'pl' ? 'Wielkość czcionki' : 'Font Size',
    fontSmall: language === 'pl' ? 'Mała' : 'Small',
    fontMedium: language === 'pl' ? 'Średnia' : 'Medium',
    fontLarge: language === 'pl' ? 'Duża' : 'Large',
    contrast: language === 'pl' ? 'Kontrast' : 'Contrast',
    contrastNormal: language === 'pl' ? 'Normalny' : 'Normal',
    contrastHigh: language === 'pl' ? 'Wysoki' : 'High',
    spacing: language === 'pl' ? 'Odstępy liter' : 'Letter Spacing',
    spacingNormal: language === 'pl' ? 'Standardowe' : 'Normal',
    spacingWide: language === 'pl' ? 'Zwiększone' : 'Wide',
  };

  return (
    <>
      {/* Tło przyciemniające resztę strony (Overlay) */}
      <div 
        onClick={onClose} 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`} 
      />

      {/* Główny, wysuwany panel boczy */}
      <div 
        className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-white dark:bg-[#161920] shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-gray-200 dark:border-[#1e222b] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Nagłówek panelu */}
        <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-[#1e222b] bg-gray-50 dark:bg-[#101216]">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="text-blue-500">♿</span> {t.title}
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-500 dark:text-[#9ca3af] hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors"
            title={t.close}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Zawartość z opcjami (Oparta o customowe Radio/Toggles) */}
        <div className="p-6 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          
          {/* Sekcja: Rozmiar czcionki */}
          <section className="space-y-3">
            <label className="block text-xs font-bold text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider">
              {t.fontSize}
            </label>
            <div className="flex bg-gray-100 dark:bg-[#101216] p-1 rounded-xl border border-gray-200 dark:border-[#2e3545]">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  onClick={() => setFontSize(size)}
                  aria-pressed={fontSize === size}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    fontSize === size 
                    ? 'bg-white dark:bg-[#5865F2] text-blue-600 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-[#9ca3af] hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {size === 'small' ? t.fontSmall : size === 'medium' ? t.fontMedium : t.fontLarge}
                </button>
              ))}
            </div>
          </section>

          {/* Sekcja: Kontrast */}
          <section className="space-y-3">
            <label className="block text-xs font-bold text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider">
              {t.contrast}
            </label>
            <div className="flex bg-gray-100 dark:bg-[#101216] p-1 rounded-xl border border-gray-200 dark:border-[#2e3545]">
              {(['normal', 'high'] as const).map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => setContrast(lvl)}
                  aria-pressed={contrast === lvl}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    contrast === lvl 
                    ? 'bg-white dark:bg-[#5865F2] text-blue-600 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-[#9ca3af] hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {lvl === 'normal' ? t.contrastNormal : t.contrastHigh}
                </button>
              ))}
            </div>
          </section>

          {/* Sekcja: Odstępy między literami */}
          <section className="space-y-3">
            <label className="block text-xs font-bold text-gray-500 dark:text-[#9ca3af] uppercase tracking-wider">
              {t.spacing}
            </label>
            <div className="flex bg-gray-100 dark:bg-[#101216] p-1 rounded-xl border border-gray-200 dark:border-[#2e3545]">
              {(['normal', 'wide'] as const).map((space) => (
                <button
                  key={space}
                  onClick={() => setLetterSpacing(space)}
                  aria-pressed={letterSpacing === space}
                  className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                    letterSpacing === space 
                    ? 'bg-white dark:bg-[#5865F2] text-blue-600 dark:text-white shadow-sm' 
                    : 'text-gray-500 dark:text-[#9ca3af] hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {space === 'normal' ? t.spacingNormal : t.spacingWide}
                </button>
              ))}
            </div>
          </section>

        </div>
        
        {/* Stopka panelu informacyjna */}
        <div className="p-5 border-t border-gray-200 dark:border-[#1e222b] bg-gray-50 dark:bg-[#101216]">
          <p className="text-xs text-center text-gray-500 dark:text-[#6b7280]">
            {language === 'pl' 
              ? 'Ustawienia zapisują się automatycznie w Twojej przeglądarce.' 
              : 'Settings are automatically saved in your browser.'}
          </p>
        </div>
      </div>
    </>
  );
}
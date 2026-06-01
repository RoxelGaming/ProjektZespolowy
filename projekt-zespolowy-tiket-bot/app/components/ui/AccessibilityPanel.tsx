'use client';

import React from 'react';
import { useSettings } from '../../contexts/SettingsContext';

interface AccessibilityPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AccessibilityPanel({ isOpen, onClose }: AccessibilityPanelProps) {
  const { language, accentColor, setAccentColor } = useSettings();

  const t = {
    title: language === 'pl' ? 'Dostępność i wygląd' : 'Accessibility & Appearance',
    close: language === 'pl' ? 'Zamknij' : 'Close',
    accent: language === 'pl' ? 'Kolor wiodący' : 'Accent Color',
  };

  const accents = [
    { id: 'blurple', color: '#5865F2' },
    { id: 'green', color: '#23a559' },
    { id: 'red', color: '#da373c' },
    { id: 'yellow', color: '#fee75c' },
    { id: 'purple', color: '#9b59b6' },
  ];

  return (
    <>
      <div 
        onClick={onClose} 
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} 
      />
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-80 bg-surface-panel shadow-2xl z-[101] transform transition-transform duration-300 ease-in-out flex flex-col border-l border-border-subtle ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        <div className="flex items-center justify-between p-5 border-b border-border-subtle bg-surface-base">
          <h2 className="text-lg font-bold text-text-main flex items-center gap-2">
            <span className="text-brand-base">🎨</span> {t.title}
          </h2>
          <button onClick={onClose} className="p-2 text-text-muted hover:text-status-error hover:bg-status-error/10 rounded-lg transition-colors" title={t.close}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Przełącznik Koloru Akcentu */}
          <section className="space-y-3">
            <label className="block text-xs font-bold text-text-muted uppercase tracking-wider">
              {t.accent}
            </label>
            <div className="flex gap-3">
              {accents.map((acc) => (
                <button
                  key={acc.id}
                  onClick={() => setAccentColor(acc.id as any)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    accentColor === acc.id ? 'border-text-main scale-110' : 'border-transparent hover:scale-105'
                  }`}
                  style={{ backgroundColor: acc.color }}
                  title={acc.id}
                />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
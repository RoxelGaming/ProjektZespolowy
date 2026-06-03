'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import AccessibilityPanel from '../ui/AccessibilityPanel';
import Image from '../ui/AppImage';

export default function LandingHeader() {
  const { theme, setTheme, language, setLanguage } = useSettings();
  const [isA11yOpen, setIsA11yOpen] = useState(false);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');
  const toggleLanguage = () => setLanguage(language === 'pl' ? 'en' : 'pl');

  // Słownik tłumaczeń
  const t = {
    panel: language === 'pl' ? 'Panel' : 'Dashboard',
    langTitle: language === 'pl' ? 'Zmień na Angielski' : 'Change to English',
    themeTitle: theme === 'dark' ? 'Włącz tryb jasny' : 'Enable light mode',
    a11yTitle: language === 'pl' ? 'Dostępność i wygląd' : 'Accessibility & Appearance'
  };

  return (
    <>
      <header className="max-w-6xl w-full mx-auto px-6 py-4 flex justify-between items-center border-b border-[#1e222b]">
        <div className="flex items-center gap-3">
          <div className="relative w-9 h-9 overflow-hidden rounded-xl">
            <Image 
              src="/LOGO.png" 
              alt="TicketBot Logo" 
              width={36}
              height={36}
              className="object-cover w-full h-full"
            />
          </div>
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-[#9ca3af] bg-clip-text text-transparent">
            TicketBot
          </span>
        </div>
        
        {/* Grupa przycisków funkcyjnych (SCRUM-33 / SCRUM-131 / SCRUM-132) */}
        <div className="flex items-center gap-2 sm:gap-3">
          
          <button 
            onClick={toggleLanguage}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold bg-[#1e222b] hover:bg-[#2a2f3d] text-[#9ca3af] hover:text-white transition border border-[#2e3545]"
            title={t.langTitle}
          >
            {language === 'pl' ? 'PL' : 'EN'}
          </button>

          <button 
            onClick={toggleTheme}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base bg-[#1e222b] hover:bg-[#2a2f3d] text-[#9ca3af] hover:text-yellow-400 transition border border-[#2e3545]"
            title={t.themeTitle}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          <button 
            onClick={() => setIsA11yOpen(true)}
            className="w-9 h-9 rounded-xl flex items-center justify-center text-base bg-[#1e222b] hover:bg-[#2a2f3d] text-[#9ca3af] hover:text-[#5865F2] transition border border-[#2e3545]"
            title={t.a11yTitle}
          >
            ♿
          </button>

          <Link 
            href="/dashboard" 
            className="bg-[#1e222b] hover:bg-[#2a2f3d] text-white text-sm font-semibold px-4 py-2 rounded-xl transition border border-[#2e3545] ml-1 sm:ml-2"
          >
            {t.panel}
          </Link>
        </div>
      </header>

      {/* Komponent z Panelem Dostępności */}
      <AccessibilityPanel isOpen={isA11yOpen} onClose={() => setIsA11yOpen(false)} />
    </>
  );
}
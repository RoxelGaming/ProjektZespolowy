'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

// ==========================================
// DEFINICJE TYPÓW (TS)
// ==========================================
export type Theme = 'light' | 'dark';
export type Language = 'pl' | 'en';
export type FontSize = 'small' | 'medium' | 'large';
export type Contrast = 'normal' | 'high';
export type LetterSpacing = 'normal' | 'wide';

interface SettingsContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: (lang: Language) => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  contrast: Contrast;
  setContrast: (contrast: Contrast) => void;
  letterSpacing: LetterSpacing;
  setLetterSpacing: (spacing: LetterSpacing) => void;
}

// Inicjalizacja pustego kontekstu
const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  // ==========================================
  // STANY GŁÓWNE (Z domyślnymi wartościami)
  // ==========================================
  const [theme, setTheme] = useState<Theme>('dark'); // Domyślnie aplikacja jest ciemna
  const [language, setLanguage] = useState<Language>('pl');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [letterSpacing, setLetterSpacing] = useState<LetterSpacing>('normal');
  
  const [isMounted, setIsMounted] = useState(false);

  // ==========================================
  // EFEKT 1: ŁADOWANIE USTAWIEŃ Z LOCALSTORAGE
  // ==========================================
  // Ten kod uruchamia się tylko raz, gdy użytkownik wchodzi na stronę.
  // Zapobiega to tzw. "Hydration Mismatch" (błędom renderowania w Next.js).
  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('tb_theme') as Theme;
    const savedLang = localStorage.getItem('tb_language') as Language;
    const savedFont = localStorage.getItem('tb_fontsize') as FontSize;
    const savedContrast = localStorage.getItem('tb_contrast') as Contrast;
    const savedSpacing = localStorage.getItem('tb_spacing') as LetterSpacing;

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    if (savedFont) setFontSize(savedFont);
    if (savedContrast) setContrast(savedContrast);
    if (savedSpacing) setLetterSpacing(savedSpacing);
  }, []);

  // ==========================================
  // EFEKT 2: APLIKOWANIE USTAWIEŃ DO STRUKTURY DOM
  // ==========================================
  // Uruchamia się za każdym razem, gdy zmieni się jakikolwiek stan.
  useEffect(() => {
    if (!isMounted) return;

    const html = document.documentElement; // Główny tag <html>

    // 1. Motyw (Dark Mode) - dodaje lub usuwa klasę .dark
    if (theme === 'dark') {
      html.classList.add('dark');
    } else {
      html.classList.remove('dark');
    }
    localStorage.setItem('tb_theme', theme);

    // 2. Język - modyfikuje atrybut lang="pl"
    html.lang = language;
    localStorage.setItem('tb_language', language);

    // 3. Rozmiar czcionki (A11y)
    html.setAttribute('data-fontsize', fontSize);
    localStorage.setItem('tb_fontsize', fontSize);

    // 4. Kontrast (A11y)
    html.setAttribute('data-contrast', contrast);
    localStorage.setItem('tb_contrast', contrast);

    // 5. Odstępy między literami (A11y)
    html.setAttribute('data-spacing', letterSpacing);
    localStorage.setItem('tb_spacing', letterSpacing);

  }, [theme, language, fontSize, contrast, letterSpacing, isMounted]);

  // Jeśli komponent się jeszcze nie zamontował, ukrywamy renderowanie, 
  // aby uniknąć mignięcia białego ekranu przed wczytaniem motywu.
  if (!isMounted) {
    return null;
  }

  return (
    <SettingsContext.Provider
      value={{
        theme, setTheme,
        language, setLanguage,
        fontSize, setFontSize,
        contrast, setContrast,
        letterSpacing, setLetterSpacing
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

// Hook ułatwiający dostęp do kontekstu w innych plikach
export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings musi być użyte wewnątrz SettingsProvider');
  }
  return context;
}
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type Theme = 'light' | 'dark';
export type Language = 'pl' | 'en';
export type FontSize = 'small' | 'medium' | 'large';
export type Contrast = 'normal' | 'high';
export type LetterSpacing = 'normal' | 'wide';
export type AccentColor = 'blurple' | 'green' | 'red' | 'yellow' | 'purple';

interface SettingsContextType {
  theme: Theme; setTheme: (theme: Theme) => void;
  language: Language; setLanguage: (lang: Language) => void;
  fontSize: FontSize; setFontSize: (size: FontSize) => void;
  contrast: Contrast; setContrast: (contrast: Contrast) => void;
  letterSpacing: LetterSpacing; setLetterSpacing: (spacing: LetterSpacing) => void;
  accentColor: AccentColor; setAccentColor: (color: AccentColor) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark');
  const [language, setLanguage] = useState<Language>('pl');
  const [fontSize, setFontSize] = useState<FontSize>('medium');
  const [contrast, setContrast] = useState<Contrast>('normal');
  const [letterSpacing, setLetterSpacing] = useState<LetterSpacing>('normal');
  const [accentColor, setAccentColor] = useState<AccentColor>('blurple');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedTheme = localStorage.getItem('tb_theme') as Theme;
    const savedLang = localStorage.getItem('tb_language') as Language;
    const savedAccent = localStorage.getItem('tb_accent') as AccentColor;

    if (savedTheme) setTheme(savedTheme);
    if (savedLang) setLanguage(savedLang);
    if (savedAccent) setAccentColor(savedAccent);
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    const html = document.documentElement;

    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');
    localStorage.setItem('tb_theme', theme);

    html.lang = language; 
    localStorage.setItem('tb_language', language);
    
    html.setAttribute('data-accent', accentColor); 
    localStorage.setItem('tb_accent', accentColor);
  }, [theme, language, accentColor, isMounted]);

  if (!isMounted) return null;

  return (
    <SettingsContext.Provider value={{ theme, setTheme, language, setLanguage, fontSize, setFontSize, contrast, setContrast, letterSpacing, setLetterSpacing, accentColor, setAccentColor }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (context === undefined) throw new Error('useSettings musi być użyte wewnątrz SettingsProvider');
  return context;
}
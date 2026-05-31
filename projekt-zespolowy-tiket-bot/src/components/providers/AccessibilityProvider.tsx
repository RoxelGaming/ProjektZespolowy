'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';

export type FontSize = 'sm' | 'base' | 'lg' | 'xl';
export type LetterSpacing =
  | 'tracking-normal'
  | 'tracking-wide'
  | 'tracking-widest';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;

  highContrast: boolean;
  setHighContrast: (value: boolean) => void;

  letterSpacing: LetterSpacing;
  setLetterSpacing: (spacing: LetterSpacing) => void;
}

const AccessibilityContext =
  createContext<AccessibilityContextType | null>(null);

const FONT_SIZE_CLASS_MAP: Record<FontSize, string> = {
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

const LETTER_SPACING_CLASS_MAP: Record<LetterSpacing, string> = {
  'tracking-normal': 'tracking-normal',
  'tracking-wide': 'tracking-wide',
  'tracking-widest': 'tracking-widest',
};

function readInitialFontSize(): FontSize {
  if (typeof window === 'undefined') return 'base';
  const saved = window.localStorage.getItem('fontSize');
  return saved === 'sm' || saved === 'base' || saved === 'lg' || saved === 'xl'
    ? saved
    : 'base';
}

function readInitialLetterSpacing(): LetterSpacing {
  if (typeof window === 'undefined') return 'tracking-normal';
  const saved = window.localStorage.getItem('letterSpacing');
  return saved === 'tracking-normal' || saved === 'tracking-wide' || saved === 'tracking-widest'
    ? saved
    : 'tracking-normal';
}

function readInitialHighContrast(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem('highContrast') === 'true';
}

export function AccessibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [fontSize, setFontSize] = useState<FontSize>(readInitialFontSize);
  const [highContrast, setHighContrast] = useState<boolean>(readInitialHighContrast);
  const [letterSpacing, setLetterSpacing] = useState<LetterSpacing>(readInitialLetterSpacing);

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(...Object.values(FONT_SIZE_CLASS_MAP));
    html.classList.add(FONT_SIZE_CLASS_MAP[fontSize]);

    window.localStorage.setItem('fontSize', fontSize);
  }, [fontSize]);

  useEffect(() => {
    const html = document.documentElement;

    html.classList.toggle('high-contrast', highContrast);

    window.localStorage.setItem('highContrast', String(highContrast));
  }, [highContrast]);

  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(...Object.values(LETTER_SPACING_CLASS_MAP));
    html.classList.add(LETTER_SPACING_CLASS_MAP[letterSpacing]);

    window.localStorage.setItem('letterSpacing', letterSpacing);
  }, [letterSpacing]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        highContrast,
        setHighContrast,
        letterSpacing,
        setLetterSpacing,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);

  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }

  return context;
}

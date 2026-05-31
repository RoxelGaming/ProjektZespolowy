'use client';

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';

export type FontSize =
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl';

export type LetterSpacing =
  | 'tracking-normal'
  | 'tracking-wide'
  | 'tracking-widest';

interface AccessibilityContextType {
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;

  letterSpacing: LetterSpacing;
  setLetterSpacing: (spacing: LetterSpacing) => void;
}

const AccessibilityContext =
  createContext<AccessibilityContextType | null>(null);

export function AccessibilityProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [fontSize, setFontSize] =
    useState<FontSize>('base');

  const [letterSpacing, setLetterSpacing] =
    useState<LetterSpacing>('tracking-normal');

  // Load preferences
  useEffect(() => {
    const savedFontSize =
      localStorage.getItem('fontSize') as FontSize | null;

    const savedLetterSpacing =
      localStorage.getItem('letterSpacing') as LetterSpacing | null;

    if (savedFontSize) {
      setFontSize(savedFontSize);
    }

    if (savedLetterSpacing) {
      setLetterSpacing(savedLetterSpacing);
    }
  }, []);

  // Font size sync
  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(
      'text-sm',
      'text-base',
      'text-lg',
      'text-xl'
    );

    html.classList.add(`text-${fontSize}`);

    localStorage.setItem(
      'fontSize',
      fontSize
    );
  }, [fontSize]);

  // Letter spacing sync
  useEffect(() => {
    const html = document.documentElement;

    html.classList.remove(
      'tracking-normal',
      'tracking-wide',
      'tracking-widest'
    );

    html.classList.add(letterSpacing);

    localStorage.setItem(
      'letterSpacing',
      letterSpacing
    );
  }, [letterSpacing]);

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        setFontSize,
        letterSpacing,
        setLetterSpacing,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(
    AccessibilityContext
  );

  if (!context) {
    throw new Error(
      'useAccessibility must be used within AccessibilityProvider'
    );
  }

  return context;
}
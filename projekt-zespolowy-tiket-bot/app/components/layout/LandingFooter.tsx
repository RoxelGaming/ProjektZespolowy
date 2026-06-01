'use client';

import { useSettings } from '../../contexts/SettingsContext';

export default function LandingFooter() {
  const { language } = useSettings(); // Pobieranie aktualnego języka
  
  const t = {
    rights: language === 'pl' ? 'Wszelkie prawa zastrzeżone.' : 'All rights reserved.'
  };

  return (
    <footer className="max-w-6xl w-full mx-auto px-6 py-6 text-center text-xs text-[#4b5563] border-t border-[#1e222b]">
      &copy; {new Date().getFullYear()} projekt-zespolowy-tiket-bot. {t.rights}
    </footer>
  );
}
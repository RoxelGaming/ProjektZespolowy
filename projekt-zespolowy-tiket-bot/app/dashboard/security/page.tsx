'use client';

import { useState } from 'react';

export default function SecurityPage() {
  const [email, setEmail] = useState('student@ujd.edu.pl');
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Stan przechowujący kody awaryjne
  const [recoveryCodes, setRecoveryCodes] = useState([
    'ABCD-1234', 
    'EFGH-5678', 
    'IJKL-9012', 
    'MNOP-3456'
  ]);

  // Funkcja symulująca generowanie nowych kodów (SCRUM-289)
  const handleGenerateNewCodes = () => {
    setIsGenerating(true);
    
    // Symulacja losowych kodów na poziomie Frontendu
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generateRandomCode = () => {
      let part1 = '';
      let part2 = '';
      for (let i = 0; i < 4; i++) {
        part1 += characters.charAt(Math.floor(Math.random() * characters.length));
        part2 += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return `${part1}-${part2}`;
    };

    setTimeout(() => {
      setRecoveryCodes([
        generateRandomCode(),
        generateRandomCode(),
        generateRandomCode(),
        generateRandomCode()
      ]);
      setIsGenerating(false);
    }, 800); // Delikatny efekt ładowania dla lepszego UX
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recoveryCodes.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-8 animate-fadeIn">
      {/* Nagłówek */}
      <div className="border-b border-[#1e222b] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Bezpieczeństwo konta</h1>
        <p className="text-[#9ca3af] text-sm mt-1">Zarządzaj metodami awaryjnego odzyskiwania dostępu do swojego profilu.</p>
      </div>

      {/* Sekcja: Kody odzyskiwania (SCRUM-289) */}
      <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Kody odzyskiwania</h2>
          <p className="text-sm text-[#9ca3af] mt-1">
            Te kody pozwolą Ci bezpiecznie odzyskać dostęp do panelu bota, jeśli stracisz możliwość autoryzacji przez konto Discord.
          </p>
        </div>
        
        {/* Wyświetlanie aktualnych kodów */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {recoveryCodes.map((code, index) => (
            <div 
              key={index} 
              className={`bg-[#101216] border border-[#2e3545] px-4 py-3 rounded-xl font-mono text-center text-[#5865F2] font-semibold text-base transition-all duration-300 ${
                isGenerating ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
              }`}
            >
              {code}
            </div>
          ))}
        </div>
        
        {/* Przyciski akcji */}
        <div className="flex flex-wrap gap-3 pt-2">
          <button 
            onClick={copyToClipboard}
            disabled={isGenerating}
            className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2.5 px-5 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/10 disabled:opacity-50"
          >
            {copied ? '✔ Skopiowano do schowka!' : '📋 Skopiuj kody'}
          </button>
          
          <button 
            onClick={handleGenerateNewCodes}
            disabled={isGenerating}
            className="bg-[#1e222b] hover:bg-[#252a36] text-[#f2f3f5] font-semibold py-2.5 px-5 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50"
          >
            {isGenerating ? '🔄 Generowanie...' : '⚡ Wygeneruj nowe kody'}
          </button>
        </div>

        <div className="p-4 bg-red-500/5 border border-red-500/10 rounded-xl text-xs text-[#9ca3af] leading-relaxed">
          ⚠️ <span className="text-red-500 font-semibold">Ważne:</span> Wygenerowanie nowych kodów automatycznie unieważni poprzedni zestaw. Pamiętaj, aby zapisać je w bezpiecznym miejscu.
        </div>
      </section>

      {/* Sekcja: Zapasowy E-mail (SCRUM-290) */}
      <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl space-y-4">
        <div>
          <h2 className="text-lg font-semibold text-white">Zapasowy adres E-mail</h2>
          <p className="text-sm text-[#9ca3af] mt-1">Adres wykorzystywany do przesyłania powiadomień bezpieczeństwa oraz resetowania tokenów dostępowych.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition"
            placeholder="Twój zapasowy e-mail..."
          />
          <button className="bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-2.5 px-6 rounded-xl text-sm transition border border-[#2e3545] shrink-0">
            Zapisz e-mail
          </button>
        </div>
      </section>
    </div>
  );
}
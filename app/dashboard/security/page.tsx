'use client';

import { useState } from 'react';
import { useToast } from '../../contexts/ToastContext';

export default function SecurityPage() {
  const { addToast } = useToast();
  
  const [email, setEmail] = useState('student@ujd.edu.pl');
  const [isGenerating, setIsGenerating] = useState(false);
  const [recoveryCodes, setRecoveryCodes] = useState(['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456']);

  const handleGenerateNewCodes = () => {
    setIsGenerating(true);
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    const generate = () => Array(2).fill(0).map(() => Array(4).fill(0).map(() => characters.charAt(Math.floor(Math.random() * characters.length))).join('')).join('-');
    
    setTimeout(() => {
      setRecoveryCodes([generate(), generate(), generate(), generate()]);
      setIsGenerating(false);
      addToast('Uwaga: Poprzednie kody awaryjne utraciły ważność!', 'warning');
    }, 800);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recoveryCodes.join(', '));
    addToast('Skopiowano kody do schowka!', 'success');
  };

  const handleSaveEmail = () => {
    if (!email.includes('@')) {
      addToast('Nieprawidłowy format adresu E-mail!', 'error');
      return;
    }
    addToast('Zapasowy adres E-mail został zapisany.', 'success');
  }

  return (
    <div className="w-full space-y-8 animate-fadeIn">
      
      <div className="border-b border-[#1e222b] pb-5">
        <h1 className="text-2xl font-bold text-white tracking-tight">Bezpieczeństwo konta</h1>
        <p className="text-[#9ca3af] text-sm mt-1">Zarządzaj metodami awaryjnego odzyskiwania dostępu do swojego profilu.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl space-y-5">
          <div>
            <h2 className="text-lg font-semibold text-white">Kody odzyskiwania</h2>
            <p className="text-sm text-[#9ca3af] mt-1">
              Te kody pozwolą Ci bezpiecznie odzyskać dostęp, jeśli stracisz autoryzację przez konto Discord.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recoveryCodes.map((code, index) => (
              <div key={index} className={`bg-[#101216] border border-[#2e3545] px-4 py-3.5 rounded-xl font-mono text-center text-[#5865F2] font-semibold text-base transition-all duration-300 ${isGenerating ? 'opacity-40 scale-95' : 'opacity-100 scale-100'}`}>
                {code}
              </div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button onClick={copyToClipboard} disabled={isGenerating} className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-5 rounded-xl text-sm transition shadow-lg shadow-[#5865f2]/10 disabled:opacity-50 flex-1">
              📋 Skopiuj kody
            </button>
            <button onClick={handleGenerateNewCodes} disabled={isGenerating} className="bg-[#1e222b] hover:bg-[#252a36] text-[#f2f3f5] font-semibold py-3 px-5 rounded-xl text-sm transition border border-[#2e3545] disabled:opacity-50 flex-1">
              {isGenerating ? '🔄 Generowanie...' : '⚡ Wygeneruj nowe'}
            </button>
          </div>
        </section>

        <section className="bg-[#161920] border border-[#1e222b] p-6 rounded-2xl space-y-4 h-fit">
          <div>
            <h2 className="text-lg font-semibold text-white">Zapasowy adres E-mail</h2>
            <p className="text-sm text-[#9ca3af] mt-1">Adres wykorzystywany do przesyłania powiadomień bezpieczeństwa.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <input 
              type="email" value={email} onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-[#101216] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-[#5865F2] transition"
              placeholder="Twój zapasowy e-mail..."
            />
            <button onClick={handleSaveEmail} className="bg-[#1e222b] hover:bg-[#252a36] text-white font-bold py-3 px-6 rounded-xl text-sm transition border border-[#2e3545] shrink-0">
              Zapisz e-mail
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
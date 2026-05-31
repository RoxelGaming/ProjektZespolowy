'use client';

import { useState } from 'react';

export default function SecurityPage() {
  const [email, setEmail] = useState('student@ujd.edu.pl');
  const [copied, setCopied] = useState(false);

  const recoveryCodes = ['ABCD-1234', 'EFGH-5678', 'IJKL-9012', 'MNOP-3456'];

  const copyToClipboard = () => {
    navigator.clipboard.writeText(recoveryCodes.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-3xl space-y-8">
      {/* Nagłówek */}
      <div>
        <h1 className="text-2xl font-bold text-white">Bezpieczeństwo</h1>
        <p className="text-[#9ca3af] text-sm">Zarządzaj metodami odzyskiwania dostępu do swojego konta.</p>
      </div>

      {/* Sekcja: Kody odzyskiwania */}
      <section className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-2">Kody odzyskiwania</h2>
        <p className="text-sm text-[#9ca3af] mb-4">Te kody pozwolą Ci odzyskać dostęp, jeśli stracisz możliwość logowania przez Discord.</p>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          {recoveryCodes.map((code, index) => (
            <div key={index} className="bg-[#101216] border border-[#2e3545] px-4 py-2 rounded-lg font-mono text-center text-[#5865F2]">
              {code}
            </div>
          ))}
        </div>
        
        <button 
          onClick={copyToClipboard}
          className="bg-[#1e222b] hover:bg-[#2a2f3d] text-white font-medium py-2 px-4 rounded-lg text-sm transition border border-[#2e3545]"
        >
          {copied ? 'Skopiowano!' : 'Skopiuj kody'}
        </button>
      </section>

      {/* Sekcja: Zapasowy E-mail */}
      <section className="bg-[#161920] border border-[#2e3545] p-6 rounded-xl">
        <h2 className="text-lg font-semibold text-white mb-4">Zapasowy adres E-mail</h2>
        <div className="flex flex-col gap-4">
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-[#101216] border border-[#2e3545] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#5865F2] transition"
          />
          <button className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded-lg text-sm transition w-fit">
            Zapisz zmiany
          </button>
        </div>
      </section>
    </div>
  );
}
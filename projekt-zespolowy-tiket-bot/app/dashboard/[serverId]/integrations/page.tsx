"use client"

export default function PlaceholderPage() {
  return (
    <div className="w-full min-h-[60vh] flex flex-col items-center justify-center animate-fadeIn text-white p-6">
      
      <div className="w-20 h-20 bg-[#1e222b] rounded-3xl flex items-center justify-center text-[#9ca3af] mb-6 shadow-inner border border-[#2e3545]">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      </div>

      <h2 className="text-2xl font-extrabold tracking-tight mb-3">Feature in Development</h2>
      <p className="text-[#9ca3af] text-center max-w-md leading-relaxed">
        Pracujemy nad tym modułem! Za niedługo pojawi się tutaj potężne narzędzie, które ułatwi Ci zarządzanie serwerem. Zaglądaj tu regularnie.
      </p>

    </div>
  );
}
import Link from 'next/link';
import LandingHeader from './components/layout/LandingHeader';
import LandingFooter from './components/layout/LandingFooter';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#101216] text-[#f2f3f5] font-sans flex flex-col justify-between">
      
      <LandingHeader />

      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 my-auto">
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-6 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-[#1b1e26] border border-[#2e3545] px-4 py-1.5 rounded-full text-xs font-medium text-[#9ca3af]">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            Wersja produkcyjna 0.1.0 w pełni aktywna
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-b from-white via-[#e5e7eb] to-[#9ca3af] bg-clip-text text-transparent leading-tight">
            Zautomatyzuj obsługę zgłoszeń na Discordzie
          </h1>
          <p className="text-base md:text-lg text-[#9ca3af] leading-relaxed max-w-lg">
            Profesjonalny system ticketów połączony z intuicyjnym panelem webowym. Zarządzaj transkrypcjami, konfiguruj kanały i wspieraj swoją społeczność.
          </p>
        </div>

        <div className="w-full max-w-md bg-[#161920] border border-[#1e222b] p-8 rounded-2xl shadow-xl flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white">Zaloguj się do panelu</h2>
          <Link href="/dashboard" className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-3 shadow-lg shadow-[#5865f2]/10 text-base">
            Zaloguj się przez Discord
          </Link>

          <div className="flex items-center my-1">
            <div className="flex-grow border-t border-[#2e3545]"></div>
            <span className="px-3 text-xs text-[#6b7280] uppercase tracking-wider font-semibold">lub awaryjnie</span>
            <div className="flex-grow border-t border-[#2e3545]"></div>
          </div>

          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Adres E-mail</label>
              <input type="email" placeholder="np. student@ujd.edu.pl" className="w-full bg-[#1b1e26] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#5865F2] transition" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">Zapasowy Kod Odzyskiwania</label>
              <input type="text" maxLength={8} placeholder="XXXX-XXXX" className="w-full bg-[#1b1e26] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#5865F2] transition tracking-widest text-center uppercase" />
            </div>
            <Link href="/dashboard" className="w-full text-center bg-[#1e222b] hover:bg-[#252a36] text-sm text-white font-semibold py-3 px-4 rounded-xl transition border border-[#2e3545] mt-1">
              Weryfikuj i przejdź do aplikacji
            </Link>
          </form>
        </div>
      </main>

      <LandingFooter />

    </div>
  );
}
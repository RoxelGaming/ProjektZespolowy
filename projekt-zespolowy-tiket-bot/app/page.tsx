import Link from 'next/link';
import Image from 'next/image';

const getPath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/projektzespolowy' : '';
  return `${basePath}${path}`;
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#101216] text-[#f2f3f5] font-sans flex flex-col justify-between">
      
      {/* 1. Belka Górna / Navbar */}
      <header className="max-w-6xl w-full mx-auto px-6 py-4 flex justify-between items-center border-b border-[#1e222b]">
        <div className="flex items-center gap-3">
          {/* Wykorzystanie Twojego oryginalnego logo z zachowaniem proporcji */}
        <div className="relative w-9 h-9 overflow-hidden rounded-xl">
          <img 
            src={getPath("/LOGO.png")} 
            alt="TicketBot Logo" 
            className="object-cover w-full h-full"
          />
        </div>
          <span className="font-bold text-lg tracking-wide bg-gradient-to-r from-white to-[#9ca3af] bg-clip-text text-transparent">
            TicketBot
          </span>
        </div>
        <Link 
          href="/dashboard" 
          className="bg-[#1e222b] hover:bg-[#2a2f3d] text-sm font-semibold px-4 py-2 rounded-xl transition border border-[#2e3545]"
        >
          Panel
        </Link>
      </header>

      {/* 2. Główna Sekcja (Hero) & Prezentacja Funkcji (SCRUM-293) */}
      <main className="max-w-6xl w-full mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-12 my-auto">
        
        {/* Lewa strona: Tekst i branding */}
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

        {/* Prawa strona: Sekcja Logowania (SCRUM-294 i SCRUM-295) */}
        <div className="w-full max-w-md bg-[#161920] border border-[#1e222b] p-8 rounded-2xl shadow-xl flex flex-col gap-6">
          <h2 className="text-xl font-bold text-white">Zaloguj się do panelu</h2>
          
          {/* Przycisk Logowania Discord (SCRUM-294) */}
          <Link 
            href="/dashboard" 
            className="w-full bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3.5 px-4 rounded-xl transition flex items-center justify-center gap-3 shadow-lg shadow-[#5865f2]/10 text-base"
          >
            <svg className="w-5 h-5 fill-current" viewBox="0 0 127.14 96.36">
              <path d="M107.7,8.07A105.15,105.15,0,0,0,77.26,0a77.19,77.19,0,0,0-3.3,6.83A96.67,96.67,0,0,0,53.22,6.83,77.19,77.19,0,0,0,49.88,0,105.15,105.15,0,0,0,19.44,8.07C3.66,31.58-1.86,54.65,1,77.53A105.73,105.73,0,0,0,32,96.36a77.7,77.7,0,0,0,6.63-10.85,68.43,68.43,0,0,1-10.45-5c1,.07,1.93.15,2.87.21a75.11,75.11,0,0,0,44.93,0c1-.06,1.91-.14,2.87-.21a67.72,67.72,0,0,1-10.45,5,78.21,78.21,0,0,0,6.63,10.85,105.47,105.47,0,0,0,31.06-18.83C129.87,50.2,123.75,27.46,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53S36.18,40.36,42.45,40.36,53.88,46,53.88,53,48.72,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.24,60,73.24,53S78.41,40.36,84.69,40.36,96.12,46,96.12,53,91,65.69,84.69,65.69Z"/>
            </svg>
            Zaloguj się przez Discord
          </Link>

          {/* Separator wizualny */}
          <div className="flex items-center my-1">
            <div className="flex-grow border-t border-[#2e3545]"></div>
            <span className="px-3 text-xs text-[#6b7280] uppercase tracking-wider font-semibold">lub awaryjnie</span>
            <div className="flex-grow border-t border-[#2e3545]"></div>
          </div>

          {/* Alternatywne metody logowania (SCRUM-295) */}
          <form className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">
                Adres E-mail
              </label>
              <input 
                type="email" 
                placeholder="np. student@ujd.edu.pl" 
                className="w-full bg-[#1b1e26] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#5865F2] transition"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#9ca3af] uppercase tracking-wider mb-2">
                Zapasowy Kod Odzyskiwania
              </label>
              <input 
                type="text" 
                maxLength={8}
                placeholder="XXXX-XXXX" 
                className="w-full bg-[#1b1e26] border border-[#2e3545] rounded-xl px-4 py-3 text-sm text-white placeholder-[#4b5563] focus:outline-none focus:border-[#5865F2] transition tracking-widest text-center uppercase"
              />
            </div>

            <Link
              href="/dashboard"
              className="w-full text-center bg-[#1e222b] hover:bg-[#252a36] text-sm text-white font-semibold py-3 px-4 rounded-xl transition border border-[#2e3545] mt-1"
            >
              Weryfikuj i przejdź do aplikacji
            </Link>
          </form>
        </div>
      </main>

      {/* 3. Stopka strony publicznej */}
      <footer className="max-w-6xl w-full mx-auto px-6 py-6 text-center text-xs text-[#4b5563] border-t border-[#1e222b]">
        &copy; {new Date().getFullYear()} projekt-zespolowy-tiket-bot. Wszelkie prawa zastrzeżone.
      </footer>

    </div>
  );
}
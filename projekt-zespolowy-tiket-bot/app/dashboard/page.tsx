import Link from 'next/link';

export default function DashboardMainPage() {
  return (
    <div className="min-h-screen bg-[#101216] text-[#f2f3f5] p-8">
      <div className="max-w-4xl mx-auto flex flex-col gap-6">
        <div className="flex justify-between items-center border-b border-[#1e222b] pb-4">
          <h1 className="text-2xl font-bold">🎛️ Główny Panel Zarządzania</h1>
          <Link href="/" className="text-sm text-[#9ca3af] hover:text-white transition">
            &larr; Wyloguj się
          </Link>
        </div>
        
        <p className="text-[#9ca3af]">Witaj w panelu konfiguracyjnym bota. Wybierz sekcję z menu bocznego (w budowie):</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          <Link href="/dashboard/tickets" className="p-6 bg-[#161920] border border-[#2e3545] rounded-xl hover:border-[#5865F2] transition flex flex-col gap-2">
            <h3 className="font-bold text-lg text-white">🎫 Zarządzanie Ticketami</h3>
            <p className="text-sm text-[#9ca3af]">Podgląd otwartych zgłoszeń, transkrypcje i statystyki moderatorów.</p>
          </Link>

          <Link href="/dashboard/settings" className="p-6 bg-[#161920] border border-[#2e3545] rounded-xl hover:border-[#5865F2] transition flex flex-col gap-2">
            <h3 className="font-bold text-lg text-white">⚙️ Ustawienia Bota</h3>
            <p className="text-sm text-[#9ca3af]">Konfiguracja ról, kanałów powitalnych oraz uprawnień administracyjnych.</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
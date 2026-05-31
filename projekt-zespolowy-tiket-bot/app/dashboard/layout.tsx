'use client'; // Musi być client component, aby działało usePathname

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-[#101216] text-[#f2f3f5]">
      {/* Sidebar - Pasek Boczny */}
      <aside className="w-64 border-r border-[#1e222b] bg-[#161920] p-6 flex flex-col gap-8">
        <div className="text-xl font-bold text-white flex items-center gap-2">
           <span className="bg-[#5865F2] p-2 rounded-lg">🤖</span> TicketBot
        </div>

        <nav className="flex flex-col gap-2">
          <NavItem href="/dashboard" label="Główny Panel" active={pathname === '/dashboard'} />
          <NavItem href="/dashboard/servers" label="Wybór Serwerów" active={pathname === '/dashboard/servers'} />
          <NavItem href="/dashboard/tickets" label="Tickety" active={pathname === '/dashboard/tickets'} />
          <NavItem href="/dashboard/settings" label="Ustawienia" active={pathname === '/dashboard/settings'} />
          <NavItem href="/dashboard/security" label="Bezpieczeństwo" active={pathname === '/dashboard/security'} />
        </nav>

        <div className="mt-auto">
           <Link href="/" className="text-sm text-[#6b7280] hover:text-white transition">
             ← Powrót do strony głównej
           </Link>
        </div>
      </aside>

      {/* Main Content - Główna treść strony */}
      <main className="flex-1 bg-[#101216] p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}

// Pomocniczy komponent linku dla czystszego kodu
function NavItem({ href, label, active }: { href: string; label: string; active: boolean }) {
  return (
    <Link 
      href={href} 
      className={`px-4 py-2.5 rounded-xl text-sm font-medium transition duration-200 ${
        active 
          ? 'bg-[#5865F2] text-white shadow-lg shadow-[#5865f2]/20' 
          : 'text-[#9ca3af] hover:bg-[#1e222b] hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // flex h-screen: zajmuje całą wysokość viewportu (obszaru roboczego przeglądarki)
    // overflow-hidden: zapobiega pojawieniu się paska przewijania na całej stronie
    <div className="flex h-screen w-full bg-gray-950 text-white overflow-hidden animate-show-in">
      
      {/* 1. Lewa kolumna: Sidebar */}
      <Sidebar />

      {/* 2. Prawa kolumna: Topbar + Treść */}
      <div className="flex flex-col flex-1 w-full">
        <Topbar />
        
        {/* Główny obszar, który będzie się przewijał (scrollable area) */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
      
    </div>
  );
}
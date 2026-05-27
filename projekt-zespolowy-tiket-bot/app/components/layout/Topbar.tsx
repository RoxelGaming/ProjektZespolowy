import Link from 'next/link';

export default function Topbar() {
  return (
    // h-16: stała wysokość
    // flex justify-between: rozsuwa elementy na boki
    <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between px-6">
      <div className="text-gray-400">
        Wybierz serwer: <span className="text-white font-semibold">Mój Super Serwer</span>
      </div>
      
      <div className="flex gap-4">
        <Link href="/" className="text-gray-400 hover:text-white transition">
          Strona Główna
        </Link>
        <button className="text-red-400 hover:text-red-300 transition">
          Wyloguj
        </button>
      </div>
    </header>
  );
}
import Link from 'next/link';

export default function Topbar() {
  return (
    // h-16: stała wysokość
    // flex justify-between: rozsuwa elementy na boki
    <header className="h-16 bg-gray-950 border-b border-gray-800 flex items-center justify-between gap-6 px-6">
      <div className="w-full text-gray-400">
        <Link href="/" >
          <span className="flex justify-center items-center text-white font-semibold">Mój Super Serwer</span>
        </Link>
      </div>
      
      <div className="flex gap-4 whitespace-nowrap">
        <button className="text-red-400 hover:text-red-300 transition">
          Wyloguj
        </button>
      </div>
    </header>
  );
}
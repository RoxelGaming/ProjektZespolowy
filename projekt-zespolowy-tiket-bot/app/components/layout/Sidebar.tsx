import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="w-64 h-full bg-gray-950 hidden md:flex flex-col">
      <div className="h-16 flex items-center justify-center px-4 border-b border-gray-800">
        <h2 className="text-4xl font-bold text-white">
          <Link href="/" >
            <span className="text-indigo-400">Ticket</span>Bot
          </Link>
        </h2>
      </div>
      
      <nav className="flex-1 p-4 px-4 space-y-2 border-r border-gray-800">
        <Link href="/dashboard" className="block px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 transition">
          Przegląd
        </Link>
        <Link href="/dashboard/settings" className="block px-4 py-2 rounded text-gray-400 hover:bg-gray-800 hover:text-white transition">
          Ustawienia
        </Link>
      </nav>
    </aside>
  );
}
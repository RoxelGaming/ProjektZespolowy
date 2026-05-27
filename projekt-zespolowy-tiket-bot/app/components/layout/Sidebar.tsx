import Link from 'next/link';

export default function Sidebar() {
  return (
    // w-64: stała szerokość 16rem
    // border-r: delikatna linia oddzielająca po prawej
    // hidden md:flex: chowa pasek na telefonach, pokazuje na większych ekranach
    <aside className="w-64 h-full bg-gray-950 border-r border-gray-800 hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-indigo-400">Menu</h2>
      </div>
      
      <nav className="flex-1 px-4 space-y-2">
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
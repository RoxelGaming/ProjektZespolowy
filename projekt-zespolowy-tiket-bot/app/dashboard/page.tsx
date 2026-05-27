export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Górna sekcja z powitaniem */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Przegląd panelu</h1>
        <p className="text-gray-400 mt-1">Witaj w centrum zarządzania Twoim Ticket Botem.</p>
      </div>

      {/* Siatka ze statystykami — Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Karta 1: Otwarte tickety */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <div className="text-gray-400 text-sm font-medium">Otwarte zgłoszenia</div>
          <div className="text-4xl font-bold mt-2 text-indigo-400">12</div>
          <div className="text-xs text-green-400 mt-1">▲ 3 nowe w ciągu ostatniej godziny</div>
        </div>

        {/* Karta 2: Zamknięte zgłoszenia */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <div className="text-gray-400 text-sm font-medium">Zamknięte dzisiaj</div>
          <div className="text-4xl font-bold mt-2 text-white">45</div>
          <div className="text-xs text-gray-400 mt-1">Średni czas reakcji: 14 min</div>
        </div>

        {/* Karta 3: Status bota */}
        <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl">
          <div className="text-gray-400 text-sm font-medium">Aktywne serwery</div>
          <div className="text-4xl font-bold mt-2 text-emerald-400">1</div>
          <div className="text-xs text-gray-400 mt-1">Status bota: Online</div>
        </div>
        
      </div>

      {/* Dolna sekcja na listę ostatnich zgłoszeń */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Ostatnia aktywność</h3>
        <div className="text-gray-400 text-sm">
          Tutaj w przyszłości pojawi się lista aktywnych ticketów pobierana bezpośrednio z *database* (bazy danych).
        </div>
      </div>
    </div>
  );
}
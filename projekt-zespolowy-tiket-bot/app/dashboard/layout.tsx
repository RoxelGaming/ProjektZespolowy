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
    <div className="flex h-screen w-full bg-gray-950 text-white overflow-hidden">
      
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
import Link from 'next/link';
import AnimatedWaves from './components/ui/AnimatedWaves/AnimatedWaves';

export default function Home() {
  return (
    <main className="relative min-h-screen bg-surface-base text-text-main/90 overflow-hidden">

      {/* Animowana fala */}
      <AnimatedWaves />
      
      <div className="absolute inset-0 bg-black/30" />

      {/* Przycisk nawigacji do dashboard */}
      <nav className="relative z-50 p-6 flex justify-end">
        <Link 
          href="/dashboard" 
          className="bg-brand-base hover:bg-brand-hover text-text-main font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Przejdź do Panelu
        </Link>
      </nav>

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4 animate-down-in">
        
        {/* Tytuł */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          <span className="text-brand-light">Ticket</span>Bot
        </h1>
        
        {/* Krótki opis */}
        <p className="text-xl text-text-muted max-w-lg">
          Zarządzaj zgłoszeniami na swoim serwerze Discord w najprostszy możliwy sposób. Szybko, sprawnie i nowocześnie.
        </p>

      </div>
    </main>
  );
}
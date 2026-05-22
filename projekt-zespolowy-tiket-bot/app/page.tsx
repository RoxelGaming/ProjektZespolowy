import Link from 'next/link';
import AnimatedWaves from './components/ui/AnimatedWaves';

export default function Home() {
  return (
    // 1. Główny kontener (Warstwa Tła)
    // - min-h-screen: zajmuje całą wysokość
    // - relative: baza dla elementów pozycjonowanych absolutnie
    // - bg-[url('/waves.svg')]: przykładowe podpięcie pliku SVG z folderu /public
    // - bg-cover/bg-center: tło ładnie się skaluje i jest na środku
    <main className="relative min-h-screen bg-gray-950 text-white">

      <AnimatedWaves />
      
      {/* Przyciemnienie tła (Overlay) */}
      {/* - absolute inset-0: zajmuje cały obszar rodzica */}
      {/* - bg-black/50: czarne tło z 50% przezroczystością */}
      <div className="absolute inset-0 bg-black/50" />

      {/* 2. Warstwa Nawigacji */}
      {/* - relative z-10: upewniamy się, że jest nad przyciemnieniem */}
      {/* - p-6: dodajemy padding wokół */}
      {/* - flex justify-end: wypychamy zawartość w prawo */}
      <nav className="relative z-10 p-6 flex justify-end">
        <Link 
          href="/dashboard" 
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-6 rounded-full transition duration-300"
        >
          Przejdź do Panelu
        </Link>
      </nav>

      {/* 3. Warstwa Treści (Hero Section) */}
      {/* - absolute inset-0: zajmuje całą stronę, żebyśmy mogli wyśrodkować */}
      {/* - flex flex-col: elementy w kolumnie (tytuł nad opisem) */}
      {/* - items-center justify-center: środkowanie w pionie i poziomie */}
      {/* - text-center: środkowanie tekstu wewnątrz elementów */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center p-4">
        
        {/* Tytuł */}
        {/* - text-6xl: bardzo duży tekst */}
        {/* - font-extrabold: najgrubsza czcionka Inter */}
        {/* - tracking-tight: lekko ściśnięte litery dla nowoczesnego wyglądu */}
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-4">
          <span className="text-indigo-400">Ticket</span>Bot
        </h1>
        
        {/* Krótki opis */}
        {/* - text-xl: nieco większy, czytelny tekst */}
        {/* - text-gray-300: lekko wyszarzony, żeby nie "krzyczał" jak tytuł */}
        {/* - max-w-lg: ograniczamy szerokość, żeby opis nie rozlał się na cały ekran */}
        <p className="text-xl text-gray-300 max-w-lg">
          Zarządzaj zgłoszeniami na swoim serwerze Discord w najprostszy możliwy sposób. Szybko, sprawnie i nowocześnie.
        </p>
      </div>
    </main>
  );
}
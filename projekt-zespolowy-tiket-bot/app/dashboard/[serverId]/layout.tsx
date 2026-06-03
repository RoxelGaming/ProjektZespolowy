// Dodajemy funkcję, która mówi Next.js, jakie zmockowane serwery istnieją.
// Dzięki temu Next.js wie, dla jakich linków ma wygenerować pliki HTML.
export function generateStaticParams() {
  return [
    { serverId: '123456789' }, // Przykładowe ID pierwszego zmockowanego serwera
    { serverId: '987654321' }, // Przykładowe ID drugiego zmockowanego serwera
    { serverId: 'test' }       // Możesz dodać ich ile chcesz
  ];
}

export default function ServerDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
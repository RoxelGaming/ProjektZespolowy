import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // Twoje dotychczasowe ustawienie ścieżki bazowej.
  basePath: process.env.NODE_ENV === 'production' ? '/ProjektZespolowy' : '',

  // Naprawa ostrzeżenia podczas uruchamiania (npx next start)
  outputFileTracingRoot: process.cwd(),

  // Naprawa ostrzeżenia dla Turbopacka w Next.js 16 (bez bloku experimental)
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;

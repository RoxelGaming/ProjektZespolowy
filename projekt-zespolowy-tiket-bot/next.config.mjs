import createNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = 
{
  reactStrictMode: true,
  // ...inne ustawienia Next.js...
};

// Wskazujemy ścieżkę do pliku i18n.ts
const withNextIntl = createNextIntlPlugin('./src/i18n.ts');

export default withNextIntl(nextConfig);

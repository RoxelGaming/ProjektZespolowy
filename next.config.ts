/** @type {import('next').NextConfig} */
const nextConfig = {
  // Jeśli masz to w jakimś podfolderze na serwerze (np. na GitHub Pages lub uczelnianym), wpisz to tu:
  basePath: process.env.NODE_ENV === 'production' ? '/projektzespolowy' : '',
  
  // Reszta Twoich ustawień (np. turbopack)
};

export default nextConfig;
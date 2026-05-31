import type { NextConfig } from "next";

// Sprawdzamy, czy aplikacja buduje się w trybie produkcyjnym
const isProd = process.env.NODE_ENV === 'production';

const nextConfig: NextConfig = {
<<<<<<< HEAD
  // Jeśli to produkcja -> użyj /projektzespolowy, jeśli lokalny dev -> zostaw puste
  basePath: isProd ? "/projektzespolowy" : "",
=======

>>>>>>> develop
};

export default nextConfig;
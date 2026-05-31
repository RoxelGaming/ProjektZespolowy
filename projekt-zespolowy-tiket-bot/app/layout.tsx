<<<<<<< HEAD
import "./globals.css"; // Ta linijka musi tu być!

export const metadata = {
  title: "TicketBot Dashboard",
  description: "Projekt Zespołowy",
};

export default function RootLayout({
  children,
}: {
=======
import './globals.css';
import { Inter } from 'next/font/google';
import { ToastProvider } from './contexts/ToastContext';

// Ładujemy font (czcionkę) i przypisujemy go do zmiennej
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
} : {
>>>>>>> develop
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
<<<<<<< HEAD
      <body>{children}</body>
=======
      <body className={`${inter.className} bg-black/90 text-white/90`}>
      <ToastProvider>
        {children}
      </ToastProvider>
      </body>
>>>>>>> develop
    </html>
  );
}
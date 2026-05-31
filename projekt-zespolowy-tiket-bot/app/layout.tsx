import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import "./globals.css";
import Navbar from "@/components/Navbar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import AccessibilityPanel from "@/components/ui/AccessibilityPanel";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "My App",
  description: "My App Description",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html
      lang="pl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body>
        
         <NextIntlClientProvider messages={messages}>
           <Navbar>
             <LanguageSwitcher />
             <ThemeToggle />
           </Navbar>
 
           {children}
           <AccessibilityPanel />
         </NextIntlClientProvider>
       </body>
     </html>
  );
}

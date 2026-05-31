import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Inter } from "next/font/google";

import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

import { AccessibilityProvider } from "@/providers/AccessibilityProvider";
import { ToastProvider } from "./contexts/ToastContext";

import "./globals.css";

import Navbar from "@/components/Navbar";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import ThemeToggle from "@/components/ThemeToggle";
import AccessibilityPanel from "@/components/ui/AccessibilityPanel";

// Dashboard layout elements
import Link from "next/link";
import { usePathname } from "next/navigation";

// Fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

// METADATA (jedna spójna wersja)
export const metadata: Metadata = {
  title: "TicketBot Dashboard",
  description: "Projekt Zespołowy",
};

// ===== ROOT LAYOUT =====
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
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          <AccessibilityProvider>
            <ToastProvider>

              {/* TOP BAR */}
              <Navbar>
                <LanguageSwitcher />
                <ThemeToggle />
              </Navbar>

              {/* DASHBOARD WRAPPER */}
              <DashboardShell>
                {children}
              </DashboardShell>

              {/* ACCESSIBILITY */}
              <AccessibilityPanel />

            </ToastProvider>
          </AccessibilityProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

// ===== DASHBOARD SHELL (z main) =====
function DashboardShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isInsideServer =
    pathname !== "/dashboard" &&
    pathname !== "/dashboard/" &&
    !pathname.startsWith("/dashboard/security") &&
    !pathname.startsWith("/dashboard/gdpr");

  if (isInsideServer) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-[#101216] text-[#f2f3f5] antialiased">
      {/* SIDEBAR */}
      <aside className="w-64 border-r border-[#1e222b] bg-[#161920] p-6 flex flex-col gap-8 shrink-0">
        <div className="text-xl font-bold text-white flex items-center gap-2.5 select-none">
          <span className="bg-[#5865F2] p-2 rounded-xl text-sm shadow-md shadow-[#5865f2]/20">
            🤖
          </span>
          TicketBot
        </div>

        <nav className="flex flex-col gap-1.5">
          <NavItem
            href="/dashboard"
            label="🛡️ Wybór Serwerów"
            active={pathname === "/dashboard"}
          />
          <NavItem
            href="/dashboard/security"
            label="🔑 Bezpieczeństwo konta"
            active={pathname.includes("/security")}
          />
          <NavItem
            href="/dashboard/gdpr"
            label="⚖️ Wnioski RODO / GDPR"
            active={pathname.includes("/gdpr")}
          />
        </nav>

        <div className="mt-auto pt-6 border-t border-[#1e222b]">
          <Link
            href="/"
            className="text-sm font-medium text-[#6b7280] hover:text-white transition flex items-center gap-2"
          >
            ← Strona główna bota
          </Link>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="flex-1 bg-[#101216] p-10 overflow-y-auto">
        <div className="max-w-5xl mx-auto">{children}</div>
      </main>
    </div>
  );
}

// ===== NAV ITEM =====
function NavItem({
  href,
  label,
  active,
}: {
  href: string;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`px-4 py-3 rounded-xl text-sm font-medium transition duration-200 block ${
        active
          ? "bg-[#5865F2] text-white shadow-lg shadow-[#5865f2]/10 font-semibold"
          : "text-[#9ca3af] hover:bg-[#1e222b] hover:text-white"
      }`}
    >
      {label}
    </Link>
  );
}

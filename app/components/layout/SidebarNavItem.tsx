'use client';

import Link from 'next/link';

interface SidebarNavItemProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

export default function SidebarNavItem({ href, label, active, onClick }: SidebarNavItemProps) {
  // Wywaliliśmy stąd basePath!
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`px-4 py-3 rounded-xl text-sm font-medium transition duration-200 block ${
        active 
          ? 'bg-[#5865F2] text-white shadow-lg shadow-[#5865f2]/10 font-semibold' 
          : 'text-[#9ca3af] hover:bg-[#1e222b] hover:text-white'
      }`}
    >
      {label}
    </Link>
  );
}
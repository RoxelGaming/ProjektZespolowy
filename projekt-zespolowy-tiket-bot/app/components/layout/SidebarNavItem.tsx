'use client';
import Link from 'next/link';

interface SidebarNavItemProps {
  href: string;
  label: string;
  active: boolean;
  onClick?: () => void;
}

export default function SidebarNavItem({ href, label, active, onClick }: SidebarNavItemProps) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className={`px-4 py-3 rounded-xl text-sm font-medium transition duration-200 block ${
        active 
          ? 'bg-brand-base text-white shadow-lg shadow-brand-base/20 font-semibold' 
          : 'text-text-muted hover:bg-surface-base hover:text-text-main'
      }`}
    >
      {label}
    </Link>
  );
}
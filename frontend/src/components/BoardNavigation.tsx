'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';
import { useUser } from '@/contexts/UserContext';
import { IoMdCube, IoMdHome, IoMdBook, IoMdPaper, IoMdHelpCircle } from 'react-icons/io';

export default function BoardNavigation() {
  const pathname = usePathname();
  const { user } = useUser();

  const NavLink = ({ href, icon: Icon, label }: { href: string, icon: React.ComponentType<{className?: string}>, label: string }) => (
    <Link
      href={href}
      className={`flex items-center justify-center p-2 rounded-lg transition-all duration-200 group
        ${pathname === href 
          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' 
          : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
        }`}
      title={label}
    >
      <Icon className="w-6 h-6 group-hover:scale-110 transition-transform" />
    </Link>
  );

  return (
    <div className="h-screen w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed top-0 left-0 z-3">
      {/* 导航菜单 */}
      <nav className="flex-1 overflow-y-auto space-y-2 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center p-2 rounded-lg transition-all duration-200"
        >
          <IoMdCube className="w-8 h-8" />
        </Link>
        
        {/* Home */}
        <NavLink href="/board" icon={IoMdHome} label="Dashboard" />

        {/* Blog */}
        <NavLink href="/blog" icon={IoMdPaper} label="Blog" />

        {/* Docs */}
        <NavLink href="/docs" icon={IoMdBook} label="Documentation" />

        {/* Support */}
        <NavLink href="/support" icon={IoMdHelpCircle} label="Support" />
      </nav>
      
      {/* Add UserMenu at the bottom */}
      {user && (
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <UserMenu />
        </div>
      )}
    </div>
  );
}
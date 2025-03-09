'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';
import { useUser } from '@/contexts/UserContext';
import { 
  HiHome, 
  HiDocumentText,
  HiBookOpen,
  HiQuestionMarkCircle,
  HiCube
} from 'react-icons/hi';

export default function BoardNavigation() {
  const pathname = usePathname();
  const { user } = useUser();

  const NavLink = ({ href, icon: Icon, label }: { href: string, icon: React.ComponentType<{className?: string}>, label: string }) => (
    <Link
      href={href}
      className={`flex items-center justify-center p-3 rounded-lg transition-all duration-300 group
        ${pathname === href 
          ? 'bg-blue-100/80 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 shadow-md' 
          : 'hover:bg-gray-100/50 dark:hover:bg-gray-700/50 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100'
        }`}
    >
      <Icon className="w-7 h-7 group-hover:scale-110 transition-transform" />
    </Link>
  );

  return (
    <div className="h-screen w-20 bg-white/95 dark:bg-gray-900/95 border-r border-gray-200/50 dark:border-gray-700/50 flex flex-col fixed top-0 left-0 z-30 backdrop-blur-sm">
      {/* 导航菜单 */}
      <nav className="flex-1 overflow-y-auto space-y-3 py-5 px-2">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center justify-center p-3 rounded-lg transition-all duration-300 hover:bg-gray-100/50 dark:hover:bg-gray-700/50"
        >
          <HiCube className="w-9 h-9 text-blue-600 dark:text-blue-400" />
        </Link>
        
        {/* Home */}
        <NavLink href="/home" icon={HiHome} label="Dashboard" />

        {/* Blog */}
        <NavLink href="/blog" icon={HiDocumentText} label="Blog" />

        {/* Docs */}
        <NavLink href="/docs" icon={HiBookOpen} label="Documentation" />

        {/* Support */}
        <NavLink href="/support" icon={HiQuestionMarkCircle} label="Support" />
      </nav>
      
      {/* Add UserMenu at the bottom */}
      {user && (
        <div className="p-4 border-t border-gray-200/50 dark:border-gray-700/50">
          <UserMenu />
        </div>
      )}
    </div>
  );
}

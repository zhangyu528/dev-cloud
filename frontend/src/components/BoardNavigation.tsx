'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import UserMenu from './UserMenu';
import { useUser } from '@/context/UserContext';

export default function BoardNavigation() {
  const pathname = usePathname();
  const { user } = useUser();

  return (
    <div className="h-screen w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed top-0 left-0 z-3">
      {/* 导航菜单 */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {/* Menu items removed */}
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
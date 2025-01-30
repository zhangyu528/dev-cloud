'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ProjectIcon, SystemIcon, MenuIcon } from '@/components/icons';

interface MenuItem {
  name: string;
  href: string;
  icon: React.ReactNode;
}

export default function VerticalDashboard() {
  const pathname = usePathname();
  const menuItems: MenuItem[] = [
    { 
      name: '工作区', 
      href: '/workspace', 
      icon: <ProjectIcon className="w-6 h-6" />
    },
    {
      name: '系统设置',
      href: '/settings',
      icon: <SystemIcon className="w-6 h-6" />
    },
  ];

  return (
    <div className="h-screen w-16 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col fixed top-0 left-0 z-3">
      {/* 导航菜单 */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors
              ${pathname === item.href 
                ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}

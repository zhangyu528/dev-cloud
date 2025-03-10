import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  IoGridOutline, 
  IoFolderOutline, 
  IoCodeSlashOutline, 
  IoLayersOutline, 
  IoSettingsOutline 
} from 'react-icons/io5';

const DashboardSidebar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: IoGridOutline, path: '/dashboard' },
    { name: 'Repositories', icon: IoCodeSlashOutline, path: '/dashboard/repositories' },
    { name: 'Projects', icon: IoFolderOutline, path: '/dashboard/projects' },
    { name: 'Collections', icon: IoLayersOutline, path: '/dashboard/collections' },
    { name: 'Settings', icon: IoSettingsOutline, path: '/dashboard/settings' },
  ];

  return (
    <aside className="dashboard-sidebar w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      <nav className="py-6">
        <ul className="space-y-2 px-4">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`flex items-center px-4 py-2.5 rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
                  <span>{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar; 
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useUser } from '@/contexts/UserContext';
import { 
  IoGridOutline, 
  IoFolderOutline, 
  IoCodeSlashOutline, 
  IoLayersOutline, 
  IoSettingsOutline,
  IoPersonOutline,
  IoChevronDownOutline
} from 'react-icons/io5';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const { user } = useUser();

  const navItems = [
    { name: 'Dashboard', icon: IoGridOutline, path: '/dashboard' },
    { name: 'Repositories', icon: IoCodeSlashOutline, path: '/dashboard/repositories' },
    { name: 'Projects', icon: IoFolderOutline, path: '/dashboard/projects' },
    { name: 'Collections', icon: IoLayersOutline, path: '/dashboard/collections' },
    { name: 'Settings', icon: IoSettingsOutline, path: '/dashboard/settings' },
  ];

  // 获取用户首字母或头像
  const getUserInitial = () => {
    if (!user) return '';
    return user.username ? user.username[0].toUpperCase() : 
           user.email ? user.email[0].toUpperCase() : '';
  };

  // 获取用户背景色
  const getColorForInitial = (initial: string) => {
    if (!initial) return '#6b7280';
    
    const colors = [
      '#ef4444', // red
      '#f97316', // orange
      '#eab308', // yellow
      '#22c55e', // green
      '#3b82f6', // blue
      '#8b5cf6', // purple
      '#ec4899', // pink
    ];
    
    const index = initial.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <aside className="dashboard-sidebar w-64 h-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* 用户信息区域 */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-3">
          {user?.avatar_url ? (
            <div className="relative h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={user.avatar_url}
                alt="User avatar"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div 
              className="h-10 w-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: getColorForInitial(getUserInitial()) }}
            >
              <span className="text-white font-medium">
                {getUserInitial()}
              </span>
            </div>
          )}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                {user?.username || user?.email?.split('@')[0] || 'User'}
              </h3>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
              {user?.email || 'user@example.com'}
            </p>
          </div>
        </div>
      </div>

      {/* 导航菜单 */}
      <nav className="py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <li key={item.name}>
                <Link 
                  href={item.path}
                  className={`flex items-center px-3 py-2 text-sm rounded-md transition-colors ${
                    isActive 
                      ? 'bg-blue-50 text-blue-600 dark:bg-gray-700 dark:text-blue-400' 
                      : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                  }`}
                >
                  <item.icon className={`w-4 h-4 mr-3 ${isActive ? 'text-blue-600 dark:text-blue-400' : ''}`} />
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
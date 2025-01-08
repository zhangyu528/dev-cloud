import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { HomeIcon, LogOutIcon } from './icons/MenuIcons';

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const email = "zhangyu528@example.com"; // TODO: 从用户状态获取邮箱

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
          {/* User Info Section */}
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{email}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1" role="menu">
            <Link 
              href="/dashboard"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Dashboard
            </Link>
            <Link 
              href="/account"
              className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              Account Settings
            </Link>
            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200">
              <span>Theme</span>
              <ThemeToggle />
            </div>
            <Link 
              href="/"
              className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
            >
              <span>Home Page</span>
              <HomeIcon className="w-4 h-4" />
            </Link>
            <div className="border-t border-gray-200 dark:border-gray-600"></div>
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={() => {/* 处理登出逻辑 */}}
            >
              <span>Log Out</span>
              <LogOutIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

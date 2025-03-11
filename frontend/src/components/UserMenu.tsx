'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userApi } from '@/api/user';
import Loading from '@/components/Loading';
import { ThemeToggle } from '@/components/ThemeToggle';
import { IoIosLogOut, IoMdArrowDropdown } from "react-icons/io";
import { MdOutlineBrightness4 } from "react-icons/md";
import { useUser } from '@/contexts/UserContext';
import { clearAuthToken } from '@/utils/authToken';

const getColorForInitial = (initial?: string) => {
  if (!initial) return '#6b7280';
  
  const colors = [
    '#ef4444',
    '#f97316', 
    '#eab308',
    '#22c55e',
    '#3b82f6',
    '#8b5cf6',
    '#ec4899',
  ];
  
  const index = initial.charCodeAt(0) % colors.length;
  return colors[index];
};

export default function UserMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { user, setUser } = useUser();

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    try {
      await userApi.logout();
    } finally {
      router.push('/login');
      setIsLoggingOut(false);
      setUser(null);
      clearAuthToken();
    }
  }

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

  if (!user) return null;

  const initial = user.username ? user.username[0].toUpperCase() : user.email ? user.email[0].toUpperCase() : '';
  const displayName = user.username || user.email?.split('@')[0] || 'User';
  
  return (
    <div className="relative" ref={menuRef}>
      <Loading fullScreen isLoading={isLoggingOut} text="Logging out..." />
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-1 py-1 px-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        {user.avatar_url ? (
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image
              src={user.avatar_url}
              alt="User avatar"
              fill
              className="object-cover"
            />
          </div>
        ) : (
          <div 
            className="h-8 w-8 rounded-full flex items-center justify-center"
            style={{ backgroundColor: getColorForInitial(initial) }}
          >
            <span className="text-white font-medium">
              {initial}
            </span>
          </div>
        )}
        <IoMdArrowDropdown className="text-gray-500 dark:text-gray-400" />
      </button>

      {isMenuOpen && (
        <div className="absolute right-0 top-full mt-1 w-56 rounded-md shadow-xl bg-white dark:bg-gray-800 ring-1 ring-black ring-opacity-5 z-50 border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center space-x-3 mb-1">
              {user.avatar_url ? (
                <div className="relative h-10 w-10 rounded-full overflow-hidden shadow-sm">
                  <Image
                    src={user.avatar_url}
                    alt="User avatar"
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div 
                  className="h-10 w-10 rounded-full flex items-center justify-center shadow-sm"
                  style={{ backgroundColor: getColorForInitial(initial) }}
                >
                  <span className="text-white font-medium">
                    {initial}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {displayName}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user.email}
                </p>
              </div>
            </div>
          </div>
          
          <div className="py-1">
            <div className="flex items-center justify-between px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">
              <div className="flex items-center">
                <MdOutlineBrightness4 className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
                <span>Theme</span>
              </div>
              <ThemeToggle />
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
            
            <button
              className="w-full flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
            >
              <IoIosLogOut className="w-4 h-4 mr-2 text-gray-500 dark:text-gray-400" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

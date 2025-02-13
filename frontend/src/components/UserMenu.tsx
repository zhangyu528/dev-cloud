'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { userApi } from '@/api/user';
import { ThemeToggle } from '@/components/ThemeToggle';
import Loading from '@/components/Loading';
import { RiHomeLine } from "react-icons/ri";
import { IoIosLogOut } from "react-icons/io";

interface UserMenuProps {
  avatarUrl?: string;
  email: string;
  username?: string;
}

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

export default function UserMenu({ avatarUrl, email, username }: UserMenuProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const handleLogoutClick = async () => {
    setIsLoggingOut(true);
    try {
      await userApi.logout();
      router.push('/login');
    } catch (error) {
      router.push('/login');
    } finally {
      setIsLoggingOut(false);
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

  const initial = username ? username[0].toUpperCase() : email ? email[0].toUpperCase() : '';
  return (
    <div className="relative" ref={menuRef}>
      <Loading fullScreen isLoading={isLoggingOut} text="Logging out..." />
      
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
      >
        {avatarUrl ? (
          <div className="relative h-8 w-8 rounded-full overflow-hidden">
            <Image
              src={avatarUrl}
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
      </button>

      {isMenuOpen && (
        <div className="absolute left-full bottom-0 mb-2 ml-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
            <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{email}</p>
          </div>

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
              <RiHomeLine className="w-4 h-4" />
            </Link>
            <div className="border-t border-gray-200 dark:border-gray-600"></div>
            <button
              className="w-full flex items-center justify-between px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
              onClick={handleLogoutClick}
              disabled={isLoggingOut}
            >
              <span>Log Out</span>
              <IoIosLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

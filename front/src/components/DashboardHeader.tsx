'use client';

import { Logo } from './icons/Logo';
import UserMenu from '@/components/UserMenu';

interface DashboardHeaderProps {
  isAtTop?: boolean;
  avatarUrl?: string;
  email: string;
}

export default function DashboardHeader({ 
  isAtTop = false,
  avatarUrl,
  email
}: DashboardHeaderProps) {

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Logo and project title */}
          <div className="flex items-center">
            {!isAtTop && (
              <div className="flex-shrink-0">
                <Logo />
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <UserMenu 
              avatarUrl={avatarUrl}
              email={email}
            />
          </div>
        </div>
      </div>
    </header>
  );
}

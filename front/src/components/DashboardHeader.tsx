import { useState } from 'react';
import { Logo } from './icons/Logo';
import { ProjectIcon } from './icons/ProjectIcon';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import UserMenu from './UserMenu';

export default function DashboardHeader() {
  const params = useParams();
  const username = params.username as string;

  return (
    <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left section - Logo and project title */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Logo />
            </div>
            <div className="flex items-center">
              <div className="mx-6 h-6 w-px bg-gray-200 dark:bg-gray-700" />
              <div className="flex items-center space-x-3 text-gray-900 dark:text-white">
                <ProjectIcon className="w-6 h-6" />
                <span className="text-sm font-medium">{username}&apos;s projects</span>
              </div>
            </div>
          </div>

          {/* Right section */}
          <div className="flex items-center space-x-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </header>
  );
}

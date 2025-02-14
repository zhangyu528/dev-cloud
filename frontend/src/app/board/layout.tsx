'use client'

import { UserProvider } from '@/context/UserContext';
import BoardNavigation from '@/components/BoardNavigation';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <div className="min-h-screen flex flex-row ml-16 bg-gray-50 dark:bg-gray-900">
        <div className="flex">
          <BoardNavigation />
          <main className="flex-1 ml-16">{children}</main>
        </div>
      </div>
    </UserProvider>
  );
}

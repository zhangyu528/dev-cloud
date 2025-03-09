'use client'

import { UserProvider } from '@/contexts/UserContext';
import { TemplatesProvider } from '@/contexts/TemplateContext';
import { WorkspacesProvider } from '@/contexts/WorkspacesContext';
import BoardNavigation from '@/components/BoardNavigation';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900">
      <UserProvider>
        <TemplatesProvider>
          <WorkspacesProvider>
            <BoardNavigation />
            {children}
          </WorkspacesProvider>
        </TemplatesProvider>
      </UserProvider>
    </div>
  );
}

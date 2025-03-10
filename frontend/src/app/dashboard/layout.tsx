'use client'

import { UserProvider } from '@/contexts/UserContext';
import { TemplatesProvider } from '@/contexts/TemplateContext';
import { WorkspacesProvider } from '@/contexts/WorkspacesContext';
import DashboardHeader from '@/components/DashboardHeader';
import DashboardSidebar from '@/components/DashboardSidebar';

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
            <DashboardHeader />
            <div className="flex h-[calc(100vh-56px)]">
              <DashboardSidebar />
              <main className="flex-1 overflow-auto">
                {children}
              </main>
            </div>
          </WorkspacesProvider>
        </TemplatesProvider>
      </UserProvider>
    </div>
  );
}

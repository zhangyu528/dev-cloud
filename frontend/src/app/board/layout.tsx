'use client'

import { UserProvider } from '@/contexts/UserContext';
import { TemplatesProvider } from '@/contexts/TemplateContext';
import { WorkspacesProvider } from '@/contexts/WorkspacesContext';
import BoardNavigation from '@/components/BoardNavigation';
import MainLayout from '@/components/layouts/MainLayout';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <TemplatesProvider>
        <WorkspacesProvider>
          <MainLayout>
            <BoardNavigation />
            {children}
          </MainLayout>
        </WorkspacesProvider>
      </TemplatesProvider>
    </UserProvider>
  );
}

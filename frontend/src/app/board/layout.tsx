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
    <UserProvider>
      <TemplatesProvider>
        <WorkspacesProvider>
          <BoardNavigation />
          {children}
        </WorkspacesProvider>
      </TemplatesProvider>
    </UserProvider>
  );
}

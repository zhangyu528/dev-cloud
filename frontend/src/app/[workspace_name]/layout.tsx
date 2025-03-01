'use client';

import MainLayout from '@/components/layouts/MainLayout'

export default function Workspace_nameLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <MainLayout>
      {children}
    </MainLayout>
  );
}
import React, { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {children}
    </main>
  );
};

export default MainLayout;
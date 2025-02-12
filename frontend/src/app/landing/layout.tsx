import { ReactNode } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="flex-1">  
        {children}
      </main>
      <Footer />
    </div>
  );
}

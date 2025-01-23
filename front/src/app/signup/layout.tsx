import { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}

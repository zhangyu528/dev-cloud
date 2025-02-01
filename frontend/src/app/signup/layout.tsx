import { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SignupLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      <div className="flex-1">
        <Header />
        {children}
        <Footer />
      </div>
    </div>
  );
}

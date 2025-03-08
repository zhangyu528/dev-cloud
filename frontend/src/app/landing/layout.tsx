import { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="dark:bg-gray-900">
      <Header />
      {children}
      <Footer />
    </div>
  );
}

import { ReactNode } from 'react';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MainLayout from '@/components/layouts/MainLayout';

export default function LandingLayout({ children }: { children: ReactNode }) {
  return (
    <MainLayout>
      <Header />
      {children}
      <Footer />
    </MainLayout>
  );
}

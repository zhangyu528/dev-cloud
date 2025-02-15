'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import MainLayout from '@/components/layouts/MainLayout'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MainLayout>
      <Header />
      {children}
      <Footer />
    </MainLayout>
  );
}



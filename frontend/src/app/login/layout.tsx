'use client'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {children}
      <Footer />
    </div>
  );
}



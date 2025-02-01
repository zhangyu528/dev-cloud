import Link from 'next/link'

import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header />
      {children}
      <div className="text-center py-4 border-t border-b border-gray-200 dark:border-gray-700">
        <Link 
          href="/signup" 
          className="text-sm text-blue-600 dark:text-blue-500 hover:underline"
        >
          Don't have an account? Sign Up
        </Link>
      </div>
      <Footer />
    </div>
  )
}

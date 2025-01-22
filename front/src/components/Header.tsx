'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Logo } from './icons/Logo'

export default function Header() {
  const pathname = usePathname()
  
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <Logo />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Dev Cloud
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link
              href={pathname?.startsWith('/login') ? '/signup' : '/login'}
              className="text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500 px-3 py-2 rounded-md"
            >
              {pathname?.startsWith('/login') ? 'Sign Up' : 'Log In'}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

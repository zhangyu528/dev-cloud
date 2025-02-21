'use client'

import { ThemeToggle } from '@/components/ThemeToggle'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 py-4 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            2025, DEV CLOUD Inc.
          </div>

          <div className="flex items-center space-x-8">
            {/* First group */}
            <div className="flex items-center">
              <Link 
                href="/features" 
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Feature Requests
              </Link>
            </div>

            <span className="text-gray-300 dark:text-gray-600">|</span>

            {/* Second group */}
            <div className="flex items-center">
              <Link 
                href="/terms" 
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Terms
              </Link>
              <span className="mx-2 text-gray-400 dark:text-gray-600">-</span>
              <Link 
                href="/privacy" 
                className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
              >
                Privacy
              </Link>
            </div>
          </div>

          <ThemeToggle />
        </div>
      </div>
    </footer>
  )
}

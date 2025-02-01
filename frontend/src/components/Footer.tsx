'use client'

import { ThemeToggle } from '@/components/ThemeToggle'

export default function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-800 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="text-xs text-gray-600 dark:text-gray-400">
          © 2025, DEV CLOUD Inc.
        </div>
        <ThemeToggle />
      </div>
    </footer>
  )
}

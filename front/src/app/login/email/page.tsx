'use client'
import Link from 'next/link'
import { EmailIcon } from '@/components/icons/EmailIcon'
import { useEffect, useRef } from 'react'

export default function EmailLoginPage() {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full space-y-8">
        <div>
          <h2 className="text-3xl font-bold text-center text-black dark:text-white">
            Log in to Dev Cloud
          </h2>
        </div>
        
        <form className="mt-8 space-y-6">
          <div className="max-w-xs mx-auto">
            <input
              ref={inputRef}
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                       bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                       focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
              placeholder="Email"
            />
          </div>

          <div className="max-w-xs mx-auto">
            <button
              type="submit"
              className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md
                       text-base text-white bg-gray-900 hover:bg-gray-800 
                       dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100
                       focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                       transition-colors"
            >
              <EmailIcon />
              Continue with Email
            </button>
          </div>

          <div className="max-w-xs mx-auto text-center">
            <Link 
              href="/login"
              className="text-sm text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-400"
            >
              ← Other Login options
            </Link>
          </div>
        </form>
      </div>
    </main>
  )
}
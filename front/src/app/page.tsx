'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (token) {
      fetch('/api/verify-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token })
      })
      .then(response => response.json())
      .then(data => {
        if (data.valid) {
          router.replace('/workspace')
        }
      })
    }
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Welcome to Dev Cloud
          </h1>
          <p className="mt-6 text-xl text-gray-600 dark:text-gray-300">
            Your cloud development environment
          </p>
          <div className="mt-10 flex justify-center space-x-4">
            <a
              href="/login"
              className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
            >
              Get Started
            </a>
            <a
              href="/about"
              className="inline-block px-6 py-3 text-blue-600 font-medium border border-blue-600 rounded-md hover:bg-blue-50 dark:hover:bg-blue-900"
            >
              Learn More
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}

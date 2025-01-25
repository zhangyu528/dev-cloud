'use client'

import React, { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import toast from 'react-hot-toast'
import { validateUsername } from '@/utils/validation'

export default function SignupPage() {
  const router = useRouter()
  const [selectedPlan, setSelectedPlan] = useState<string>('')
  const [name, setName] = useState('')
  const [isTrialExpanded, setIsTrialExpanded] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (selectedPlan && inputRef.current) {
      inputRef.current.focus()
    }
  }, [selectedPlan])


  const handleContinue = () => {
    const validationResult = validateUsername(name)
    if (!validationResult.isValid) {
      toast.error(validationResult.message)
      return
    }
    router.push(`/login/email?username=${encodeURIComponent(name)}&from=signup`)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow flex justify-center px-4 mt-48 mb-8">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md dark:shadow-gray-900/30 max-w-md w-full border border-gray-200 dark:border-gray-700 h-fit">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white text-center">
            Your first deploy<br />
            is just a sign-up away
          </h2>
          
          <h3 className="text-sm font-medium mb-4 text-gray-700 dark:text-gray-300">
            Plan Type
          </h3>
          
          <div className="grid grid-cols-2 gap-4">
            <div 
              className={`p-4 border rounded-lg cursor-pointer transition-colors
                ${selectedPlan === 'hobby' 
                  ? 'border-blue-500 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20' 
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-400'
                }`}
              onClick={() => setSelectedPlan('hobby')}
            >
              <div className="flex flex-col items-start">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-2">
                  Hobby
                </span>
                <p className="text-sm text-gray-600 dark:text-gray-400">For personal workspace</p>
              </div>
            </div>
            <div 
              className="p-4 border rounded-lg cursor-not-allowed bg-gray-100 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
            >
              <div className="flex flex-col items-start opacity-50">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-200 dark:bg-gray-600 text-gray-600 dark:text-gray-300 mb-2">
                  Pro
                </span>
                <p className="text-sm text-gray-500 dark:text-gray-400">For team workspace</p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            {selectedPlan === 'hobby' ? (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  ref={inputRef}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                />
              </div>
            ) : selectedPlan === 'pro' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Team Name
                  </label>
                  <input
                    ref={inputRef}
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                             focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  />
                </div>
                <div className="mb-8">
                  <div 
                    onClick={() => setIsTrialExpanded(!isTrialExpanded)}
                    className="flex items-center space-x-2 cursor-pointer group"
                  >
                    <svg
                      className={`w-4 h-4 text-gray-600 dark:text-gray-400 transform transition-transform ${isTrialExpanded ? 'rotate-90' : ''}`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-200">
                      Continuing will start a 14-day Pro plan trial.
                    </span>
                  </div>
                  {isTrialExpanded && (
                    <div className="mt-2 pl-6 text-sm text-gray-500 dark:text-gray-400">
                      Once the trial period ends for your new Vercel team, you can continue on the Pro plan starting at $20 per team seat.
                    </div>
                  )}
                </div>
              </>
            )}
            <button
              onClick={handleContinue}
              disabled={!selectedPlan || !name.trim()}
              className={`w-full py-2 px-4 rounded-md transition-colors text-center block
                ${(!selectedPlan || !name.trim())
                  ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                } text-white focus:outline-none focus:ring-2 focus:ring-blue-500 
                focus:ring-offset-2 dark:focus:ring-offset-gray-800`}
            >
              Continue
            </button>
            <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
              By joining, you agree to our{' '}
              <Link 
                href="/terms" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link 
                href="/privacy" 
                className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

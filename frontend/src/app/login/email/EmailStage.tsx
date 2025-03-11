'use client'
import React, { useState, useEffect } from 'react'
import { MdEmail } from "react-icons/md"
import { useRouter } from 'next/navigation'
import { verifyApi } from '@/api/verify'
import { toast } from 'react-hot-toast'

interface EmailStageProps {
  email: string;
  setEmail: (email: string) => void;
  setStage: (stage: 'email' | 'verification') => void;
}

export const EmailStage = ({ email, setEmail, setStage }: EmailStageProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isValidEmail, setIsValidEmail] = useState(false)

  // 验证邮箱格式
  useEffect(() => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(email));
  }, [email]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isValidEmail) return

    setIsLoading(true)
    try {
      await verifyApi.sendVerificationCode(email)
      setStage('verification')
    } catch (error) {
      toast.error('Failed to send verification code. Please try again.')
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        Log in to Dev Cloud
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <div className="w-80 relative">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className={`w-full px-4 py-3 rounded-md border-2 
                      bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                      focus:outline-none focus:ring-2 focus:border-transparent
                      transition-all duration-200
                      ${email.length > 0 && !isValidEmail 
                        ? 'border-red-400 dark:border-red-500 focus:ring-red-500' 
                        : 'border-gray-300 dark:border-gray-700 focus:ring-blue-500'}`}
            required
          />
          <div className={`absolute right-3 top-1/2 transform -translate-y-1/2 
                         ${email.length > 0 && !isValidEmail 
                           ? 'text-red-400 dark:text-red-500' 
                           : 'text-gray-400'}`}>
            <MdEmail className="w-5 h-5" />
          </div>
        </div>
        
        {email.length > 0 && !isValidEmail && (
          <p className="text-red-500 text-sm -mt-2">Please enter a valid email address</p>
        )}
        
        <button
          className="w-80 flex items-center justify-center px-4 py-4 rounded-md
                text-base text-gray-700 dark:text-white bg-white dark:bg-gray-800 
                border-2 border-gray-300 dark:border-gray-700 
                hover:bg-gray-50 dark:hover:bg-gray-750 
                hover:border-blue-400 dark:hover:border-blue-500
                shadow-sm hover:shadow-md transition-all duration-200
                group disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isValidEmail || isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 mr-3 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <MdEmail className='w-5 h-5 mr-3 text-blue-500 group-hover:text-blue-600 group-hover:animate-pulse'/>
          )}
          <span className="font-medium">Continue with Email</span>
        </button>
      </form>
    </div>
  )
}
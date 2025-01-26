'use client'
import React from 'react'
import Link from 'next/link'
import { EmailIcon } from '@/components/icons/EmailIcon'
import { useEffect, useRef, useState } from 'react'
import { VerificationInput } from '@/components/VerificationInput'
import { useRouter } from 'next/navigation'
import { verifyApi } from '@/api/verify'
import Loading from '@/components/Loading'
import { validateEmail } from '@/utils/validation'
import toast from 'react-hot-toast'

export default function EmailLoginPage() {
  const router = useRouter()
  const [isVerification, setIsVerification] = useState(false)
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [loadingText, setLoadingText] = useState('')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const usernameParam = searchParams.get('username')
    if (usernameParam) {
      setUsername(decodeURIComponent(usernameParam))
    }
  }, [])

  const [verificationCode, setVerificationCode] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)
  const verificationRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isVerification && inputRef.current) {
      inputRef.current.focus()
    } else if (isVerification && verificationRef.current) {
      verificationRef.current.focus()
    }
  }, [isVerification])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate email format
    const { isValid, message } = validateEmail(email)
    if (!isValid) {
      toast.error(message)
      return
    }

    setIsLoading(true)
    setLoadingText('Sending verification code...')
    try {
      await verifyApi.sendVerificationCode(email)
      setIsVerification(true)
    } catch (error) {
      toast.error((error as Error).message || '发生未知错误')
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setLoadingText('Verifying code...')
    try {
      await verifyApi.verifyAndLogin(email, verificationCode, username)
      router.push('/workspace')
    } catch (error) {
      toast.error((error as Error).message || '发生未知错误')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Loading fullScreen isLoading={isLoading} text={loadingText} />
      
      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-sm w-full space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-center text-black dark:text-white">
              {isVerification ? 'Enter verification code' : 'Log in to Dev Cloud'}
            </h2>
            {isVerification && (
              <p className="mt-2 text-sm text-center text-gray-600 dark:text-gray-400">
                We've sent a verification code to<br />
                <span className="text-gray-900 dark:text-gray-200">{email}</span>
              </p>
            )}
          </div>
          
          <form className="mt-8 space-y-6">
            <div className="max-w-xs mx-auto">
              {!isVerification ? (
                <input
                  ref={inputRef}
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                           focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent"
                  placeholder="Email"
                />
              ) : (
                <>
                  <VerificationInput
                    value={verificationCode}
                    onChange={setVerificationCode}
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      handleSendCode(e);
                    }}
                    className="mt-4 w-full text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400 
                             dark:hover:text-blue-300 text-center"
                    disabled={isLoading || email.length === 0}
                  >
                    Resend verification code
                  </button>
                </>
              )}
            </div>

            <div className="max-w-xs mx-auto">
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  isVerification ? handleVerify(e) : handleSendCode(e);
                }}
                className="w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-md
                         text-base text-white bg-gray-900 hover:bg-gray-800 
                         dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500
                         transition-colors disabled:bg-gray-400 disabled:hover:bg-gray-400 
                         disabled:cursor-not-allowed dark:disabled:bg-gray-500 dark:disabled:hover:bg-gray-500"
                disabled={isLoading || email.length === 0}
              >
                {!isVerification && <EmailIcon />}
                {isVerification ? 'Verify' : 'Continue with Email'}
              </button>
            </div>

            <div className="max-w-xs mx-auto text-center">
              {isVerification ? (
                <button
                  type="button"
                  onClick={() => {
                    setIsVerification(false)
                    setVerificationCode('')
                  }}
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-400"
                  disabled={isLoading}
                >
                  ← Use a different email
                </button>
              ) : (
                <Link 
                  href="/login"
                  className="text-sm text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-500 dark:hover:text-blue-400"
                >
                  ← Other Login options
                </Link>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  )
}

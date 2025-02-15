'use client'
import React, { useState } from 'react'
import { MdEmail } from "react-icons/md"
import { useRouter } from 'next/navigation'
import Button from '@/components/buttons/Button'
import { EmailInput } from '@/components/inputs/EmailInput'
import { validateEmail } from '@/utils/validation'
import { verifyApi } from '@/api/verify'

interface EmailStageProps {
  email: string;
  setEmail: (email: string) => void;
  setStage: (stage: 'email' | 'verification') => void;
}

export const EmailStage = ({ email, setEmail, setStage }: EmailStageProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await verifyApi.sendVerificationCode(email)
      setStage('verification')
    } catch (error) {
      console.error('Failed to send verification code', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100">
        Log in Dev Cloud
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <EmailInput
          value={email}
          onChange={setEmail}
          placeholder="Enter your email"
          className="w-80"
        />
        
        <Button
          type="submit"
          variant="primary"
          className="w-80 flex items-center justify-center"
          disabled={email.length === 0 || isLoading}
          icon={<MdEmail className='w-5 h-5 mr-3'/>}
        >
          Continue with Email
        </Button>
      </form>
    </div>
  )
}
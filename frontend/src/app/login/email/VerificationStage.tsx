'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { VerificationInput } from '@/components/VerificationInput'
import { verifyApi } from '@/api/verify'
import { setAuthToken } from '@/utils/authToken'
import { MdCheck, MdArrowBack, MdRefresh } from 'react-icons/md'

interface VerificationStageProps {
  email: string
  setStage: (stage: 'email' | 'verification') => void
}

export function VerificationStage({ 
  email, 
  setStage 
}: VerificationStageProps) {
  const router = useRouter()
  const [verificationCode, setVerificationCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const response = await verifyApi.verifyAndLogin(email, verificationCode)
      setAuthToken(response.access_token)
      toast.success('验证成功')
      router.push('/dashboard')
    } catch (error) {
      toast.error('验证码错误，请重试')
      setVerificationCode('')
    } finally {
      setIsLoading(false)
    }
  }

  const handleBack = () => {
    setStage('email')
  }

  const handleResendCode = async () => {
    setIsLoading(true)
    try {
      await verifyApi.sendVerificationCode(email)
      toast.success('验证码已重新发送')
    } catch (error) {
      toast.error('重新发送验证码失败')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-6 bg-gray-50 dark:bg-gray-900">
      <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-2">
        验证您的邮箱
      </h2>
      <form onSubmit={handleVerify} className="space-y-6 w-80">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            验证码已发送至 <span className="font-medium text-gray-800 dark:text-gray-200">{email}</span>
          </p>
        </div>

        <VerificationInput 
          value={verificationCode}
          onChange={setVerificationCode}
        />
        
        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-4 rounded-md
                text-base text-white bg-blue-600 hover:bg-blue-700
                border-2 border-blue-600 hover:border-blue-700
                shadow-sm hover:shadow-md transition-all duration-200
                group disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={verificationCode.length < 6 || isLoading}
        >
          {isLoading ? (
            <div className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          ) : (
            <MdCheck className='w-5 h-5 mr-3 group-hover:animate-pulse'/>
          )}
          <span className="font-medium">验证</span>
        </button>

        <div className="flex justify-between items-center pt-2">
          <button 
            type="button" 
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleBack}
            disabled={isLoading}
          >
            <MdArrowBack className="w-4 h-4 mr-1" />
            返回
          </button>
          <button 
            type="button" 
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleResendCode}
            disabled={isLoading}
          >
            <MdRefresh className="w-4 h-4 mr-1" />
            重新发送验证码
          </button>
        </div>
      </form>
    </div>
  )
}
'use client'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { VerificationInput } from '@/components/VerificationInput'
import Button from '@/components/buttons/Button'
import { verifyApi } from '@/api/verify'
import { setAuthToken } from '@/utils/authToken'

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
    <div className="w-full min-h-screen flex flex-col items-center justify-center space-y-6">
      <form onSubmit={handleVerify} className="space-y-4">
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">验证码已发送至 {email}</p>
        </div>

        <VerificationInput 
          value={verificationCode}
          onChange={setVerificationCode}
        />
        
        <Button
          type="submit"
          variant="primary"
          className="w-full flex items-center justify-center mt-4"
          disabled={verificationCode.length < 6 || isLoading}
        >
          验证
        </Button>

        <div className="flex justify-between items-center mt-4">
          <Button 
            type="button" 
            variant="link" 
            onClick={handleBack}
            disabled={isLoading}
          >
            返回
          </Button>
          <Button 
            type="button" 
            variant="link" 
            onClick={handleResendCode}
            disabled={isLoading}
          >
            重新发送验证码
          </Button>
        </div>
      </form>
    </div>
  )
}
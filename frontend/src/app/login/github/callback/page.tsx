'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { authApi } from '@/api/auth'

export default function GithubCallbackPage() {
  const router = useRouter()
  const [status, setStatus] = useState('Authenticating...')

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // 1. 从URL参数获取code和state
        const urlParams = new URLSearchParams(window.location.search)
        const code = urlParams.get('code')
        const state = urlParams.get('state')
        if (!code || !state) {
          throw new Error('Missing code or state parameter')
        }

        setStatus('Verifying GitHub credentials...')

        // 2. 调用后端API验证code和state
    const { token, username } = await authApi.exchangeGithubOAuthCode(code, state)
        
        // 3. 保存token并跳转
        localStorage.setItem('token', token)
        localStorage.setItem('username', username)
        setStatus('Login successful, redirecting...')
        router.push('/board')
      } catch (error) {
        console.error('GitHub authentication error:', error)
        setStatus('Authentication failed, redirecting to login...')
        router.push('/login?error=github_auth_failed')
      }
    }

    // 页面加载时自动触发回调处理
    handleCallback()
  }, [router])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <p>{status}</p>
      <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  )
}

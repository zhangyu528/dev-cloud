'use client'

import React from 'react'
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { authApi } from '@/api/auth'
import { useRouter } from 'next/navigation'
import { GitlabIcon, BitbucketIcon } from '@/components/icons'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
              Sign in to your account
            </h2>
          </div>
          <div className="space-y-3 max-w-sm mx-auto">
            <button 
              className="w-full flex items-center justify-center px-4 py-4 rounded-md
                    text-base text-gray-700 dark:text-white bg-white dark:bg-gray-800 
                    border-2 border-gray-300 dark:border-gray-700 
                    hover:bg-gray-50 dark:hover:bg-gray-750 
                    hover:border-blue-400 dark:hover:border-blue-500
                    shadow-sm hover:shadow-md transition-all duration-200
                    group"
              onClick={() =>router.push('/login/email')}>
              <MdEmail className='w-5 h-5 mr-3 text-blue-500 group-hover:text-blue-600 group-hover:animate-pulse' />
              <span className="font-medium">Continue with Email</span>
            </button>
            <button 
              onClick={authApi.githubLogin}
              className="w-full flex items-center justify-center px-4 py-4 rounded-md 
                    text-base text-white bg-[#24292e] hover:bg-[#2f363d] 
                    dark:bg-[#333] dark:hover:bg-[#444] 
                    border-2 border-[#24292e] dark:border-[#333]
                    hover:border-gray-500 dark:hover:border-gray-600
                    shadow-sm hover:shadow-md transition-all duration-200
                    group">
              <FaGithub className='w-5 h-5 mr-3 group-hover:animate-bounce' />
              <span className="font-medium">Continue with GitHub</span>
            </button>
            {/* <button className="w-full flex items-center justify-center px-4 py-4 rounded-md 
                    text-base text-white bg-[#fc6d26] hover:bg-[#e24329] 
                    dark:bg-[#fc6d26] dark:hover:bg-[#e24329] transition-colors">
              <GitlabIcon />
              Continue with GitLab
            </button>
            <button className="w-full flex items-center justify-center px-4 py-4 rounded-md 
                    text-base text-white bg-[#0052cc] hover:bg-[#0747a6] 
                    dark:bg-[#0052cc] dark:hover:bg-[#0747a6] transition-colors">
              <BitbucketIcon />
              Continue with Bitbucket
            </button> */}
          </div>
        </div>
      </main>
    </div>
  )
}

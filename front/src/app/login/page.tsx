'use client'

import React from 'react'
import Link from 'next/link'
import { GithubIcon } from '@/components/icons/GithubIcon'
import { GitlabIcon } from '@/components/icons/GitlabIcon'
import { BitbucketIcon } from '@/components/icons/BitbucketIcon'
import { authApi } from '@/api/auth'


export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex justify-center px-4 mt-48 mb-8">
        <div className="p-8 max-w-md w-full h-fit">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white text-center">
            Log in to Dev Cloud
          </h2>

          <div className="space-y-3 max-w-sm mx-auto">
            <button 
              onClick={authApi.githubLogin}
              className="w-full flex items-center justify-center px-4 py-4 rounded-md 
                    text-base text-white bg-[#24292e] hover:bg-[#2f363d] 
                    dark:bg-[#333] dark:hover:bg-[#444] transition-colors">
              <GithubIcon />
              Continue with GitHub
            </button>
            <button className="w-full flex items-center justify-center px-4 py-4 rounded-md 
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
            </button>
          </div>

          <p className="mt-4 text-sm text-center text-gray-600 dark:text-gray-400">
            <Link
              href="/login/email"
              className="text-blue-600 hover:text-blue-700 hover:underline dark:text-blue-400 dark:hover:text-blue-300 inline-flex items-center"
            >
              Continue with Email →
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}

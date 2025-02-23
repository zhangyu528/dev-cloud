'use client'

import React from 'react'
import { FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { authApi } from '@/api/auth'
import Button  from '@/components/buttons/Button'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow flex justify-center px-4 mt-48 mb-8">
        <div className="p-8 max-w-md w-full h-fit">
          <h2 className="text-4xl font-bold mb-6 text-black dark:text-white text-center">
            Log in to Dev Cloud
          </h2>

          <div className="space-y-3 max-w-sm mx-auto">
            <Button variant="primary"
                    icon={<MdEmail className='w-5 h-5' />}
                    className="h-14 w-full"
                    onClick={() =>router.push('/login/email')}>Continue with Email</Button>
            <button 
              onClick={authApi.githubLogin}
              className="w-full flex items-center justify-center px-4 py-4 rounded-md 
                    text-base text-white bg-[#24292e] hover:bg-[#2f363d] 
                    dark:bg-[#333] dark:hover:bg-[#444] transition-colors">
              <FaGithub className='w-5 h-5 mr-3' />
              Continue with GitHub
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

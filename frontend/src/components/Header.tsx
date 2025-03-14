'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoMdCube } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { IoRocketOutline } from 'react-icons/io5'

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 
        text-white
        ${isScrolled 
          ? 'shadow-lg bg-opacity-50 backdrop-blur-md' 
          : 'bg-transparent'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <IoMdCube className="h-8 w-8" />
          <span className="ml-2 text-xl font-bold">
            Dev Cloud
          </span>
        </Link>
        <button
          onClick={() => router.push("/login")}
          className="group flex items-center space-x-2 px-5 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105"
        >
          <IoRocketOutline className="w-5 h-5 group-hover:animate-pulse" />
          <span>Get Started</span>
        </button>
      </div>
    </header>
  )
}

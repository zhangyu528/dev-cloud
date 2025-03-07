'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IoMdCube } from 'react-icons/io'
import Button from '@/components/buttons/Button'
import { useState, useEffect } from 'react'

export default function Header() {
  const router = useRouter()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 
        ${isScrolled 
          ? 'bg-gray-800 text-white shadow-lg bg-opacity-50 backdrop-blur-md' 
          : 'bg-transparent text-white'}
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center">
          <IoMdCube className="h-8 w-8" />
          <span className="ml-2 text-xl">
            Dev Cloud
          </span>
        </Link>
        <Button
          onClick={() => router.push("/login")}
          variant="primary"
          size="md"
        >
          Get Started
        </Button>
      </div>
    </header>
  )
}

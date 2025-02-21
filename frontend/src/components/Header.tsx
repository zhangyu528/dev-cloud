'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdCube } from "react-icons/io";
import Button from '@/components/buttons/Button';
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Header() {
  const pathname = usePathname()
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
    <nav 
      className={`
        fixed top-0 left-0 right-0 z-50
        transition-all duration-300 
        ${isScrolled 
          ? 'bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm shadow-md' 
          : 'bg-transparent'}
        hover:shadow-lg
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className={`
              flex items-center space-x-3
              ${isScrolled 
                ? 'text-gray-900 dark:text-white font-bold' 
                : 'text-blue-300 dark:text-blue-300 font-bold hover:text-blue-200'}
            `}>
              <IoMdCube className="w-6 h-6" />
              <span className="text-xl">
                Dev Cloud
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => router.push("/login")}
              variant={isScrolled ? "primary" : "secondary"}
              size="md"
            >
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}

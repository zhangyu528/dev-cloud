'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { IoMdCube } from "react-icons/io";
import Button from '@/components/buttons/Button';
import { useRouter } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className=" bg-white dark:bg-gray-800 shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-3">
              <IoMdCube className="w-6 h-6 text-gray-800 dark:text-white" />
              <span className="text-xl font-semibold text-gray-800 dark:text-white">
                Dev Cloud
              </span>
            </Link>
          </div>
          <div className="flex space-x-4">
            <Button
              onClick={() => router.push("/login")}
              variant="primary"
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

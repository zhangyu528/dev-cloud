'use client'

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-1000 text-white text-sm py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          {/* 版权信息 */}
          <div className="mb-4 md:mb-0">
            <p>&copy; {new Date().getFullYear()} My Website. All rights reserved.</p>
          </div>

          {/* 导航链接 */}
          <nav className="flex space-x-4">
            <Link href="/about" className="hover:text-gray-400">
              About
            </Link>
            <Link href="/privacy" className="hover:text-gray-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-gray-400">
              Terms of Service
            </Link>
          </nav>

          {/* 社交媒体链接 */}
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Twitter
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Facebook
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-400"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

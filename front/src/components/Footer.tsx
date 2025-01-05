import { ThemeToggle } from './ThemeToggle'

export default function Footer() {
  return (
    <footer className="w-full bg-white dark:bg-gray-800 shadow-md mt-auto relative">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>
      <div className="max-w-7xl mx-auto px-4 py-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2025, DEV CLOUD Inc.
        </p>
      </div>
    </footer>
  )
}

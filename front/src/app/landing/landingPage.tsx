import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center py-20">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white sm:text-5xl">
            Welcome to Our Platform
          </h1>
          <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
            Build amazing projects with our powerful tools
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/login"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-700 dark:hover:bg-indigo-600"
            >
              Get Started
            </Link>
            <Link
              href="/signup" 
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 dark:text-indigo-200 dark:bg-indigo-900 dark:hover:bg-indigo-800"
            >
              Create Account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

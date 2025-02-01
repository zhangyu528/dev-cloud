'use client'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Button from '@/components/buttons/Button';

// Ensure framer-motion dependency is installed:
// npm install framer-motion

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="relative overflow-hidden min-h-screen">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center pt-20 relative">
          {/* Dynamic welcome section */}
          <motion.h1
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="text-4xl font-bold text-gray-800 sm:text-5xl dark:text-gray-200"
          >
            Welcome to Dev Cloud
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="mt-4 text-xl text-gray-600 dark:text-gray-400"
          >
            What if your dev experience was faster and more efficient?
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.4 }}
            className="mt-8 flex justify-center gap-4"
          >
            <Button
              onClick={() => router.push("/login")}
              variant="primary"
              size="lg"
            >
              Get Started
            </Button>
          </motion.div>
        </div>

        {/* Static section for Dev Cloud (no motion) */}
        <div className="max-w-3xl mx-auto pt-16 px-4 sm:px-6 lg:px-8">
          <div className="relative bg-gradient-to-b from-blue-50/50 to-transparent dark:from-gray-800/50 rounded-2xl p-8 border border-gray-200/50 dark:border-gray-700">
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-blue-400 to-purple-400 dark:from-blue-600 dark:to-purple-600" />
            <p className="text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300 tracking-wide">
              Dev Cloud is a powerful workspace for full-stack, multiplatform app development in the cloud. It supports a wide range of frameworks, languages, and services, streamlining your development workflow so you can efficiently build and ship apps across platforms with speed, ease, and quality.
            </p>
          </div>
        </div>

        {/* Static Section: Development Workflow (no motion) */}
        <div className="bg-gray-50 dark:bg-gray-900/50 py-16">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-2 mb-8">
              <div className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-400">
              </div>
              <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 sm:text-4xl tracking-tight">
                Let’s make the development workflow better, together
              </h2>
            </div>

            <div className="space-y-6 text-gray-700 dark:text-gray-300">
              <p className="text-lg leading-relaxed">
                While software development today is more accessible than ever before, it’s also more complicated.
              </p>
              
              <div className="space-y-4 pl-6 border-l-2 border-blue-200 dark:border-blue-800/50">
                <p className="relative before:absolute before:-left-6 before:top-3 before:w-2 before:h-2 before:bg-blue-400 before:rounded-full">
                  We’re constantly exploring additional ways to simplify and speed up your entire workflow, like richer collaboration tools, across environment sync, pair debugging, code review, and more.
                </p>
              </div>

              <p className="text-lg leading-relaxed">
                But we can't do this alone — we want to hear from you as we continue to update Dev Cloud and reimagine a better workflow to build, ship, and manage apps. To try out Dev Cloud and give feedback, sign in with your Account below.
              </p>
            </div>

            <div className="mt-10 flex justify-center gap-4">
              <Button
                onClick={() => router.push("/login")}
                variant="primary"
                size="lg"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

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
        <div className="max-w-xl mx-auto pt-10 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-md text-gray-600 dark:text-gray-400">
            Dev Cloud is a powerful workspace for full-stack, multiplatform app development in the cloud. It supports a wide range of frameworks, languages, and services, streamlining your development workflow so you can efficiently build and ship apps across platforms with speed, ease, and quality.
          </p>
        </div>

        {/* Static Section: Development Workflow (no motion) */}
        <div className="bg-gray-100 dark:bg-gray-800 py-10">
          <div className="max-w-lg mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-center text-3xl font-bold text-gray-800 dark:text-gray-200 sm:text-4xl">
              Let’s make the development workflow better, together
            </h2>
            <p className="text-center mt-4 text-lg text-gray-600 dark:text-gray-400">
              While software development today is more accessible than ever before, it’s also more complicated.
            </p>
            <p className="text-center mt-4 text-lg text-gray-600 dark:text-gray-400">
              We’re constantly exploring additional ways to simplify and speed up your entire workflow, like richer collaboration tools, across environment sync, pair debugging, code review, and more.
            </p>
            <p className="text-center mt-4 text-lg text-gray-600 dark:text-gray-400">
              But we can't do this alone — we want to hear from you as we continue to update Dev Cloud and reimagine a better workflow to build, ship, and manage apps. To try out Dev Cloud and give feedback, sign in with your Account below.
            </p>
            <div className="mt-8 flex justify-center gap-4">
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

'use client'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '@/components/buttons/Button';
import { IoMdCode, IoMdRocket, IoMdFlash } from 'react-icons/io';
import Image from 'next/image';
import { InteractiveGradientOverlay } from '@/components/InteractiveGradientOverlay';

// Ensure framer-motion dependency is installed:
// npm install framer-motion

export default function LandingPage() {
  const router = useRouter();
  return (
    <>
      {/* Hero Section: Engaging headline and subtext with dynamic background */}
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
        <InteractiveGradientOverlay />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="text-5xl md:text-6xl font-extrabold 
              bg-clip-text text-transparent 
              bg-gradient-to-r from-blue-600 to-purple-600 
              dark:from-blue-400 dark:to-purple-400"
          >
            Turn Your Dev Ideas into Reality, Faster
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
            className="mt-6 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
          >
            Accelerate your development workflow with AI-powered tools and seamless collaboration
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
            className="mt-8 flex justify-center space-x-4"
          >
            <Button 
              variant="primary" 
              size="lg" 
              className="flex items-center space-x-2 group"
              onClick={() => router.push("/login")}
            >
              <IoMdRocket className="w-6 h-6 group-hover:animate-bounce" />
              <span>Start Building</span>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="flex items-center space-x-2 group"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <IoMdFlash className="w-6 h-6 group-hover:text-yellow-500" />
              <span>See Features</span>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-8">
              Powerful Features for Modern Development
            </h2>
            
            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                  Get to Work Quickly, Wherever You Are
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  DevCloud gets you into your dev workflow in no time, backed by robust security and scalability. 
                  Go from opening your browser to building an application in a matter of seconds, not days.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button 
                    variant="primary" 
                    size="lg" 
                    className="flex items-center space-x-2 group"
                    onClick={() => router.push("/login")}
                  >
                    <IoMdRocket className="w-6 h-6 group-hover:animate-bounce" />
                    <span>Start Building</span>
                  </Button>
                </div>
              </div>
              <motion.div 
                className="rounded-lg overflow-hidden border border-gray-300 dark:border-gray-600 aspect-video"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeInOut",
                  delay: 0.4
                }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                  transition: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300
                  }
                }}
              >
                <Image 
                  src="/pro1.png" 
                  alt="DevCloud Project Screenshot" 
                  width={1200} 
                  height={675} 
                  className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              </motion.div>
            </div>

            {/* 可以添加更多 features */}
          </div>
        </div>
      </div>

      {/* Benefits Section: Highlight key advantages */}
      <section id="benefits" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Why Choose DevCloud?
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Unlock unprecedented productivity and collaboration
            </p>
          </div>
          {/* Benefits grid will be added here */}
        </div>
      </section>

      {/* Social Proof Section: Testimonials and User Stats */}
      <section id="social-proof" className="py-24 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Trusted by Developers Worldwide
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Join thousands of developers who are transforming their workflow
            </p>
          </div>
          {/* Testimonials and stats will be added here */}
        </div>
      </section>

      {/* CTA (Call to Action) Section: Final Push to Sign Up */}
      <section id="cta" className="py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Ready to Supercharge Your Development?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Start your journey with DevCloud and turn your most ambitious projects into reality
          </p>
          <Button 
            variant="secondary" 
            size="lg" 
            className="flex items-center space-x-2 group mx-auto"
            onClick={() => router.push("/login")}
          >
            <IoMdRocket className="w-6 h-6 group-hover:animate-bounce" />
            <span>Get Started Now</span>
          </Button>
        </div>
      </section>

      {/* FAQ Section: Common Questions */}
      <section id="faq" className="py-24 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-xl text-gray-600 dark:text-gray-300">
              Got questions? We've got answers
            </p>
          </div>
          {/* FAQ accordion or list will be added here */}
        </div>
      </section>
    </>
  )
}

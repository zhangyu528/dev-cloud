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
      <section id="hero" className="min-h-screen flex items-center justify-center pt-24">
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
            className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button 
              variant="primary" 
              size="lg" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 group"
              onClick={() => router.push("/login")}
            >
              <IoMdRocket className="w-6 h-6 group-hover:animate-bounce" />
              <span>Start Building</span>
            </Button>
            <Button 
              variant="secondary" 
              size="lg" 
              className="w-full sm:w-auto flex items-center justify-center space-x-2 group"
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
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-gray-900">
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
      </section>

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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Scalability */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <IoMdRocket className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                <h3 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Instant Scalability
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Scale your development environment instantly. From small projects to enterprise-level applications, 
                our cloud infrastructure grows with your needs without any hardware limitations.
              </p>
            </div>

            {/* Collaboration */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <IoMdCode className="w-8 h-8 text-purple-600 dark:text-purple-400" />
                <h3 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Seamless Collaboration
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Work together in real-time with your team. Share development environments, 
                code reviews, and deployments effortlessly, all in one unified platform.
              </p>
            </div>

            {/* Security */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <IoMdFlash className="w-8 h-8 text-yellow-600 dark:text-yellow-400" />
                <h3 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Enterprise-Grade Security
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Rest easy with our robust security measures. Benefit from automated backups, 
                encryption at rest and in transit, and compliance with industry standards.
              </p>
            </div>

            {/* Cost Efficiency */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <IoMdFlash className="w-8 h-8 text-green-600 dark:text-green-400" />
                <h3 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Cost Optimization
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Pay only for what you use. Eliminate hardware costs and reduce operational overhead 
                with our flexible pricing model and resource optimization features.
              </p>
            </div>

            {/* Global Access */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <IoMdCode className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
                <h3 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Global Accessibility
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Access your development environment from anywhere in the world. Work seamlessly 
                across devices with consistent performance and reliability.
              </p>
            </div>

            {/* Automated Updates */}
            <div className="p-6 rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center mb-4">
                <IoMdRocket className="w-8 h-8 text-red-600 dark:text-red-400" />
                <h3 className="ml-3 text-xl font-semibold text-gray-800 dark:text-gray-100">
                  Automated Maintenance
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                Focus on coding while we handle the rest. Automatic updates, dependency management, 
                and system maintenance ensure your environment is always up-to-date and secure.
              </p>
            </div>
          </div>
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
          
          <div className="grid gap-8 md:grid-cols-2">
            {/* Getting Started */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Getting Started
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">How do I start using DevCloud?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Simply sign up for an account, choose your plan, and you can immediately start creating your first project. Our intuitive interface will guide you through the process.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">What are the system requirements?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">DevCloud works on all modern browsers. For optimal performance, we recommend using the latest versions of Chrome, Firefox, or Safari.</p>
                  </div>
                </div>
              </div>

              {/* Account & Security */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Account & Security
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">How secure is my data?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">We use industry-standard encryption and security practices. Your data is encrypted both in transit and at rest, and we regularly perform security audits.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">How do I reset my password?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Click on the "Forgot Password" link on the login page. You'll receive an email with instructions to reset your password securely.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Billing & Features */}
            <div className="space-y-6">
              {/* Billing & Subscription */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Billing & Subscription
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">What payment methods do you accept?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">We accept all major credit cards, PayPal, and wire transfers for enterprise customers. All payments are processed securely through our payment partners.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Can I cancel my subscription anytime?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Yes, you can cancel your subscription at any time. Your service will continue until the end of your current billing period.</p>
                  </div>
                </div>
              </div>

              {/* Technical Support */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                  Technical Support
                </h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">How can I get technical support?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Our support team is available 24/7. You can reach us through the in-app chat, email support, or our community forums. Enterprise customers get priority support.</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-white">Do you offer training resources?</h4>
                    <p className="mt-2 text-gray-600 dark:text-gray-300">Yes, we provide comprehensive documentation, video tutorials, webinars, and a knowledge base. Enterprise plans include personalized training sessions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section End */}
    </>
  )
}

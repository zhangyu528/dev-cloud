'use client'
import FeaturesSection from '@/app/landing/featuresSection';
import BenefitsSection from '@/app/landing/benefitsSection';
import CtaSection from '@/app/landing/ctaSection';
import HeroSection from '@/app/landing/heroSection';

// Ensure framer-motion dependency is installed:
// npm install framer-motion

export default function LandingPage() {
  return (
    <>
      {/* Hero Section: Engaging headline and subtext with dynamic background */}
      <HeroSection />
      
      {/* Features Section */}
      <FeaturesSection />

      {/* Benefits Section: Highlight key advantages */}
      <BenefitsSection />

      {/* CTA (Call to Action) Section: Final Push to Sign Up */}
      <CtaSection />
    </>
  )
}

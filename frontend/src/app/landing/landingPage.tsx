'use client'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import Button from '@/components/buttons/Button';
import { IoMdCode, IoMdRocket, IoMdFlash } from 'react-icons/io';
import Image from 'next/image';
import { InteractiveGradientOverlay } from '@/components/InteractiveGradientOverlay';
import FeaturesSection from '@/app/landing/featuresSection';
import BenefitsSection from '@/app/landing/benefitsSection';
import CtaSection from '@/app/landing/ctaSection'; // 导入 CtaSection
import HeroSection from '@/app/landing/heroSection'; // 导入 HeroSection

// Ensure framer-motion dependency is installed:
// npm install framer-motion

export default function LandingPage() {
  const router = useRouter();
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

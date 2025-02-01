'use client'

import LandingPageLayout from './landing/layout';
import LandingPageContent from './landing/landingPage'; 

export default function Home() {
  return (
    <LandingPageLayout>
      <LandingPageContent />
    </LandingPageLayout>
  );
}

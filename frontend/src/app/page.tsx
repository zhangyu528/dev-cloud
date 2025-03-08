'use client'

import LandingPageLayout from './landing/layout';
import LandingPage from './landing/landingPage'; 

export default function Home() {
  return (
    <LandingPageLayout>
      <LandingPage />
    </LandingPageLayout>
  );
}

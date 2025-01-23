'use client'
import { Suspense, useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getAuthToken } from '@/request/authToken';

const LandingPageLayout = dynamic(() => import('@/app/landing/layout'), {
  ssr: false,
});
const LandingPageContent = dynamic(() => import('@/app/landing/landingPage'), {
  ssr: false,
});
const WorkspaceLayout = dynamic(() => import('@/app/workspace/layout'), {
  ssr: false,
});
const WorkspacePage = dynamic(() => import('@/app/workspace/workspacePage'), {
  ssr: false,
});

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!getAuthToken());
  }, []);

  return (
    <Suspense fallback={<div>加载中...</div>}>
      {isLoggedIn ? (
        <WorkspaceLayout>
          <WorkspacePage />
        </WorkspaceLayout>
      ) : (
        <LandingPageLayout>
          <LandingPageContent />
        </LandingPageLayout>
      )}
    </Suspense>
  );
}

'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearAuthToken } from '@/request/authToken';
import { userApi } from '@/api/user';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/DashboardHeader';
import { TemplateList } from '@/components/TemplateList';

export default function UserProjects() {
  const router = useRouter();
  const params = useParams();

  const [avatar_url, setAvatarUrl] = useState<string>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await userApi.getCurrentUser();
        if (params.username !== currentUser.username) {
          router.push(`/workspace/${currentUser.username}`);
        }
        setAvatarUrl(currentUser.avatar_url);
      } catch {
        clearAuthToken();
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router, params.username]);

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader avatarUrl={avatar_url} />
      
      <div className="flex-1 grid grid-cols-2 gap-8 p-8">
        {/* Left Section */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            Start building your app in the cloud
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Welcome to Project IDX, a new web-based development workspace
          </p>
        </div>

        {/* Right Section - Templates */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Choose a Template
          </h2>
          <TemplateList />
        </div>
      </div>

      <Footer />
    </div>
  );
}

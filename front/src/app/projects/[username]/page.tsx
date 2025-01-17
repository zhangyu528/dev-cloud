'use client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearAuthToken } from '@/request/apiRequest';
import { userApi } from '@/api/user';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/DashboardHeader';
import TabControl from '@/components/TabControl';
import Overview from './Overview';

export default function UserProjects() {
  const router = useRouter();
  const params = useParams();

  const [avatar_url, setAvatarUrl] = useState<string>();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await userApi.getCurrentUser();
        if (params.username !== currentUser.username) {
          router.push(`/projects/${currentUser.username}`);
        }
        setAvatarUrl(currentUser.avatar_url);
      } catch {
        clearAuthToken();
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router, params.username]);
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'active', label: 'Active Projects' },
    { id: 'completed', label: 'Completed Projects' },
  ];

  const renderTabContent = (activeTab: string) => {
    switch (activeTab) {
      case 'overview':
        return <Overview />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader avatarUrl={avatar_url} />
        <TabControl 
          tabs={tabs} 
          onTabChange={(tabId) => console.log(`Tab changed to: ${tabId}`)}
        >
          {renderTabContent('overview')}
        </TabControl>
      <Footer />
    </div>
  );
}

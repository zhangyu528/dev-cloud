'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearAuthToken } from '@/request/authToken';
import { userApi } from '@/api/user';
import DashboardHeader from '@/components/DashboardHeader';
import Footer from '@/components/Footer';

export default function WorkspaceLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const currentUser = await userApi.getCurrentUser();
        setAvatarUrl(currentUser.avatar_url);
        setUsername(currentUser.username);
      } catch {
        clearAuthToken();
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <DashboardHeader 
        avatarUrl={avatar_url}
        username={username}
      />
      {children}
      <Footer />
    </div>
  );
}

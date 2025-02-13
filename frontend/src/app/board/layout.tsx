'use client'

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { clearAuthToken, getAuthToken } from '@/utils/authToken';
import { userApi } from '@/api/user';
import VerticalDashboard from '@/components/VerticalDashboard';
import Footer from '@/components/Footer';

export default function BoardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter();
  const [avatar_url, setAvatarUrl] = useState<string>();
  const [email, setEmail] = useState<string>('');
  const [username, setUsername] = useState<string>('');

  useEffect(() => {
    const checkAuth = async () => {
      const token = getAuthToken();
      if (!token) {
        router.push('/login');
        return;
      }
      
      try {
        const currentUser = await userApi.getCurrentUser();
        setAvatarUrl(currentUser.avatar_url);
        setEmail(currentUser.email);
        setUsername(currentUser.username);
      } catch {
        clearAuthToken();
        router.push('/login');
      }
    };
    
    checkAuth();
  }, [router]);

  return (
    <div className="min-h-screen flex flex-row ml-16 bg-gray-50 dark:bg-gray-900">
      <VerticalDashboard />
      {children}
    </div>
  );
}

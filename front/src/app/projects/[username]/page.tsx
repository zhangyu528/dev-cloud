'use client';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/DashboardHeader';

export default function UserProjects() {
  const params = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardHeader />

      <Footer />
    </div>
  );
}

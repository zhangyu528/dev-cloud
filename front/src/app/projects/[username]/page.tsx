'use client';
import { useParams } from 'next/navigation';
import Footer from '@/components/Footer';
import DashboardHeader from '@/components/DashboardHeader';
import TabControl from '@/components/TabControl';
import Overview from './Overview';

export default function UserProjects() {
  const params = useParams();
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
      <DashboardHeader />
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

'use client';
import { useState, useEffect } from 'react';
import { Logo } from './icons/Logo';

interface Tab {
  id: string;
  label: string;
}

interface TabControlProps {
  tabs: Tab[];
  defaultTab?: string;
  onTabChange?: (tabId: string) => void;
  children?: React.ReactNode;
  showLogo?: boolean;
}

export default function TabControl({ tabs, defaultTab, onTabChange, children, showLogo }: TabControlProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id);
  const [isAtTop, setIsAtTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    onTabChange?.(tabId);
  };

  return (
    <div className="w-full">
      <div className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        <nav className="-mb-px flex px-6 items-center" aria-label="Tabs">
          {isAtTop && (
            <div className="mr-4">
              <Logo className="w-8 h-8" />
            </div>
          )}
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                whitespace-nowrap py-3 px-4 border-b-2 font-medium text-sm
                ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900 dark:border-white dark:text-white'
                    : 'border-transparent text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="mt-4 px-6">
        {children}
      </div>
    </div>
  );
}

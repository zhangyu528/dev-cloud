import React from 'react';
import { useRouter } from 'next/navigation';
import { IoMdCube } from 'react-icons/io';
import { IoAddOutline } from 'react-icons/io5';
import UserMenu from './UserMenu';
import { useTemplateDialog } from '@/app/dashboard/contexts/TemplateDialogContext';

const DashboardHeader = () => {
  const router = useRouter();
  const { openTemplateDialog } = useTemplateDialog();

  return (
    <header className="dashboard-header flex justify-between items-center px-4 py-2 bg-white dark:bg-gray-800 shadow-md z-10 relative">
      {/* 左侧产品图标 */}
      <div 
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => router.push('/dashboard')}
      >
        <IoMdCube className="text-blue-500 text-2xl" />
        <span className="font-bold text-ml dark:text-white">DevCloud</span>
      </div>

      {/* 右侧操作区 */}
      <div className="flex items-center space-x-4">
        {/* New Project按钮 */}
        <button
          onClick={openTemplateDialog}
          className="flex items-center space-x-1 px-3 py-1.5 bg-transparent text-blue-400 text-sm border border-transparent hover:bg-gray-900 hover:border-gray-500"
        >
          <IoAddOutline className="text-lg" />
          <span>New Project</span>
        </button>
        
        {/* 用户菜单 */}
        <UserMenu />
      </div>
    </header>
  );
};

export default DashboardHeader;
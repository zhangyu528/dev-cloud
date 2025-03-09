'use client';
import React, { useState } from 'react';

import { Explorer } from '../explorer/Explorer'; // 导入 Explorer 组件
import { ExplorerProvider } from '../explorer/contexts/ExplorerContext';
import { useIdeContext } from '../contexts/IdeContext';
import { FaFolder, FaSearch, FaCodeBranch, FaHome } from 'react-icons/fa'; // 使用更合适的图标
import { SidebarButton } from './SidebarButton';
import Button from '@/components/buttons/Button';
import Link from 'next/link';

export const SideBar: React.FC = () => {
    const { workspaceName } = useIdeContext();
    // 默认选中 explorer
    const [selectedButton, setSelectedButton] = useState<string>('explorer');

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName); // 直接设置选中按钮
    };

    return (
        <div className="sidebar bg-[#1A1A1A] flex flex-row h-full">
            {/* 按钮区域 */}
            <div className="sidebar-buttons flex flex-col p-2 space-y-3 border-r border-gray-700"> 
                <Link href={`/home`} className='flex justify-center hover:bg-gray-700 rounded p-2'>
                    <FaHome className="text-blue-600 dark:text-blue-400 w-5 h-5" />
                </Link>
                <SidebarButton 
                    icon={FaFolder}
                    name="explorer"
                    isSelected={selectedButton === 'explorer'}
                    onClick={() => handleButtonClick('explorer')}
                />
                <SidebarButton 
                    icon={FaSearch}
                    name="search"
                    isSelected={selectedButton === 'search'}
                    onClick={() => handleButtonClick('search')}
                />
                <SidebarButton 
                    icon={FaCodeBranch}
                    name="git"
                    isSelected={selectedButton === 'git'}
                    onClick={() => handleButtonClick('git')}
                />
                {/* 可以添加更多按钮 */}
            </div>
            {/* 内容显示区域 */}
            <div className="sidebar-content flex-grow h-full">
                <div 
                    className={`h-full ${selectedButton === 'explorer' ? 'block' : 'hidden'}`}
                >
                     <ExplorerProvider workspaceName={workspaceName}>
                         <Explorer />
                     </ExplorerProvider>
                </div>
                <div 
                    className={`h-full ${selectedButton === 'search' ? 'block' : 'hidden'}`}
                >
                    <div className="p-4 text-gray-500 h-full">搜索内容即将推出</div>
                </div>
                <div 
                    className={`h-full ${selectedButton === 'git' ? 'block' : 'hidden'}`}
                >
                    <div className="p-4 text-gray-500 h-full">Git 管理内容即将推出</div>
                </div>
            </div>
        </div>
    );
};

'use client';
import React, { useState } from 'react';

import { Explorer } from '../explorer/Explorer'; // 导入 Explorer 组件
import { ExplorerProvider } from '../explorer/contexts/ExplorerContext';
import { useIdeContext } from '../contexts/IdeContext';
import { FaFolderOpen, FaSearch, FaGitAlt } from 'react-icons/fa'; // 假设使用 react-icons 库
import { SidebarButton } from './SidebarButton';

export const SideBar: React.FC = () => {
    const { workspaceName } = useIdeContext();
    const [selectedButton, setSelectedButton] = useState<string>('explorer');

    const handleButtonClick = (buttonName: string) => {
        setSelectedButton(buttonName); // 直接设置选中按钮
    };

    return (
        <div className="sidebar bg-[#1A1A1A] flex flex-row h-full">
            {/* 按钮区域 */}
            <div className="sidebar-buttons flex flex-col p-2 space-y-3 border-r border-gray-700"> 
                <SidebarButton 
                    icon={FaFolderOpen}
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
                    icon={FaGitAlt}
                    name="git"
                    isSelected={selectedButton === 'git'}
                    onClick={() => handleButtonClick('git')}
                />
                {/* 可以添加更多按钮 */}
            </div>
            {/* 内容显示区域 */}
            <div className="sidebar-content flex-grow">
                {selectedButton === 'explorer' ? (
                    <ExplorerProvider workspaceName={workspaceName}>
                        <Explorer />
                    </ExplorerProvider>
                ) : selectedButton === 'search' ? (
                    <div className="p-4 text-gray-500">Search content coming soon</div>
                ) : selectedButton === 'git' ? (
                    <div className="p-4 text-gray-500">Git management content coming soon</div>
                ) : null}
            </div>
        </div>
    );
};

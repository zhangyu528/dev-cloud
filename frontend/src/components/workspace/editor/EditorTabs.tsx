import React from 'react';

interface FileTab {
  path: string;
  unsavedChanges?: boolean;
}

interface EditorTabsProps {
  tabs: FileTab[];
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  closeTab: (index: number) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  tabs,
  activeTabIndex,
  setActiveTabIndex,
  closeTab
}) => {
  return (
    <div className="flex border-b bg-gray-100 dark:bg-gray-800 shadow-sm">
      {tabs.map((tab, index) => (
        <div 
          key={tab.path}
          className={`relative flex items-center px-4 py-2 text-sm cursor-pointer transition-all duration-200 group ${index === activeTabIndex 
              ? 'bg-white dark:bg-gray-700 text-blue-600 font-semibold border-x border-t border-gray-200 dark:border-gray-600' 
              : 'hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300'}
          `}
          onClick={() => setActiveTabIndex(index)}
        >
          {/* 文件图标 */}
          <i className="i-mdi-file-document-outline mr-2 opacity-70 group-hover:opacity-100"></i>
          
          {/* 文件名 */}
          <span className="truncate max-w-[150px]">
            {tab.path.split('/').pop()}
          </span>

          {/* 未保存变更标记 */}
          {tab.unsavedChanges && (
            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          )}

          {/* 关闭按钮 */}
          <button 
            className="ml-2 p-1 rounded-full hover:bg-red-100 hover:text-red-500 transition-colors duration-200 opacity-0 group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(index);
            }}
          >
            <i className="i-mdi-close text-gray-500 hover:text-red-500"></i>
          </button>
          
          {/* 活动标签底部高亮 */}
          {index === activeTabIndex && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500"></div>
          )}
        </div>
      ))}
    </div>
  );
};
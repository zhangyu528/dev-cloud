import React from 'react';

interface FileTab {
  path: string;
  unsavedChanges?: boolean;
  name: string;
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
    <div 
      className="flex bg-[#1A1A1A]"  
      style={{ height: 32 }}  
    >
      {tabs.map((tab, index) => (
        <div 
          key={tab.path}
          className={`
            relative flex items-center px-4 py-2 text-xs cursor-pointer transition-all duration-200 group 
            border-r border-[#2C2C2C]  
            ${index === activeTabIndex 
              ? 'bg-[#1E1E1E] font-bold text-gray-100 border-b-0'  
              : 'hover:bg-[#252526] text-gray-400 border-b'}  
            ${index === activeTabIndex ? 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-blue-500' : ''}
          `}
          onClick={() => setActiveTabIndex(index)}
        >
          {/* 文件图标 */}
          <i className="i-mdi-file-document-outline mr-2 opacity-70 group-hover:opacity-100"></i>
          
          {/* 文件名 */}
          <span className="truncate max-w-[150px]">
            {tab.name}
          </span>

          {/* 未保存变更标记 */}
          {tab.unsavedChanges && (
            <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
          )}

          {/* 关闭按钮 */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              closeTab(index);
            }}
            className={`
              ml-2 text-xs transition-opacity duration-200
              ${index === activeTabIndex 
                ? 'opacity-100' 
                : 'opacity-0 group-hover:opacity-100'}
              hover:text-gray-100
            `}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};
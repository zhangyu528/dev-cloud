import React, { useState } from 'react';
import { DirectoryItem } from '@/api/workspaces';
import { RootNode } from './RootNode';

interface ExplorerProps {
  root: DirectoryItem | null;
}

export const Explorer: React.FC<ExplorerProps> = ({ root }) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);

  const handleFileSelect = (path: string) => {
    setSelectedFilePath(path);
    
    // 触发自定义文件选择事件
    const fileSelectedEvent = new CustomEvent('file-selected', { 
      detail: path 
    });
    window.dispatchEvent(fileSelectedEvent);
  };

  return (
    <div 
      className="
        bg-white 
        dark:bg-gray-800
        rounded-xl 
        shadow-sm 
        dark:shadow-md
        overflow-hidden 
        h-full
        flex 
        flex-col
      ">
      <div className="
        text-xs 
        font-semibold 
        text-gray-300 
        px-6
        py-2
      "
      >
        Workspace Explorer
      </div>

      <div className="
        flex-grow 
        overflow-y-auto 
      ">
        {root ? (
          <RootNode 
            item={root} 
            onFileSelect={handleFileSelect} 
            selectedFilePath={selectedFilePath}
          />
        ) : (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-2">加载中...</div>
        )}
      </div>
    </div>
  );
};
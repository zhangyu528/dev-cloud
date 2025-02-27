import React, { useState } from 'react';
import { DirectoryItem } from '@/api/workspaces';
import { RootNode } from './RootNode';

interface WorkspaceExplorerProps {
  root: DirectoryItem | null;
  onFileSelect: (path: string) => void;
}

export const WorkspaceExplorer: React.FC<WorkspaceExplorerProps> = ({ root, onFileSelect }) => {
  const [selectedFilePath, setSelectedFilePath] = useState<string | null>(null);

  const handleFileSelect = (path: string) => {
    setSelectedFilePath(path);
    onFileSelect(path);
  };

  return (
    <div className="
      bg-white 
      dark:bg-gray-800
      border 
      border-gray-200 
      dark:border-gray-700
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
        text-gray-700 
        dark:text-gray-300
        px-4 
        py-3 
        border-b 
        border-gray-200 
        dark:border-gray-700
        bg-gray-50
        dark:bg-gray-900
      ">
        Workspace Explorer
      </div>
      <div className="
        flex-grow 
        overflow-y-auto 
        p-2 
        dark:bg-gray-800
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
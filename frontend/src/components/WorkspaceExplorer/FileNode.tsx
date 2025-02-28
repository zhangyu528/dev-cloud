import React from 'react';
import { FileIcon } from './FileIcons';

import { DirectoryItem } from '@/api/workspaces';

interface FileNodeProps {
  item: DirectoryItem;
  depth: number;
  fullPath: string;
  onFileSelect: (path: string) => void;
  selectedFilePath: string | null;
}

export const FileNode: React.FC<FileNodeProps> = ({ 
  item, 
  depth, 
  fullPath, 
  onFileSelect, 
  selectedFilePath 
}) => {
  const handleSelect = () => {
    onFileSelect(fullPath);
  };

  const isSelected = selectedFilePath === fullPath;

  return (
    <div 
      onClick={handleSelect}
      className={`
        w-full 
        flex 
        items-center 
        cursor-pointer 
        p-1 
        transition-all 
        duration-200 
        ease-in-out
        ${isSelected 
          ? 'bg-blue-100 dark:bg-blue-900/30 text-gray-900 dark:text-white' 
          : 'text-gray-900 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'}
      `}
    >
      <FileIcon 
        fileName={item.name}
        className="mr-2"
      />

      <span 
        className={`
          text-xs 
          truncate 
          flex-1 
          ${isSelected ? 'font-medium' : 'font-normal'}
        `}
      >
        {item.name}
      </span>
    </div>
  );
};

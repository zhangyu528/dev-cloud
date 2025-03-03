import React from 'react';
import { FileIcon } from './FileIcons';
import { DirectoryItem } from '@/api/workspaces';

interface FileNodeProps {
  file: DirectoryItem;
  fullPath: string;
}

export const FileNode: React.FC<FileNodeProps> = ({ 
  file, 
  fullPath
}) => {
  const handleSelect = () => {
    // 触发文件选择事件
    const fileSelectedEvent = new CustomEvent('file-selected', { 
      detail: fullPath 
    });
    window.dispatchEvent(fileSelectedEvent);
  };

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
        text-gray-900 dark:text-gray-300 
        hover:bg-gray-100 dark:hover:bg-gray-700
      `}
    >
      <FileIcon 
        fileName={file.name}
        className="mr-2"
      />

      <span 
        className={`
          text-xs 
          truncate 
          max-w-[200px]
        `}
      >
        {file.name}
      </span>
    </div>
  );
};

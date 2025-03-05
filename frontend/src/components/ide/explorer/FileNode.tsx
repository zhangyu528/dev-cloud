import React from 'react';
import { FileIcon } from './FileIcons';
import { useExplorer } from './contexts/ExplorerContext';

interface FileNodeProps {
  fileName: string;
  fullPath: string;
}

export const FileNode: React.FC<FileNodeProps> = ({ 
  fileName, 
  fullPath
}) => {
  const { selectFile } = useExplorer();

  const handleSelect = () => {
    selectFile(fullPath);
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
        fileName={fileName}
        className="mr-2"
      />

      <span 
        className={`
          text-xs 
          truncate 
          max-w-[200px]
        `}
      >
        {fileName}
      </span>
    </div>
  );
};

import React, { useState, useEffect } from 'react'; 
import { 
  FaChevronDown, 
  FaChevronRight 
} from 'react-icons/fa';
import { FaRegFolder } from "react-icons/fa";
import { DirectoryItem } from '@/api/workspaces';
import { FileNode } from './FileNode';

interface DirectoryNodeProps {
  item: DirectoryItem;
  depth: number;
  fullPath: string;
  onFileSelect: (path: string) => void;
  selectedFilePath: string | null;
}

export const DirectoryNode: React.FC<DirectoryNodeProps> = ({ 
  item, 
  depth, 
  fullPath, 
  onFileSelect, 
  selectedFilePath 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleSelect = () => {
    onFileSelect(fullPath);
  };

  const handleToggleAndSelect = () => {
    onFileSelect(fullPath);
    toggleExpand();
  };

  const isSelected = selectedFilePath === fullPath;

  return (
    <div 
      className={`
        border 
        rounded-lg 
        ${isSelected 
          ? 'border-blue-300 dark:border-blue-600' 
          : 'border-transparent'}
        transition-all 
        duration-200 
        ease-in-out
        mb-1
      `}
    >
      <div
        className={`
          flex 
          items-center 
          justify-between 
          p-1 
          rounded-lg 
          cursor-pointer 
          transition-all 
          duration-200 
          ease-in-out
          ${isSelected 
            ? 'text-blue-700 dark:text-blue-300' 
            : 'text-gray-900 dark:text-gray-100'}
        `}
        onClick={handleToggleAndSelect}
      >
        <div className="flex items-center">
          <div 
            className="
              mr-2 
              p-0.5 
              rounded-full 
              cursor-pointer
            " 
            onClick={(e) => {
              e.stopPropagation();
              toggleExpand();
            }}
          >
            {isExpanded 
              ? <FaChevronDown className="text-xs text-gray-600 dark:text-gray-300" /> 
              : <FaChevronRight className="text-xs text-gray-600 dark:text-gray-300" />}
          </div>

          <FaRegFolder className="mr-2 w-4 h-4 text-blue-500 dark:text-blue-300" />

          <span 
            className={`
              text-xs 
              truncate 
              max-w-[200px] 
              ${isSelected ? 'font-medium' : ''}
            `}
          >
            {item.name}
          </span>
        </div>
      </div>

      {isExpanded && item.contents && (
        <div className="pl-3 pt-1 pb-2">
          {item.contents.map((child, index) => (
            child.type === 'directory' ? (
              <DirectoryNode
                key={index}
                item={child}
                depth={depth + 1}
                fullPath={`${fullPath}/${child.name}`.replace(/^\//, '')}
                onFileSelect={onFileSelect}
                selectedFilePath={selectedFilePath}
              />
            ) : (
              <FileNode
                key={index}
                item={child}
                depth={depth + 1}
                fullPath={`${fullPath}/${child.name}`.replace(/^\//, '')}
                onFileSelect={onFileSelect}
                selectedFilePath={selectedFilePath}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};
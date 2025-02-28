import React, { useState } from 'react'; 
import { 
  FaChevronDown, 
  FaChevronRight, 
  FaPlus, 
  FaFolderPlus, 
  FaSync, 
  FaCompressAlt 
} from 'react-icons/fa';

import { DirectoryItem } from '@/api/workspaces';
import { FileNode } from './FileNode';
import { DirectoryNode } from './DirectoryNode';

interface RootNodeProps {
  item: DirectoryItem;
  onFileSelect: (path: string) => void;
  selectedFilePath: string | null;
  onRefresh?: () => void;
  onCollapse?: () => void;
}

export const RootNode: React.FC<RootNodeProps> = ({ 
  item, 
  onFileSelect, 
  selectedFilePath, 
  onRefresh, 
  onCollapse 
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleSelect = () => {
    onFileSelect(item.name);
  };

  const handleToggleAndSelect = () => {
    onFileSelect(item.name);
    toggleExpand();
  };

  const handleNewFile = () => {
    // TODO: 实现新建文件逻辑
    console.log('New File');
  };

  const handleNewFolder = () => {
    // TODO: 实现新建文件夹逻辑
    console.log('New Folder');
  };

  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      // TODO: 实现默认刷新逻辑
      console.log('Refresh');
    }
  };

  const handleCollapse = () => {
    if (onCollapse) {
      onCollapse();
    }
    setIsExpanded(false);
  };

  const isSelected = selectedFilePath === item.name;

  return (
    <div>
      <div
        className={`
          relative 
          group 
          flex 
          items-center 
          justify-between 
          p-1
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

        <div className="flex items-center space-x-2">
          <button 
            className={`
              text-gray-500 
              p-1 
              rounded-full 
              hover:bg-blue-100 
              dark:hover:bg-blue-800
            `}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
              handleNewFile();
            }}
            title="New File"
          >
            <FaPlus className="text-xs" />
          </button>
          <button 
            className={`
              text-gray-500 
              p-1 
              rounded-full 
              hover:bg-blue-100 
              dark:hover:bg-blue-800
            `}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
              handleNewFolder();
            }}
            title="New Folder"
          >
            <FaFolderPlus className="text-xs" />
          </button>
          <button 
            className={`
              text-gray-500 
              p-1 
              rounded-full 
              hover:bg-blue-100 
              dark:hover:bg-blue-800
            `}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
              handleRefresh();
            }}
            title="Refresh"
          >
            <FaSync className="text-xs" />
          </button>
          <button 
            className={`
              text-gray-500 
              p-1 
              rounded-full 
              hover:bg-blue-100 
              dark:hover:bg-blue-800
            `}
            onClick={(e) => {
              e.stopPropagation();
              handleSelect();
              handleCollapse();
            }}
            title="Collapse Folder"
          >
            <FaCompressAlt className="text-xs" />
          </button>
        </div>
      </div>

      {isExpanded && item.contents && (
        <div className="pl-1 pt-1 pb-1">
          {item.contents.map((child, index) => (
            child.type === 'directory' ? (
              <DirectoryNode
                key={index}
                item={child}
                depth={1}
                fullPath={`${item.name}/${child.name}`.replace(/^\//, '')}
                onFileSelect={onFileSelect}
                selectedFilePath={selectedFilePath}
              />
            ) : (
              <FileNode
                key={index}
                item={child}
                depth={1}
                fullPath={`${item.name}/${child.name}`.replace(/^\//, '')}
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
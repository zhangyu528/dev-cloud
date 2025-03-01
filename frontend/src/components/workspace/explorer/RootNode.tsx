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
  directory: DirectoryItem;
}

export const RootNode: React.FC<RootNodeProps> = ({ directory }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleToggleAndSelect = () => {
    toggleExpand();
  };

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
          text-gray-900 dark:text-gray-100
        `}
        onClick={handleToggleAndSelect}
      >
        <div className="flex items-center">
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          <span className="ml-2">{directory.name}</span>
        </div>
      </div>

      {isExpanded && directory.contents && (
        <div className="pl-4">
          {directory.contents.map((child, index) => (
            child.type === 'directory' ? (
              <DirectoryNode 
                key={`dir-${child.name}-${index}`}
                directory={child} 
                fullPath={`${directory.name}/${child.name}`}
              />
            ) : (
              <FileNode 
                key={`file-${child.name}-${index}`}
                file={child} 
                fullPath={`${directory.name}/${child.name}`}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};
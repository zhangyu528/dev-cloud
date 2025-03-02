import React, { useState } from 'react'; 
import { 
  FaChevronDown, 
  FaChevronRight 
} from 'react-icons/fa';
import { FaRegFolder } from "react-icons/fa";
import { DirectoryItem } from '@/api/workspaces';
import { FileNode } from './FileNode';

interface DirectoryNodeProps {
  directory: DirectoryItem;
  fullPath: string;
}

export const DirectoryNode: React.FC<DirectoryNodeProps> = ({ 
  directory, 
  fullPath
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(prev => !prev);
  };

  const handleToggleAndSelect = () => {
    toggleExpand();
  };

  return (
    <div 
      className={`
        border 
        rounded-lg 
        border-transparent
        transition-all 
        duration-200 
      `}
    >
      <div 
        className="flex items-center cursor-pointer p-1 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs font-semibold"
        onClick={handleToggleAndSelect}
      >
        {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        <FaRegFolder className="ml-1 mr-2 text-yellow-600" />
        <span className="text-xs">{directory.name}</span>
      </div>

      {isExpanded && directory.contents && (
        <div className="pl-4">
          {directory.contents.map((child, index) => (
            child.type === 'directory' ? (
              <DirectoryNode 
                key={`dir-${child.name}-${index}`}
                directory={child} 
                fullPath={`${fullPath}/${child.name}`}
              />
            ) : (
              <FileNode 
                key={`file-${child.name}-${index}`}
                file={child} 
                fullPath={`${fullPath}/${child.name}`}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};
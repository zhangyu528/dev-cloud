import React, { useState } from 'react'; 
import { 
  FaChevronDown, 
  FaChevronRight, 
  FaPlus, 
  FaFolderPlus, 
  FaSync, 
  FaCompressAlt 
} from 'react-icons/fa';

import { FileNode } from './FileNode';
import { DirectoryNode } from './DirectoryNode';
import { useExplorer } from './contexts/ExplorerContext';

export const RootNode: React.FC = () => {
  const { rootDirectory } = useExplorer();
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
        <div className="flex items-center text-xs font-semibold">
          {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
          <span className="ml-2">{rootDirectory.name}</span>
        </div>
      </div>

      {isExpanded && rootDirectory.contents && (
        <div className="pl-4">
          {rootDirectory.contents.map((child, index) => (
            child.type === 'directory' ? (
              <DirectoryNode 
                key={`dir-${child.name}-${index}`}
                directory={child} 
                fullPath={`${rootDirectory.name}/${child.name}`}
              />
            ) : (
              <FileNode 
                key={`file-${child.name}-${index}`}
                fileName={child.name} 
                fullPath={`${rootDirectory.name}/${child.name}`}
              />
            )
          ))}
        </div>
      )}
    </div>
  );
};
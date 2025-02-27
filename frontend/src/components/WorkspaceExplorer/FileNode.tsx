import React from 'react';
import { 
  FaFile, 
  FaImage, 
  FaCode, 
  FaFileAlt, 
  FaFilePdf, 
  FaFileWord, 
  FaFileArchive 
} from 'react-icons/fa';
import { DirectoryItem } from '@/api/workspaces';
import { DirectoryNode } from './DirectoryNode';

interface FileNodeProps {
  item: DirectoryItem;
  depth?: number;
  fullPath?: string;
  onFileSelect: (path: string) => void;
  selectedFilePath: string | null;
}

export const FileNode: React.FC<FileNodeProps> = ({ 
  item, 
  depth = 0, 
  fullPath = '', 
  onFileSelect, 
  selectedFilePath 
}) => {
  const handleSelect = () => {
    if (item.type === 'file') {
      onFileSelect(fullPath);
    }
  };

  const isSelected = selectedFilePath === fullPath;

  // 如果是目录，使用 DirectoryNode
  if (item.type === 'directory') {
    return <DirectoryNode 
      item={item}
      depth={depth}
      fullPath={fullPath}
      onFileSelect={onFileSelect}
      selectedFilePath={selectedFilePath}
    />;
  }

  const renderIcon = () => {
    const fileExtension = item.name.split('.').pop()?.toLowerCase() || '';
    const iconProps = { className: 'mr-2 text-sm text-gray-500 dark:text-gray-300' };

    const iconMap: { [key: string]: React.ReactNode } = {
      'ts': <FaCode {...iconProps} />,
      'tsx': <FaCode {...iconProps} />,
      'js': <FaCode {...iconProps} />,
      'jsx': <FaCode {...iconProps} />,
      'py': <FaCode {...iconProps} />,
      'json': <FaCode {...iconProps} />,
      'yml': <FaCode {...iconProps} />,
      'yaml': <FaCode {...iconProps} />,
      'md': <FaFileAlt {...iconProps} />,
      'pdf': <FaFilePdf {...iconProps} />,
      'doc': <FaFileWord {...iconProps} />,
      'docx': <FaFileWord {...iconProps} />,
      'png': <FaImage {...iconProps} />,
      'jpg': <FaImage {...iconProps} />,
      'jpeg': <FaImage {...iconProps} />,
      'svg': <FaImage {...iconProps} />,
      'zip': <FaFileArchive {...iconProps} />,
      'rar': <FaFileArchive {...iconProps} />
    };

    return iconMap[fileExtension] || <FaFile {...iconProps} />;
  };

  return (
    <div>
      <div
        className={`
          flex 
          items-center 
          p-1 
          rounded-md 
          cursor-pointer
          transition-all 
          duration-200 
          ease-in-out 
          ${depth > 0 ? `pl-${depth * 3}` : ''}
          ${isSelected 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300' 
            : 'hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-900 dark:hover:text-blue-300'}
        `}
        onClick={handleSelect}
      >
        <div className="flex items-center">
          {renderIcon()}

          <span 
            className={`
              text-xs 
              truncate 
              max-w-[200px] 
              ${isSelected ? 'font-medium' : ''}
              ${isSelected 
                ? 'text-blue-700 dark:text-blue-300' 
                : 'text-gray-700 dark:text-gray-300'}
            `}
          >
            {item.name}
          </span>
        </div>
      </div>
    </div>
  );
};

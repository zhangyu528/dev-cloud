// src/components/FileTree.tsx
'use client'
import { useState } from 'react';
import { DirectoryItem } from '@/api/workspaces';

interface FileTreeProps {
  root: DirectoryItem | null;
  onFileSelect: (path: string) => void;
}

export const FileTree: React.FC<FileTreeProps> = ({ root, onFileSelect }) => {
  const [expandedDirs, setExpandedDirs] = useState<string[]>([]);

  const toggleDirectory = (path: string) => {
    setExpandedDirs(prev => 
      prev.includes(path) 
        ? prev.filter(p => p !== path) 
        : [...prev, path]
    );
  };

  const renderTree = (item: DirectoryItem, parentPath: string = '') => {
    const fullPath = parentPath ? `${parentPath}/${item.name}` : item.name;
    const isExpanded = expandedDirs.includes(fullPath);

    if (item.type === 'file') {
      return (
        <div 
          key={fullPath} 
          className="pl-4 cursor-pointer hover:bg-gray-100"
          onClick={() => onFileSelect(fullPath)}
        >
          📄 {item.name}
        </div>
      );
    }

    return (
      <div key={fullPath}>
        <div 
          className="pl-4 cursor-pointer hover:bg-gray-100 flex items-center"
          onClick={() => toggleDirectory(fullPath)}
        >
          <span className="mr-2">{isExpanded ? '▼' : '▶'}</span>
          📁 {item.name}
        </div>
        {isExpanded && item.contents && (
          <div className="pl-4">
            {item.contents.map(child => renderTree(child, fullPath))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-4 overflow-auto h-full">
      <h2 className="text-xl font-bold mb-4">文件目录</h2>
      {root ? renderTree(root) : <div>加载中...</div>}
    </div>
  );
};
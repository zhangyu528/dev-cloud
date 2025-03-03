import React from 'react';
import { FileIcon } from '../explorer/FileIcons';

export interface FileTab {
  path: string;
  unsavedChanges?: boolean;
  name: string;
}

interface EditorTabProps extends FileTab {
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
}

export const EditorTab: React.FC<EditorTabProps> = ({
  name,
  path,
  isActive,
  unsavedChanges,
  onClick,
  onClose
}) => {
  return (
    <div 
      key={path}
      className={`
        relative flex items-center px-4 py-2 text-xs cursor-pointer transition-all duration-200 group 
        border-r border-[#2C2C2C]  
        ${isActive 
          ? 'bg-[#1E1E1E] font-bold text-gray-100 border-b-0'  
          : 'hover:bg-[#252526] text-gray-400 border-b'}  
        ${isActive ? 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-blue-500' : ''}
      `}
      onClick={onClick}
    >
      {/* 文件图标 */}
      <FileIcon 
        fileName={name} 
        className="mr-2 opacity-70 group-hover:opacity-100" 
      />
      
      {/* 文件名 */}
      <span className="truncate max-w-[150px]">
        {name}
      </span>

      {/* 未保存变更标记 */}
      {unsavedChanges && (
        <span className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
      )}

      {/* 关闭按钮 */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className={`
          ml-2 text-xs transition-opacity duration-200
          ${isActive 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'}
          hover:text-gray-100
        `}
      >
        ✕
      </button>
    </div>
  );
};
import React, { useState } from 'react';
import { FileIcon } from '../explorer/FileIcons';

export enum FileTabStatus {
  Unchanged = 'unchanged', // 文件未修改
  Saved = 'saved',         // 文件已保存
  Modified = 'modified'    // 文件有未保存的修改
}

export interface FileTab {
  path: string;
  name: string;
  status: FileTabStatus;  // 新增状态字段
}

interface EditorTabProps extends FileTab {
  isActive: boolean;
  onClick: () => void;
  onClose: () => void;
  onSave?: () => void;
}

export const EditorTab: React.FC<EditorTabProps> = ({
  name,
  path,
  status,
  isActive,
  onClick,
  onClose,
  onSave
}) => {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleClose = () => {
    if (status === FileTabStatus.Modified) {
      // 如果文件有未保存的修改，弹出确认对话框
      setIsConfirmDialogOpen(true);
    } else {
      // 没有修改直接关闭
      onClose();
    }
  };

  const handleSaveAndClose = () => {
    if (onSave) {
      onSave(); // 调用保存方法
    }
    onClose(); // 关闭标签
    setIsConfirmDialogOpen(false);
  };

  const handleDiscardAndClose = () => {
    onClose(); // 直接关闭，不保存
    setIsConfirmDialogOpen(false);
  };

  const handleCancelClose = () => {
    setIsConfirmDialogOpen(false);
  };

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
      <span className="truncate max-w-[150px] flex items-center">
        {name}
        
        {/* 未保存变更标记 */}
        {status === FileTabStatus.Modified && (
          <span 
            className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            title="有未保存的修改"
          ></span>
        )}
      </span>

      {/* 关闭按钮 */}
      <button 
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
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

      {isConfirmDialogOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <h2 className="text-lg font-bold mb-4">未保存的更改</h2>
            <p className="mb-4">是否保存对 {name} 的更改？</p>
            <div className="flex justify-end space-x-2">
              <button 
                onClick={handleSaveAndClose}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                保存
              </button>
              <button 
                onClick={handleDiscardAndClose}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                不保存
              </button>
              <button 
                onClick={handleCancelClose}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                取消
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
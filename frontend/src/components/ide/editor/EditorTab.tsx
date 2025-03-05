import React, { useState } from 'react';
import { FileIcon } from '../explorer/FileIcons';
import { ConfirmCloseDialog } from './ConfirmCloseDialog';
import { useEditor } from './contexts/EditorContext';
import { FileTabStatus } from './contexts/EditorContext';

export const EditorTab: React.FC<{ index: number }> = ({ index }) => {
  const { tabs, activeTabIndex, closeFile, setActiveTab } = useEditor();
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleClose = (index: number) => {
    const currentTab = tabs[index];
  
    // 如果文件未修改，直接关闭
    if (currentTab.status !== FileTabStatus.Modified) {
      closeFile(currentTab.path);
      return;
    }
  
    // 打开确认对话框
    setIsConfirmDialogOpen(true);
  };

  const handleConfirmClose = (action: 'save' | 'discard' | 'cancel') => {
  
    const currentTab = tabs[index];
  
    switch (action) {
      case 'save':
        // 执行保存逻辑
        //saveFile(currentTab.path);
        closeFile(currentTab.path);
        break;
      case 'discard':
        // 直接关闭，不保存
        closeFile(currentTab.path);
        break;
      case 'cancel':
        // 取消关闭操作
        break;
    }
  
    // 重置状态
    setIsConfirmDialogOpen(false);
  };

  const onClick = () => {
    setActiveTab(index);
  }

  return (
    <div 
      className={`
        relative flex items-center px-4 py-2 text-xs cursor-pointer transition-all duration-200 group 
        border-r border-[#2C2C2C]  
        ${index === activeTabIndex
          ? 'bg-[#1E1E1E] font-bold text-gray-100 border-b-0'  
          : 'hover:bg-[#252526] text-gray-400 border-b'}  
        ${index == activeTabIndex ? 'before:absolute before:top-0 before:left-0 before:right-0 before:h-[1px] before:bg-blue-500' : ''}
      `}
      onClick={onClick}
    >
      {/* 文件图标 */}
      <FileIcon 
        fileName={tabs[index].name} 
        className="mr-2 opacity-70 group-hover:opacity-100" 
      />
      
      {/* 文件名 */}
      <span className="truncate max-w-[150px] flex items-center">
        {tabs[index].name}
        
        {/* 未保存变更标记 */}
        {tabs[index].status === FileTabStatus.Modified && (
          <span 
            className="ml-2 w-2 h-2 bg-blue-500 rounded-full animate-pulse"
            title="有未保存的修改"
          ></span>
        )}
      </span>

      {/* 关闭按钮 */}
      <button 
        onClick={() => {
          handleClose(index);
        }}
        className={`
          ml-2 text-xs transition-opacity duration-200
          ${index === activeTabIndex 
            ? 'opacity-100' 
            : 'opacity-0 group-hover:opacity-100'}
          hover:text-gray-100
        `}
      >
        ✕
      </button>

      {isConfirmDialogOpen && (
        <ConfirmCloseDialog
          fileName={tabs[index].name}
          onSave={() => handleConfirmClose('save')}
          onDiscardClose={() => handleConfirmClose('discard')}
          onCancelClose={() => handleConfirmClose('cancel')}
        />
      )}
    </div>
  );
};
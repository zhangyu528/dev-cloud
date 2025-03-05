'use client';

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { SideBar } from './sideBar/SideBar';
import { Editor } from './editor/Editor';
import { EditorProvider } from './editor/contexts/EditorContext';
import { useIdeContext } from './contexts/IdeContext';

export const Ide: React.FC = () => {
  // 默认 Explorer 宽度
  const [explorerWidth, setExplorerWidth] = useState(200);
  const [isResizing, setIsResizing] = useState(false);
  const resizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { workspaceName } = useIdeContext();

  // 处理鼠标按下事件
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    setIsResizing(true);
    e.preventDefault();
  }, []);

  // 处理鼠标移动事件
  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isResizing || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const newWidth = e.clientX - containerRect.left;

    // 限制宽度范围
    const minWidth = 100;
    const maxWidth = containerRect.width * 0.5;

    setExplorerWidth(Math.min(Math.max(newWidth, minWidth), maxWidth));
  }, [isResizing]);

  // 处理鼠标抬起事件
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // 添加和移除全局事件监听器
  useEffect(() => {
    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, handleMouseMove, handleMouseUp]);

  return (
    <div 
      ref={containerRef} 
      className="flex h-full w-full overflow-hidden bg-[#1e1e1e]"
    >
      {/* SideBar Container */}
      <div 
        className="flex-shrink-0 overflow-hidden bg-[#1e1e1e]" 
        style={{ 
          width: `${explorerWidth}px`, 
          height: '100%' 
        }}
      >
        <SideBar />
      </div>
      
      {/* Resizer */}
      <div 
        ref={resizerRef}
        onMouseDown={handleMouseDown}
        className="w-1 h-full bg-[#2c2c2c] cursor-col-resize flex-shrink-0 hover:bg-[#3a3a3a]"
      >
        <div className="text-[#666] text-5xl flex items-center justify-center">⋮</div>
      </div>
      
      {/* Editor Container */}
      <div className="flex-grow h-full flex flex-col overflow-hidden bg-[#1e1e1e]">
        <EditorProvider workspaceName={workspaceName}>
          <Editor />
        </EditorProvider>
      </div>
    </div>
  );
};
'use client';

import React, { useState, useRef, useCallback } from 'react';
import styled from 'styled-components';
import { Explorer } from './explorer/Explorer';
import { Editor } from './editor/Editor';
import { EditorProvider } from './editor/context/EditorContext';

// 可拖动的分隔符组件
const Resizer = styled.div`
  width: 4px;
  height: 100%;
  background-color: #2c2c2c;
  cursor: col-resize;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #3a3a3a;
  }

  &::after {
    content: '⋮';
    color: #666;
    font-size: 20px;
    user-select: none;
  }
`;

// IDE 容器样式，使用 flex 布局
const IdeContainer = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
`;

// Explorer 容器样式
const ExplorerContainer = styled.div<{ width: number }>`
  width: ${props => props.width}px;
  height: 100%;
  overflow: hidden;
  background-color: #1e1e1e;
`;

// 主编辑器容器样式
const EditorContainer = styled.div`
  flex-grow: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

interface IdeProps {
  workspaceName: string;
}

export const Ide: React.FC<IdeProps> = ({ workspaceName }) => {
  // 默认 Explorer 宽度
  const [explorerWidth, setExplorerWidth] = useState(200);
  const [isResizing, setIsResizing] = useState(false);
  const resizerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

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

    setExplorerWidth(newWidth);
  }, [isResizing]);

  // 处理鼠标抬起事件
  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
  }, []);

  // 添加和移除全局事件监听器
  React.useEffect(() => {
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
    <IdeContainer ref={containerRef}>
      <ExplorerContainer width={explorerWidth}>
        <Explorer workspaceName={workspaceName} />
      </ExplorerContainer>
      
      <Resizer 
        ref={resizerRef} 
        onMouseDown={handleMouseDown}
      />
      
      <EditorContainer>
        <EditorProvider>
          <Editor workspaceName={workspaceName} />
        </EditorProvider>
      </EditorContainer>
    </IdeContainer>
  );
};
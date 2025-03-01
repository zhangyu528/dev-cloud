'use client';

import React, { useState, useEffect } from 'react';
import { Editor } from './editor/Editor';
import { Explorer } from './explorer/Explorer';

interface IdeProps {
  workspaceName: string;
}

export const Ide: React.FC<IdeProps> = ({ workspaceName }) => {

  return (
    <div className="flex h-full w-full">
      {/* 资源管理器 */}
      <Explorer workspaceName={workspaceName} />

      {/* 编辑器区域 */}
      <div className="flex-1 min-w-0 overflow-hidden">
        <Editor workspaceName={workspaceName} />
      </div>
    </div>
  );
};
import React, { useState, useEffect } from 'react';

import { EditorTabs } from './EditorTabs';
import { CodeEditor } from './CodeEditor';
import { useEditor } from './contexts/EditorContext';

export const Editor: React.FC = () => {
  const [pendingFilePath, setPendingFilePath] = useState<string | null>(null);
  const { tabs, activeTabIndex, openFile } = useEditor();

  useEffect(() => {
    const handleFileSelect = (event: CustomEvent<string>) => {
      const filePath = event.detail;
      setPendingFilePath(filePath);
    };

    window.addEventListener('file-selected', handleFileSelect as EventListener);

    return () => {
      window.removeEventListener('file-selected', handleFileSelect as EventListener);
    };
  }, []);

  useEffect(() => {
    if (pendingFilePath) {
      openFile(pendingFilePath);
      setPendingFilePath(null);
    }
  }, [pendingFilePath]);

  if (tabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a file to start editing
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
        <EditorTabs />
        <div className="flex-1 overflow-hidden">
          <CodeEditor />
        </div>
    </div>
  );
};
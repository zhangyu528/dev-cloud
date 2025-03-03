import React, { useState, useEffect } from 'react';
import { EditorTabs } from './EditorTabs';
import { CodeEditor, FileStatus } from './CodeEditor';
import { FileTab, FileTabStatus } from './EditorTab';

interface EditorProps {
  workspaceName: string;
}

export const Editor: React.FC<EditorProps> = ({ workspaceName }) => {
  const [tabs, setTabs] = useState<FileTab[]>([]);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(-1);
  const [pendingFilePath, setPendingFilePath] = useState<string | null>(null);

  useEffect(() => {
    const handleFileSelect = (event: CustomEvent<string>) => {
      const filePath = event.detail;
      setPendingFilePath(filePath);
    };

    window.addEventListener('file-selected', handleFileSelect as EventListener);

    return () => {
      window.removeEventListener('file-selected', handleFileSelect as EventListener);
    };
  }, [workspaceName]);

  useEffect(() => {
    if (pendingFilePath) {
      const existingTabIndex = tabs.findIndex(tab => tab.path === pendingFilePath);
      
      if (existingTabIndex !== -1) {
        setActiveTabIndex(existingTabIndex);
      } else {
        const newTab: FileTab = {
          path: pendingFilePath,
          name: pendingFilePath.split('/').pop() || pendingFilePath,
          status: FileTabStatus.Unchanged
        };

        setTabs(prevTabs => [...prevTabs, newTab]);
        setActiveTabIndex(tabs.length);
      }

      setPendingFilePath(null);
    }
  }, [tabs, pendingFilePath]);

  const closeTab = (index: number) => {
    const updatedTabs = [...tabs];
    updatedTabs.splice(index, 1);
    setTabs(updatedTabs);

    if (updatedTabs.length === 0) {
      setActiveTabIndex(-1);
    } else if (index <= activeTabIndex) {
      setActiveTabIndex(Math.max(0, activeTabIndex - 1));
    }
  };

  // 检查并更新文件状态
  const checkFileStatus = (status: FileStatus) => {
    if (activeTabIndex === -1) return;

    const updatedFiles = [...tabs];
    
    // 更新当前活动文件的状态
    updatedFiles[activeTabIndex] = {
      ...updatedFiles[activeTabIndex],
      status: status === FileStatus.Unchanged ? FileTabStatus.Unchanged : FileTabStatus.Modified
    };

    setTabs(updatedFiles);
  };

  if (tabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a file to start editing
      </div>
    );
  }

  return (
    <div className="h-full w-full flex flex-col">
      <EditorTabs
        tabs={tabs}
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        closeTab={closeTab}
      />

      <div className="flex-1 overflow-hidden">
        {activeTabIndex !== -1 && tabs[activeTabIndex] && (
          <CodeEditor
            workspaceName={workspaceName}
            filePath={tabs[activeTabIndex].path}
            onStatusChange={checkFileStatus}
          />
        )}
      </div>
    </div>
  );
};
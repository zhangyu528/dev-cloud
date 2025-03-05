// src/components/ide/explorer/contexts/ExplorerContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { WorkspacesApi, DirectoryItem } from '@/api/workspaces';

interface ExplorerContextType {
  rootDirectory: DirectoryItem;
  isLoading: boolean;
  selectedFile: string | null;
  selectFile: (path: string) => void;
}

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined);

export const ExplorerProvider: React.FC<{ children: ReactNode, workspaceName: string }> = ({ children, workspaceName }) => {
  const [rootDirectory, setRootDirectory] = useState<DirectoryItem>({ type: 'directory', name: '', contents: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const fetchDirectory = async (forceRefresh: boolean = false) => {
    try {
      setIsLoading(true);
      const workspacesApi = new WorkspacesApi();
      const directory = await workspacesApi.getWorkspaceDirectory(workspaceName);
      setRootDirectory(directory);
    } catch (error) {
      console.error('Failed to fetch files', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, [workspaceName]);

  const selectFile = useCallback((path: string) => {
    setSelectedFile(path);
    // 触发文件选择事件
    const event = new CustomEvent('file-selected', { detail: path });
    window.dispatchEvent(event);
  }, []);

  return (
    <ExplorerContext.Provider value={{
      rootDirectory,
      isLoading,
      selectedFile,
      selectFile,
    }}>
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => {
  const context = useContext(ExplorerContext);
  if (context === undefined) {
    throw new Error('useExplorer must be used within an ExplorerProvider');
  }
  return context;
};
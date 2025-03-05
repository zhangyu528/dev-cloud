// src/components/ide/explorer/contexts/ExplorerContext.tsx
import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { WorkspacesApi, DirectoryItem } from '@/api/workspaces';

interface ExplorerContextType {
  rootDirectory: DirectoryItem;
  isLoading: boolean;
  selectedFile: string | null;
  selectFile: (path: string) => void;
  refreshDirectory: () => Promise<void>;
}

const CACHE_KEY_PREFIX = 'workspace_directory_cache_';
const CACHE_EXPIRY_HOURS = 1; // Cache expiry time in hours

const getCachedDirectory = (workspaceName: string): DirectoryItem | null => {
  const cachedData = localStorage.getItem(`${CACHE_KEY_PREFIX}${workspaceName}`);
  if (cachedData) {
    const { data } = JSON.parse(cachedData);
    return data;
  }
  return null;
};

const setCachedDirectory = (workspaceName: string, directory: DirectoryItem) => {
  const cacheEntry = {
    data: directory,
  };
  localStorage.setItem(`${CACHE_KEY_PREFIX}${workspaceName}`, JSON.stringify(cacheEntry));
};

const ExplorerContext = createContext<ExplorerContextType | undefined>(undefined);

export const ExplorerProvider: React.FC<{ children: ReactNode, workspaceName: string }> = ({ children, workspaceName }) => {
  const [rootDirectory, setRootDirectory] = useState<DirectoryItem>({ type: 'directory', name: '', contents: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  const fetchDirectory = async (forceRefresh: boolean = false) => {
    try {
      setIsLoading(true);
      const workspacesApi = new WorkspacesApi();
      
      // Check cache first
      const cachedDirectory = !forceRefresh ? getCachedDirectory(workspaceName) : null;
      
      if (cachedDirectory) {
        setRootDirectory(cachedDirectory);
      } else {
        const directory = await workspacesApi.getWorkspaceDirectory(workspaceName);
        setRootDirectory(directory);
        setCachedDirectory(workspaceName, directory);
      }
    } catch (error) {
      console.error('Failed to fetch files', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, [workspaceName]);

  const refreshDirectory = useCallback(async () => {
    await fetchDirectory(true);
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
      refreshDirectory
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
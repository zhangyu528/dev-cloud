import React, { useState, useEffect } from 'react';
import { WorkspacesApi } from '@/api/workspaces';
import { DirectoryItem } from '@/api/workspaces';
import { RootNode } from './RootNode';

interface ExplorerProps {
  workspaceName: string;
}

export const Explorer: React.FC<ExplorerProps> = ({ workspaceName }) => {
  const [root, setRoot] = useState<DirectoryItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDirectoryStructure = async () => {
      try {
        const workspacesApi = new WorkspacesApi();
        const structure = await workspacesApi.getWorkspaceDirectory(workspaceName);

        if (!structure) {
          throw new Error('No directory structure found');
        }

        setRoot(structure);
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to fetch directory structure', error);
        setIsLoading(false);
      }
    };

    fetchDirectoryStructure();
  }, [workspaceName]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 overflow-hidden h-full flex flex-col">
      <div className="text-xs font-semibold text-gray-300 px-6 py-2">
        Workspace Explorer
      </div>

      <div className="w-64 flex-grow overflow-y-auto">
        {root ? (
          <RootNode directory={root} />
        ) : (
          <div className="text-xs text-gray-500 dark:text-gray-400 text-center py-2">加载中...</div>
        )}
      </div>
    </div>
  );
};
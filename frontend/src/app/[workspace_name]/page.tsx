'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { WorkspacesApi } from '@/api/workspaces';
import { DirectoryItem } from '@/api/workspaces';
import { FileTree } from '@/components/FileTree';

export default function Workspace() {
  const params = useParams();
  const workspace_name = params.workspace_name as string;
  
  const [directoryStructure, setDirectoryStructure] = useState<DirectoryItem | null>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  useEffect(() => {
    const fetchDirectoryStructure = async () => {
      try {
        const workspacesApi = new WorkspacesApi();
        const structure = await workspacesApi.getWorkspaceDirectory(workspace_name);
        setDirectoryStructure(structure);
      } catch (error) {
        console.error('Failed to fetch directory structure', error);
      }
    };

    fetchDirectoryStructure();
  }, [workspace_name]);

  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };

  return (
    <div className="flex h-screen">
      <div className="w-1/4 border-r">
        <FileTree 
          root={directoryStructure} 
          onFileSelect={handleFileSelect}
        />
      </div>
      <div className="w-3/4 flex flex-col">
        <div className="flex-grow overflow-auto">
          {/* 文件预览区域 */}
          {selectedFile && (
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{selectedFile}</h2>
              {/* 添加文件内容预览逻辑 */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
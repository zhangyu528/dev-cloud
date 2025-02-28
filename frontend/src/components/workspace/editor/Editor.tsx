import React, { useState, useEffect } from 'react';
import { WorkspacesApi } from '@/api/workspaces';

interface EditorProps {
  workspaceName: string;
}

export const Editor: React.FC<EditorProps> = ({ workspaceName }) => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 监听文件选择事件
    const handleFileSelect = (event: CustomEvent<string>) => {
      const filePath = event.detail;
      loadFileContent(filePath);
    };

    window.addEventListener('file-selected', handleFileSelect as EventListener);

    return () => {
      window.removeEventListener('file-selected', handleFileSelect as EventListener);
    };
  }, [workspaceName]);

  const loadFileContent = async (filePath: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const workspacesApi = new WorkspacesApi();
      const { content } = await workspacesApi.getFileContent(workspaceName, filePath);
      
      setSelectedFile(filePath);
      setFileContent(content);
    } catch (err) {
      setError('Failed to load file content');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContentChange = (newContent: string) => {
    setFileContent(newContent);
  };

  const saveFile = async () => {
    if (!selectedFile) return;

    try {
      const workspacesApi = new WorkspacesApi();
      //await workspacesApi.saveFileContent(workspaceName, selectedFile, fileContent);
      
      // 可以添加保存成功的通知
    } catch (err) {
      setError('Failed to save file');
      console.error(err);
    }
  };

  if (!selectedFile) {
    return (
      <div className="flex items-center justify-center h-full text-gray-500">
        Select a file to start editing
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* 文件标题区域 */}
      <div className="p-2 border-b flex justify-between items-center">
        <h2 className="text-sm font-medium truncate">{selectedFile}</h2>
        <button 
          onClick={saveFile}
          className="text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Save
        </button>
      </div>

      {/* 加载状态 */}
      {isLoading && (
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      )}

      {/* 错误状态 */}
      {error && (
        <div className="bg-red-100 text-red-700 p-2">
          {error}
        </div>
      )}

      {/* 编辑器区域 */}
      {!isLoading && !error && (
        <textarea 
          value={fileContent}
          onChange={(e) => handleContentChange(e.target.value)}
          className="flex-1 p-2 text-sm resize-none focus:outline-none"
          placeholder="Start editing your file..."
        />
      )}
    </div>
  );
};
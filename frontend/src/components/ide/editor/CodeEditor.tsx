import React, { useState, useEffect, useCallback } from 'react';
import { editor } from 'monaco-editor';
import MonacoEditor from '@monaco-editor/react';
import { WorkspacesApi } from '@/api/workspaces';
import { CodeSkeleton } from './CodeSkeleton';
import { getLanguageFromExtension } from './editorUtils';

// 全局文件缓存
const FILE_CACHE: {[filePath: string]: string} = {};

export enum FileStatus {
  Unchanged = 'unchanged',
  Saved = 'saved',      // 文件已保存
  Modified = 'modified' // 文件有未保存的修改
}

interface CodeEditorProps {
  workspaceName: string;
  filePath: string;
  onStatusChange?: (status: FileStatus) => void;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  workspaceName,
  filePath,
  onStatusChange,
}) => {
  const [content, setContent] = useState<string | null>(null);
  const [originalContent, setOriginalContent] = useState<string | null>(null);
  const [status, setStatus] = useState<FileStatus>(FileStatus.Saved);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [editorInstance, setEditorInstance] = useState<editor.IStandaloneCodeEditor | null>(null);

  // 检查文件状态
  const checkFileStatus = useCallback(() => {
    if (content !== null && originalContent !== null) {
      const newStatus = content !== originalContent 
        ? FileStatus.Modified 
        : FileStatus.Unchanged;
      
      // 如果状态发生变化，触发回调
      if (newStatus !== status) {
        setStatus(newStatus);
        if (onStatusChange) {
          onStatusChange(newStatus);
        }
      }
    }
  }, [content, originalContent, status, onStatusChange]);

  // 监听内容变化
  useEffect(() => {
    checkFileStatus();
  }, [content, checkFileStatus]);

  // 保存文件
  const saveFile = useCallback(() => {
    // 更新原始内容
    if (content !== null) {
      setOriginalContent(content);
    }
    
    // 设置状态为已保存
    setStatus(FileStatus.Saved);
    
    // 触发状态变化回调
    if (onStatusChange) {
      onStatusChange(FileStatus.Saved);
    }

    // 这里可以添加实际的文件保存逻辑，如调用 API
  }, [content, onStatusChange]);

  const fetchFileContent = async () => {
    // 检查是否已缓存
    if (FILE_CACHE[filePath]) {
      const cachedContent = FILE_CACHE[filePath];
      setContent(cachedContent);
      setOriginalContent(cachedContent);
      return;
    }

    try {
      setIsLoading(true);
      const workspacesApi = new WorkspacesApi();
      const { content } = await workspacesApi.getFileContent(workspaceName, filePath);
      
      // 更新缓存
      FILE_CACHE[filePath] = content;

      setContent(content);
      setOriginalContent(content);
    } catch (err) {
      console.error('Failed to fetch file content:', err);
      setContent(null);
      setOriginalContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 重置状态并获取文件内容
  useEffect(() => {
    fetchFileContent();
  }, [filePath, workspaceName]);

  // Monaco Editor 挂载后的处理
  const handleEditorDidMount = (
    editorInstance: editor.IStandaloneCodeEditor
  ) => {
    setEditorInstance(editorInstance);
  };

  // 编辑器内容变化处理
  const handleEditorChange = (value: string | undefined) => {
    setContent(value || '');
    checkFileStatus();
  };

  const detectedLanguage = getLanguageFromExtension(filePath);

  const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    automaticLayout: true,
    fontSize: 14,
    wordWrap: 'on',
    scrollBeyondLastLine: false,
    padding: { top: 10, bottom: 10 },
  };

  if (isLoading) {
    return <CodeSkeleton />;
  }

  return (
      <MonacoEditor
        height="100%"
        width="100%"
        language={detectedLanguage}
        theme="vs-dark"
        value={content || ''}
        onChange={handleEditorChange}
        onMount={handleEditorDidMount} // Monaco Editor 挂载后的处理
        options={defaultOptions}
      />
  );
};
import React, { useState, useEffect, useCallback } from 'react';
import { editor } from 'monaco-editor';
import MonacoEditor from '@monaco-editor/react';
import { WorkspacesApi } from '@/api/workspaces';
import { CodeSkeleton } from './CodeSkeleton';
import { getLanguageFromExtension } from './editorUtils';

// 全局文件缓存
const FILE_CACHE: {[filePath: string]: string} = {};

interface CodeEditorProps {
  workspaceName: string;
  filePath: string;
  onFileOpen?: (filePath: string) => void;
  onChange?: (value: string | undefined) => void;
  onMount?: (editor: editor.IStandaloneCodeEditor) => void;
  options?: editor.IStandaloneEditorConstructionOptions;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  workspaceName,
  filePath,
  onFileOpen,
  onChange,
  onMount,
  options = {}
}) => {
  const [content, setContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchFileContent = async () => {
    // 检查是否已缓存
    if (FILE_CACHE[filePath]) {
      const cachedContent = FILE_CACHE[filePath];
      setContent(cachedContent);
      onFileOpen?.(filePath);
      return;
    }

    try {
      setIsLoading(true);
      const workspacesApi = new WorkspacesApi();
      const { content } = await workspacesApi.getFileContent(workspaceName, filePath);
      
      // 更新缓存
      FILE_CACHE[filePath] = content;

      setContent(content);
      onFileOpen?.(filePath);
      setError(null);
    } catch (err) {
      console.error('Failed to fetch file content:', err);
      setError('Failed to load file');
      setContent(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 重置状态并获取文件内容
  useEffect(() => {
    fetchFileContent();
  }, [filePath, workspaceName]);

  const handleEditorChange = (value: string | undefined) => {
    // 更新缓存中的内容
    if (filePath && value !== undefined) {
      FILE_CACHE[filePath] = value;
    }

    setContent(value || '');
    onChange?.(value);
  };

  const detectedLanguage = getLanguageFromExtension(filePath);

  const defaultOptions: editor.IStandaloneEditorConstructionOptions = {
    minimap: { enabled: false },
    automaticLayout: true,
    fontSize: 14,
    wordWrap: 'on',
    scrollBeyondLastLine: false,
    padding: { top: 10, bottom: 10 },
    ...options
  };

  if (isLoading) {
    return <CodeSkeleton />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      language={detectedLanguage}
      theme="vs-dark"
      value={content || ''}
      onMount={(editor) => {
        onMount?.(editor);
      }}
      onChange={handleEditorChange}
      options={defaultOptions}
    />
  );
};
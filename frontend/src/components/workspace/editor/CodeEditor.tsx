import React, { useState, useEffect } from 'react';
import { editor } from 'monaco-editor';
import MonacoEditor from '@monaco-editor/react';
import { WorkspacesApi } from '@/api/workspaces';

// 根据文件扩展名获取语言类型的函数
const getLanguageFromExtension = (filePath: string): string => {
  const extension = filePath.split('.').pop()?.toLowerCase();
  switch (extension) {
    case 'ts':
    case 'tsx':
      return 'typescript';
    case 'js':
    case 'jsx':
      return 'javascript';
    case 'json':
      return 'json';
    case 'md':
      return 'markdown';
    case 'py':
      return 'python';
    case 'html':
      return 'html';
    case 'css':
      return 'css';
    case 'scss':
    case 'sass':
      return 'scss';
    case 'yaml':
    case 'yml':
      return 'yaml';
    case 'xml':
      return 'xml';
    case 'sql':
      return 'sql';
    default:
      return 'plaintext';
  }
};

interface CodeEditorProps {
  workspaceName: string;
  filePath: string;
  onChange?: (value: string | undefined) => void;
  onMount?: (editor: editor.IStandaloneCodeEditor) => void;
  options?: editor.IStandaloneEditorConstructionOptions;
}

export const CodeEditor: React.FC<CodeEditorProps> = ({
  workspaceName,
  filePath,
  onChange,
  onMount,
  options = {}
}) => {
  const [content, setContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFileContent = async () => {
      try {
        setIsLoading(true);
        const workspacesApi = new WorkspacesApi();
        const { content } = await workspacesApi.getFileContent(workspaceName, filePath);
        setContent(content);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch file content:', err);
        setError('Failed to load file');
        setContent('');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFileContent();
  }, [workspaceName, filePath]);

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

  const handleContentChange = (value: string | undefined) => {
    setContent(value || '');
    onChange?.(value);
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
      value={content}
      onMount={(editor) => {
        onMount?.(editor);
      }}
      onChange={handleContentChange}
      options={defaultOptions}
    />
  );
};
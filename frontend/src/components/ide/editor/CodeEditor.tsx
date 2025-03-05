import React from 'react';
import MonacoEditor from '@monaco-editor/react';
import { CodeSkeleton } from './CodeSkeleton';
import { getLanguageFromExtension } from './editorUtils';
import { useEditor } from './contexts/EditorContext';

export const CodeEditor: React.FC = () => {
  const { tabs, activeTabIndex, updateFileContent, isLoading } = useEditor();

  if (activeTabIndex === -1) return null;

  // 如果正在加载，显示骨架屏
  if (isLoading) return <CodeSkeleton />;

  const currentFile = tabs[activeTabIndex];
  const detectedLanguage = getLanguageFromExtension(currentFile.path);

  const handleEditorChange = (value: string | undefined) => {
    updateFileContent(currentFile.path, value || '');
  };

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      language={detectedLanguage}
      theme="vs-dark"
      value={currentFile.content}
      onChange={handleEditorChange}
      options={{
        minimap: { enabled: false },
        automaticLayout: true,
      }}
    />
  );
};
// d:\work\dev-cloud\frontend\src\components\workspace\editor\editorUtils.ts
export const getLanguageFromExtension = (filePath: string): string => {
    const extension = filePath.split('.').pop()?.toLowerCase() || '';
    
    const languageMap: Record<string, string> = {
      'js': 'javascript',
      'jsx': 'javascript',
      'ts': 'typescript',
      'tsx': 'typescript',
      'py': 'python',
      'json': 'json',
      'html': 'html',
      'css': 'css',
      'scss': 'scss',
      'less': 'less',
      'md': 'markdown',
      'yml': 'yaml',
      'yaml': 'yaml',
      'toml': 'toml',
      'sh': 'shell',
      'bash': 'shell',
      'sql': 'sql',
      'go': 'go',
      'rust': 'rust',
      'c': 'c',
      'cpp': 'cpp',
      'h': 'cpp',
      'java': 'java',
      'kt': 'kotlin',
      'swift': 'swift',
      'vue': 'vue',
      'xml': 'xml'
    };
  
    return languageMap[extension] || 'plaintext';
  };
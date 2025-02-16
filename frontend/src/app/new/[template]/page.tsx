'use client'
import { useState, useEffect, useRef } from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { workspacesApi } from '@/api/workspaces';
import { useRouter } from 'next/navigation';
import Button from '@/components/buttons/Button';
import { generateWorkspaceName, validateWorkspaceName } from '@/utils/workspaceNameGenerator';

export default function NewWorkspacePage() {
  const { template: templateName } = useParams() as { template: string };
  const router = useRouter();

  const [workspaceName, setWorkspaceName] = useState('');
  const [generatedName, setGeneratedName] = useState('');
  const [nameError, setNameError] = useState<string | null>(null);
  const [isValid, setIsValid] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();

    // 初始化时立即验证
    const { isValid, errorMessage } = validateWorkspaceName(workspaceName);
    setIsValid(isValid);
    setNameError(errorMessage || null);
  }, []);

  // 当工作空间名称变化时重新验证
  useEffect(() => {
    const { isValid, errorMessage } = validateWorkspaceName(workspaceName);
    if (!isValid) {
      setIsValid(false);
      setNameError(errorMessage || null);
      return;
    }
    setIsValid(true);
    setNameError(null);
    setGeneratedName(generateWorkspaceName(workspaceName));
  }, [workspaceName]);

  const handleCreateWorkspace = async () => {
    //创建工作空间
    await workspacesApi.createWorkspace(generatedName, templateName);
    router.push('/board');
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl shadow-blue-500/20 p-6 w-96">
        {/* 区域1：New Workspace标题 */}
        <h1 className="text-xl font-bold mb-4">New Workspace</h1>

        {/* 区域2：模板信息 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Template</h2>
          <div className="flex flex-row items-center border border-gray-200 dark:border-gray-600 rounded-lg p-2 gap-2">
            <img 
              src={`/icons/templates/${templateName}.svg`}
              alt={templateName}
              className="h-10 w-10"
            />
            <p className='text-sm font-medium'>{templateName}</p>
          </div>
        </div>

        {/* 区域3：工作区命名 */}
        <div className="mb-6">
          <h2 className="text-sm font-semibold mb-2">Name your workspace</h2>
          <input
            ref={inputRef}
            onBlur={(e) => {
              e.preventDefault();
              inputRef.current?.focus();
            }}
            type="text"
            className={`w-full text-sm px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 
              ${!isValid 
                ? 'border-red-500 focus:ring-red-500' 
                : 'focus:ring-blue-500 border-gray-300'
              } 
              dark:bg-gray-700 dark:border-gray-600 dark:text-white`}
            placeholder={`My ${templateName} App`}
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
          {!isValid && (
            <p className="text-red-500 text-xs mt-1">{nameError}</p>
          )}
          {workspaceName && isValid && (
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Generated name: {generatedName}
            </p>
          )}
        </div>

        {/* 区域4：底部按钮 */}
        <div className="flex justify-between items-center mt-6">
          <Link 
            href="/board"
            className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
          >
            &larr; Back
          </Link>
          <Button
            variant={'primary'}
            size={'md'}
            onClick={handleCreateWorkspace}
            disabled={ !isValid ||!workspaceName}
          >
            Create
          </Button>
        </div>
      </div>
    </div>
  );
}

'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { workspacesApi } from '@/api/workspaces';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

export default function NewWorkspacePage() {
  const { template: templateName } = useParams() as { template: string };
  const templateIcon = `${templateName}.svg`;
  const router = useRouter();
  
  const [workspaceName, setWorkspaceName] = useState('');
  const [generatedName, setGeneratedName] = useState('');

  const generateWorkspaceName = (name: string) => {
    let baseName = name.trim().replace(/\s+/g, '-');
    let randomNumber = Math.floor(Math.random() * 10000000); // 生成 7 位数字
    return `${baseName}-${randomNumber.toString().padStart(7, '0')}`; // 确保是7位数字
  };

  useEffect(() => {
    setGeneratedName(generateWorkspaceName(workspaceName));
  }, [workspaceName]);

  const handleCreateWorkspace = async () => {
    //创建工作空间
    try {
      await workspacesApi.createWorkspace(generatedName, templateName);
      router.push('/workspace');
    } catch (error) {
      toast.error((error as Error).message || 'Failed to create workspace');
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 w-full max-w-2xl">
          
          {/* 区域1：New Workspace标题 */}
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg shadow-sm mb-6">
            <h1 className="text-3xl font-bold mb-4 text-center">New Workspace</h1>
          </div>

          {/* 区域2：模板信息 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Template</h2>
            <div className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
              <div className="flex justify-center mb-2">
                <img 
                  src={`/icons/templates/${templateIcon}`}
                  alt={templateName}
                  className="h-12 w-12"
                />
              </div>
              <p className="text-center">{templateName}</p>
            </div>
          </div>

          {/* 区域3：工作区命名 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Name your workspace</h2>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter workspace name"
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
            {workspaceName && (
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Generated name: {generatedName}
              </p>
            )}
          </div>

          {/* 区域4：底部按钮 */}
          <div className="flex justify-between items-center mt-6">
            <Link 
              href="/workspace"
              className="text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              &larr; Back
            </Link>
            <button
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={handleCreateWorkspace}
            >
              Create
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

'use client';
import { Workspace } from '@/api/workspaces';
import { useWorkspaces } from '@/contexts/WorkspacesContext';
import { useRouter } from 'next/navigation';
import { IoMdTrash } from 'react-icons/io';
const WorkspaceListItem = ({ workspace }: { workspace: Workspace }) => {
    const { deleteWorkspace } = useWorkspaces();
    const router = useRouter();
  
    const handleWorkspaceClick = () => {
      router.push(`/workspace/${workspace.name}`);
    };
  
    return (
      <div
        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-sm hover:shadow-md 
                   transition duration-300 ease-in-out transform hover:-translate-y-1 
                   border border-gray-100 dark:border-gray-700 
                   flex items-center gap-4 w-full 
                   relative group"
      >
        {/* 左侧图标 */}
        <div 
          className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 rounded-lg 
                     flex items-center justify-center 
                     transition duration-200 
                     hover:bg-blue-100 dark:hover:bg-blue-900/40 
                     cursor-pointer"
          onClick={handleWorkspaceClick}
        >
          <img
            src={`/icons/templates/${workspace.template.toLowerCase()}.svg`}
            alt={workspace.name}
            className="w-10 h-10"
          />
        </div>
        
        {/* 名称 & 描述 */}
        <div className="flex-1 overflow-hidden">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 
                         truncate max-w-full">{workspace.name}</h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {workspace.template} Workspace
          </p>
        </div>
        
        {/* 删除按钮 */}
        <button
          onClick={() => deleteWorkspace(workspace.id)}
          className="absolute top-2 right-2 
                       text-gray-400 hover:text-red-500 
                       opacity-0 group-hover:opacity-100 
                       transition duration-200 
                       p-1 rounded-full 
                       hover:bg-red-50 dark:hover:bg-red-900/20"
        >
          <IoMdTrash className="h-5 w-5" />
        </button>
      </div>
    );
  };

export default WorkspaceListItem;
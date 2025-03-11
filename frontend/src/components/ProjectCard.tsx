'use client';
import { useRouter } from 'next/navigation';

import { 
  IoTimeOutline, 
  IoEllipsisHorizontalOutline,
  IoCodeSlashOutline
} from 'react-icons/io5';

 // 项目卡片组件  
 const ProjectCard = ({ id, name, lastEdited, template }: { id: number; name: string; lastEdited: string; template: string }) => {
  const router = useRouter();
  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group"
      onClick={() => router.push(`/workspace/${id}`)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3">
              <IoCodeSlashOutline className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {name}
            </h3>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <IoEllipsisHorizontalOutline />
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <IoTimeOutline className="mr-1" />
          <span>Edited {lastEdited}</span>
        </div>
        <div className="mt-3 text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 inline-block text-gray-600 dark:text-gray-300">
          {template}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

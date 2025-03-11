'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  IoSearchOutline, 
  IoStarOutline, 
  IoTimeOutline, 
  IoFolderOutline,
  IoAddOutline,
  IoEllipsisHorizontalOutline,
  IoLogoGithub,
  IoCodeSlashOutline
} from 'react-icons/io5';
import Image from 'next/image';

// 定义项目和模板的类型
interface Project {
  id: number;
  name: string;
  lastEdited: string;
  template: string;
}

// 模拟项目数据
const recentProjects: Project[] = [
  { id: 1, name: 'React Dashboard', lastEdited: '2 hours ago', template: 'react-ts' },
  { id: 2, name: 'API Service', lastEdited: '1 day ago', template: 'node-express' },
  { id: 3, name: 'Landing Page', lastEdited: '3 days ago', template: 'next-js' },
];


export default function BoardPage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  // 项目卡片组件
  const ProjectCard = ({ project }: { project: Project }) => (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all cursor-pointer group"
      onClick={() => router.push(`/workspace/${project.id}`)}
    >
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900 rounded flex items-center justify-center mr-3">
              <IoCodeSlashOutline className="text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="font-medium text-gray-900 dark:text-white group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
              {project.name}
            </h3>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            <IoEllipsisHorizontalOutline />
          </button>
        </div>
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <IoTimeOutline className="mr-1" />
          <span>Edited {project.lastEdited}</span>
        </div>
        <div className="mt-3 text-xs bg-gray-100 dark:bg-gray-700 rounded px-2 py-1 inline-block text-gray-600 dark:text-gray-300">
          {project.template}
        </div>
      </div>
    </div>
  );


  return (
    <div className="p-6">
      {/* 最近的项目 */}
      <section className="mb-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold dark:text-white flex items-center">
            <IoTimeOutline className="mr-2" />
            Recent Projects
          </h2>
          <button 
            className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium"
            onClick={() => router.push('/dashboard/projects')}
          >
            View all
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {recentProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
          <div 
            className="bg-gray-50 dark:bg-gray-800 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg flex items-center justify-center p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-750 transition-colors"
            onClick={() => router.push('/new-project')}
          >
            <div className="text-center">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-2">
                <IoAddOutline className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Create New Project</p>
            </div>
          </div>
        </div>
      </section>


      {/* GitHub导入选项 */}
      <section className="mt-10">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center">
            <div className="mr-4 text-3xl text-gray-800 dark:text-gray-200">
              <IoLogoGithub />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Import from GitHub</h3>
              <p className="text-gray-600 dark:text-gray-400">Clone any of your GitHub repositories and start coding right away</p>
            </div>
            <button 
              className="ml-auto bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              onClick={() => router.push('/import/github')}
            >
              <IoLogoGithub className="mr-2" />
              Connect GitHub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

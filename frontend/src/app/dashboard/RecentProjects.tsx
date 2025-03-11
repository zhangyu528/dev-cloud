'use client';

import { useRouter } from 'next/navigation';
import ProjectCard from '@/components/ProjectCard';
import { useWorkspaces, WorkspacesProvider } from '@/contexts/WorkspacesContext';

import { 
    IoTimeOutline, 
    IoAddOutline,
  } from 'react-icons/io5';
  
const RecentProjects = () => {
    const router = useRouter();
    const { workspaces } = useWorkspaces();

    return (
        <WorkspacesProvider>
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
                {workspaces.map(workspace => (
                <ProjectCard key={workspace.id} id={workspace.id} name={workspace.name} lastEdited={workspace.lastEdited} template={workspace.template} />
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
        </WorkspacesProvider>
    );
};

export default RecentProjects;
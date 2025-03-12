'use client'

import { useWorkspaces, WorkspacesProvider } from '@/contexts/WorkspacesContext';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ProjectList = () => {
    const { workspaces } = useWorkspaces();
    const params = useParams();
    const userName = params.user_name as string;
    return (
      <WorkspacesProvider>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-800">
          <thead>
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Description
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800 text-sm">
            {workspaces.map((project, index) => (
              <tr key={project.id} className="hover:bg-gray-800 transition-colors bg-transparent">
                <td className="px-6 py-2 whitespace-nowrap">
                  <Link href={`/dashboard/${userName}/projects/${project.id}`} className="text-gray-200 hover:text-gray-300">
                    {project.name}
                  </Link>
                </td>
                <td className="px-6 py-2">
                  <p className="text-gray-600">{project.description}</p>
                </td>
                <td className="px-6 py-2 whitespace-nowrap">
                  <div className="text-gray-500">
                    {project.lastEdited}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </WorkspacesProvider>
    );
};

export default ProjectList
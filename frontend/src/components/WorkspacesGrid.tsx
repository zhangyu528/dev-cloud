'use client';

import { useWorkspaces } from '@/contexts/WorkspacesContext';
import WorkspaceListItem from './WorkspaceListItem';

export default function WorkspacesGrid() {
  const { workspaces, loading, error } = useWorkspaces();

  if (loading) return <div>Loading workspaces...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!workspaces || workspaces.length === 0) return null;

  return (
    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl">
      <h2 className="text-sm font-bold text-gray-800 dark:text-gray-200 mb-4">
        Your Workspaces
      </h2>
      <div className="flex flex-wrap gap-4">
        {workspaces.map((workspace) => (
          <WorkspaceListItem 
            key={workspace.id}
            workspace={workspace}
          />
        ))}
      </div>
    </div>
  );
}
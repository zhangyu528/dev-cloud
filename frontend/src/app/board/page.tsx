'use client'

import { useState, useEffect } from 'react';
import Loading from '@/components/Loading';
import { TemplateList, Template } from '@/components/TemplateList';
import { templatesApi } from '@/api/templates';
import WorkspacesCard from '@/components/WorkspacesCard';
import { workspacesApi, Workspace } from '@/api/workspaces';

export default function WorkspacePage() {
  const [loading, setLoading] = useState(false);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

  useEffect(() => {
    const fetchTemplates = async () => {
      setLoading(true);
      try {
        const data = await templatesApi.getAvailableTemplates();
        setTemplates(data);
      } catch (error) {
        console.error('Failed to fetch templates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();

    const fetchWorkspaces = async () => {
      setLoading(true);
      try {
        const workspaces = await workspacesApi.getWorkspaces();
        setWorkspaces(workspaces);
      } catch (error) {
        console.error('Failed to fetch workspaces:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspaces();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="flex-1 grid grid-cols-2 gap-8 p-8">
      {/* Left Section */}
      <div className="flex flex-col justify-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          Start building your app in the cloud
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Welcome to Project IDX, a new web-based development workspace
        </p>
      </div>
      <div className="flex flex-col justify-center gap-8">
        {/* Right Section - Templates */}
        <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
            Choose a Template
          </h2>
          <TemplateList templates={templates} />
        </div>

        {/* Workspaces Card */}
        {workspaces.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-8">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Your Workspaces
            </h2>
            <WorkspacesCard workspaces={workspaces} onWorkspaceDelete={
              async (workspaceId) => {
                setLoading(true);
                try {
                  await workspacesApi.deleteWorkspace(workspaceId);
                  setWorkspaces(workspaces.filter(workspace => workspace.id!== workspaceId));
                } catch (error) {
                  console.error('Failed to delete workspace:', error);
                } finally {
                  setLoading(false);
                }

              }
            } />
          </div>
        )}
      </div>
    </div>
  );
}

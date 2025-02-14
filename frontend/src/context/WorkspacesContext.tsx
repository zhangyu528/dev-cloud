// src/context/WorkspaceContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { Workspace, workspacesApi } from '@/api/workspaces';

// 定义上下文类型
interface WorkspaceContextType {
  workspaces: Workspace[];
  loading: boolean;
  error: string | null;
  fetchWorkspaces: () => Promise<void>;
  createWorkspace: (name: string, template: string) => Promise<Workspace>;
  deleteWorkspace: (id: number) => Promise<void>;
}

// 创建上下文
const WorkspacesContext = createContext<WorkspaceContextType | undefined>(undefined);

// 提供者组件
export const WorkspacesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取工作空间列表
  const fetchWorkspaces = async () => {
    try {
      setLoading(true);
      const fetchedWorkspaces = await workspacesApi.getWorkspaces();
      setWorkspaces(fetchedWorkspaces);
      setError(null);
    } catch (err) {
      setError('Failed to fetch workspaces');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 创建工作空间
  const createWorkspace = async (name: string, template: string) => {
    try {
      const newWorkspace = await workspacesApi.createWorkspace(name, template);
      setWorkspaces(prev => [...prev, newWorkspace]);
      return newWorkspace;
    } catch (err) {
      setError('Failed to create workspace');
      console.error(err);
      throw err;
    }
  };

  // 删除工作空间
  const deleteWorkspace = async (id: number) => {
    try {
      await workspacesApi.deleteWorkspace(id);
      setWorkspaces(prev => prev.filter(workspace => workspace.id !== id));
    } catch (err) {
      setError('Failed to delete workspace');
      console.error(err);
      throw err;
    }
  };

  // 初始加载工作空间
  useEffect(() => {
    fetchWorkspaces();
  }, []);

  return (
    <WorkspacesContext.Provider 
      value={{ 
        workspaces, 
        loading, 
        error, 
        fetchWorkspaces, 
        createWorkspace, 
        deleteWorkspace 
      }}
    >
      {children}
    </WorkspacesContext.Provider>
  );
};

// 自定义 Hook 用于使用 WorkspacesContext
export const useWorkspaces = () => {
  const context = useContext(WorkspacesContext);
  
  if (context === undefined) {
    throw new Error('useWorkspaces must be used within a WorkspaceProvider');
  }
  
  return context;
};
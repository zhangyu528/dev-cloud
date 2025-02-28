
'use client';

import React, { useState, useEffect } from 'react';

import { Explorer } from './explorer/Explorer';
import { Editor } from './editor/Editor';
import { WorkspacesApi } from '@/api/workspaces';
import { DirectoryItem } from '@/api/workspaces';

interface IdeProps {
  workspaceName: string;
}

export const Ide: React.FC<IdeProps> = ({ workspaceName }) => {

    const [directoryStructure, setDirectoryStructure] = useState<DirectoryItem | null>(null);
    useEffect(() => {
        const fetchDirectoryStructure = async () => {
            try {
            const workspacesApi = new WorkspacesApi();
            const structure = await workspacesApi.getWorkspaceDirectory(workspaceName);
            setDirectoryStructure(structure);
            } catch (error) {
                console.error('Failed to fetch directory structure', error);
            }
        };

        fetchDirectoryStructure();
        }, [workspaceName]);

    return (
    <div className="flex h-full">
        {/* 资源管理器 */}
        <div className="w-64 border-r border-gray-200 dark:border-gray-700">
            <Explorer root={directoryStructure} />
        </div>

        {/* 编辑器区域 */}
        <div className="flex-1">
            <Editor workspaceName={workspaceName} />
        </div>
    </div>
    );
};
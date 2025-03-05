import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { WorkspacesApi } from '@/api/workspaces';

export enum FileTabStatus {
    Unchanged = 'unchanged',
    Saved = 'saved',
    Modified = 'modified'
}

interface FileTab {
    path: string;
    name: string;
    content: string;
    originalContent: string;  // 新增原始内容字段
    status: FileTabStatus;
}

interface EditorContextType {
    workspaceName: string;  // 新增工作空间名称
    tabs: FileTab[];
    activeTabIndex: number;
    isLoading: boolean;
    openFile: (path: string) => Promise<void>;
    closeFile: (path: string) => void;
    setActiveTab: (index: number) => void;
    updateFileContent: (path: string, content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode, workspaceName: string }> = ({ children, workspaceName }) => {
    const [tabs, setTabs] = useState<FileTab[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const openFile = useCallback(async (path: string) => {
        // 检查文件是否已经打开
        const existingFileIndex = tabs.findIndex(tab => tab.path === path);
        
        if (existingFileIndex !== -1) {
            // 如果文件已经打开，切换到该文件
            setActiveTabIndex(existingFileIndex);
            return;
        }

        // 先创建一个空的 tab
        const newTab: FileTab = {
            path: path,
            name: path.split('/').pop() || path,
            content: '',  // 初始内容为空
            originalContent: '',
            status: FileTabStatus.Unchanged
        };

        // 先更新 tabs，设置活动索引
        setTabs(prev => [...prev, newTab]);
        setActiveTabIndex(tabs.length);

        try {
            setIsLoading(true);

            // 异步获取文件内容
            const workspacesApi = new WorkspacesApi();
            const { content } = await workspacesApi.getFileContent(workspaceName, path);

            // 更新文件内容
            setTabs(prev => 
                prev.map(tab => 
                    tab.path === path 
                        ? { ...tab, content, originalContent: content, status: FileTabStatus.Unchanged } 
                        : tab
                )
            );
        } catch (error) {
            console.error('Failed to open file:', error);
            // 如果加载失败，更新 tab 状态
            setTabs(prev => 
                prev.map(tab => 
                    tab.path === path 
                        ? { 
                            ...tab, 
                            content: 'Error loading file', 
                            originalContent: 'Error loading file',
                            status: FileTabStatus.Modified 
                        } 
                        : tab
                )
            );
        } finally {
            setIsLoading(false);
        }
    }, [tabs, workspaceName]);

    const closeFile = useCallback((path: string) => {
        setTabs(prev => {
            const updatedTabs = prev.filter(tab => tab.path !== path);
            const newActiveIndex = updatedTabs.length > 0 
                ? Math.min(activeTabIndex, updatedTabs.length - 1) 
                : -1;
            
            setActiveTabIndex(newActiveIndex);
            
            return updatedTabs;
        });
    }, [activeTabIndex]);

    const updateFileContent = useCallback((path: string, content: string) => {
        setTabs(prev => 
            prev.map(tab => 
                tab.path === path ? { 
                    ...tab, 
                    content, 
                    status: tab.originalContent !== content 
                        ? FileTabStatus.Modified 
                        : FileTabStatus.Unchanged 
                } : tab
            )
        );
    }, []);

    const setActiveTab = useCallback((index: number) => {
        setActiveTabIndex(index);
    }, []);

    return (
        <EditorContext.Provider value={{
            workspaceName,
            tabs,
            activeTabIndex,
            isLoading,
            openFile,
            closeFile,
            setActiveTab,
            updateFileContent
        }}>
            {children}
        </EditorContext.Provider>
    );
};

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (context === undefined) {
        throw new Error('useEditor must be used within an EditorProvider');
    }
    return context;
};
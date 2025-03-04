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
    status: FileTabStatus;
}

interface EditorContextType {
    tabs: FileTab[];
    activeTabIndex: number;
    isLoading: boolean;
    openFile: (path: string, workspaceName: string) => Promise<void>;
    closeFile: (path: string) => void;
    updateFileStatus: (path: string, status: FileTabStatus) => void;
    setActiveTab: (index: number) => void;
    updateFileContent: (path: string, content: string) => void;
}

const EditorContext = createContext<EditorContextType | undefined>(undefined);

export const EditorProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [tabs, setTabs] = useState<FileTab[]>([]);
    const [activeTabIndex, setActiveTabIndex] = useState<number>(-1);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const openFile = useCallback(async (path: string, workspaceName: string) => {
        const existingFileIndex = tabs.findIndex(tab => tab.path === path);
        
        if (existingFileIndex !== -1) {
            setActiveTabIndex(existingFileIndex);
        } else {
            try {
                setIsLoading(true);

                const workspacesApi = new WorkspacesApi();
                const { content } = await workspacesApi.getFileContent(workspaceName, path);

                const newTab: FileTab = {
                    path: path,
                    name: path.split('/').pop() || path,
                    content: content,
                    status: FileTabStatus.Unchanged
                };

                setTabs(prev => [...prev, newTab]);
                setActiveTabIndex(tabs.length);
            } catch (error) {
                console.error('Failed to open file:', error);
            } finally {
                setIsLoading(false);
            }
        }
    }, [tabs]);

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

    const updateFileStatus = useCallback((path: string, status: FileTabStatus) => {
        setTabs(prev => 
            prev.map(tab => 
                tab.path === path ? { ...tab, status } : tab
            )
        );
    }, []);

    const updateFileContent = useCallback((path: string, content: string) => {
        setTabs(prev => 
            prev.map(tab => 
                tab.path === path ? { 
                    ...tab, 
                    content, 
                    status: tab.content !== content 
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
            tabs,
            activeTabIndex,
            isLoading,
            openFile,
            closeFile,
            updateFileStatus,
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
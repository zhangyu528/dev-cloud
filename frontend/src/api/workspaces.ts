import axios from '@/api/axiosConfig'

export interface Workspace {
    id: number
    name: string
    template: string
    description: string
    lastEdited: string
}

export interface DirectoryItem {
    name: string;
    type: 'file' | 'directory';
    contents?: DirectoryItem[];
}

export interface FileContentResponse {
    path: string;           // 文件路径
    content: string;        // 文件内容
}

export class WorkspacesApi {
    async createWorkspace(name: string, template: string) {
        const response = await axios.post('/api/workspaces/create', { name, template })
        return response.data
    }

    async getWorkspaces(): Promise<Workspace[]> {
        const response = await axios.get('/api/workspaces/list')
        return response.data
    }

    async deleteWorkspace(id: number) {
        await axios.post('/api/workspaces/delete', { id })
    }

    async getWorkspaceDirectory(workspaceName: string): Promise<DirectoryItem> {
        const response = await axios.get(`/api/workspaces/directory/${workspaceName}`)
        return response.data
    }

    async getFileContent(workspaceName: string, filePath: string): Promise<FileContentResponse> {
        const response = await axios.post(`/api/workspaces/file-content/${workspaceName}`, { 
            file_path: filePath 
        });
        return response.data;
    }

    async createFile(workspaceName: string, filePath: string, content: string) {
        //await axios.post(`/api/workspaces/create-file/${workspaceName}/${filePath}`, { content })
    }
}

export const workspacesApi = new WorkspacesApi()
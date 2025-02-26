import axios from '@/api/axiosConfig'

export interface Workspace {
    id: number
    name: string
    template: string
}

export interface DirectoryItem {
    name: string;
    type: 'file' | 'directory';
    content?: string;
    children?: DirectoryItem[];
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
}

export const workspacesApi = new WorkspacesApi()
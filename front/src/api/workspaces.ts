
import { httpRequest } from '@/request/httpRequest'

export interface Workspace {
    id: number
    name: string
    template: string
}

export class WorkspacesApi {
    async createWorkspace(name: string, template: string) {
        return httpRequest.post('/api/workspaces/create', { name, template })
    }

    async getWorkspaces(): Promise<Workspace[]> {
        return httpRequest.get('/api/workspaces/list')
    }
}


export const workspacesApi = new WorkspacesApi()
import { httpRequest } from '@/request/httpRequest'

export interface Template {
  id: string
  name: string
  description: string
  icon: string
}

export const templatesApi = {
  async getAvailableTemplates(): Promise<Template[]> {
    return httpRequest.get('/api/templates/available-templates')
  }
}

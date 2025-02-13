import axios from '@/api/axiosConfig'

export interface TemplateResponse {
  id: string
  name: string
  description: string
  icon: string
}

export class TemplatesApi {
  async getAvailableTemplates(): Promise<TemplateResponse[]> {
    const response = await axios.get('/api/templates/available-templates')
    return response.data
  }
}

export const templatesApi = new TemplatesApi()
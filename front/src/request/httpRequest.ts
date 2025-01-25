// API configuration for different environments
const apiConfig = {
  development: {
    baseUrl: 'http://localhost:5000'
  },
  production: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL
  }
}

// Get current environment configuration
const env = process.env.NODE_ENV || 'development'
const currentConfig = apiConfig[env as keyof typeof apiConfig]

export const API_BASE_URL = currentConfig.baseUrl

import { getAuthToken } from '@/request/authToken'


export const httpRequest = {
  async request(
    endpoint: string,
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' = 'GET',
    body?: Record<string, any> | BodyInit | null,
    skipAuth?: boolean
  ): Promise<any> {
    try {
      const url = `${API_BASE_URL}${endpoint}`
      const headers = {
        'Content-Type': 'application/json',
        ...(getAuthToken() && !skipAuth ? { Authorization: `Bearer ${getAuthToken()}` } : {})
      }

      const fetchOptions: RequestInit = {
        method,
        headers,
        body: body ? JSON.stringify(body) : null
      }

      const response = await fetch(url, fetchOptions)
      if (!response.ok && response.status == 500) {// 200-299 is not ok
        throw new Error('服务器开小差，请稍后重试');
      } else if (!response.ok) {
        const errorMessage = response.headers?.get('X-Message') || 'Request failed with status ' + response.status
        throw new Error(errorMessage)
      }
      return response.json();
    } catch (error) {
      throw error;
    }
},

  get(endpoint: string, skipAuth?: boolean) {
    return this.request(endpoint, 'GET', null, skipAuth);
  },

  post(endpoint: string, body?: Record<string, any> | BodyInit | null, skipAuth?: boolean) {
    return this.request(endpoint, 'POST', body, skipAuth);
  }
}

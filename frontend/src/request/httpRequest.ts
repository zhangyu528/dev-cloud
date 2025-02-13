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
      if (!response.ok) {// 200-299 is ok
        const body = await response.json()
        throw new Error(body['message']);
      }
      return response.json();
    } catch (error) {
      if (error instanceof Error && error.message == 'Failed to fetch') {
        error.message = '无法连接到服务器。请确保服务正在运行，或检查网络连接。'
      } else if (error instanceof Error) {
        error.message = '未知错误'
      }
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

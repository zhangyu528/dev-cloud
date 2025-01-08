// API configuration for different environments
const apiConfig = {
  development: {
    baseUrl: 'http://localhost:5000/api'
  },
  production: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || '/api'
  }
}

// Get current environment configuration
const env = process.env.NODE_ENV || 'development'
const currentConfig = apiConfig[env as keyof typeof apiConfig]

export const API_BASE_URL = currentConfig.baseUrl

// Generic API request function
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: BodyInit | null
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  }

  const response = await fetch(url, {
    method: options.method || 'GET',
    headers,
    body: options.body ? JSON.stringify(options.body) : null
  })

  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.message || 'API request failed')
  }

  return response.json()
}

// Helper methods for common HTTP methods
export const api = {
  get: <T>(endpoint: string) => apiRequest<T>(endpoint),
  post: <T>(endpoint: string, body: any) => 
    apiRequest<T>(endpoint, { method: 'POST', body }),
  put: <T>(endpoint: string, body: any) =>
    apiRequest<T>(endpoint, { method: 'PUT', body }),
  delete: <T>(endpoint: string) => 
    apiRequest<T>(endpoint, { method: 'DELETE' })
}

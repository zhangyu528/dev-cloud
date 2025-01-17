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

import CryptoJS from 'crypto-js'

// Auth token management
const TOKEN_KEY = 'authToken'
const SECRET_KEY = process.env.NEXT_PUBLIC_TOKEN_SECRET || 'dev-jwt-secret-key'

export function setAuthToken(token: string) {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString()
  localStorage.setItem(TOKEN_KEY, encrypted)
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY)
}

function getAuthToken(): string | null {
  const encrypted = localStorage.getItem(TOKEN_KEY)
  if (!encrypted) return null
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Failed to decrypt token:', error)
    clearAuthToken()
    return null
  }
}

// Generic API request function
type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
  headers?: Record<string, string>
  body?: Record<string, any> | BodyInit | null
  skipAuth?: boolean
}

export async function apiRequest<T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`
  const headers = {
    'Content-Type': 'application/json',
    ...(getAuthToken() && !options.skipAuth ? { Authorization: `Bearer ${getAuthToken()}` } : {}),
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

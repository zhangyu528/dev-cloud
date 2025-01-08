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

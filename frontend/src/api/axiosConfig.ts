// src/api/axiosConfig.ts
import axios from 'axios';
import { getAuthToken } from '@/utils/authToken';

// API configuration for different environments
const apiConfig = {
  development: {
    baseURL: 'http://localhost:5000'
  },
  production: {
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
  }
}

// Get current environment configuration
const env = process.env.NODE_ENV || 'development'
const currentConfig = apiConfig[env as keyof typeof apiConfig]

// Create Axios instance
const axiosInstance = axios.create({
  baseURL: currentConfig.baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor for adding auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // 白名单接口，不需要 token 的 API 路径
    const noAuthPaths = [
      '/api/verify/send_code', 
      '/api/verify/verify_and_login',
      '/auth/github'
    ];

    // 检查当前请求路径是否在白名单中
    const isNoAuthPath = noAuthPaths.some(path => 
      config.url?.includes(path)
    );

    // 如果不在白名单，且有 token，则添加 Authorization 头
    if (!isNoAuthPath) {
      const token = getAuthToken();
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // 集中处理错误
    if (error.response) {
      console.error('Error Response:', error.response.data);
      console.error('Status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
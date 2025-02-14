// src/api/axiosConfig.ts
import axios from 'axios';
import { getAuthToken, clearAuthToken } from '@/utils/authToken';
import { redirectToLoginServer } from '@/utils/redirects';
import { toast } from 'react-hot-toast'; // 确保已安装 react-hot-toast

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
    // 处理未授权错误（401）
    if (error.response && error.response.status === 401) {
      // 清除 token
      clearAuthToken();
      
      // 重定向到登录页
      redirectToLoginServer();
    }

    // 统一错误处理和 toast 提示
    if (error.response) {
      // 服务器返回了错误响应
      const errorMessage = error.response.data?.message || 
                           error.response.data || 
                           '发生未知错误';
      toast.error(errorMessage);
    } else if (error.request) {
      // 请求已发送，但没有收到响应
      toast.error('无法连接到服务器');
    } else {
      // 发生了其他类型的错误
      toast.error('发生未知错误');
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
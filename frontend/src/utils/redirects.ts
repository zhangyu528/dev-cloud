// src/utils/redirects.ts
'use client'; // 重要：标记为客户端组件

import { useRouter } from 'next/navigation';

// // 客户端重定向
export function redirectToLogin() {
  // 检查是否在浏览器环境
  if (typeof window !== 'undefined') {
    // 客户端重定向
    const router = useRouter();
    router.push('/login');
  }
}

// 服务端/拦截器可用的重定向
export function redirectToLoginServer() {
  // 服务端重定向
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}
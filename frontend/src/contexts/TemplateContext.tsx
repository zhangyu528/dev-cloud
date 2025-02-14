// src/context/TemplateContext.tsx
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { TemplateResponse, templatesApi } from '@/api/templates';

// 定义上下文类型
interface TemplatesContextType {
  templates: TemplateResponse[];
  loading: boolean;
  error: string | null;
  fetchTemplates: () => Promise<void>;
}

// 创建上下文
const TemplatesContext = createContext<TemplatesContextType | undefined>(undefined);

// 提供者组件
export const TemplatesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [templates, setTemplates] = useState<TemplateResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // 获取可用模板列表
  const fetchTemplates = async () => {
    try {
      setLoading(true);
      const availableTemplates = await templatesApi.getAvailableTemplates();
      setTemplates(availableTemplates);
      setError(null);
    } catch (err) {
      setError('Failed to fetch available templates');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // 初始加载模板
  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <TemplatesContext.Provider 
      value={{ 
        templates, 
        loading, 
        error, 
        fetchTemplates 
      }}
    >
      {children}
    </TemplatesContext.Provider>
  );
};

// 自定义 Hook 用于使用 TemplateContext
export const useTemplates = () => {
  const context = useContext(TemplatesContext);
  
  if (context === undefined) {
    throw new Error('useTemplates must be used within a TemplateProvider');
  }
  
  return context;
};
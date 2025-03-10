'use client'

import { useState, useEffect } from 'react';
import Loading from '@/components/Loading';
import { WorkspaceTemplateGrid } from '@/components/WorkspaceTemplateGrid';
import WorkspacesGrid from '@/components/WorkspacesGrid';
import { useRouter } from 'next/navigation'
import { IoMdCube } from 'react-icons/io';

export default function BoardPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 dark:text-white">Dashboard</h1>
      
      {/* 这里可以添加仪表盘内容，如项目列表、统计信息等 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 示例卡片 - 实际内容可以根据需要替换 */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-2 dark:text-white">Recent Projects</h2>
          <p className="text-gray-600 dark:text-gray-300">Your recent projects will appear here</p>
        </div>
      </div>
    </div>
  );
}

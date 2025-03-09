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
    <div className="flex flex-col pl-24 pr-16">
      {/* Logo and Site Name */}
      <div className="flex items-center space-x-2 py-16">
        <IoMdCube className="w-10 h-10 text-blue-600 dark:text-blue-400" />
        <span className="text-2xl font-bold text-gray-900 dark:text-white">
          Dev Cloud
        </span>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[4fr_5fr] gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col justify-start space-y-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            Welcome back
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
          We've been busy! Here's some of the latest on what's new with IDX:
          </p>
          <div className="flex space-x-4">
            <button 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              onClick={() => router.push('/new-project')}
            >
              Start New Project
            </button>
            <button 
              className="border border-gray-300 text-gray-700 dark:text-white px-6 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              onClick={() => router.push('/docs')}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Project Launcher Section */}
        <div className="flex flex-col justify-start gap-8">
          {/* Templates Subsection */}
          <WorkspaceTemplateGrid />

          {/* Workspaces Subsection */}
          <WorkspacesGrid />
        </div>
      </div>
    </div>
  );
}

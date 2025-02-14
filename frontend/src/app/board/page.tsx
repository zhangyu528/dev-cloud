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
    <div className="flex flex-col p-8">
      {/* Logo and Site Name */}
      <div className="grid grid-cols-2 gap-8 mb-8 py-6 px-4">
        <div className="flex items-center space-x-4">
          <IoMdCube className="w-10 h-10 text-blue-600 dark:text-blue-400" />
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            Dev Cloud
          </span>
        </div>
        <div>{/* Placeholder for symmetry */}</div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-[4fr_5fr] gap-8">
        {/* Welcome Section */}
        <div className="flex flex-col justify-start space-y-6">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            Welcome back
          </h1>
          <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed">
            Transform your ideas into reality with our cloud-powered development workspace. 
            Seamlessly create, collaborate, and deploy your projects with cutting-edge tools 
            and intuitive workflows.
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

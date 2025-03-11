'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import RecentProjects from './RecentProjects';

import { 
  IoLogoGithub
} from 'react-icons/io5';
import Image from 'next/image';



export default function BoardPage() {
  const router = useRouter();

  return (
    <div className="p-6">
      <RecentProjects />

      {/* GitHub导入选项 */}
      <section className="mt-10">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <div className="flex items-center">
            <div className="mr-4 text-3xl text-gray-800 dark:text-gray-200">
              <IoLogoGithub />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">Import from GitHub</h3>
              <p className="text-gray-600 dark:text-gray-400">Clone any of your GitHub repositories and start coding right away</p>
            </div>
            <button 
              className="ml-auto bg-gray-800 hover:bg-black text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
              onClick={() => router.push('/import/github')}
            >
              <IoLogoGithub className="mr-2" />
              Connect GitHub
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

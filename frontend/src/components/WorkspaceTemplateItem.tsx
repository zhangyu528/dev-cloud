'use client';

import Link from 'next/link';
import { TemplateResponse } from '@/api/templates';

export function WorkspaceTemplateItem({ template }: { template: TemplateResponse }) {
  return (
    <Link
      href={`/new/${template.name}`}
      passHref
      className="group block w-full"
    >
      <div className="flex flex-col items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-xl 
        border border-gray-200 dark:border-gray-700 
        hover:border-blue-300 dark:hover:border-blue-600
        hover:shadow-lg transition-all duration-300 
        transform hover:-translate-y-2 
        space-y-2 text-center h-full aspect-square w-full"
      >
        <div className="mb-1 flex justify-center items-center w-full flex-grow">
          <img 
            src={template.icon} 
            alt={template.name}
            className="w-10 h-10 object-contain"
          />
        </div>
        <div className="flex flex-col items-center justify-center w-full">
          <h3 className="text-xs font-medium text-gray-800 dark:text-gray-200 
            group-hover:text-blue-600 dark:group-hover:text-blue-400 
            transition-colors duration-300 truncate w-full">
            {template.name}
          </h3>
          {template.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 truncate">
              {template.description}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
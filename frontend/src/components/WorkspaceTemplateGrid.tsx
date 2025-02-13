'use client';
import { WorkspaceTemplateCard } from '@/components/WorkspaceTemplateCard';

export interface Template {
  name: string;
  description: string;
  icon: string;
}

interface WorkspaceTemplateGridProps {
  templates: Template[];
}

export function WorkspaceTemplateGrid({ templates }: WorkspaceTemplateGridProps) {
  if (!templates || templates.length === 0) {
    return null;
  }

  return (
    <div className='w-full flex flex-col bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl'>
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">New workspace</h2>
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {templates.map((template, index) => (
          <WorkspaceTemplateCard 
            key={index}
            template={{
              name: template.name,
              description: template.description,
              icon: `/icons/templates/${template.name.toLowerCase().replace(/\s+/g, '-')}.svg`
            }}
          />
        ))}
      </div>
    </div>
  );
}

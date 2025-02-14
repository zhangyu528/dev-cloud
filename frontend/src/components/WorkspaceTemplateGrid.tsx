'use client';
import { WorkspaceTemplateItem } from '@/components/WorkspaceTemplateItem';
import { useTemplates } from '@/contexts/TemplateContext';

export function WorkspaceTemplateGrid() {
  const { templates, loading, error } = useTemplates();

  if (loading) {
    return <div>Loading templates...</div>;
  }

  if (!templates || templates.length === 0) {
    return null;
  }

  return (
    <div className='w-full flex flex-col bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl'>
      <h2 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-4">New workspace</h2>
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {templates.map((template) => (
          <WorkspaceTemplateItem key={template.id} template={template}/>
        ))}
      </div>
    </div>
  );
}

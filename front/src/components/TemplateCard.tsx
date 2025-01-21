'use client';

interface Template {
  name: string;
  icon: string;
}

interface TemplateCardProps {
  template: Template;
}

export function TemplateCard({ template }: TemplateCardProps) {
  return (
    <div className="flex flex-col items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <img 
        src={template.icon} 
        alt={template.name}
        className="w-12 h-12 mb-2"
      />
      <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
        {template.name}
      </span>
    </div>
  );
}

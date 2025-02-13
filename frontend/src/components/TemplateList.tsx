'use client';
import { TemplateCard } from '@/components/TemplateCard';

export interface Template {
  name: string;
  description: string;
  icon: string;
}

interface TemplateListProps {
  templates: Template[];
}

export function TemplateList({ templates }: TemplateListProps) {
  if (!templates || templates.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 w-full">
      {templates.map((template, index) => (
        <TemplateCard 
          key={index}
          template={{
            name: template.name,
            description: template.description,
            icon: `/icons/templates/${template.name.toLowerCase().replace(/\s+/g, '-')}.svg`
          }}
        />
      ))}
    </div>
  );
}

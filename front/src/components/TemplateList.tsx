'use client';
import { TemplateCard } from '@/components/TemplateCard';

const templates = [
  { name: 'Python Flask', icon: '/icons/flask.svg' },
  { name: 'Node Express', icon: '/icons/express.svg' },
  { name: 'Angular', icon: '/icons/angular.svg' },
  { name: 'NextJs', icon: '/icons/nextjs.svg' },
  { name: 'Flutter', icon: '/icons/flutter.svg' },
  { name: 'Vue', icon: '/icons/vue.svg' },
  { name: 'Astro', icon: '/icons/astro.svg' },
  { name: 'Go', icon: '/icons/go.svg' },
];

export function TemplateList() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {templates.map((template, index) => (
        <TemplateCard key={index} template={template} />
      ))}
    </div>
  );
}

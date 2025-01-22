'use client'

import { useParams } from 'next/navigation'

export default function NewTemplatePage() {
  const { template } = useParams<{ template: string }>()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Create New from Template: {template}</h1>
      
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
        <p className="text-gray-700 dark:text-gray-300">
          This is the page for creating new projects using the "{template}" template.
        </p>
      </div>
    </div>
  )
}

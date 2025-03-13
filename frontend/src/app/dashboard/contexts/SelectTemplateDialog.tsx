import { useState } from "react";
import Image from "next/image";
import { useTemplates } from "@/contexts/TemplateContext";

interface SelectTemplateDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

export default function SelectTemplateDialog({ 
  isOpen, 
  onClose, 
  onSelectTemplate 
}: SelectTemplateDialogProps) {
  if (!isOpen) return null;

  const { templates } = useTemplates();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 dark:bg-gray-900">
      <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 对话框标题 */}
        <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-600 px-6 py-4">
          <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">Select a Template</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        {/* 模板列表 */}
        <div className="flex-grow overflow-y-auto p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {templates.map(template => (
              <div
                key={template.id}
                className={`border rounded-lg overflow-hidden cursor-pointer transition-all border-gray-200 dark:border-gray-700 hover:border-blue-300`}
                onClick={() => onSelectTemplate(template.id)}
              >
                <div className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-md">
                      <Image src={template.icon} alt={template.name} width={48} height={48} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-gray-100">{template.name}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{template.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* 底部操作按钮 */}
        <div className="border-t border-gray-200 dark:border-gray-600 px-6 py-4 flex justify-end items-center">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
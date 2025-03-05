import React from 'react';
import { RootNode } from './RootNode';
import { useExplorer } from './contexts/ExplorerContext';

export const Explorer: React.FC = () => {
  const { isLoading } = useExplorer();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        Loading workspace...
      </div>
    );
  }

  return (
    <div className="bg-[#1A1A1A] overflow-hidden h-full flex flex-col">
      <div className="text-xs font-semibold text-gray-300 px-6 py-2">
        Explorer
      </div>

      <div className="w-64 flex-grow overflow-y-auto">
        <RootNode />
      </div>
    </div>
  );
};
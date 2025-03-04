import React from 'react';
import { EditorTab } from './EditorTab';
import { useEditor } from './context/EditorContext';

export const EditorTabs: React.FC = () => {
  const { tabs } = useEditor();

  return (
    <div 
      className="flex bg-[#1A1A1A]"  
      style={{ height: 32 }}  
    >
      {tabs.map((tab, index) => (
        <EditorTab
          key={tab.path}
          index={index}
        />
      ))}
    </div>
  );
};
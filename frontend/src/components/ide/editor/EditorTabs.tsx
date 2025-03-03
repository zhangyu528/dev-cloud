import React from 'react';
import { EditorTab, FileTab } from './EditorTab';

interface EditorTabsProps {
  tabs: FileTab[];
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  closeTab: (index: number) => void;
}

export const EditorTabs: React.FC<EditorTabsProps> = ({
  tabs,
  activeTabIndex,
  setActiveTabIndex,
  closeTab
}) => {
  return (
    <div 
      className="flex bg-[#1A1A1A]"  
      style={{ height: 32 }}  
    >
      {tabs.map((tab, index) => (
        <EditorTab
          key={tab.path}
          {...tab}
          isActive={index === activeTabIndex}
          onClick={() => setActiveTabIndex(index)}
          onClose={() => closeTab(index)}
        />
      ))}
    </div>
  );
};
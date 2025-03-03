import React from 'react';

interface ContextMenuProps {
  x: number;
  y: number;
  options: { label: string; action: () => void }[];
}

export const ContextMenu: React.FC<ContextMenuProps> = ({ x, y, options }) => {
  return (
    <div
      className="
        absolute 
        bg-white 
        border 
        border-gray-200 
        rounded-lg 
        shadow-xl 
        overflow-hidden 
        z-50
      "
      style={{ 
        top: y, 
        left: x, 
        minWidth: '150px' 
      }}
    >
      {options.map((option, index) => (
        <div 
          key={index} 
          className="
            px-4 
            py-2 
            text-sm 
            text-gray-700 
            hover:bg-blue-50 
            hover:text-blue-600 
            cursor-pointer 
            transition-colors 
            duration-200
          " 
          onClick={option.action}
        >
          {option.label}
        </div>
      ))}
    </div>
  );
};

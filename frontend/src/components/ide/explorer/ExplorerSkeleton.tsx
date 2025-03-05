// src/components/ide/explorer/ExplorerSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { FaFolder } from 'react-icons/fa';

export const ExplorerSkeleton: React.FC = () => {
  return (
    <div className="explorer-skeleton p-2 h-full overflow-hidden flex flex-col">
      <div className="workspace-header mb-4 flex items-center">
        <Skeleton width={150} height={20} />
      </div>
      
      <div className="skeleton-items space-y-2 flex-grow overflow-auto">
        {[1, 2, 3, 4, 5].map((item) => (
          <div key={item} className="flex items-center space-x-2">
            <Skeleton width={16} height={16} />
            <Skeleton width={100} height={16} />
          </div>
        ))}
        
        <div className="ml-4 space-y-2">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Skeleton width={80} height={16} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
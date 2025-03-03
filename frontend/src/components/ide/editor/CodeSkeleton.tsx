// d:\work\dev-cloud\frontend\src\components\workspace\editor\CodeEditorSkeleton.tsx
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export const CodeSkeleton: React.FC = () => {
  return (
    <div className="w-full h-full p-4 bg-[#1E1E1E] text-gray-300">
      <div className="space-y-2">
        {/* 模拟代码行 */}
        {[...Array(15)].map((_, index) => (
          <div key={index} className="flex items-center space-x-2">
            {/* 行号 */}
            <div className="w-8">
              <Skeleton width={30} height={16} baseColor="#2D2D2D" highlightColor="#3A3A3A" />
            </div>
            
            {/* 代码内容 */}
            <div className="flex-1">
              <Skeleton 
                width={`${Math.random() * 80 + 20}%`} 
                height={16} 
                baseColor="#2D2D2D" 
                highlightColor="#3A3A3A" 
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
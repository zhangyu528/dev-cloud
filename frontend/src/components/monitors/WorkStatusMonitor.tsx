import React, { useState, useEffect } from 'react';
import axios from '@/api/axiosConfig'

// 添加 onStatusComplete 到接口定义
interface WorkStatusMonitorProps {
  workspace_name: string;
  onStatusComplete?: () => void;  // 可选的回调函数
}

export const WorkStatusMonitor: React.FC<WorkStatusMonitorProps> = ({ 
  workspace_name,
  onStatusComplete  // 解构新增的回调参数
}) => {
  const [status, setStatus] = useState<string>("initializing");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // 启动追踪的 API 调用
    const startTracking = async () => {
        await axios.get(`/api/workspaces/track/${workspace_name}`);
    };

    // 建立 SSE 连接
    const eventSource = new EventSource(`${axios.defaults.baseURL}/stream`);
   
    eventSource.onmessage = (event) => {
      const newStatus = JSON.parse(event.data);
      setStatus(newStatus.status);

      console.info(newStatus.status);

      // 判断是否完成
      const completedStatuses = ['completed', 'running'];
      if (completedStatuses.includes(newStatus.status)) {
        setIsComplete(true);
        // 如果提供了回调，则调用
        onStatusComplete?.();
        eventSource.close();
      }
    };

    // 启动追踪
    startTracking();
    // 清理
    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[300px]">
      {!isComplete ? (
        <div className="text-center">
          <div className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-2 bg-gray-200 rounded w-32 mx-auto"></div>
          </div>
          <p className="mt-4 text-gray-600">
            {`${status} workspace...`}
          </p>
        </div>
      ) : null}
    </div>
  );
};
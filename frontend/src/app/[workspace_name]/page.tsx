'use client'
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { WorkStatusMonitor } from '@/components/monitors/WorkStatusMonitor';

export default function Workspace() {
  const params = useParams();
  const workspace_name = params.workspace_name as string;
  
  const [isWorkspaceReady, setIsWorkspaceReady] = useState(false);
  const [iframeSrc, setIframeSrc] = useState('');

  const handleStatusComplete = () => {
    // 使用 nip.io 动态域名
    setIframeSrc(`http://${workspace_name}.127.0.0.1.nip.io`);
    setIsWorkspaceReady(true);
  };

  return (
    <div>
      {!isWorkspaceReady ? (
        <WorkStatusMonitor
          workspace_name={workspace_name}
          onStatusComplete={handleStatusComplete}
        />
      ) : (
        <iframe
          src={iframeSrc}
          className="mx-auto w-full min-h-screen"
          title="Embedded Workspace"
          // 添加安全属性
          sandbox="allow-scripts allow-same-origin allow-forms"
        />
      )}
    </div>
  );
}
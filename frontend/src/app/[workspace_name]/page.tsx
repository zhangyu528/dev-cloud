
'use client'
import { useParams } from 'next/navigation';
export default function Workspace() {
  const params = useParams();
  // 获取 URL 中的路径参数
  const workspaceName = params.workspace_name;
  
  // 如果 workspaceName 存在，使用它来替换 URL 中的部分
  const iframeSrc = workspaceName 
  ? `http://${workspaceName}.127.0.0.1.nip.io`
  : ''; // 如果 workspaceName 未定义，保持空值或给出默认 URL
  return (
    <div className="min-h-screen flex">
      {workspaceName ? (
        <iframe
          src={iframeSrc}
          className="mx-auto w-full flex-1"
          title="Embedded Service"
        ></iframe>)
        : (
          <p>Loading...</p> // 如果 workspaceName 还未加载，显示加载提示
        )}
    </div>
  )
}
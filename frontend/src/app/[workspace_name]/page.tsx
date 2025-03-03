'use client'
import { Ide } from '@/components/ide/Ide';
import { useParams } from 'next/navigation';

export default function Workspace_name() {
  const params = useParams();
  const workspace_name = params.workspace_name as string;

  return (
    <div className="flex h-screen min-h-screen w-full">
      <Ide
        workspaceName={workspace_name}
      />
    </div>
  );
}
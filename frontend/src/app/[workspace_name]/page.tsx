'use client'
import { Ide } from '@/components/ide/Ide';
import { useParams } from 'next/navigation';
import { IdeProvider } from '@/components/ide/contexts/IdeContext';

export default function Workspace_name() {
  const params = useParams();
  const workspace_name = params.workspace_name as string;

  return (
    <div className="flex h-full w-full">
      <IdeProvider workspaceName={workspace_name}>
        <Ide />
      </IdeProvider>
    </div>
  );
}
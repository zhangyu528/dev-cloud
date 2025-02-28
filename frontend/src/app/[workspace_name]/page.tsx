'use client'
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Ide } from '@/components/workspace/Ide';

export default function Workspace_name() {
  const params = useParams();
  const workspace_name = params.workspace_name as string;

  return (
    <div className="flex h-screen">
      <Ide
        workspaceName={workspace_name}
      />
    </div>
  );
}
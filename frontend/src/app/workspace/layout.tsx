'use client';


export default function Workspace_nameLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
    <div className="h-screen flex bg-gray-50 dark:bg-gray-900">
      {children}
    </div>
  );
}
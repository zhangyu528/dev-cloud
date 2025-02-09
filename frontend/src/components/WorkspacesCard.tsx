// components/WorkspacesCard.tsx
'use client';

interface Workspace {
  id: number;
  name: string;
  template: string;
}

interface WorkspacesCardProps {
  workspaces: Workspace[];
  onWorkspaceClick?: (id: number) => void;
  onWorkspaceDelete?: (id: number) => void; // 删除回调
}

export default function WorkspacesCard({ workspaces, onWorkspaceClick, onWorkspaceDelete }: WorkspacesCardProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {workspaces.map((workspace) => (
        <div
          key={workspace.id}
          className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md cursor-pointer hover:shadow-lg transition duration-200 flex items-center gap-4 w-full relative"
        >
          {/* 左侧图标 */}
          <img
            src={`/icons/templates/${workspace.template.toLowerCase()}.svg`}
            alt={workspace.name}
            className="w-12 h-12"
            onClick={() => onWorkspaceClick?.(workspace.id)}
          />
          {/* 名称 & 描述 */}
          <div className="flex-1" onClick={() => onWorkspaceClick?.(workspace.id)}>
            <h3 className="text-lg font-semibold">{workspace.name}</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm">This is a workspace</p>
          </div>
          {/* 删除按钮 */}
          {onWorkspaceDelete && (
            <button
              onClick={() => onWorkspaceDelete(workspace.id)}
              className="text-gray-400 hover:text-red-500 transition duration-200 px-2 py-1 rounded-md"
            >
              X
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

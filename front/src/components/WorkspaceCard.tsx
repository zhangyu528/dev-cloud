// components/WorkspaceCard.tsx
'use client';

interface WorkspaceCardProps {
  name: string; // 工作区名称
  templateName: string; // 工作区模板
  onClick?: () => void; // 点击卡片的回调函数
}

export default function WorkspaceCard({ name, templateName, onClick }: WorkspaceCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <div
                className="flex items-center cursor-pointer"
                onClick={onClick}
            >
                <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center"
                    style={{
                        backgroundColor: '#f0f0f0',
                        marginRight: '16px',
                    }}
                >
                <img 
                        src={`/icons/templates/${templateName.toLowerCase()}.svg`}
                        alt={name}
                        className="w-12 h-12 mb-2"
                    />
                </div>
                <div>
                    <h3 className="text-lg font-semibold">{name}</h3>
                    <p className="text-gray-600 dark:text-gray-400">
                        This is a workspace
                    </p>
                </div>
            </div>
        </div>
    );
}
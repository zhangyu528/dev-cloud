
// 定义按钮属性接口
interface SidebarButtonProps {
    icon: React.ElementType;
    name: string;
    isSelected: boolean;
    onClick: () => void;
}

// 抽离的 SidebarButton 组件
export const SidebarButton: React.FC<SidebarButtonProps> = ({ 
    icon: Icon, 
    name, 
    isSelected, 
    onClick 
}) => {
    return (
        <button 
            className={`sidebar-item hover:bg-gray-700 rounded p-2 flex items-center ${isSelected ? 'bg-gray-700' : ''}`}
            onClick={onClick}
        >
            <Icon className={`w-5 h-5 ${isSelected ? 'text-white' : 'text-gray-500'}`} />
        </button>
    );
};
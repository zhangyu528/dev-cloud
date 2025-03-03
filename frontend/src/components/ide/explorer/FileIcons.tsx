import React from 'react';
import { BsFiletypeHtml } from "react-icons/bs";
import { RiJavascriptLine } from "react-icons/ri";
import { SiTypescript } from "react-icons/si";
import { PiFileJsxLight } from "react-icons/pi";
import { PiFileTsx } from "react-icons/pi";
import { FaPython } from "react-icons/fa";
import { FaJava } from "react-icons/fa";
import { BsFiletypeTxt } from "react-icons/bs";
import { BsFiletypeJson } from "react-icons/bs";
import { BsFiletypeXml } from "react-icons/bs";
import { AiOutlineFileMarkdown } from "react-icons/ai";
import { CiFileOn } from "react-icons/ci";

// 定义文件类型到图标和颜色的映射
interface FileIconInfo {
  icon: React.ComponentType<{ size?: number, className?: string }>;
  color: string;
}

const FILE_TYPE_ICONS: { [key: string]: FileIconInfo } = {
  // 代码文件
  'js': { 
    icon: RiJavascriptLine, 
    color: 'text-yellow-500' 
  },
  'jsx': { 
    icon: PiFileJsxLight, 
    color: 'text-blue-500' 
  },
  'ts': { 
    icon: SiTypescript, 
    color: 'text-blue-600' 
  },
  'tsx': { 
    icon: PiFileTsx, 
    color: 'text-blue-700' 
  },
  'py': { 
    icon: FaPython, 
    color: 'text-blue-800' 
  },
  'java': { 
    icon: FaJava, 
    color: 'text-red-600' 
  },
  'html': { 
    icon: BsFiletypeHtml, 
    color: 'text-orange-500' 
  },

  // 文本文件
  'txt': { 
    icon: BsFiletypeTxt, 
    color: 'text-gray-500' 
  },
  'md': { 
    icon: AiOutlineFileMarkdown, 
    color: 'text-green-600' 
  },
  'markdown': { 
    icon: AiOutlineFileMarkdown, 
    color: 'text-green-600' 
  },

  // 数据文件
  'json': { 
    icon: BsFiletypeJson, 
    color: 'text-purple-500' 
  },
  'xml': { 
    icon: BsFiletypeXml, 
    color: 'text-indigo-500' 
  },
};

interface FileIconProps {
  /** 文件名，用于确定文件类型 */
  fileName: string;
  /** 图标尺寸，默认16像素 */
  size?: number;
  /** 自定义CSS类名 */
  className?: string;
}

/**
 * 文件图标组件
 * 根据文件扩展名选择对应的图标和颜色
 */
export const FileIcon: React.FC<FileIconProps> = ({ 
  fileName, 
  size = 16, 
  className = '' 
}) => {
  // 提取文件扩展名，转换为小写
  const extension = fileName.split('.').pop()?.toLowerCase() || '';

  // 选择对应的图标和颜色，默认使用通用文件图标
  const fileIconInfo = FILE_TYPE_ICONS[extension] || { 
    icon: CiFileOn, 
    color: 'text-gray-400' 
  };

  const { icon: IconComponent, color } = fileIconInfo;

  return <IconComponent size={size} className={`${color} ${className}`} />;
};

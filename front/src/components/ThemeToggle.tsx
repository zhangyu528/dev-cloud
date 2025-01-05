'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaDesktop } from 'react-icons/fa';

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // 确保组件已挂载
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { value: 'system', icon: FaDesktop },
    { value: 'light', icon: FaSun },
    { value: 'dark', icon: FaMoon }
  ];

  return (
    <div className="flex items-center space-x-2">
      {themes.map((themeOption) => (
        <button
          key={themeOption.value}
          onClick={() => setTheme(themeOption.value)}
          className={`p-2 rounded-full transition-all duration-300 ${
            theme === themeOption.value 
              ? 'bg-indigo-100 text-indigo-600' 
              : 'hover:bg-gray-100 text-gray-600'
          } dark:bg-gray-800 dark:text-gray-200`}
        >
          <themeOption.icon className="w-5 h-5" />
        </button>
      ))}
    </div>
  );
}
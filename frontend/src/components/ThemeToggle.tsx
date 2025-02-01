'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect } from 'react';
import { GrSystem } from "react-icons/gr";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes = [
    { value: 'system', icon: <GrSystem /> },
    { value: 'light', icon: <CiLight /> },
    { value: 'dark', icon: <MdDarkMode /> }
  ];

  return (
    <div className="flex items-center space-x-1 border rounded-lg p-1 dark:border-gray-700">
      {themes.map((themeOption) => (
        <button
          key={themeOption.value}
          onClick={() => setTheme(themeOption.value)}
          className={`p-2 rounded-md transition-all duration-300 ${
            theme === themeOption.value 
              ? 'bg-indigo-100 text-indigo-600 dark:bg-gray-700 dark:text-indigo-400' 
              : 'hover:bg-gray-100 text-gray-600 dark:hover:bg-gray-700 dark:text-gray-400'
          }`}
        >
          {themeOption.icon}
        </button>
      ))}
    </div>
  );
}
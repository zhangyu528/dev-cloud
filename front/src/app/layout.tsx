'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'react-hot-toast';

import '../app/globals.css';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  return (
      <html lang="zh" suppressHydrationWarning>
        <body>
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
            {children}
            <Toaster 
              position="top-center"
              toastOptions={{
                className: '!bg-white !text-gray-900 dark:!bg-gray-800 dark:!text-gray-100',
                style: {
                  borderRadius: '0.375rem',
                  padding: '0.75rem 1rem',
                },
              }}
            />
          </ThemeProvider>
        </body>
      </html>
  );
}

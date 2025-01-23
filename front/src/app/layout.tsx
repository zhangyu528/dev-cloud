'use client';

import { ThemeProvider } from 'next-themes';

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
          </ThemeProvider>
        </body>
      </html>
  );
}

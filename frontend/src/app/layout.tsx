'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
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
        <NextThemesProvider 
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
        </NextThemesProvider>
      </body>
    </html>
  );
}

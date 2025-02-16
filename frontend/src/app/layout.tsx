'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Toaster } from 'react-hot-toast';
import { useMemo } from 'react';
import { useTheme } from 'next-themes';

import '../app/globals.css';

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme();

  const theme = useMemo(() => 
    createTheme({
      palette: {
        mode: resolvedTheme === 'dark' ? 'dark' : 'light',
      },
    }),
    [resolvedTheme]
  );

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

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
          <ThemeWrapper>
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
          </ThemeWrapper>
        </NextThemesProvider>
      </body>
    </html>
  );
}

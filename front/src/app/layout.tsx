'use client';

import { ThemeProvider } from 'next-themes';
import { usePathname } from 'next/navigation';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import '../app/globals.css';

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}) {
  const pathname = usePathname();
  return (
      <html lang="zh" suppressHydrationWarning>
        <body>
          <ThemeProvider 
            attribute="class"
            defaultTheme="system"
            enableSystem
          >
          {pathname.startsWith('/workspace') ? (
            <></>
          ) : (
            <Header />
          )}            
          {children}
          <Footer />
          </ThemeProvider>
        </body>
      </html>
  );
}

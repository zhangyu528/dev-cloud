'use client';

import React, { useState } from 'react'

// app/login/layout.tsx
export default function LoginLayout({
    children
  }: { 
    children: React.ReactNode 
  }) {
  return (
    <div className="login-container flex min-h-screen items-center justify-center">
      {children}
    </div>
  )
}
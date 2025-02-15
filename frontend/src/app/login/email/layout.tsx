'use client';

import React, { useState } from 'react'

// app/login/layout.tsx
export default function LoginLayout({
    children
  }: { 
    children: React.ReactNode 
  }) {
  return (
    <>
      {children}
    </>
  )
}
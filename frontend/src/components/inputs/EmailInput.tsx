// components/EmailInput.tsx
import React, { forwardRef } from 'react'

interface EmailInputProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export const EmailInput = forwardRef<HTMLInputElement, EmailInputProps>(
  ({ value, onChange, placeholder = "Email", className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        id="email"
        name="email"
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete="email"
        required
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md 
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent 
                   ${className}`}
        placeholder={placeholder}
        {...props}
      />
    )
  }
)

EmailInput.displayName = 'EmailInput'
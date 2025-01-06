'use client'
import { useEffect, useRef } from 'react'

interface VerificationInputProps {
  value: string
  onChange: (value: string) => void
  length?: number
}

export function VerificationInput({ value, onChange, length = 6 }: VerificationInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleInput = (index: number, inputValue: string) => {
    // 只允许输入数字
    if (!/^\d*$/.test(inputValue)) return

    // 获取最后一个字符
    const digit = inputValue.slice(-1)
    if (!digit) return

    // 更新值
    const newValue = value.split('')
    newValue[index] = digit
    onChange(newValue.join(''))

    // 确保立即移动到下一个输入框
    if (index < length - 1) {
      // 使用 setTimeout 确保在值更新后移动焦点
      setTimeout(() => {
        inputRefs.current[index + 1]?.focus()
      }, 0)
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      e.preventDefault()
      
      const newValue = value.split('')
      
      // 如果当前输入框有值，清除当前值
      if (value[index]) {
        newValue[index] = ''
        onChange(newValue.join(''))
        return // 当前框有值时，只清除当前值，不移动焦点
      }
      
      // 如果当前输入框没有值，且不是第一个输入框
      if (index > 0) {
        // 清除前一个输入框的值
        newValue[index - 1] = ''
        onChange(newValue.join(''))
        // 移动焦点到前一个输入框
        setTimeout(() => {
          inputRefs.current[index - 1]?.focus()
        }, 0)
      }
    }
  }

  const handleFocus = (index: number) => {
    // 找到第一个空位置
    const emptyIndex = value.split('').findIndex(v => !v)
    const targetIndex = emptyIndex === -1 ? value.length : emptyIndex
    
    // 如果尝试聚焦的输入框不是下一个要填写的位置，则重定向焦点
    if (index !== targetIndex && targetIndex < length) {
      inputRefs.current[targetIndex]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, length)
    if (!/^\d*$/.test(pastedData)) return
    onChange(pastedData)
  }

  return (
    <div className="flex justify-between gap-2">
      {Array.from({ length }, (_, i) => (
        <input
          key={i}
          ref={el => inputRefs.current[i] = el}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ''}
          onChange={e => handleInput(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onFocus={() => handleFocus(i)}
          onPaste={handlePaste}
          className={`w-12 h-12 text-center text-xl border rounded-md
                   ${i === value.length ? 'border-blue-500 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600'}
                   bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100
                   focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent
                   disabled:bg-gray-100 dark:disabled:bg-gray-700`}
          disabled={i > value.length}
        />
      ))}
    </div>
  )
}

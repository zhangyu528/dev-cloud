interface ValidationResult {
  isValid: boolean
  message: string
}

export const validateEmail = (email: string): ValidationResult => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return {
      isValid: false,
      message: '请输入有效的电子邮件地址'
    }
  }
  return {
    isValid: true,
    message: ''
  }
}

export const validateUsername = (username: string): ValidationResult => {
  if (username.length < 3) {
    return {
      isValid: false,
      message: '用户名至少需要3个字符'
    }
  }
  if (!/^[a-zA-Z_]/.test(username)) {
    return {
      isValid: false,
      message: '用户名必须以字母或下划线开头'
    }
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return {
      isValid: false,
      message: '用户名只能包含字母、数字和下划线'
    }
  }
  return {
    isValid: true,
    message: ''
  }
}
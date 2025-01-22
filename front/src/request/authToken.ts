import CryptoJS from 'crypto-js'

// Auth token management
const TOKEN_KEY = 'authToken'
const SECRET_KEY = process.env.NEXT_PUBLIC_TOKEN_SECRET || 'dev-jwt-secret-key'

export function setAuthToken(token: string) {
  const encrypted = CryptoJS.AES.encrypt(token, SECRET_KEY).toString()
  localStorage.setItem(TOKEN_KEY, encrypted)
}

export function clearAuthToken() {
  localStorage.removeItem(TOKEN_KEY)
}

export function getAuthToken(): string | null {
  const encrypted = localStorage.getItem(TOKEN_KEY)
  if (!encrypted) return null
  try {
    const bytes = CryptoJS.AES.decrypt(encrypted, SECRET_KEY)
    return bytes.toString(CryptoJS.enc.Utf8)
  } catch (error) {
    console.error('Failed to decrypt token:', error)
    clearAuthToken()
    return null
  }
}
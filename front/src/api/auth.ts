// Auth-related API methods
import { apiRequest, setAuthToken, clearAuthToken} from '@/request/apiRequest'

interface VerifyAndLoginResponse {
    username: string,
    access_token: string
}

export const authApi = {
  /**
   * Send verification code to user's email
   */
  sendVerificationCode: (email: string, username?: string) =>
    apiRequest<{ message: string }>('/send_verification_code', {
      method: 'POST',
      body: { email, username },
      skipAuth: true
    }),


  /**
   * Verify code and login user
   */
  verifyAndLogin: async (email: string, code: string) => {
    const { access_token, username } = await apiRequest<VerifyAndLoginResponse>('/verify_and_login', {
      method: 'POST',
      body: { email, code },
      skipAuth: true
    })
    setAuthToken(access_token)
    return { token: access_token, username }
  },

  /**
   * Logout user and clear auth token
   */
  logout: async () => {
    try {
      const result = await apiRequest<{ message: string }>('/logout', {
        method: 'POST',
        skipAuth: true
      })
      clearAuthToken()
      return result
    } catch (error) {
      // Clear token even if logout API fails
      clearAuthToken()
      throw error
    }
  }

}

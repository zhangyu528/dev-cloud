// Auth-related API methods
import { apiRequest, setAuthToken, clearAuthToken, API_BASE_URL } from '@/request/apiRequest'

interface VerifyAndLoginResponse {
    username: string,
    access_token: string
}

export const authApi = {
  /**
   * Send verification code to user's email
   */
  sendVerificationCode: (email: string, username?: string) =>
    apiRequest<{ message: string }>('/verify/send_verification_code', {
      method: 'POST',
      body: { email, username },
      skipAuth: true
    }),


  /**
   * Verify code and login user
   */
  verifyAndLogin: async (email: string, code: string) => {
    const { access_token, username } = await apiRequest<VerifyAndLoginResponse>('/verify/verify_and_login', {
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
  },

  /**
   * Redirect to GitHub OAuth login
   */
  githubLogin: () => {
    // Generate unique state with timestamp and random string
    const state = `${Date.now()}_${Math.random().toString(36).substring(2)}`
    // Store state with tab identifier to prevent cross-tab conflicts
    sessionStorage.setItem('github_oauth_state', JSON.stringify({
      state,
      timestamp: Date.now()
    }))
    window.location.href = `${API_BASE_URL}/auth/github?state=${state}`
  },

  /**
   * Handle GitHub OAuth callback
   */
  exchangeGithubOAuthCode: async (code: string, state: string) => {
    // Verify state matches what we stored
    const storedData = sessionStorage.getItem('github_oauth_state')
    if (!storedData) {
      throw new Error('State parameter expired or missing')
    }
    
    const { state: storedState, timestamp } = JSON.parse(storedData)
    
    // Check if state is expired (5 minutes)
    if (Date.now() - timestamp > 5 * 60 * 1000) {
      throw new Error('State parameter expired')
    }
    
    // Verify state matches
    if (state !== storedState) {
      throw new Error(`Invalid state parameter. Received: ${state}, Expected: ${storedState}`)
    }
    sessionStorage.removeItem('github_oauth_state')

    const response = await apiRequest<{ 
      token: string
      username: string
    }>(`/auth/github/exchange?code=${code}&state=${state}`, {
      method: 'GET',
      skipAuth: true
    })
    
    setAuthToken(response.token)
    return {
      token: response.token,
      username: response.username
    }
  }

}

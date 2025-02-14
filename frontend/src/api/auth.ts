// Auth-related API methods
import axios from '@/api/axiosConfig'

export interface OAuthResponse {
  access_token: string
}

export class AuthApi {
  /**
   * Redirect to GitHub OAuth login
   */
  githubLogin() {
    // Generate unique state with timestamp and random string
    const state = `${Date.now()}_${Math.random().toString(36).substring(2)}`
    // Store state with tab identifier to prevent cross-tab conflicts
    sessionStorage.setItem('github_oauth_state', JSON.stringify({
      state,
      timestamp: Date.now()
    }))
    window.location.href = `${axios.defaults.baseURL}/auth/github/login?state=${state}`
  }

  /**
   * Handle GitHub OAuth callback
   */
  async exchangeGithubOAuthCode(code: string, state: string): Promise<OAuthResponse> {
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

    const response = await axios.get(`/auth/github/callback?code=${code}&state=${state}`)
    
    return response.data
  }
}

export const authApi = new AuthApi()

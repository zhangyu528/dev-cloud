import axios from '@/api/axiosConfig'
import { setAuthToken, clearAuthToken } from '@/utils/authToken'

export interface CurrentUserResponse {
  username: string;
  email: string;
  avatar_url?: string;
  user_id: string;
}

interface VerifyTokenResponse {
  valid: boolean;
}

export class UserApi {
  /**
   * Send verification code to user's email
   */
  async sendVerificationCode(email: string, username?: string) {
    return axios.post(
      '/api/verify/send_code', { email, username })
  }

  /**
   * Verify code and login user
   */
  async verifyAndLogin(email: string, code: string, username?: string) {
    const response = await axios.post(
      '/api/verify/verify_and_login', { email, code, username })
    const { access_token, username: responseUsername } = response.data
    setAuthToken(access_token)
    return { token: access_token, username: responseUsername }
  }

  /**
   * Logout user and clear auth token
   */
  async logout() {
    try {
      const response = await axios.post('/api/user/logout')
      clearAuthToken()
      return response.data
    } catch (error) {
      // Clear token even if logout API fails
      clearAuthToken()
      throw error
    }
  }
  
  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<CurrentUserResponse> {
    const response = await axios.get('/api/user/me')
    return response.data
  }

  /**
   * Verify authentication token
   */
  async verifyToken(): Promise<VerifyTokenResponse> {
    const response = await axios.post('/api/user/verify-token')
    return response.data
  }
}

export const userApi = new UserApi();

import { httpRequest } from '@/request/httpRequest'
import { setAuthToken, clearAuthToken } from '@/request/authToken'

export interface CurrentUser {
  username: string;
  email: string;
  avatar_url?: string;
}

interface VerifyTokenResponse {
  valid: boolean;
}

export class UserApi {
  /**
   * Send verification code to user's email
   */
  async sendVerificationCode(email: string, username?: string) {
    return httpRequest.post('/api/user/send_verification_code', 
      { email, username }, 
      true)
  }

  /**
   * Verify code and login user
   */
  async verifyAndLogin(email: string, code: string, username?: string) {
    const { access_token, username: responseUsername } = await httpRequest.post(
      '/api/user/verify_and_login',
      { email, code, username },
      true
    )
    setAuthToken(access_token)
    return { token: access_token, username: responseUsername }
  }

  /**
   * Logout user and clear auth token
   */
  async logout() {
    try {
      const result = await httpRequest.post('/api/user/logout')
      clearAuthToken()
      return result
    } catch (error) {
      // Clear token even if logout API fails
      clearAuthToken()
      throw error
    }
  }
  
  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<CurrentUser> {
    const response = await httpRequest.get('/api/user/me');
    const {username, avatar_url, email} = response.data;
    return {username, avatar_url, email};
  }

  /**
   * Verify authentication token
   */
  async verifyToken(): Promise<VerifyTokenResponse> {
    return httpRequest.post('/api/user/verify-token');
  }
}

export const userApi = new UserApi();

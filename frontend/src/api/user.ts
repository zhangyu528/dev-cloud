import axios from '@/api/axiosConfig'
import { setAuthToken, clearAuthToken } from '@/utils/authToken'

export interface CurrentUser {
  username: string;
  email: string;
  avatar_url?: string;
  user_id: string;
}

export class UserApi {
  /**
   * Send verification code to user's email
   */
  async sendVerificationCode(email: string, username?: string) {
    await axios.post('/api/verify/send_code', { email, username })
  }

  /**
   * Logout user and clear auth token
   */
  async logout() {
    await axios.post('/api/user/logout')
  }
  
  /**
   * Get current authenticated user
   */
  async getCurrentUser(): Promise<CurrentUser> {
    const response = await axios.get('/api/user/me')
    return response.data
  }

  /**
   * Verify authentication token
   */
  async verifyToken() {
    await axios.post('/api/user/verify-token')
  }
}

export const userApi = new UserApi();

import axios from '@/api/axiosConfig'
import { setAuthToken } from '@/utils/authToken'

export interface LoginResponse {
  access_token: string
}

export class VerifyApi {
  /**
   * Send verification code to user's email
   */
  async sendVerificationCode(email: string) {
    const response = await axios.post('/api/verify/send_code', { email })
    return response.data
  }

  /**
   * Verify code and login user
   */
  async verifyAndLogin(email: string, code: string, username?: string): Promise<LoginResponse> {
    const response = await axios.post('/api/verify/verify_and_login', { email, code, username })
    return response.data
  }
}

export const verifyApi = new VerifyApi();

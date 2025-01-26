import { httpRequest } from '@/request/httpRequest'
import { setAuthToken } from '@/request/authToken'


export class VerifyApi {
  /**
   * Send verification code to user's email
   */
  async sendVerificationCode(email: string) {
    return  httpRequest.post(
      '/api/verify/send_code', { email }, 
      true)
  }

  /**
   * Verify code and login user
   */
  async verifyAndLogin(email: string, code: string, username?: string) {
    const { access_token, username: responseUsername } = await httpRequest.post(
      '/api/verify/verify_and_login', { email, code, username },
      true)
    setAuthToken(access_token)
    return { token: access_token, username: responseUsername }
  }

}


export const verifyApi = new VerifyApi();

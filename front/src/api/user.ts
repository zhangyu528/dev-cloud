import { apiRequest } from '../request/apiRequest';

export interface CurrentUser {
  id: string;
  username: string;
  email: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export const userApi = {
  /**
   * Get current authenticated user
   */
  getCurrentUser: async (): Promise<CurrentUser> => {
    const response = await apiRequest('/user/me');
    return response.data;
  }
}

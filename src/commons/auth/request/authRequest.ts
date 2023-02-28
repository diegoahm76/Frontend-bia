import { api } from '../../../api/axios';
import { type LoginUser } from '../interfaces/authModels';

export const login_post = async (loginUser: LoginUser): Promise<any> => {
  try {
    const { data } = await api.post<any>('users/login/', loginUser)
    
    return {
      ok: true,
      ...data
    }
  } catch (error: any) {
    const { response: {
      data
    } } = error

    return {
      ok: false,
      error_message: data.detail
    }
  }  
}
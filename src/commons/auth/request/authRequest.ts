import { api } from '../../../api/axios';
import { type LoginUser } from '../interfaces/authModels';
import { control_error } from '../../../helpers/controlError';

export const login_post = async (loginUser: LoginUser): Promise<any> => {
  try {
    const { data } = await api.post<any>('users/login/', loginUser)
    
    return {
      ok: true,
      ...data
    }
  } catch (error) {
    control_error(error)

    return {
      ok: false,
      error_message: error
    }
  }  
}
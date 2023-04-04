import { api } from '../../../api/axios';
import type {
Roles
} from '../interfaces/seguridadModels';
import type {
  ResponseServer,
  ResponseThunks
} from '../../../interfaces/globalModels';
import { type AxiosError, type AxiosResponse } from 'axios';
import { control_error } from '../../../helpers/controlError';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const roles_request = async () => {
  try {
    const {
      data
    } = await api.get<ResponseServer<Roles[]>>('roles/get-list');
      console.log(data);
   
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;

    const { data } = response as unknown as ResponseThunks;

    control_error(data.detail);

    
  }
};



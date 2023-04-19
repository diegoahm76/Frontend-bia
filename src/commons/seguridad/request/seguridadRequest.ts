import { api } from '../../../api/axios';
import type {
Roles, SuperUser
} from '../interfaces';
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
    } = await api.get<ResponseServer<Roles[]>>('roles/get-list/');
    return data;
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;

    const { data } = response as unknown as ResponseThunks;
    control_error(data.detail);
  }
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const superuser_request = async(id_persona: number) => {
  try {
    const { data } = await api.post<ResponseServer<SuperUser[]>>(`users/delegate-rol-super-usuario/${id_persona}/`);
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
  }
}



import { api } from '../../../api/axios';
import type {
  ResponseServer,
  HistoricoDatosRestringidos,
  IList
} from '../../../interfaces/globalModels';
import type { PermisosRol, RolCreated, Roles, SuperUser } from '../interfaces';
import type { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { get_tipo_documento } from '../../../request/getRequest';
import { control_error } from '../../../helpers/controlError';
import type { DelegarSuper } from '../interfaces/seguridadModels';

export const change_super_user = (): DelegarSuper => {
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');

  const [loading, set_loading] = useState<boolean>(false);

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_tipo_documento }
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    void get_selects_options();
  }, []);

  return {
    tipo_documento_opt,
    tipo_documento,
    loading,
    get_selects_options,
    set_tipo_documento
  };
};

export const roles_request = async (): Promise<AxiosResponse<Roles[]>> => {
  return await api.get<Roles[]>('roles/get-list/');
};

export const delete_request = async (id_rol: number): Promise<any> => {
  return await api.delete(`roles/delete/${id_rol}`);
};

export const get_permisos_by_modulos = async (): Promise<
  AxiosResponse<ResponseServer<Roles[]>>
> => {
  return await api.get<ResponseServer<Roles[]>>(
    'permisos/permisos-modulos/get-list/'
  );
};

export const create_rol = async (
  rol: RolCreated
): Promise<AxiosResponse<RolCreated>> => {
  return await api.post<RolCreated>('roles/create/', rol);
};

export const create_permiso_rol = async (
  permisos: PermisosRol[]
): Promise<AxiosResponse<PermisosRol[]>> => {
  return await api.post<PermisosRol[]>(
    'permisos/permisos-modulos-rol/create/',
    permisos
  );
};

export const superuser_request = async (
  id_persona: number
): Promise<ResponseServer<SuperUser[]> | undefined> => {
  try {
    const { data } = await api.post<ResponseServer<SuperUser[]>>(
      `users/delegate-rol-super-usuario/${id_persona}/`
    );
    return data;
  } catch (error) {
    console.error(error);
  }
};

// editar datos persona restringida naturual
export const editar_datos_restringidos_persona = async (
  id_persona: number | undefined,
  datos: FormData
): Promise<any> => {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  const response = await api.put(
    `personas/update-personas-naturales-restringidos/${id_persona as number}/`,
    datos
  );
  return response.data;
};

// editar datos persona restringida juridica
export const editar_datos_restringidos_juridica = async (
  id_persona: number | undefined,
  datos: FormData
): Promise<any> => {
  const response = await api.put(
    `personas/update-personas-juridicas-restringidos/${id_persona as number}/`,
    datos
  );
  return response.data;
};
// consultar historico datos restringidos
export const consultar_historico_restringido = async (
  id: number
): Promise<HistoricoDatosRestringidos[]> => {
  const { data } = await api.get<ResponseServer<HistoricoDatosRestringidos[]>>(
    `personas/buscar-historico-cambios/${id}/`
  );
  return data.data;
};

/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../api/axios';
import type {
  HistoricoCambioEstadosUser,
  SuperUser,
  Roles,
  Users,
  // DataCreateUser,
  // DataEditUser,
  PermisosRol,
  Rol,
} from '../interfaces';

import type {
  ResponseServer,
  HistoricoDatosRestringidos,
  IList,
  ResponseThunks,
} from '../../../interfaces/globalModels';
import type { AxiosError, AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { get_tipo_documento } from '../../../request/getRequest';
import { control_error } from '../../../helpers/controlError';
import type {
  DelegarSuper,
  InfoPersonal,
  PermisosRolEdit,
  UsersRol,
} from '../interfaces/seguridadModels';
import { control_success } from '../../../helpers';

export const change_super_user = (): DelegarSuper => {
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');

  const [loading, set_loading] = useState<boolean>(false);

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_tipo_documento },
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
    set_tipo_documento,
  };
};

export const roles_request = async (): Promise<AxiosResponse<Rol[]>> => {
  return await api.get('roles/get-list/');
};

export const delete_request = async (id_rol: number): Promise<any> => {
  return await api.delete(`roles/delete/${id_rol}`);
};

export const get_rol_by_id = async (
  id_rol: number
): Promise<AxiosResponse<ResponseServer<Roles[]>>> => {
  return await api.get(`permisos/permisos-rol/get-by-rol/${id_rol}/`);
};

export const get_permisos_by_modulos = async (): Promise<
  AxiosResponse<ResponseServer<Roles[]>>
> => {
  return await api.get('permisos/permisos-modulos/get-list/');
};

export const create_rol = async (rol: Rol): Promise<AxiosResponse<Rol>> => {
  return await api.post('roles/create/', rol);
};

export const update_rol = async (
  rol: Rol,
  id_rol: number
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.put(`roles/update/${id_rol}/`, rol);
};

export const create_permiso_rol = async (
  permisos: PermisosRol[]
): Promise<AxiosResponse<PermisosRol[]>> => {
  return await api.post('permisos/permisos-modulos-rol/create/', permisos);
};

export const update_permiso_rol = async (
  permisos: PermisosRolEdit[],
  id_rol: number
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.put(
    `permisos/permisos-modulos-rol/update/${id_rol}/`,
    permisos
  );
};

export const superuser_request = async (
  id_persona: number
): Promise<ResponseServer<SuperUser[]> | undefined> => {
  try {
    const { data } = await api.post(
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
// busqueda de usuarios por nombre
export const users_request = async (
  nombre_de_usuario: string
): Promise<ResponseThunks<Users[]>> => {
  try {
    const {
      data: { data },
    } = await api.get<ResponseServer<Users[]>>(
      `users/get-user-by-nombre-de-usuario/?nombre_de_usuario=${nombre_de_usuario}`
    );
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;
    const { data } = response as unknown as ResponseThunks;
    control_error(data.detail);
    return {
      ok: false,
      error_message: data.detail,
    };
  }
};

// Busqueda avanzada de personas por varios parametros
export const persons_request = async (
  tipo_documento: string,
  numero_documento: string,
  primer_nombre: string,
  primer_apellido: string
): Promise<ResponseThunks<Users[]>> => {
  try {
    const {
      data: { data },
    } = await api.get<ResponseServer<Users[]>>(
      `personas/get-personas-filters-admin-user/?tipo_documento=${tipo_documento}&numero_documento=${numero_documento}&primer_nombre=${primer_nombre}&primer_apellido=${primer_apellido}&razon_social&nombre_comercial`
    );
    return {
      ok: true,
      data,
    };
  } catch (error: any) {
    const { response } = error as AxiosError<AxiosResponse>;
    const { data } = response as unknown as ResponseThunks;
    control_error(data.detail);
    return {
      ok: false,
      error_message: data.detail,
    };
  }
};

// Trae historico de cambios de estado para cada usuario
export const user_historico_cambios_estado = async (
  id_usuario: number
): Promise<ResponseThunks<HistoricoCambioEstadosUser[]>> => {
  //  console.log('')(id_usuario);
  try {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const {
      data: { data },
    } = await api.get<ResponseServer<HistoricoCambioEstadosUser[]>>(
      `users/historico-activacion/${id_usuario}/`
    );
    return {
      ok: true,
      data,
    };
  } catch (error) {
    const { response } = error as AxiosError<AxiosResponse>;
    const { data } = response as unknown as ResponseThunks;
    control_error(data.detail);
    return {
      ok: false,
      error_message: data.detail,
    };
  }
};

// ? crear usuario
export const crear_user_admin_user = async (
  data: FormData
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.post('users/register/', data);
};

// ? editar usuario
export const update_user_admin_user = async (
  id_usuario: number,
  data: FormData
): Promise<AxiosResponse<ResponseServer<any>>> => {
  return await api.patch(`users/update/${id_usuario}/`, data);
};

// editar datos de acceso
export const editar_datos_acceso = async (datos: FormData): Promise<any> => {
  const response = await api.patch(`users/profile/update/`, datos);
  return response.data;
};


export const get_users_rol = async (
  id_rol: number
): Promise<AxiosResponse<ResponseServer<UsersRol[]>>> => {
  return await api.get(`roles/detail_usuarios_rol/${id_rol}/`);
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

// Buscar persona por documento - Trae usuario o usuarios asignados
export const get_person_user_or_users_by_document = async (
  tipo_documento: string,
  numero_documento: string
): Promise<AxiosResponse<ResponseServer<InfoPersonal | null>>> => {
  return await api.get(
    `personas/get-personas-by-document-admin-user/${tipo_documento}/${numero_documento}`
  );
};


// ? request añadida para traer los datos de una sucursal

export const getSucursalesToUser = async (): Promise<any> => {
  try {
    const url = 'transversal/sucursales/sucursales-empresa-lista/3';
    const response = await api.get(url);
    return response.data?.data;
  } catch (error: any) {
    control_error(error?.response?.data?.detail);
    return [];
  }
};

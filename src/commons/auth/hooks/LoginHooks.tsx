import { useState } from 'react';
import { api } from '../../../api/axios';
import { type AuthHook, type UserRol } from '../interfaces/authModels';

export const use_rol = (): AuthHook => {
  const [is_captcha_valid, set_is_captcha_valid] = useState(false);
  const [is_loading, set_is_loading] = useState(false);
  const [roles, set_roles] = useState<UserRol[]>([]);
  const [open, set_open] = useState(false);

  // Obtiene los permisos del rol seleccionado
  const get_permissions_by_rol = async (id_rol: number): Promise<void> => {
    set_is_loading(true);
    try {
      const { data } = await api.get(
        `/permisos/permisos-rol/get-by-rol/${id_rol}/`
      );

      set_roles([]);
      console.log(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      set_is_loading(false);
    }
  };

  return {
    get_permissions_by_rol,
    set_is_captcha_valid,
    set_open,
    is_captcha_valid,
    is_loading,
    roles,
    open,
    // reintentos,
  };
};

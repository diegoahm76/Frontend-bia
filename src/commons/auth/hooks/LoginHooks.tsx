import { useState } from 'react';
// import Swal from 'sweetalert2';
import { api } from '../../../api/axios';
// import { useSelector } from 'react-redux';
import {
  type AuthHook,
  type IUserInfo,
  type UserRol,
} from '../interfaces/authModels';
import { control_error } from '../../../helpers/controlError';

export const use_rol = (): AuthHook => {
  // const dispatch = useDispatch();
  // const reintentos = useSelector((state: any) => state.login.reintentos);
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
      // console.log(data.data);

      const user_data = JSON.parse(
        localStorage.getItem('tempDataUser') ?? ''
      ) as IUserInfo;
      user_data.permisos = data.data;
    } catch (error) {
      console.log(error);
    } finally {
      set_is_loading(false);
    }
  };

  const submit_handler = async (dataForm: any): Promise<void> => {
    if (!is_captcha_valid) {
      // Swal.fire({
      //   position: 'center',
      //   icon: 'info',
      //   text: 'Es necesario validar el Captcha, para poder ingresar',
      //   //     //ButtonText: "Aceptar",
      //   //     //ButtonColor: "#3085d6",
      //   //     //  is_active: true,
      // });
    } else {
      set_is_loading(true);
      try {
        set_roles([]);
      } catch (error) {
        control_error(error);
      } finally {
        set_is_loading(false);
      }
    }
  };

  return {
    get_permissions_by_rol,
    submit_handler,
    set_is_captcha_valid,
    set_open,
    is_captcha_valid,
    is_loading,
    roles,
    open,
    // reintentos,
  };
};

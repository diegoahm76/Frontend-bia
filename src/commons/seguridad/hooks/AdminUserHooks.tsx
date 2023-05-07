import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { control_error } from '../../../helpers/controlError';
import type { IList } from '../../../interfaces/globalModels';
import type {
  IList2,
  DataAadminUser,
  AdminUserHook,
  SeguridadSlice,
} from '../interfaces';
import {
  get_tipo_documento,
  get_tipo_persona,
  get_tipo_usuario,
} from '../../../request';
// import { get_roles } from '../store/thunks';
// import { roles_request } from '../request/seguridadRequest';
import { roles_choise_adapter } from '../adapters/roles_adapters';
import { roles_request } from '../request/seguridadRequest';

const activo_opt: IList[] = [
  { value: 'false', label: 'No' },
  { value: 'true', label: 'Si' },
];

const bloqueado_opt: IList[] = [
  { value: 'false', label: 'No' },
  { value: 'true', label: 'Si' },
];
export const initial_state_data_register: DataAadminUser = {
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  razon_social: '',
  nombre_comercial: '',
  primer_apellido: '',
  primer_nombre: '',
  segundo_apellido: '',
  segundo_nombre: '',
  nombre_de_usuario: '',
  imagen_usuario: '',
  tipo_usuario: '',
  roles: [],
  activo: false,
  activo_fecha_ultimo_cambio: '',
  activo_justificacion_cambio: '',
  bloqueado: false,
  bloqueado_fecha_ultimo_cambio: '',
  bloqueado_justificacion_cambio: '',
  fecha_creacion: '',
  fecha_activación_inicial: '',
  creado_desde_portal: false,
  persona_que_creo: 0,
};

export const use_admin_users = (): AdminUserHook => {
  // const dispatch = useDispatch();

  const [numero_documento, set_numero_documento] = useState('');

  const [has_user, set_has_user] = useState(false);
  const [is_exists, set_is_exists] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [loading, set_loading] = useState<boolean>(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento_opt_all, set_tipo_documento_opt_all] = useState<
    IList[]
  >([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_persona, set_tipo_persona] = useState('');
  const [tipo_persona_opt, set_tipo_persona_opt] = useState<IList[]>([]);
  const [roles, set_roles] = useState<IList2[]>([]);
  const [roles_opt, set_roles_opt] = useState<IList2[]>([]);
  const [tipo_usuario, set_tipo_usuario] = useState('');
  const [activo, set_activo] = useState('');
  const [bloqueado, set_bloqueado] = useState('');
  const [tipo_usuario_opt, set_tipo_usuario_opt] = useState<IList[]>([]);
  const { roles: data_roles } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );
  const [data_register, set_data_register] = useState<DataAadminUser>(
    initial_state_data_register
  );

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_tipo_persona },
      } = await get_tipo_persona();
      set_tipo_persona_opt(res_tipo_persona ?? []);

      const {
        data: { data: res_tipo_usuario },
      } = await get_tipo_usuario();
      set_tipo_usuario_opt(res_tipo_usuario ?? []);

      const { data } = await roles_request();
      const res_roles_adapter: IList2[] = await roles_choise_adapter(data);
      console.log(res_roles_adapter);
      // console.log(roles_opt);
      // dispatch(get_roles());
      set_roles_opt(res_roles_adapter);

      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);
      set_tipo_documento_opt_all(res_tipo_documento ?? []);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    console.log('DATA ROLES', data_roles);
  }, [data_roles]);

  useEffect(() => {
    console.log('roles OPT', roles_opt);
  }, [roles_opt]);

  useEffect(() => {
    if (tipo_persona === 'N') {
      set_tipo_documento_opt(
        tipo_documento_opt_all.filter((e) => e.value !== 'NT')
      );
    } else {
      set_tipo_documento_opt(tipo_documento_opt_all);
    }
  }, [tipo_persona]);

  useEffect(() => {
    void get_selects_options();
  }, []);

  return {
    data_register,
    has_user,
    is_exists,
    is_saving,
    is_search,
    loading,
    numero_documento,
    tipo_documento_opt,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    tipo_usuario_opt,
    tipo_usuario,
    activo,
    activo_opt,
    bloqueado,
    bloqueado_opt,
    roles,
    roles_opt,
    get_selects_options,
    set_data_register,
    set_has_user,
    set_is_exists,
    set_is_saving,
    set_is_search,
    set_roles,
    set_numero_documento,
    set_activo,
    set_bloqueado,
    set_tipo_documento,
    set_tipo_persona,
    set_tipo_usuario,
  };
};

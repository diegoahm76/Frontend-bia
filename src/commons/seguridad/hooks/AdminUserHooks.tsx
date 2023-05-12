import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { control_error } from '../../../helpers/controlError';
import type { IList } from '../../../interfaces/globalModels';
import type {
  IList2,
  DataAadminUser,
  AdminUserHook,
  SeguridadSlice,
  Users,
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
import { set_user_info } from '../store/seguridadSlice';
import { get_data_user } from '../store/thunks';

const activo_opt: IList[] = [
  { value: 'false', label: 'No' },
  { value: 'true', label: 'Si' },
];

const bloqueado_opt: IList[] = [
  { value: 'false', label: 'No' },
  { value: 'true', label: 'Si' },
];

const initial_state_user_info: Users = {
  id_usuario: 0,
  nombre_de_usuario: '',
  persona: 0,
  tipo_persona: '',
  tipo_documento: '',
  numero_documento: '',
  primer_nombre: '',
  segundo_nombre: '',
  primer_apellido: '',
  segundo_apellido: '',
  nombre_completo: '',
  razon_social: '',
  nombre_comercial: '',
  is_active: false,
  fecha_ultimo_cambio_activacion: '',
  justificacion_ultimo_cambio_activacion: '',
  is_blocked: false,
  fecha_ultimo_cambio_bloqueo: '',
  justificacion_ultimo_cambio_bloqueo: '',
  tipo_usuario: '',
  profile_img: '',
  creado_por_portal: false,
  created_at: '',
  activated_at: '',
  id_usuario_creador: 0,
  primer_nombre_usuario_creador: '',
  primer_apellido_usuario_creador: '',
  roles: [
    {
      value: 0,
      label: '',
    },
  ],
};

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
  imagen_usuario: new File([], ''),
  tipo_usuario: '',
  roles: [
    {
      value: 0,
      label: '',
    },
  ],
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
  const dispatch = useDispatch();

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
  const [data_disponible, set_data_disponible] = useState<boolean>(false);
  const {
    action_admin_users,
    data_user_search,
    data_person_search,
    user_info,
  } = useSelector((state: SeguridadSlice) => state.seguridad);
  const [
    historial_cambios_estado_is_active,
    set_historial_cambios_estado_is_active,
  ] = useState<boolean>(false);
  const [selected_image, set_selected_image] = useState<
    string | ArrayBuffer | null
  >('');
  const [file_image, set_file_image] = useState<File>();
  const [check_user_is_active, set_check_user_is_active] =
    useState<boolean>(true);
  const [check_user_is_blocked, set_check_user_is_blocked] =
    useState<boolean>(true);
  // Mostrar modal usuarios por persona
  const [users_x_person_is_active, set_users_x_person_is_active] =
    useState<boolean>(false);

  const {
    register: register_admin_user,
    handleSubmit: handle_submit_admin_user,
    setValue: set_value_admin_user,
    formState: { errors: errors_admin_users },
    watch: watch_admin_user,
  } = useForm<DataAadminUser>();

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
    set_tipo_persona(data_user_search.tipo_persona);
    // set_tipo_documento(user_info.tipo_documento);
    // set_numero_documento(user_info.numero_documento);
  }, [data_user_search]);

  // Paso de datos a formulario para creacion de usuario persona Natural o Juridica
  useEffect(() => {
    set_data_disponible(false);
    set_check_user_is_active(true);
    set_check_user_is_blocked(true);
    dispatch(set_user_info(initial_state_user_info));

    set_tipo_persona(data_person_search.tipo_persona);

    set_roles(roles_choise_adapter(user_info.roles));
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    set_activo(`${data_register.activo}`);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    set_bloqueado(`${data_register.bloqueado}`);
    set_selected_image(user_info.profile_img);
    if (data_person_search.tipo_persona === 'N') {
      set_data_register({
        ...data_register,
        primer_nombre: data_person_search.primer_nombre,
        segundo_nombre: data_person_search.segundo_nombre,
        primer_apellido: data_person_search.primer_apellido,
        segundo_apellido: data_person_search.segundo_apellido,
      });
    } else if (data_person_search.tipo_persona === 'J') {
      set_data_register({
        ...data_register,
        razon_social: user_info.razon_social,
        nombre_comercial: user_info.nombre_comercial,
      });
    }
    if (data_person_search.usuarios.length === 1) {
      // set_data_register(initial_state_data_register);
      dispatch(get_data_user(data_person_search.usuarios[0].id_usuario));
    } else if (data_person_search.usuarios.length === 2) {
      // Disparar modal con los 2 usuarios disponibles
      set_users_x_person_is_active(true);
    }

    set_data_disponible(true);
    // set_tipo_documento(data_person_search.tipo_documento);
    // set_numero_documento(data_person_search.numero_documento);
  }, [data_person_search]);

  // Paso de datos a formulario para edición de usuario persona natural
  useEffect(() => {
    set_data_disponible(false);
    set_check_user_is_active(true);
    set_check_user_is_blocked(true);

    set_roles(roles_choise_adapter(user_info.roles));
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    set_activo(`${data_register.activo}`);
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    set_bloqueado(`${data_register.bloqueado}`);
    set_selected_image(user_info.profile_img);
    set_data_register({
      ...data_register,
      razon_social: user_info.razon_social,
      nombre_comercial: user_info.nombre_comercial,
      primer_nombre: user_info.primer_nombre,
      segundo_nombre: user_info.segundo_nombre,
      primer_apellido: user_info.primer_apellido,
      segundo_apellido: user_info.segundo_apellido,
      nombre_de_usuario: user_info.nombre_de_usuario,
      tipo_usuario: user_info.tipo_usuario,
      roles: user_info.roles,
      activo: user_info.is_active,
      activo_fecha_ultimo_cambio: user_info.fecha_ultimo_cambio_activacion,
      activo_justificacion_cambio:
        user_info.justificacion_ultimo_cambio_activacion,
      bloqueado: user_info.is_blocked,
      bloqueado_fecha_ultimo_cambio: user_info.fecha_ultimo_cambio_bloqueo,
      bloqueado_justificacion_cambio:
        user_info.justificacion_ultimo_cambio_bloqueo,
      fecha_creacion: user_info.created_at,
      fecha_activación_inicial: user_info.activated_at,
      creado_desde_portal: user_info.creado_por_portal,
      persona_que_creo: user_info.id_usuario_creador,
    });

    set_value_admin_user('razon_social', user_info.razon_social);
    set_value_admin_user('nombre_comercial', user_info.nombre_comercial);
    set_value_admin_user('primer_nombre', user_info.primer_nombre);
    set_value_admin_user('segundo_nombre', user_info.segundo_nombre);
    set_value_admin_user('primer_apellido', user_info.primer_apellido);
    set_value_admin_user('segundo_apellido', user_info.segundo_apellido);
    set_value_admin_user('nombre_de_usuario', user_info.nombre_de_usuario);
    set_value_admin_user('tipo_usuario', user_info.tipo_usuario);

    set_value_admin_user('roles', user_info.roles);
    set_value_admin_user('activo', user_info.is_active);
    set_value_admin_user(
      'activo_fecha_ultimo_cambio',
      user_info.fecha_ultimo_cambio_activacion
    );
    set_value_admin_user(
      'activo_justificacion_cambio',
      user_info.justificacion_ultimo_cambio_activacion
    );
    set_value_admin_user('bloqueado', user_info.is_blocked);
    set_value_admin_user(
      'bloqueado_fecha_ultimo_cambio',
      user_info.fecha_ultimo_cambio_bloqueo
    );
    set_value_admin_user(
      'bloqueado_justificacion_cambio',
      user_info.justificacion_ultimo_cambio_bloqueo
    );
    set_value_admin_user('fecha_creacion', user_info.created_at);
    set_value_admin_user('fecha_activación_inicial', user_info.activated_at);
    set_value_admin_user('creado_desde_portal', user_info.creado_por_portal);
    set_value_admin_user('persona_que_creo', user_info.id_usuario_creador);
    // if (user_info.id_usuario !== 0) {
    set_data_disponible(true);
    // }
  }, [user_info]);

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
    // Handle Form
    register_admin_user,
    handle_submit_admin_user,
    set_value_admin_user,
    errors_admin_users,
    watch_admin_user,
    // Gets
    get_selects_options,
    // UseSelector
    action_admin_users,
    data_person_search,
    user_info,
    // UseState values
    users_x_person_is_active,
    selected_image,
    file_image,
    check_user_is_active,
    check_user_is_blocked,
    data_disponible,
    historial_cambios_estado_is_active,
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
    // UseState Sets
    set_users_x_person_is_active,
    set_selected_image,
    set_file_image,
    set_check_user_is_active,
    set_check_user_is_blocked,
    set_data_disponible,
    set_historial_cambios_estado_is_active,
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

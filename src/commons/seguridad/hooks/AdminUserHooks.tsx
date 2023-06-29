/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import type { IList } from '../../../interfaces/globalModels';
import type {
  IList2,
  DataAadminUser,
  AdminUserHook,
  SeguridadSlice,
  UserCreate,
  keys_object,
} from '../interfaces';
import {
  get_tipo_documento,
  get_tipo_persona,
  get_tipo_usuario,
} from '../../../request';
import { roles_choise_adapter } from '../adapters/roles_adapters';
import {
  crear_user_admin_user,
  roles_request,
  update_user_admin_user,
} from '../request/seguridadRequest';
import { get_data_user } from '../store/thunks';
import dayjs from 'dayjs';
import { control_success, control_error } from '../../../helpers';
import { type AxiosError } from 'axios';
import { toast, type ToastContent } from 'react-toastify';
import type {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  SelectChangeEvent,
} from '@mui/material';
import { set_action_admin_users } from '../store';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error2 = (
  message: ToastContent = 'Algo pasó, intente de nuevo'
) =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

const activo_opt: IList[] = [
  { value: 'false', label: 'No' },
  { value: 'true', label: 'Si' },
];

const bloqueado_opt: IList[] = [
  { value: 'false', label: 'No' },
  { value: 'true', label: 'Si' },
];

export const initial_state_data_register: any = {
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
  persona_que_creo: '',
};

export const use_admin_users = (): AdminUserHook => {
  const dispatch = useDispatch();
  const [loading, set_loading] = useState<boolean>(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento_opt_all, set_tipo_documento_opt_all] = useState<
    IList[]
  >([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [numero_documento, set_numero_documento] = useState('');
  const [tipo_persona, set_tipo_persona] = useState('');
  const [tipo_persona_opt, set_tipo_persona_opt] = useState<IList[]>([]);
  const [roles_opt, set_roles_opt] = useState<IList2[]>([]);
  // const rol_fixed = [roles_opt[0]];
  // const [roles, set_roles] = useState<IList2[]>([...rol_fixed]);
  const [roles, set_roles] = useState<IList2[]>([]);
  const [tipo_usuario, set_tipo_usuario] = useState('');
  const [activo, set_activo] = useState<any>('');
  const [bloqueado, set_bloqueado] = useState<any>('');
  const [tipo_usuario_opt, set_tipo_usuario_opt] = useState<IList[]>([]);
  const [data_register, set_data_register] = useState<DataAadminUser>(
    initial_state_data_register
  );
  const [data_disponible, set_data_disponible] = useState<boolean>(false);
  const [loading_inputs, set_loading_inputs] = useState<boolean>(false);
  const { action_admin_users, data_person_search, user_info } = useSelector(
    (state: SeguridadSlice) => state.seguridad
  );
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
  const [valor_actual_user_is_blocked, set_valor_actual_user_is_blocked] =
    useState<boolean>();
  const [valor_actual_user_is_active, set_valor_actual_user_is_active] =
    useState<boolean>();
  // Mostrar modal usuarios por persona
  const [users_x_person_is_active, set_users_x_person_is_active] =
    useState<boolean>(false);
  const [loading_create_or_update, set_loading_create_or_update] =
    useState<boolean>(false);

  const {
    register: register_admin_user,
    handleSubmit: handle_submit_admin_user,
    setValue: set_value_admin_user,
    formState: { errors: errors_admin_users },
    watch: watch_admin_user,
    reset: reset_admin_user,
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

  const on_submit = handle_submit_admin_user(async (data_user) => {
    try {
      set_loading_create_or_update(true);
      if (action_admin_users === 'CREATE') {
        const data_create_user = new FormData();
        data_create_user.append(
          'nombre_de_usuario',
          data_user.nombre_de_usuario
        );
        data_create_user.append(
          'persona',
          data_person_search.id_persona.toString()
        );
        data_create_user.append('tipo_usuario', data_user.tipo_usuario);
        for (let i = 0; i < roles.length; i++) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          data_create_user.append('roles', `${roles[i].value}`);
        }
        data_create_user.append(
          'redirect_url',
          'http://localhost:3000/#/app/seguridad/administracion_usuarios'
        );
        data_create_user.append('profile_img', file_image ?? '');

        const { data } = await crear_user_admin_user(data_create_user);

        control_success(data.detail);
      } else if (action_admin_users === 'EDIT') {
        const data_update_user = new FormData();
        data_update_user.append('is_active', data_register.activo.toString());
        data_update_user.append(
          'is_blocked',
          data_register.bloqueado.toString()
        );
        data_update_user.append('tipo_usuario', data_register.tipo_usuario);
        for (let i = 0; i < roles.length; i++) {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          data_update_user.append('roles', `${roles[i].value}`);
        }
        data_update_user.append('profile_img', data_register.imagen_usuario);
        data_update_user.append(
          'justificacion_activacion',
          data_register.activo_justificacion_cambio ?? ''
        );
        data_update_user.append(
          'justificacion_bloqueo',
          data_register.bloqueado_justificacion_cambio ?? ''
        );

        // Actualización de usuario Persona Natural
        const { data } = await update_user_admin_user(
          user_info.id_usuario,
          data_update_user
        );
        control_success(data.detail);
      }
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as UserCreate;
      control_error2(resp.detail);
    } finally {
      set_loading_create_or_update(false);
    }
  });

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    value = name === 'nombre_de_usuario' ? value.replace(/\s/g, '') : value;
    set_data_register({
      ...data_register,
      [name]: value,
    });
    set_value_admin_user(name as keys_object, value);
  };

  const on_change = (e: SelectChangeEvent<string>): void => {
    switch (e.target.name) {
      case 'tipo_usuario':
        set_tipo_usuario(e.target.value);
        break;
      case 'activo':
        set_activo(e.target.value);
        if (
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${valor_actual_user_is_active}` !== e.target.value
        ) {
          set_check_user_is_active(false);
        } else {
          set_check_user_is_active(true);
        }
        break;
      case 'bloqueado':
        set_bloqueado(e.target.value);
        if (
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          `${valor_actual_user_is_blocked}` !== e.target.value
        ) {
          set_check_user_is_blocked(false);
        } else {
          set_check_user_is_blocked(true);
        }
        break;
    }
    set_value_form(e.target.name, e.target.value);
  };

  const handle_change_autocomplete = (
    event: React.SyntheticEvent<Element, Event>,
    value: IList2[],
    reason: AutocompleteChangeReason,
    details?: AutocompleteChangeDetails<IList2>
  ): void => {
    set_value_admin_user('roles', value);
    set_data_register({
      ...data_register,
      roles: value,
    });
    set_roles(value);
  };

  // Cambio inputs
  const handle_change = (e: React.ChangeEvent<HTMLInputElement>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  const handle_image_select = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    if (event.target.files?.[0] != null) {
      // Obtener el archivo seleccionado
      const file = event.target.files[0];
      set_file_image(file);

      // Crear un objeto FileReader
      const reader = new FileReader();
      // // Definir la función que se ejecuta cuando se completa la lectura del archivo
      reader.onload = (upload) => {
        // Obtener los datos de la imagen
        if (upload?.target != null) {
          set_selected_image(upload.target.result);
        }
      };
      // Leer el contenido del archivo como una URL de datos
      reader.readAsDataURL(file);
    } else {
      set_selected_image('');
    }
  };

  // Paso de datos a formulario para creacion de usuario persona Natural o Juridica
  useEffect(() => {
    set_check_user_is_active(true);
    set_check_user_is_blocked(true);
    if (data_person_search.id_persona !== 0) {
      set_tipo_documento(data_person_search.tipo_documento);
      set_numero_documento(data_person_search.numero_documento);
      set_roles(roles_choise_adapter(user_info.roles));
      set_selected_image(user_info.profile_img);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const activoo = data_register.activo
      set_activo(activoo);
      set_valor_actual_user_is_active(data_register.activo);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const bloqueadoo = data_register.bloqueado
      set_bloqueado(bloqueadoo);
      set_valor_actual_user_is_blocked(data_register.bloqueado);

      if (data_person_search.tipo_persona === 'N') {
        // set_tipo_usuario('');
        set_data_register({
          ...data_register,
          primer_nombre: data_person_search.primer_nombre,
          segundo_nombre: data_person_search.segundo_nombre,
          primer_apellido: data_person_search.primer_apellido,
          segundo_apellido: data_person_search.segundo_apellido,
          nombre_de_usuario: '',
          tipo_usuario: '',
        });
        set_value_admin_user('primer_nombre', data_person_search.primer_nombre);
        set_value_admin_user(
          'segundo_nombre',
          data_person_search.segundo_nombre
        );
        set_value_admin_user(
          'primer_apellido',
          data_person_search.primer_apellido
        );
        set_value_admin_user(
          'segundo_apellido',
          data_person_search.segundo_apellido
        );
        set_value_admin_user('nombre_de_usuario', '');
        set_value_admin_user('tipo_usuario', '');
      } else if (data_person_search.tipo_persona === 'J') {
        set_roles([{ value: 2, label: 'Rol Usuarios Web' }]);
        set_data_register({
          ...data_register,
          razon_social: data_person_search.razon_social,
          nombre_comercial: data_person_search.nombre_comercial,
          nombre_de_usuario: '',
          tipo_usuario: 'E',
        });
        set_value_admin_user('razon_social', data_person_search.razon_social);
        set_value_admin_user(
          'nombre_comercial',
          data_person_search.nombre_comercial
        );
        set_value_admin_user('nombre_de_usuario', '');
        set_value_admin_user('tipo_usuario', 'E');
      }
      if (data_person_search.usuarios.length === 1) {
        dispatch(get_data_user(data_person_search.usuarios[0].id_usuario));
      } else if (data_person_search.usuarios.length === 2) {
        // Disparar modal con los 2 usuarios disponibles
        set_users_x_person_is_active(true);
      }
      set_tipo_persona(data_person_search.tipo_persona);
      set_loading_inputs(false);
      dispatch(set_action_admin_users('CREATE'));
      set_data_disponible(true);
    }
  }, [data_person_search]);

  // Paso de datos a formulario para edición de usuario persona natural
  useEffect(() => {
    set_check_user_is_active(true);
    set_check_user_is_blocked(true);
    if (user_info.id_usuario !== 0) {
      set_tipo_documento(user_info.tipo_documento);
      set_numero_documento(user_info.numero_documento);
      set_roles(roles_choise_adapter(user_info.roles));
      set_selected_image(user_info.profile_img);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const activoo = data_register.activo
      set_activo(activoo);
      set_valor_actual_user_is_active(data_register.activo);
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const bloqueadoo = data_register.bloqueado
      set_bloqueado(bloqueadoo);
      set_valor_actual_user_is_blocked(data_register.bloqueado);
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
        activo_fecha_ultimo_cambio:
          user_info.fecha_ultimo_cambio_activacion !== null
            ? dayjs(user_info.fecha_ultimo_cambio_activacion).format(
                'DD-MM-YYYY'
              )
            : 'No disponible',
        activo_justificacion_cambio:
          user_info.justificacion_ultimo_cambio_activacion,
        bloqueado: user_info.is_blocked,
        bloqueado_fecha_ultimo_cambio:
          user_info.fecha_ultimo_cambio_bloqueo !== null
            ? dayjs(user_info.fecha_ultimo_cambio_bloqueo).format('DD-MM-YYYY')
            : 'No disponible',
        bloqueado_justificacion_cambio:
          user_info.justificacion_ultimo_cambio_bloqueo,
        fecha_creacion:
          user_info.created_at !== null
            ? dayjs(user_info.created_at).format('DD-MM-YYYY')
            : 'No disponible',
        fecha_activación_inicial:
          user_info.activated_at !== null
            ? dayjs(user_info.activated_at).format('DD-MM-YYYY')
            : 'No disponible',
        creado_desde_portal: user_info.creado_por_portal,
        persona_que_creo: `${user_info.primer_nombre_usuario_creador ?? ''} ${
          user_info.primer_apellido_usuario_creador ?? ''
        }`,
      });
      set_value_admin_user('tipo_documento', user_info.tipo_documento);
      set_value_admin_user('numero_documento', user_info.numero_documento);
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
        user_info.fecha_ultimo_cambio_activacion !== null
          ? dayjs(user_info.fecha_ultimo_cambio_activacion).format('DD-MM-YYYY')
          : 'No disponible'
      );
      set_value_admin_user(
        'activo_justificacion_cambio',
        user_info.justificacion_ultimo_cambio_activacion
      );
      set_value_admin_user('bloqueado', user_info.is_blocked);
      set_value_admin_user(
        'bloqueado_fecha_ultimo_cambio',
        user_info.fecha_ultimo_cambio_bloqueo !== null
          ? dayjs(user_info.fecha_ultimo_cambio_bloqueo).format('DD-MM-YYYY')
          : 'No disponible'
      );
      set_value_admin_user(
        'bloqueado_justificacion_cambio',
        user_info.justificacion_ultimo_cambio_bloqueo
      );
      set_value_admin_user(
        'fecha_creacion',
        user_info.created_at !== null
          ? dayjs(user_info.created_at).format('DD-MM-YYYY')
          : 'No disponible'
      );
      set_value_admin_user(
        'fecha_activación_inicial',
        user_info.activated_at !== null
          ? dayjs(user_info.activated_at).format('DD-MM-YYYY')
          : 'No disponible'
      );
      set_value_admin_user('creado_desde_portal', user_info.creado_por_portal);
      set_value_admin_user(
        'persona_que_creo',
        `${user_info.primer_nombre_usuario_creador ?? ''} ${
          user_info.primer_apellido_usuario_creador ?? ''
        }`
      );

      set_tipo_persona(user_info.tipo_persona);
      set_data_disponible(true);
      dispatch(set_action_admin_users('EDIT'));
    }
  }, [user_info]);

  useEffect(() => {
    if (tipo_persona === 'N') {
      set_tipo_documento_opt(
        tipo_documento_opt_all.filter((e) => String(e.value) !== 'NT')
      );
    } else {
      set_tipo_documento_opt(tipo_documento_opt_all);
    }
  }, [tipo_persona]);

  useEffect(() => {
    void get_selects_options();
  }, []);

  useEffect(() => {
    set_value_form('tipo_documento', tipo_documento);
  }, [tipo_documento]);

  useEffect(() => {
    if (watch_admin_user('tipo_documento') !== undefined) {
      set_tipo_documento(watch_admin_user('tipo_documento'));
    }
  }, [watch_admin_user('tipo_documento')]);

  useEffect(() => {
    if (watch_admin_user('tipo_usuario') !== undefined) {
      set_tipo_usuario(watch_admin_user('tipo_usuario'));
    }
  }, [watch_admin_user('tipo_usuario')]);

  const clean_user_info = (): void => {
    reset_admin_user(initial_state_data_register);
    set_tipo_persona('N');
    set_tipo_documento('NT');
    set_numero_documento('');
    set_tipo_usuario('U');
    set_activo('');
    set_bloqueado('');
    set_roles([]);
    set_data_disponible(false);
    set_historial_cambios_estado_is_active(false);
    set_users_x_person_is_active(false);
    dispatch(set_action_admin_users('NEW'));
  };

  return {
    errors_admin_users,
    action_admin_users,
    user_info,
    loading_create_or_update,
    loading_inputs,
    selected_image,
    check_user_is_active,
    check_user_is_blocked,
    data_disponible,
    historial_cambios_estado_is_active,
    data_register,
    loading,
    tipo_persona,
    tipo_usuario_opt,
    tipo_usuario,
    activo,
    activo_opt,
    bloqueado,
    bloqueado_opt,
    roles,
    roles_opt,
    users_x_person_is_active,
    tipo_documento_opt,
    tipo_documento,
    numero_documento,
    tipo_persona_opt,
    // rol_fixed,
    set_historial_cambios_estado_is_active,
    set_numero_documento,
    set_users_x_person_is_active,
    on_submit,
    on_change,
    handle_change_autocomplete,
    handle_change,
    handle_image_select,
    register_admin_user,
    set_data_register,
    set_tipo_documento,
    set_tipo_persona,
    set_data_disponible,
    set_loading_inputs,
    reset_admin_user,
    clean_user_info,
  };
};

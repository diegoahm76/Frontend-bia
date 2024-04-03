import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import {
  get_ciudades,
  get_departamentos,
  get_naturaleza_emp,
  get_paises,
  get_person_by_document,
  get_tipo_documento,
} from '../../../request';
import {
  control_success,
  validate_password,
} from '../../../helpers';
import type { IList, ResponseServer } from '../../../interfaces/globalModels';
import type {
  FieldValues,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { crear_persona_juridica_and_user } from '../request/authRequest';
import type { DataRegisterPersonaJ, keys_object } from '../interfaces';
import type { AxiosError } from 'axios';
import type { SelectChangeEvent } from '@mui/material';
import { control_error } from '../../gestorDocumental/ccd/store/utils/success_errors';
import { DEFAULT_AUTH_URL_BETA, DEFAULT_AUTH_URL_PROD } from '../../../api/axios';

interface RegisterPersonHook {
  error_email: boolean;
  error_phone: boolean;
  error_password: boolean;
  is_saving: boolean;
  loading: boolean;
  is_modal_active: boolean;
  show_password: boolean;
  is_search: boolean;
  paises_options: IList[];
  dpto_notifiacion_opt: IList[];
  naturaleza_empresa_opt: IList[];
  ciudad_notificacion_opt: IList[];
  tipo_documento_opt: IList[];
  tipo_documento_opt_all: IList[];
  message_error_password: string;
  nacionalidad_empresa: string;
  naturaleza_empresa: string;
  dpto_notifiacion: string;
  ciudad_notificacion: string;
  direccion_notificaciones: string;
  pais_laboral: string;
  tipo_documento: string;
  tipo_documento_representante: string;
  documento_representante: string;
  message_no_person: string;
  nombre_presentante: string;
  set_nacionalidad_empresa: Dispatch<SetStateAction<string>>;
  set_dpto_notifiacion: Dispatch<SetStateAction<string>>;
  set_ciudad_notificacion: Dispatch<SetStateAction<string>>;
  handle_click_show_password: () => void;
  on_change: (e: SelectChangeEvent<string>) => void;
  set_value_direction: (value: string, type: string) => void;
  on_submit: (values: FieldValues) => Promise<void>;
  open_modal: Dispatch<SetStateAction<boolean>>;
  validate_exits_representante: (data: FieldValues) => Promise<void>;
}

type options = 'inicial' | 'residencia' | 'notificacion' | 'laboral';

interface Props {
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const use_register_persona_j = ({
  watch,
  setValue: set_value,
}: Props): RegisterPersonHook => {
  const [is_modal_active, open_modal] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [loading, set_loading] = useState(false);
  const [error_email, set_error_email] = useState(false);
  const [error_phone, set_error_error_phone] = useState(false);
  const [error_password, set_error_password] = useState(false);
  const [show_password, set_show_password] = useState(false);
  const [message_error_password, set_message_error_password] = useState('');
  const [paises_options, set_paises_options] = useState<IList[]>([]);
  const [dpto_notifiacion_opt, set_dpto_notifiacion_opt] = useState<IList[]>(
    []
  );
  const [naturaleza_empresa_opt, set_naturaleza_emp_opt] = useState<IList[]>(
    []
  );
  const [ciudad_notificacion_opt, set_ciudad_notificacion_opt] = useState<
    IList[]
  >([]);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento_opt_all, set_tipo_documento_opt_all] = useState<
    IList[]
  >([]);
  const [nacionalidad_empresa, set_nacionalidad_empresa] = useState('');
  const [naturaleza_empresa, set_naturaleza_empresa] = useState('');
  const [dpto_notifiacion, set_dpto_notifiacion] = useState('');
  const [ciudad_notificacion, set_ciudad_notificacion] = useState('');
  const [pais_laboral, set_pais_laboral] = useState('');
  const [message_no_person, set_message_no_person] = useState('');

  const email = watch('email') ?? '';
  const confirmar_email = watch('confirmar_email') ?? '';
  const telefono_celular = watch('telefono_celular') ?? '';
  const confirmar_celular = watch('confirmar_celular') ?? '';
  const password = watch('password') ?? '';
  const confirmar_password = watch('confirmar_password') ?? '';
  const direccion_notificaciones = watch('direccion_notificaciones') ?? '';
  const tipo_documento = watch('tipo_documento') ?? '';
  const tipo_documento_representante =
    watch('tipo_documento_representante') ?? '';
  const documento_representante = watch('documento_representante') ?? '';
  const nombre_presentante = watch('nombre_representante_legal') ?? '';

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_paises },
      } = await get_paises();
      set_paises_options(res_paises ?? []);

      void get_departamentos_por_pais('notificacion', 'CO');

      const {
        data: { data: naturaleza },
      } = await get_naturaleza_emp();
      set_naturaleza_emp_opt(naturaleza);

      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(
        res_tipo_documento.filter((e) => e.value !== 'NT') ?? []
      );
      set_tipo_documento_opt_all(res_tipo_documento ?? []);
    } catch (err) {
      control_error('Error al obtener los datos para el registro');
      // control_error(err?.detail);
    } finally {
      set_loading(false);
    }
  };

  // Valida si la persona a registrar ya esta registrada en el sistema para ser usada como representante legal
  const validate_exits_representante: (
    data: FieldValues
  ) => Promise<void> = async ({
    tipo_documento_representante,
    documento_representante,
  }): Promise<void> => {
    set_is_search(true);
    set_message_no_person('');
    try {
      const {
        data: { data },
      } = await get_person_by_document(
        tipo_documento_representante,
        documento_representante
      );

      if (data !== null && data !== undefined) {
        if (data.id_persona !== 0) {
          set_value('representante_legal', data.id_persona);
          set_value('nombre_representante_legal', data.nombre_completo);
          control_success('Se ha encontrado la persona')
          return;
        }
      }
      control_error(
        'No existe ninguna persona registrada con esta cédula'
      );
    } catch (error) {
      /* control_error(error?.detail) ; */

      control_error(
        'No existe ninguna persona que coincida'
      );
    } finally {
      set_is_search(false);
    }
  };

  // Obtiene los departamentos por pais para el select lugar expedición
  const get_departamentos_por_pais = async (
    type: options = 'inicial',
    pais: string
  ): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data },
      } = await get_departamentos(pais);

      switch (type) {
        case 'notificacion':
          set_dpto_notifiacion_opt(data ?? []);
          break;
      }
    } catch (error) {
      control_error('Error al obtener los departamentos')
      // control_error(error);
    } finally {
      set_loading(false);
    }
  };

  const get_ciudades_opt = async (
    type: options = 'inicial',
    departamento: string
  ): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data },
      } = await get_ciudades(departamento);

      switch (type) {
        case 'notificacion':
          set_ciudad_notificacion_opt(data ?? []);
          break;
      }
    } catch (error) {
      control_error('Error al obtener las ciudades')
      // control_error(error);
    } finally {
      set_loading(false);
    }
  };

  const on_submit = async (values: FieldValues): Promise<void> => {
    set_is_saving(true);
    //  console.log('')('first');
    try {
      values.redirect_url =
        (process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_AUTH_URL_BETA || `${DEFAULT_AUTH_URL_BETA}`
          : process.env.REACT_APP_AUTH_URL_PROD || `${DEFAULT_AUTH_URL_PROD}`
        ) + '/auth/activacion_cuenta';
      values.telefono_celular = `57${values.telefono_celular as string}`;
      const { data } = await crear_persona_juridica_and_user(
        values as DataRegisterPersonaJ
      );
      control_success(data.detail);
      window.location.href = '#/app/auth/login';
      // const is_send = false;
      // if (is_send) {
      // }
    } catch (error) {
      const temp_error = error as AxiosError;
      const resp = temp_error.response?.data as ResponseServer<any>;
      control_error(resp.detail);
    } finally {
      set_is_saving(false);
    }
  };

  const handle_click_show_password = (): void => {
    set_show_password((show) => !show);
  };

  // Establece la dirección generada en el generador de direcciones
  const set_value_direction = (value: string, type: string): void => {
    // direccion_laboral
    // direccion_notificaciones
    // direccion_residencia_ref
    // direccion_residencia
    switch (type) {
      case 'notificacion':
        set_value_form('direccion_notificaciones', value);
        break;
    }
    open_modal(false);
  };

  // Establece los valores del formulario
  const set_value_form = (name: string, value: string): void => {
    set_value(name as keys_object, value);
  };

  // Se usa para escuchar los cambios de valor del componente CustomSelect
  const on_change = (e: SelectChangeEvent<string>): void => {
    set_value_form(e.target.name, e.target.value);
  };

  // USEEFECTS
  useEffect(() => {
    void get_selects_options();
  }, []);

  useEffect(() => {
    if (watch('cod_pais_nacionalidad_empresa') !== undefined) {
      set_nacionalidad_empresa(watch('cod_pais_nacionalidad_empresa'));
    }
  }, [watch('cod_pais_nacionalidad_empresa')]);

  useEffect(() => {
    if (watch('cod_naturaleza_empresa') !== undefined) {
      set_naturaleza_empresa(watch('cod_naturaleza_empresa'));
    }
  }, [watch('cod_naturaleza_empresa')]);

  useEffect(() => {
    if (watch('dpto_notifiacion') !== undefined) {
      set_dpto_notifiacion(watch('dpto_notifiacion'));
    }
  }, [watch('dpto_notifiacion')]);

  useEffect(() => {
    if (watch('cod_departamento_notificacion') !== undefined) {
      set_dpto_notifiacion(watch('cod_departamento_notificacion'));
    }
  }, [watch('cod_departamento_notificacion')]);

  useEffect(() => {
    if (watch('cod_municipio_notificacion_nal') !== undefined) {
      set_ciudad_notificacion(watch('cod_municipio_notificacion_nal'));
    }
  }, [watch('cod_municipio_notificacion_nal')]);

  useEffect(() => {
    if (watch('pais_laboral') !== undefined) {
      set_pais_laboral(watch('pais_laboral'));
    }
  }, [watch('pais_laboral')]);

  useEffect(() => {
    if (email !== confirmar_email) {
      set_error_email(true);
      return;
    }
    set_error_email(false);
  }, [email, confirmar_email]);

  useEffect(() => {
    if (telefono_celular !== confirmar_celular) {
      set_error_error_phone(true);
      return;
    }
    set_error_error_phone(false);
  }, [telefono_celular, confirmar_celular]);

  useEffect(() => {
    if (password !== confirmar_password) {
      set_message_error_password('Las contraseñas no son iguales');
      set_error_password(true);
      return;
    }
    if (password !== undefined && password !== '') {
      if (!validate_password(password)) {
        set_error_password(true);
        set_message_error_password(
          'La contraseña no cumple con el formato requerido'
        );
        return;
      }
    }
    set_error_password(false);
  }, [password, confirmar_password]);

  useEffect(() => {
    void get_ciudades_opt('notificacion', dpto_notifiacion);
  }, [dpto_notifiacion]);

  return {
    is_saving,
    loading,
    error_email,
    error_phone,
    error_password,
    show_password,
    is_modal_active,
    ciudad_notificacion_opt,
    paises_options,
    dpto_notifiacion_opt,
    naturaleza_empresa_opt,
    message_error_password,
    nacionalidad_empresa,
    naturaleza_empresa,
    dpto_notifiacion,
    ciudad_notificacion,
    direccion_notificaciones,
    pais_laboral,
    tipo_documento_opt,
    tipo_documento_opt_all,
    tipo_documento,
    tipo_documento_representante,
    documento_representante,
    message_no_person,
    is_search,
    nombre_presentante,
    set_nacionalidad_empresa,
    set_dpto_notifiacion,
    set_ciudad_notificacion,
    validate_exits_representante,
    handle_click_show_password,
    set_value_direction,
    on_submit,
    on_change,
    open_modal,
  };
};

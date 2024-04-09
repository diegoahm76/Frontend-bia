import { useState, useEffect, type Dispatch, type SetStateAction } from 'react';
import {
  get_ciudades,
  get_departamentos,
  get_estado_civil,
  get_generos,
  get_paises,
} from '../../../request';
import {
  control_error,
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
import { crear_persona_natural_and_user } from '../request/authRequest';
import type { DataRegisterPersonaN, keys_object } from '../interfaces';
import type { AxiosError } from 'axios';
import type { SelectChangeEvent } from '@mui/material';
import {
  DEFAULT_AUTH_URL_BETA,
  DEFAULT_AUTH_URL_PROD,
} from '../../../api/axios';

interface RegisterPersonHook {
  error_email: boolean;
  error_phone: boolean;
  error_password: boolean;
  is_saving: boolean;
  loading: boolean;
  is_modal_active: boolean;
  show_password: boolean;
  paises_options: IList[];
  departamentos_opt: IList[];
  dpto_notifiacion_opt: IList[];
  dpts_residencia_opt: IList[];
  dpto_laboral_opt: IList[];
  genero_opt: IList[];
  estado_civil_opt: IList[];
  ciudades_opt: IList[];
  ciudades_residencia_opt: IList[];
  ciudad_notificacion_opt: IList[];
  departamento_laboral_opt: IList[];
  message_error_password: string;
  genero: string;
  estado_civil: string;
  pais_nacimiento: string;
  ciudad_expedicion: string;
  pais_residencia: string;
  departamento_residencia: string;
  municipio_residencia: string;
  dpto_notifiacion: string;
  ciudad_notificacion: string;
  departamento_expedicion: string;
  direccion_notificaciones: string;
  pais_laboral: string;
  departamento_laboral: string;
  municipio_laboral: string;
  direccion: string;
  direccion_laboral: string;
  handle_click_show_password: () => void;
  on_change: (e: SelectChangeEvent<string>) => void;
  set_value_direction: (value: string, type: string) => void;
  on_submit: (values: FieldValues) => Promise<void>;
  open_modal: Dispatch<SetStateAction<boolean>>;
}

type options = 'inicial' | 'residencia' | 'notificacion' | 'laboral';

interface Props {
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
  getValues: UseFormGetValues<FieldValues>;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const use_register_persona_n = ({
  watch,
  setValue: set_value,
  getValues: get_values,
}: Props): RegisterPersonHook => {
  const [is_modal_active, open_modal] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [loading, set_loading] = useState(false);
  const [error_email, set_error_email] = useState(false);
  const [error_phone, set_error_error_phone] = useState(false);
  const [error_password, set_error_password] = useState(false);
  const [show_password, set_show_password] = useState(false);
  const [message_error_password, set_message_error_password] = useState('');
  const [paises_options, set_paises_options] = useState<IList[]>([]);
  const [departamentos_opt, set_departamentos_opt] = useState<IList[]>([]);
  const [dpto_notifiacion_opt, set_dpto_notifiacion_opt] = useState<IList[]>(
    []
  );
  const [dpto_laboral_opt, set_dpto_laboral_opt] = useState<IList[]>([]);
  const [dpts_residencia_opt, set_dpto_residencia_opt] = useState<IList[]>([]);
  const [genero_opt, set_genero_opt] = useState<IList[]>([]);
  const [estado_civil_opt, set_estado_civil_opt] = useState<IList[]>([]);
  const [ciudades_opt, set_ciudades_opt] = useState<IList[]>([]);
  const [ciudades_residencia_opt, set_ciudades_residencia_opt] = useState<
    IList[]
  >([]);
  const [ciudad_notificacion_opt, set_ciudad_notificacion_opt] = useState<
    IList[]
  >([]);
  const [departamento_laboral_opt, set_departamento_laboral_opt] = useState<
    IList[]
  >([]);
  // const [direccion, set_direccion] = useState('');
  // const [direccion_laboral, set_direccion_laboral] = useState('');

  const departamento_expedicion = watch('departamento_expedicion') ?? '';
  const ciudad_expedicion = watch('cod_municipio_expedicion_id') ?? '';
  const pais_residencia = watch('pais_residencia') ?? '';
  const departamento_residencia = watch('departamento_residencia') ?? '';
  const municipio_residencia = watch('municipio_residencia') ?? '';
  const dpto_notifiacion = watch('dpto_notifiacion') ?? '';
  const ciudad_notificacion = watch('cod_municipio_notificacion_nal') ?? '';
  const pais_laboral = watch('pais_laboral') ?? '';
  const departamento_laboral = watch('departamento_laboral') ?? '';
  const municipio_laboral = watch('cod_municipio_laboral_nal') ?? '';
  const pais_nacimiento = watch('pais_nacimiento') ?? '';
  const genero = watch('sexo') ?? '';
  const estado_civil = watch('estado_civil') ?? '';
  const email = watch('email') ?? '';
  const confirmar_email = watch('confirmar_email') ?? '';
  const telefono_celular = watch('telefono_celular') ?? '';
  const confirmar_celular = watch('confirmar_celular') ?? '';
  const password = watch('password') ?? '';
  const confirmar_password = watch('confirmar_password') ?? '';
  const direccion_notificaciones = watch('direccion_notificaciones') ?? '';
  const direccion_laboral = watch('direccion_laboral') ?? '';
  const direccion = watch('direccion_residencia') ?? '';

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_paises },
      } = await get_paises();
      set_paises_options(res_paises ?? []);

      const generos = await get_generos();
      set_genero_opt(generos);

      const {
        data: { data: estado_civil },
      } = await get_estado_civil();
      set_estado_civil_opt(estado_civil);

      void get_departamentos_por_pais('notificacion', 'CO');
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
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
        case 'inicial':
          set_departamentos_opt(data ?? []);
          break;

        case 'residencia':
          set_dpto_residencia_opt(data ?? []);
          break;

        case 'notificacion':
          set_dpto_notifiacion_opt(data ?? []);
          break;
        case 'laboral':
          set_dpto_laboral_opt(data ?? []);
          break;
      }
    } catch (error) {
      control_error(error);
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
        case 'inicial':
          set_ciudades_opt(data ?? []);
          break;

        case 'residencia':
          set_ciudades_residencia_opt(data ?? []);
          break;

        case 'notificacion':
          set_ciudad_notificacion_opt(data ?? []);
          break;

        case 'laboral':
          set_departamento_laboral_opt(data ?? []);
          break;
      }
    } catch (error) {
      control_error(error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    void get_ciudades_opt('inicial', departamento_expedicion);
  }, [departamento_expedicion]);

  const on_submit = async (values: FieldValues): Promise<void> => {
    set_is_saving(true);
    try {
      values.redirect_url =
        (process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_AUTH_URL_BETA || `${DEFAULT_AUTH_URL_BETA}`
          : process.env.REACT_APP_AUTH_URL_PROD || `${DEFAULT_AUTH_URL_PROD}`
        ) + '/auth/activacion_cuenta';
      values.telefono_celular = `+57${values.telefono_celular as string}`;
      const { data } = await crear_persona_natural_and_user(
        values as DataRegisterPersonaN
      );
      control_success(data.detail);

      window.location.href = '#/app/auth/login';
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
      case 'residencia':
        // set_direccion(value);
        set_value_form('direccion_residencia', value);

        break;
      case 'notificacion':
        set_value_form('direccion_notificaciones', value);
        break;
      case 'laboral':
        set_value_form('direccion_laboral', value);
        // set_direccion_laboral(value);
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
    void get_departamentos_por_pais('inicial', pais_nacimiento);
  }, [pais_nacimiento]);

  useEffect(() => {
    void get_departamentos_por_pais('residencia', pais_residencia);
  }, [pais_residencia]);

  useEffect(() => {
    void get_departamentos_por_pais('laboral', pais_residencia);
  }, [pais_laboral]);

  useEffect(() => {
    void get_ciudades_opt('inicial', departamento_expedicion);
  }, [departamento_expedicion]);

  useEffect(() => {
    void get_ciudades_opt('residencia', departamento_residencia);
  }, [departamento_residencia]);

  useEffect(() => {
    void get_ciudades_opt('laboral', departamento_laboral);
  }, [departamento_laboral]);

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
    ciudades_residencia_opt,
    ciudad_notificacion_opt,
    paises_options,
    departamentos_opt,
    dpto_notifiacion_opt,
    dpts_residencia_opt,
    genero_opt,
    estado_civil_opt,
    ciudades_opt,
    message_error_password,
    genero,
    estado_civil,
    pais_nacimiento,
    ciudad_expedicion,
    pais_residencia,
    departamento_residencia,
    municipio_residencia,
    dpto_notifiacion,
    ciudad_notificacion,
    departamento_expedicion,
    direccion_notificaciones,
    pais_laboral,
    departamento_laboral,
    municipio_laboral,
    dpto_laboral_opt,
    departamento_laboral_opt,
    direccion,
    direccion_laboral,
    handle_click_show_password,
    set_value_direction,
    on_submit,
    on_change,
    open_modal,
  };
};

import { useState, useEffect } from 'react';
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
import type { DataRegisterPersonaN } from '../interfaces';
import type { AxiosError } from 'axios';

interface RegisterPersonHook {
  error_email: boolean;
  error_phone: boolean;
  error_password: boolean;
  is_saving: boolean;
  loading: boolean;
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
  handle_click_show_password: () => void;
  on_submit: (values: FieldValues) => Promise<void>;
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
  const [pais_nacimiento, set_pais_nacimiento] = useState('');
  const [genero, set_genero] = useState('');
  const [estado_civil, set_estado_civil] = useState('');
  const [departamento_expedicion, set_departamento_expedicion] = useState('');
  const [ciudad_expedicion, set_ciudad_expedicion] = useState('');
  const [pais_residencia, set_pais_residencia] = useState('');
  const [departamento_residencia, set_departamento_residencia] = useState('');
  const [municipio_residencia, set_municipio_residencia] = useState('');
  const [dpto_notifiacion, set_dpto_notifiacion] = useState('');
  const [ciudad_notificacion, set_ciudad_notificacion] = useState('');
  const [pais_laboral, set_pais_laboral] = useState('');
  const [departamento_laboral, set_departamento_laboral] = useState('');
  const [municipio_laboral, set_municipio_laboral] = useState('');

  const email = watch('email') ?? '';
  const confirmar_email = watch('confirmar_email') ?? '';
  const telefono_celular = watch('telefono_celular') ?? '';
  const confirmar_celular = watch('confirmar_celular') ?? '';
  const password = watch('password') ?? '';
  const confirmar_password = watch('confirmar_password') ?? '';
  const direccion_notificaciones = watch('direccion_notificaciones') ?? '';

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
        'https://macareniafrontendevelopv2.netlify.app/#/auth/activacion_cuenta';
      const is_send = false;
      if (is_send) {
        const { data } = await crear_persona_natural_and_user(
          values as DataRegisterPersonaN
        );
        control_success(data.detail);

        // window.location.href = '#/app/auth/login';
      }
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

  // USEEFECTS
  useEffect(() => {
    void get_selects_options();
  }, []);

  useEffect(() => {
    if (watch('pais_nacimiento') !== undefined) {
      set_pais_nacimiento(watch('pais_nacimiento'));
    }
  }, [watch('pais_nacimiento')]);

  useEffect(() => {
    if (watch('sexo') !== undefined) {
      set_genero(watch('sexo'));
    }
  }, [watch('sexo')]);

  useEffect(() => {
    if (watch('estado_civil') !== undefined) {
      set_estado_civil(watch('estado_civil'));
    }
  }, [watch('estado_civil')]);

  useEffect(() => {
    if (watch('departamento_expedicion') !== undefined) {
      set_departamento_expedicion(watch('departamento_expedicion'));
    }
  }, [watch('departamento_expedicion')]);

  useEffect(() => {
    if (watch('cod_municipio_expedicion_id') !== undefined) {
      set_ciudad_expedicion(watch('cod_municipio_expedicion_id'));
    }
  }, [watch('cod_municipio_expedicion_id')]);

  useEffect(() => {
    if (watch('pais_residencia') !== undefined) {
      set_pais_residencia(watch('pais_residencia'));
    }
  }, [watch('pais_residencia')]);

  useEffect(() => {
    if (watch('departamento_residencia') !== undefined) {
      set_departamento_residencia(watch('departamento_residencia'));
    }
  }, [watch('departamento_residencia')]);

  useEffect(() => {
    if (watch('municipio_residencia') !== undefined) {
      set_municipio_residencia(watch('municipio_residencia'));
    }
  }, [watch('municipio_residencia')]);

  useEffect(() => {
    if (watch('dpto_notifiacion') !== undefined) {
      set_dpto_notifiacion(watch('dpto_notifiacion'));
    }
  }, [watch('dpto_notifiacion')]);

  useEffect(() => {
    if (watch('cod_municipio_notificacion_nal') !== undefined) {
      set_ciudad_notificacion(watch('cod_municipio_notificacion_nal'));
    }
  }, [watch('cod_municipio_notificacion_nal')]);

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
    if (watch('departamento_laboral') !== undefined) {
      set_departamento_laboral(watch('departamento_laboral'));
    }
  }, [watch('departamento_laboral')]);

  useEffect(() => {
    if (watch('cod_municipio_laboral_nal') !== undefined) {
      set_municipio_laboral(watch('cod_municipio_laboral_nal'));
    }
  }, [watch('cod_municipio_laboral_nal')]);

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
    handle_click_show_password,
    on_submit,
  };
};

import { type ChangeEvent, useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import { get_person_by_document } from '../request/authRequest';
import type { IList } from '../../../interfaces/globalModels';
import type {
  DataRegistePortal,
  // keys_object,
  ReisterHook,
  keys_object,
} from '../interfaces';
import { type Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  get_ciudades,
  get_departamentos,
  get_estado_civil,
  get_generos,
  get_naturaleza_emp,
  get_paises,
  get_tipo_documento,
  get_tipo_persona,
} from '../../../request/';

type options = 'inicial' | 'residencia' | 'notificacion';

export const use_register = (): ReisterHook => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { setValue } = useForm();
  const [ciudad_expedicion, set_ciudad_expedicion] = useState('');
  const [numero_documento, set_numero_documento] = useState('');
  const [ciudad_notificacion_opt, set_ciudad_notificacion_opt] = useState<
    IList[]
  >([]);
  const [ciudad_notificacion, set_ciudad_notificacion] = useState('');
  const [ciudad_residencia, set_ciudad_residencia] = useState('');
  const [nombre_representante, set_nombre_representante] = useState('');
  const [documento_rep, set_documento_rep] = useState('');
  const [ciudades_opt, set_ciudades_opt] = useState<IList[]>([]);
  const [ciudades_residencia_opt, set_ciudades_residencia_opt] = useState<
    IList[]
  >([]);
  const [departamento_expedicion, set_departamento] = useState('');
  const [departamento_residencia, set_dpto_residencia] = useState('');
  const [departamentos_opt, set_departamentos_opt] = useState<IList[]>([]);
  const [dpto_notifiacion_opt, set_dpto_notifiacion_opt] = useState<IList[]>(
    []
  );
  const [dpto_notifiacion, set_dpto_notifiacion] = useState('');
  const [naturaleza_emp, set_naturaleza_emp] = useState('');
  const [nacionalidad_emp, set_nacionalidad_emp] = useState('');
  const [dpts_residencia_opt, set_dpto_residencia_opt] = useState<IList[]>([]);
  const [error_email, set_error_email] = useState(false);
  const [error_password, set_error_password] = useState(false);
  const [error_phone, set_error_error_phone] = useState(false);
  const [estado_civil_opt, set_estado_civil_opt] = useState<IList[]>([]);
  const [estado_civil, set_estado_civil] = useState('');
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  const [fecha_rep_legal, set_fecha_rep_legal] = useState<Dayjs | null>(null);
  const [genero_opt, set_genero_opt] = useState<IList[]>([]);
  const [naturaleza_emp_opt, set_naturaleza_emp_opt] = useState<IList[]>([]);
  const [genero, set_genero] = useState('');
  const [has_user, set_has_user] = useState(false);
  const [is_exists, set_is_exists] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [loading, set_loading] = useState<boolean>(false);
  const [message_error_password, set_message_error_password] = useState('');
  const [pais_nacimiento, set_pais_nacimiento] = useState('');
  const [tipo_documento_rep, set_tipo_documento_rep] = useState('');
  const [pais_notificacion, set_pais_notificacion] = useState('');
  const [pais_residencia, set_pais_residencia] = useState('');
  const [paises_options, set_paises_options] = useState<IList[]>([]);
  const [requiere_nombre_comercial, set_requiere_nombre_comercial] =
    useState(false);
  const [show_password, set_show_password] = useState(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento_opt_all, set_tipo_documento_opt_all] = useState<
    IList[]
  >([]);
  const [tipo_documento, set_tipo_documento] = useState('');
  const [tipo_persona_opt, set_tipo_persona_opt] = useState<IList[]>([]);
  const [tipo_persona, set_tipo_persona] = useState('');
  const [data_register, set_data_register] = useState<DataRegistePortal>({
    cod_naturaleza_empresa: '',
    cod_pais_nacionalidad_empresa: '',
    telefono_empresa: '',
    fecha_inicio_cargo_rep_legal: '',
    direccion_notificacion_referencia: '',
    acepta_notificacion_email: false,
    acepta_notificacion_sms: false,
    acepta_tratamiento_datos: false,
    cod_municipio_expedicion_id: '',
    cod_municipio_laboral_nal: '',
    cod_municipio_notificacion_nal: '',
    confirmar_celular: '',
    confirmar_email: '',
    departamento_expedicion: '',
    departamento_nacimiento: '',
    departamento_residencia: '',
    digito_verificacion: '',
    direccion_laboral: '',
    direccion_notificaciones: '',
    direccion_residencia_ref: '',
    direccion_residencia: '',
    complemeto_direccion: '',
    email_empresarial: '',
    email: '',
    estado_civil: '',
    fecha_nacimiento: '',
    municipio_residencia: '',
    dpto_notifiacion: '',
    nombre_comercial: '',
    nombre_de_usuario: '',
    numero_documento: '',
    pais_nacimiento: '',
    pais_residencia: '',
    pais_notificacion: '',
    password: '',
    primer_apellido: '',
    primer_nombre: '',
    razon_social: '',
    tipo_documento_rep: '',
    numero_documento_rep: '',
    representante_legal: null,
    nombre_rep: '',
    celular_rep: '',
    direccion_rep: '',
    ciudad_rep: '',
    email_rep: '',
    require_nombre_comercial: false,
    segundo_apellido: '',
    segundo_nombre: '',
    sexo: '',
    telefono_celular_empresa: '',
    telefono_celular: '',
    telefono_empresa_2: '',
    telefono_fijo_residencial: '',
    tipo_documento: '',
    tipo_persona: '',
    ubicacion_georeferenciada: 'sin_gps',
    redirect_url:
      'https://macareniafrontendevelopv2.netlify.app/#/auth/activacion_cuenta',
  });
  const [message_no_person, set_message_no_person] = useState('');

  const handle_change_checkbox = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    set_requiere_nombre_comercial(event.target.checked);
  };

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_paises },
      } = await get_paises();
      set_paises_options(res_paises ?? []);

      const {
        data: { data: res_tipo_persona },
      } = await get_tipo_persona();
      set_tipo_persona_opt(res_tipo_persona ?? []);

      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento ?? []);
      set_tipo_documento_opt_all(res_tipo_documento ?? []);

      const generos = await get_generos();
      set_genero_opt(generos);

      const {
        data: { data: estado_civil },
      } = await get_estado_civil();
      set_estado_civil_opt(estado_civil);

      const {
        data: { data: naturaleza },
      } = await get_naturaleza_emp();
      set_naturaleza_emp_opt(naturaleza);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  const handle_click_show_password = (): void => {
    set_show_password((show) => !show);
  };

  // Valida si la persona a registrar ya esta registrada en el sistema
  const validate_exits = async (numero_documento: string): Promise<void> => {
    set_is_search(true);
    try {
      set_has_user(false);
      set_is_exists(false);
      const {
        data: { data },
      } = await get_person_by_document(tipo_documento, numero_documento);

      if (data !== null && data !== undefined) {
        if (!data.tiene_usuario) {
          set_data_register({ ...data_register, ...data });
          for (const key in data) {
            const temp_key = key as keys_object;
            if (data_register[temp_key] !== undefined) {
              console.log(temp_key);
              console.log(temp_key);
              // setValue(key, data[temp_key]);
            }
          }
          setValue('numero_documento', data.numero_documento);
          set_is_exists(true);
          return;
        } else {
          set_has_user(true);
          return;
        }
      } else {
        set_has_user(false);
        set_is_exists(false);
      }
    } catch (error) {
      control_error(error);
    } finally {
      set_is_search(false);
    }
  };

  const validate_exits_representante = async (
    numero_documento: string
  ): Promise<void> => {
    set_is_search(true);
    set_message_no_person('');
    try {
      const {
        data: { data },
      } = await get_person_by_document(tipo_documento_rep, numero_documento);

      if (data !== null && data !== undefined) {
        if (data.id_persona !== 0) {
          set_data_register({
            ...data_register,
            tipo_documento_rep: data.tipo_documento,
            numero_documento_rep: data.numero_documento,
            nombre_rep: data.nombre_completo,
            representante_legal: data.id_persona,
          });
          set_nombre_representante(data.nombre_completo);
          setValue('tipo_documento_rep', data.tipo_documento);
          setValue('numero_documento_rep', data.numero_documento);
          setValue('nombre_rep', data.nombre_completo);
          return;
        } else {
          set_is_exists(true);
          return;
        }
      }
      set_message_no_person(
        'No existe ninguna persona registrada con esta cédula'
      );
    } catch (error) {
      control_error(error);
    } finally {
      set_is_search(false);
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
      }
    } catch (error) {
      control_error(error);
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
      }
    } catch (error) {
      control_error(error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    void get_departamentos_por_pais('inicial', pais_nacimiento);
  }, [pais_nacimiento]);

  useEffect(() => {
    void get_departamentos_por_pais('residencia', pais_residencia);
  }, [pais_residencia]);

  useEffect(() => {
    void get_departamentos_por_pais('notificacion', pais_notificacion);
  }, [pais_notificacion]);

  useEffect(() => {
    void get_ciudades_opt('inicial', departamento_expedicion);
  }, [departamento_expedicion]);

  useEffect(() => {
    void get_ciudades_opt('residencia', departamento_residencia);
  }, [departamento_residencia]);

  useEffect(() => {
    void get_ciudades_opt('notificacion', dpto_notifiacion);
  }, [dpto_notifiacion]);

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
    ciudad_expedicion,
    ciudad_notificacion_opt,
    ciudad_notificacion,
    ciudad_residencia,
    ciudades_opt,
    ciudades_residencia_opt,
    data_register,
    departamento_expedicion,
    departamento_residencia,
    departamentos_opt,
    dpto_notifiacion_opt,
    dpto_notifiacion,
    dpts_residencia_opt,
    error_email,
    error_password,
    error_phone,
    estado_civil_opt,
    estado_civil,
    fecha_nacimiento,
    fecha_rep_legal,
    genero_opt,
    genero,
    has_user,
    is_exists,
    is_saving,
    is_search,
    loading,
    message_error_password,
    message_no_person,
    nacionalidad_emp,
    naturaleza_emp_opt,
    naturaleza_emp,
    nombre_representante,
    numero_documento,
    pais_nacimiento,
    pais_notificacion,
    pais_residencia,
    paises_options,
    requiere_nombre_comercial,
    show_password,
    tipo_documento_opt,
    tipo_documento_rep,
    tipo_documento,
    tipo_persona_opt,
    tipo_persona,
    documento_rep,
    set_documento_rep,
    get_selects_options,
    handle_change_checkbox,
    handle_click_show_password,
    set_ciudad_expedicion,
    set_ciudad_notificacion_opt,
    set_ciudad_notificacion,
    set_ciudad_residencia,
    set_ciudades_opt,
    set_ciudades_residencia_opt,
    set_data_register,
    set_departamento,
    set_departamentos_opt,
    set_dpto_notifiacion_opt,
    set_dpto_notifiacion,
    set_dpto_residencia_opt,
    set_dpto_residencia,
    set_error_email,
    set_error_error_phone,
    set_error_password,
    set_estado_civil_opt,
    set_estado_civil,
    set_fecha_nacimiento,
    set_fecha_rep_legal,
    set_genero_opt,
    set_genero,
    set_has_user,
    set_is_exists,
    set_is_saving,
    set_is_search,
    set_message_error_password,
    set_message_no_person,
    set_nacionalidad_emp,
    set_naturaleza_emp,
    set_nombre_representante,
    set_numero_documento,
    set_pais_nacimiento,
    set_pais_notificacion,
    set_pais_residencia,
    set_show_password,
    set_tipo_documento_rep,
    set_tipo_documento,
    set_tipo_persona,
    validate_exits_representante,
    validate_exits,
  };
};

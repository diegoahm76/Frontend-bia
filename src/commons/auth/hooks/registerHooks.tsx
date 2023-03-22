import { type ChangeEvent, useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import { get_person_by_document } from '../request/authRequest';
import type {
  TipoPersona,
  Paises,
  TipoDocumento,
  IList,
  Departamentos,
  Municipios,
} from '../../../interfaces/globalModels';
import type { IPerson, ReisterHook } from '../interfaces';
import dayjs, { type Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';
import {
  get_ciudades,
  get_departamentos,
  get_estado_civil,
  get_generos,
  get_paises,
  get_tipo_documento,
  get_tipo_persona,
} from '../../../request/getRequest';

export const use_register = (): ReisterHook => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { setValue } = useForm();
  const [loading, set_loading] = useState<boolean>(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<
    TipoDocumento[]
  >([]);
  const [paises_options, set_paises_options] = useState<Paises[]>([]);
  const [tipo_persona_opt, set_tipo_persona_opt] = useState<TipoPersona[]>([]);
  const [departamentos_opt, set_departamentos_opt] = useState<Departamentos[]>(
    []
  );
  const [ciudades_opt, set_ciudades_opt] = useState<Municipios[]>([]);
  const [departamento_expedicion, set_departamento] = useState('');
  const [ciudad_expedicion, set_ciudad_expedicion] = useState('');
  const [estado_civil, set_estado_civil] = useState('');
  const [genero_opt, set_genero_opt] = useState<IList[]>([]);
  const [estado_civil_opt, set_estado_civil_opt] = useState<IList[]>([]);
  const [requiere_nombre_comercial, set_requiere_nombre_comercial] =
    useState(false);
  const [tipo_persona, set_tipo_persona] = useState('');
  const [genero, set_genero] = useState('');
  const [pais_nacimiento, set_pais_nacimiento] = useState('');
  const [tipo_documento, set_tipo_documento] = useState('');
  const [show_password, set_show_password] = useState(false);
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  const [error_email, set_error_email] = useState(false);
  const [error_phone, set_error_error_phone] = useState(false);
  const [error_password, set_error_password] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [is_exists, set_is_exists] = useState(false);
  const [has_user, set_has_user] = useState(false);
  const [message_error_password, set_message_error_password] = useState('');
  const [data_register, set_data_register] = useState<IPerson>({
    tipo_persona: '',
    tipo_documento: '',
    numero_documento: '',
    digito_verificacion: '',
    nombre_comercial: '',
    primer_nombre: '',
    segundo_nombre: '',
    primer_apellido: '',
    segundo_apellido: '',
    fecha_nacimiento: '',
    email: '',
    telefono_celular: '',
    ubicacion_georeferenciada: '',
    razon_social: '',
    telefono_celular_empresa: '',
    direccion_notificaciones: '',
    representante_legal: '',
    confirmar_celular: '',
    confirmar_email: '',
    cod_municipio_notificacion_nal: '',
    departamento_nacimiento: '',
    departamento_expedicion: '',
    ciudad_expedicion: '',
    require_nombre_comercial: false,
    telefono_empresa_2: '',
    sexo: '',
    estado_civil: '',
    pais_nacimiento: '',
    email_empresarial: '',
    telefono_fijo_residencial: '',
    pais_residencia: '',
    municipio_residencia: '',
    direccion_residencia: '',
    direccion_laboral: '',
    direccion_residencia_ref: '',
    cod_municipio_laboral_nal: '',
    acepta_notificacion_sms: false,
    acepta_notificacion_email: false,
    acepta_tratamiento_datos: false,
    nombre_de_usuario: '',
    password: '',
  });

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
      set_paises_options(res_paises);

      const {
        data: { data: res_tipo_persona },
      } = await get_tipo_persona();
      set_tipo_persona_opt(res_tipo_persona);

      const {
        data: { data: res_tipo_documento },
      } = await get_tipo_documento();
      set_tipo_documento_opt(res_tipo_documento);

      const generos = await get_generos();
      set_genero_opt(generos);

      const estado_civil = await get_estado_civil();
      set_estado_civil_opt(estado_civil);
    } catch (err) {
      control_error(err);
    } finally {
      set_loading(false);
    }
  };

  const validate_password = (password: string): boolean => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;
    if (regex.test(password) && password.length > 5) {
      return true;
    } else {
      return false;
    }
  };

  const handle_click_show_password = (): void => {
    set_show_password((show) => !show);
  };

  // Valida si la persona a registrar ya esta registrada en el sistema
  const validate_exits = async (numero_documento: string): Promise<void> => {
    // console.log(getValues());
    set_is_search(true);
    try {
      const {
        data: { data },
      } = await get_person_by_document(tipo_documento, numero_documento);
      // TODO => MODIFICAR VALIDACION CUANDO OSCAR MODIFIQUE LOS SERVICIOS
      if (data !== null && data.numero_documento !== '') {
        if (!data.tiene_usuario) {
          set_data_register({ ...data });
          setValue('numero_documento', data.numero_documento);
          setValue('digito_verificacion', data.digito_verificacion);
          setValue('nombre_comercial', data.nombre_comercial);
          setValue('primer_nombre', data.primer_nombre);
          setValue('segundo_nombre', data.segundo_nombre);
          setValue('primer_apellido', data.primer_apellido);
          setValue('segundo_apellido', data.segundo_apellido);
          setValue('fecha_nacimiento', data.fecha_nacimiento);
          setValue('email', data.email);
          setValue('confirmar_email', data.email);
          setValue('telefono_celular', data.telefono_celular);
          setValue('razon_social', data.razon_social);
          setValue('telefono_celular_empresa', data.telefono_celular_empresa);
          setValue('direccion_notificaciones', data.direccion_notificaciones);
          setValue('representante_legal', data.representante_legal);
          setValue(
            'cod_municipio_notificacion_nal',
            data.cod_municipio_notificacion_nal
          );
          set_fecha_nacimiento(dayjs(data.fecha_nacimiento));
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

  const get_ciudades_opt = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data },
      } = await get_ciudades(departamento_expedicion);
      set_ciudades_opt(data);
    } catch (error) {
      control_error(error);
    } finally {
      set_loading(false);
    }
  };

  // Obtiene los departamentos acorde al pais
  const get_departamentos_por_pais = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: departamentos },
      } = await get_departamentos(pais_nacimiento);
      set_departamentos_opt(departamentos);
    } catch (error) {
      control_error(error);
    } finally {
      set_loading(false);
    }
  };

  useEffect(() => {
    void get_departamentos_por_pais();
  }, [pais_nacimiento]);

  useEffect(() => {
    void get_ciudades_opt();
  }, [departamento_expedicion]);

  useEffect(() => {
    void get_selects_options();
  }, []);

  return {
    requiere_nombre_comercial,
    paises_options,
    tipo_documento_opt,
    tipo_persona_opt,
    loading,
    tipo_persona,
    tipo_documento,
    show_password,
    fecha_nacimiento,
    error_email,
    error_password,
    is_saving,
    is_search,
    is_exists,
    message_error_password,
    data_register,
    error_phone,
    has_user,
    pais_nacimiento,
    genero_opt,
    genero,
    estado_civil_opt,
    departamentos_opt,
    departamento_expedicion,
    ciudades_opt,
    ciudad_expedicion,
    estado_civil,
    set_estado_civil,
    set_ciudad_expedicion,
    set_ciudades_opt,
    set_departamento,
    set_departamentos_opt,
    set_estado_civil_opt,
    set_genero,
    set_genero_opt,
    set_pais_nacimiento,
    set_has_user,
    set_error_error_phone,
    set_is_exists,
    set_fecha_nacimiento,
    set_error_email,
    set_error_password,
    set_is_saving,
    set_is_search,
    set_message_error_password,
    set_data_register,
    set_show_password,
    handle_click_show_password,
    get_selects_options,
    handle_change_checkbox,
    set_tipo_persona,
    set_tipo_documento,
    validate_password,
    validate_exits,
  };
};

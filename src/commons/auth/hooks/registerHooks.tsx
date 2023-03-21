import { type ChangeEvent, useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import {
  get_paises,
  get_person_by_document,
  get_tipo_documento,
  get_tipo_persona,
} from '../request/authRequest';
import {
  type TipoPersona,
  type Paises,
  type TipoDocumento,
} from '../../../interfaces/globalModels';
import type { IPerson, ReisterHook } from '../interfaces';
import dayjs, { type Dayjs } from 'dayjs';
import { useForm } from 'react-hook-form';

export const use_register = (): ReisterHook => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { setValue } = useForm();
  const [loading, set_loading] = useState<boolean>(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<
    TipoDocumento[]
  >([]);
  const [paises_options, set_paises_options] = useState<Paises[]>([]);
  const [tipo_persona_opt, set_tipo_persona_opt] = useState<TipoPersona[]>([]);
  const [requiere_nombre_comercial, set_requiere_nombre_comercial] =
    useState(false);
  const [tipo_persona, set_tipo_persona] = useState('');
  const [tipo_documento, set_tipo_documento] = useState('');
  const [show_password, set_show_password] = useState(false);
  const [fecha_nacimiento, set_fecha_nacimiento] = useState<Dayjs | null>(null);
  const [error_email, set_error_email] = useState(false);
  const [error_phone, set_error_error_phone] = useState(false);
  const [error_password, set_error_password] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [is_exists, set_is_exists] = useState(false);
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

  const validate_exits = async (numero_documento: string): Promise<void> => {
    // console.log(getValues());
    set_is_search(true);
    try {
      const {
        data: { data },
      } = await get_person_by_document(tipo_documento, numero_documento);

      if (data.numero_documento !== '') {
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
      } else {
        set_is_exists(true);
      }
    } catch (error) {
      control_error(error);
    } finally {
      set_is_search(false);
    }
  };

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

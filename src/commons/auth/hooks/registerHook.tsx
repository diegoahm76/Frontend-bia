import { useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import type {
  IList,
  InfoPersona,
  ResponseServer,
} from '../../../interfaces/globalModels';
import type { ReisterHookNew } from '../interfaces';
import { type FieldValues, useForm } from 'react-hook-form';
import {
  get_person_by_document,
  get_tipo_documento,
  get_tipo_persona,
} from '../../../request/';
import { type AxiosError } from 'axios';
import { create_user } from '../request/authRequest';
import { control_success } from '../../../helpers';
import { DEFAULT_AUTH_URL_BETA, DEFAULT_AUTH_URL_PROD } from '../../../api/axios';

export const use_register = (): ReisterHookNew => {
  const {
    register,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors, isValid: is_valid },
    getValues: get_values,
    reset,
    resetField: reset_field,
    watch,
  } = useForm();

  const [is_error, set_is_error] = useState(false);
  const [is_search, set_is_search] = useState(false);
  const [is_saving, set_is_saving] = useState(false);
  const [is_avaiable, set_is_avaiable] = useState(false);
  const [no_has_user, set_no_has_user] = useState(false);
  const [message_error, set_message_error] = useState('');
  const [loading, set_loading] = useState<boolean>(false);
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento_opt_all, set_tipo_documento_opt_all] = useState<
    IList[]
  >([]);
  const [tipo_persona_opt, set_tipo_persona_opt] = useState<IList[]>([]);

  const tipo_persona = watch('tipo_persona') ?? '';
  const tipo_documento = watch('tipo_documento') ?? '';
  const numero_documento = watch('numero_documento') ?? '';

  const handle_change_checkbox = (value: boolean): void => {
    if (value) {
      set_value('dpto_notifiacion', get_values('departamento_residencia'));
      set_value(
        'cod_municipio_notificacion_nal',
        get_values('municipio_residencia')
      );
      set_value('direccion_notificaciones', get_values('direccion_residencia'));
    } else {
      set_value('dpto_notifiacion', '');
      set_value('cod_municipio_notificacion_nal', '');
      set_value('direccion_notificaciones', '');
    }
  };

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const {
        data: { data: res_tipo_persona },
      } = await get_tipo_persona();
      set_tipo_persona_opt(res_tipo_persona ?? []);

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

  // Valida si la persona a registrar ya esta registrada en el sistema
  const validate_exits: (data: FieldValues) => Promise<void> = async ({
    numero_documento,
    tipo_documento,
  }): Promise<void> => {
    set_is_search(true);
    try {
      set_is_error(false);
      const {
        data: { data },
      } = await get_person_by_document(tipo_documento, numero_documento);

      if (data !== null && data !== undefined) {
        if (!data.tiene_usuario) {
          // Habilitamos unicamente el formulario para registro de usuario y contraseña
          set_value('persona', data.id_persona);

          if (tipo_persona === 'J') {
            set_value('razon_social', data.razon_social);
            set_value('nombre_comercial', data.nombre_comercial);
          } else {
            set_value('primer_nombre', data.primer_nombre);
            set_value('segundo_nombre', data.segundo_apellido);
            set_value('primer_apellido', data.primer_apellido);
            set_value('segundo_apellido', data.segundo_apellido);
          }
          set_is_avaiable(true);
          set_no_has_user(true);
          // return;
        } else {
          set_message_error(
            'Lo sentimos, este documento ya tiene un usuario, puede iniciar sesión con su usuario y contraseña, si ha olvidado sus datos de acceso, dirigase al inicio de sesión y haga click en ¿Olvidó su contraseña?'
          );
          set_is_error(true);
          reset();
          set_is_avaiable(false);
          // return;
        }
      } else {
        // Habilitamos todo el formulario
        set_is_avaiable(true);
        set_is_error(false);
      }
    } catch (error) {
      set_is_avaiable(false);
      const temp_err = error as AxiosError;
      if (temp_err.response?.status === 403) {
        const resp = temp_err.response.data as ResponseServer<InfoPersona>;
        set_message_error(resp.detail);
        set_is_error(true);
        return;
      }
      control_error(error);
    } finally {
      set_is_search(false);
    }
  };

  // Crea el usuario
  const on_submit = async ({
    nombre_de_usuario,
    persona,
    password,
  }: FieldValues): Promise<void> => {
    set_is_saving(true);
    try {
      const { data } = await create_user({
        nombre_de_usuario,
        persona,
        password,
        redirect_url:
        (process.env.NODE_ENV === 'production'
          ? process.env.REACT_APP_AUTH_URL_BETA || `${DEFAULT_AUTH_URL_BETA}`
          : process.env.REACT_APP_AUTH_URL_PROD || `${DEFAULT_AUTH_URL_PROD}`
        ) + '/auth/activacion_cuenta',
      });
      control_success(data.detail);
      window.location.href = '#/app/auth/login';
    } catch (error) {
    } finally {
      set_is_saving(false);
    }
  };

  useEffect(() => {
    if (tipo_persona !== undefined && tipo_persona !== '') {
      if (tipo_persona === 'N') {
        set_tipo_documento_opt(
          tipo_documento_opt_all.filter((e) => e.value !== 'NT')
        );
      } else {
        set_tipo_documento_opt(tipo_documento_opt_all);
      }
    }
  }, [tipo_persona]);

  useEffect(() => {
    set_no_has_user(false);
    set_is_avaiable(false);
    for (const key in errors) {
      reset_field(key);
    }
  }, [tipo_persona, tipo_documento, numero_documento]);

  useEffect(() => {
    handle_change_checkbox(watch('misma_direccion'));
  }, [watch('misma_direccion')]);

  useEffect(() => {
    void get_selects_options();
  }, []);

  return {
    errors,
    message_error,
    is_error,
    is_avaiable,
    is_search,
    is_valid,
    loading,
    tipo_documento_opt,
    tipo_persona_opt,
    no_has_user,
    is_saving,
    handle_submit,
    register,
    set_value,
    validate_exits,
    watch,
    reset,
    on_submit,
    get_values,
  };
};

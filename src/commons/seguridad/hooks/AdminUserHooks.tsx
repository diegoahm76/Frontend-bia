import { useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import type { IList } from '../../../interfaces/globalModels';
import type {
  DataAadminUser,
  AdminUserHook,
  // keys_object,
} from '../interfaces';
// import { type Dayjs } from 'dayjs';
// import { useForm } from 'react-hook-form';
import {
  get_tipo_documento,
  get_tipo_persona,
  get_tipo_usuario,
} from '../../../request';

export const use_admin_users = (): AdminUserHook => {
  // eslint-disable-next-line @typescript-eslint/naming-convention

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
  const [tipo_usuario, set_tipo_usuario] = useState('');
  const [tipo_usuario_opt, set_tipo_usuario_opt] = useState<IList[]>([]);
  const [data_register, set_data_register] = useState<DataAadminUser>({
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
  });

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
      console.log(res_tipo_usuario);
      set_tipo_usuario_opt(res_tipo_usuario ?? []);

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
    get_selects_options,
    set_data_register,
    set_has_user,
    set_is_exists,
    set_is_saving,
    set_is_search,
    set_numero_documento,
    set_tipo_documento,
    set_tipo_persona,
    set_tipo_usuario,
  };
};

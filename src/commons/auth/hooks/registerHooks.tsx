import { type ChangeEvent, useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import {
  get_paises,
  get_tipo_documento,
  get_tipo_persona,
} from '../request/authRequest';
import {
  type TipoPersona,
  type Paises,
  type TipoDocumento,
} from '../../../interfaces/globalModels';
import { type ReisterHook } from '../interfaces';

export const use_register = (): ReisterHook => {
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
    get_selects_options,
    handle_change_checkbox,
    set_tipo_persona,
    set_tipo_documento,
    validate_password,
  };
};

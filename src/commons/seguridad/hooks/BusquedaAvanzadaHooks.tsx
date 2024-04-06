/* eslint-disable @typescript-eslint/naming-convention */
import { useEffect, useState } from 'react';
import { control_error } from '../../../helpers/controlError';
import type { IList } from '../../../interfaces/globalModels';
import type {
  FormValuesSearchPerson,
  FormValuesSearchUser,
} from '../interfaces';
// import { type Dayjs } from 'dayjs';
// import { useForm } from 'react-hook-form';
import {
  get_tipo_documento,
  get_tipo_persona,
  get_tipo_usuario,
} from '../../../request';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const use_busqueda_avanzada = () => {
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
  const [data_search_person, set_data_search_person] =
    useState<FormValuesSearchPerson>({
      tipo_persona: '',
      tipo_documento: '',
      numero_documento: '',
      primer_nombre: '',
      primer_apellido: '',
    });
  const [data_search_user, set_data_search_user] =
    useState<FormValuesSearchUser>({
      tipo_persona: '',
      nombre_usuario: '',
    });

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
      const [tipoPersonaResponse, tipoUsuarioResponse, tipoDocumentoResponse] = await Promise.all([
        get_tipo_persona(),
        get_tipo_usuario(),
        get_tipo_documento()
      ]);
      //console.log('tipoPersonaResponse', tipoPersonaResponse.data.data)


      set_tipo_persona_opt(tipoPersonaResponse.data.data ?? []);
      set_tipo_usuario_opt(tipoUsuarioResponse.data.data ?? []);
      const tipoDocumentoData = tipoDocumentoResponse.data.data ?? [];
      set_tipo_documento_opt(tipoDocumentoData);
      set_tipo_documento_opt_all(tipoDocumentoData);
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
    data_search_user,
    data_search_person,
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
    set_data_search_user,
    set_data_search_person,
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

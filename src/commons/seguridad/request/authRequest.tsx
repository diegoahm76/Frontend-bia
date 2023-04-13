import { api } from '../../../api/axios';
import { type AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';
import { get_tipo_documento } from '../../../request/getRequest';
// import { control_error } from '../../../helpers/controlError';
import type { IList, ResponseServer } from '../../../interfaces/globalModels';
import { control_error } from '../../../helpers/controlError';
import type { DelegarSuper, InfoPersonal } from '../interfaces/seguridadModels';

export const change_super_user = (): DelegarSuper => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [tipo_documento_opt, set_tipo_documento_opt] = useState<IList[]>([]);
  const [tipo_documento, set_tipo_documento] = useState('');

  const [loading, set_loading] = useState<boolean>(false);

  const get_selects_options = async (): Promise<void> => {
    set_loading(true);
    try {
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

  useEffect(() => {
    void get_selects_options();
  }, []);

  return {
    tipo_documento_opt,
    tipo_documento,
    loading,
    get_selects_options,
    set_tipo_documento,
  };
};

export const get_person_by_documents = async (
  tipo_documento: string,
  numero_documento: string
): Promise<AxiosResponse<ResponseServer<InfoPersonal | null>>> => {
  return await api.get(
    `personas/get-personas-by-document/${tipo_documento}/${numero_documento}`
    // `users/get-user-by-nombre-de-usuario/?nombre_de_usuario=NomprePrueba`
  );
};

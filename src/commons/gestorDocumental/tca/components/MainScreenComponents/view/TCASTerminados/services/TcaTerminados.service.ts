/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { api } from '../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../helpers';

export const getTcaTerminados = async (): Promise<any> => {
  try {
    const url = 'gestor/tca/tca-list/get/';
    const { data } = await api.get(url);

    control_success(
      data.detail || 'proceso exitoso, se encontró la siguiente data'
    );
    return data;
  } catch (error: any) {
    control_error(
      `${error.response.data.detail}` ||
        'Ha ocurrido un error, no se han encontrado data'
    );
    console.log(error);
  }
};

/* export const get_formatos_by_tipo_medio_by_format_and_name = (
  setCreateTRDLoadingButton: any,
  name?: string,
  cod_tipo_medio?: string
): any => {
  return async (
    dispatch: Dispatch<any>
  ): Promise<AxiosResponse | AxiosError> => {
    try {
      setCreateTRDLoadingButton(true);
      const url = `gestor/trd/formatos/get-by-params/?nombre=${
        name ?? ''
      }&cod-tipo-medio=${cod_tipo_medio ?? ''}`;
      const { data } = await api.get(url);
      control_success(
        data.detail || 'proceso exitoso, se encontró la siguiente data'
      );
      dispatch(get_data_format_documental_type(data.data));
      return data.data;
    } catch (error: any) {
      control_error(
        `${error.response.data.detail} que coincida` ||
          'Ha ocurrido un error, no se han encontrado data'
      );
      return error as AxiosError;
    } finally {
      setCreateTRDLoadingButton(false);
    }
  };
};
*/
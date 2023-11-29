import { api } from '../../../../../../../../api/axios';
import { control_error } from '../../../../../../../../helpers';

/* eslint-disable @typescript-eslint/naming-convention */
export const getArchivoAnexoPqrsdf = async (id_anexo: any): Promise<any> => {
  try {
    const url = `gestor/panel_ventanilla/pqrsdf/anexo-documento/get/${id_anexo}/`;
    const response = await api.get(url);

    console.log(response);


    // console.log(response.data);

    // return response.data;
  } catch (err: any) {
    control_error(err);
  }
};

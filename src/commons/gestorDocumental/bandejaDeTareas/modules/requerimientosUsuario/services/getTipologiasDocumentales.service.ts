import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';
import { control_warning } from '../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */
export const getTipologiasDocumentalesMetadatos = async (
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `gestor/plantillas/tipos_tipologia/get/`;
    const { data } = await api.get(url);
    //  console.log('')(data);

    if(data?.data.length > 0){
      // control_success('Se encontraron las tipologias documentales');
      return data.data;
    }
    control_warning('No se encontraron tipologias documentales');
    return [];


    // return response.data;
  } catch (error:any) {
    control_error(error?.response?.data?.detail);
  } finally {
    setLoading(false);
  }
};

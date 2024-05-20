import { api } from '../../../../../../api/axios';
import { API_PATHS, handleError } from './functions/helpers';

/* eslint-disable @typescript-eslint/naming-convention */

export const getInitialData = async (
  id_PQRSDF: number,
  navigate: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setLoadingSecondary: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  const setLoadings = (value: boolean) => {
    setLoading(value);
    setLoadingSecondary(value);
  };

  try {
    setLoadings(true);

    const [
      responseSolicita,
      responseTitular,
      responseHistoricoSolicitudesPQRSDF,
      responseDetallePQRSDF,
    ] = await Promise.all([
      api.get(API_PATHS.solicita),
      api.get(API_PATHS.titular(id_PQRSDF)),
      api
      .get(API_PATHS.solicitudUsuario(id_PQRSDF))
      .catch(() => ({ data: [] })),
      api.get(API_PATHS.detalleSolicitud(id_PQRSDF)),
    ]);

    const data = {
      dataSolicita: responseSolicita.data,
      dataTitular: responseTitular.data,
      dataHistoricoSolicitudesPQRSDF: responseHistoricoSolicitudesPQRSDF.data,
      detallePQRSDF: responseDetallePQRSDF.data,
    };

    console.log('data Informaciones', data);
    return data;
  } catch (error) {
    handleError(navigate, '/app/gestor_documental/bandeja_tareas/');
  } finally {
    setLoadings(false);
  }
};

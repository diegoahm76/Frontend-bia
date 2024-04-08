import axios from 'axios';
import { api } from '../../../../../../api/axios';
import Swal from 'sweetalert2';
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
      responseDetallePQRSDF,
      responseHistoricoSolicitudesPQRSDF,
    ] = await Promise.all([
      api.get(API_PATHS.solicita),
      api.get(API_PATHS.titular(id_PQRSDF)),
      api.get(API_PATHS.detalleSolicitud(id_PQRSDF)),
      api
        .get(API_PATHS.solicitudUsuario(id_PQRSDF))
        .catch(() => ({ data: [] })),
    ]);

    const data = {
      dataSolicita: responseSolicita.data,
      dataTitular: responseTitular.data,
      detallePQRSDF: responseDetallePQRSDF.data,
      dataHistoricoSolicitudesPQRSDF: responseHistoricoSolicitudesPQRSDF.data,
    };

    //  console.log('')('data Informaciones', data);
    return data;
  } catch (error) {
    handleError(navigate, '/app/gestor_documental/panel_ventanilla/');
  } finally {
    setLoadings(false);
  }
};

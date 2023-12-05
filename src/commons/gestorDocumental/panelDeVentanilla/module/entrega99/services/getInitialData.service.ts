import axios from 'axios';
import { api } from '../../../../../../api/axios';
import Swal from 'sweetalert2';

/* eslint-disable @typescript-eslint/naming-convention */
export const getInitialData = async (
  id_PQRSDF: number,
  navigate: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);

    // gestor/panel_ventanilla/pqrsdf/detalle-solicitud/get/10/

    const [responseSolicita, responseTitular, responseDetallePQRSDF] =
      await Promise.all([
        api.get(`gestor/panel_ventanilla/pqrsdf/solicita/get/`),
        api.get(`gestor/panel_ventanilla/pqrsdf/titular/get/${id_PQRSDF}/`),
        api.get(`gestor/panel_ventanilla/pqrsdf/adjuntos/get/${id_PQRSDF}/`),
      ]);

    const { data: dataSolicita } = responseSolicita;
    const { data: dataTitular } = responseTitular;
    const { data: detallePQRSDF } = responseDetallePQRSDF;

    return {
      dataSolicita,
      dataTitular,
      detallePQRSDF,
    };
  } catch (error) {
    void Swal.fire({
      icon: 'error',
      title: 'Error',
      allowOutsideClick: false,
      text: 'Error al obtener la información inicial',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      navigate('/app/gestor_documental/panel_ventanilla/');
    });
  } finally {
    setLoading(false);
  }
};

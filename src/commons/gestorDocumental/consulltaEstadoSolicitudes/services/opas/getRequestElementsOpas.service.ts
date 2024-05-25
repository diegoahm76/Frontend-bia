import { api } from '../../../../../api/axios';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const getOpasConsulta = async (
  setAsignaciones: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  formData: any
) => {
  try {
    setLoading(true);
    console.log('soy la data, estoy buscando OPAS SIUUUUU', formData);
    const url = `tramites/opa/tramites/consulta-estado-opas/?fecha_radicado_desde=${
      formData?.fecha_inicio ?? ''
    }&fecha_radicado_hasta=${formData?.fecha_fin ?? ''}&radicado=${
      formData?.radicado ?? ''
    }&estado_solicitud=${formData?.estado ?? ''}`;
    const response = await api.get(url);

    if (response?.data && response?.data?.data?.length > 0) {
      console.log('soy la data', response?.data);
      setAsignaciones(response?.data?.data);
      return response?.data?.data;
    } else {
      showAlert('Opss!', 'No se recibieron datos de la solicitud o la respuesta está vacía', 'warning');
      return []
    }
  } catch (error: any) {
    showAlert('Opss!', `${error?.response?.data?.detail}`, 'error');
  } finally {
    setLoading(false);
  }
};
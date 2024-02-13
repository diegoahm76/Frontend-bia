import { api } from '../../../../../api/axios';
import { control_error } from '../../../../../helpers';
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
   /* const url = `gestor/consultar-estado-solicitud-tramite/consultar/?fecha_inicio=${formData?.fecha_inicio}&fecha_fin=${formData?.fecha_fin}&estado_actual_solicitud=${formData?.estado_actual_solicitud}&radicado=${formData?.radicado}`;
    const response = await api.get(url);
    if (response?.data?.succes) {
      console.log('soy la data', response?.data?.data);
      setAsignaciones(response?.data?.data);
      return response?.data?.data;
    }*/
  } catch (error: any) {
    console.error('Error al cargar las estado', error);
    showAlert('Opss!', `${error?.response?.data?.detail}`, 'error');
  } finally {
    setLoading(false);
  }
};

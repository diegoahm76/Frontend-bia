/* eslint-disable @typescript-eslint/naming-convention */
import React from 'react';
import { api } from '../../../../../api/axios';
import { control_success } from '../../../../../helpers';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';

const cargarAsignacionesOtros = async (
  setAsignaciones: React.Dispatch<React.SetStateAction<any[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  formData: any
): Promise<any> => {
  try {
    setLoading(true);
    const response = await api.get(
      `/gestor/radicados/otros/consulta-estado-otros/?radicado=${formData.radicado}&fecha_radicado_desde=${formData.fecha_inicio}&fecha_radicado_hasta=${formData.fecha_fin}&estado_solicitud=${formData.estado}`
    );
    if (response.data.success && response?.data?.data && response?.data?.data?.length > 0) {
      setAsignaciones(response?.data?.data);
      console.log('soy la data', response?.data?.data);
      control_success(
        'Se ha encontrado los siguientes datos que coinciden con la busqueda'
      );
      return;
    }
    showAlert('Opss', 'No se recibieron datos de la solicitud o la respuesta está vacía', 'warning');
    return []
  } catch (error: any) {
    console.error('Error al cargar las asignaciones de encuesta', error);
    // control_error(error.response.data.detail);
    showAlert('Opss', `${error?.response?.data?.detail}`, 'error');
  } finally {
    setLoading(false);
  }
};

export { cargarAsignacionesOtros };

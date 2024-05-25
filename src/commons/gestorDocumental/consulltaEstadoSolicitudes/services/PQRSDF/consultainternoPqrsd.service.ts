/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import { api } from '../../../../../api/axios';
import { Pqr, TipoPQRSDF } from '../../interface/types';
import { showAlert } from '../../../../../utils/showAlert/ShowAlert';
import { control_error, control_success } from '../../../../../helpers';

const API_URLS = {
  ASIGNACIONES: '/gestor/pqr/consulta-estado-pqrsdf/',
  SPQRS: '/gestor/choices/cod-tipo-pqrs/',
  // ORGANIGRAMA: '/transversal/organigrama/unidades/get-list/organigrama-actual/',
  TIPO_PQRSDF: '/gestor/choices/tipo-solicitud-pqrsdf/',
  ESTADO: '/gestor/pqr/get-estado-solicitud/',
};

const cargarAsignaciones = async (
  setAsignaciones: any,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  formData: any
): Promise<any> => {
  try {
    setLoading(true);
    const { pqrs, radicado, fecha_inicio, fecha_fin, estado } = formData;

    const response = await api.get(
      `${API_URLS.ASIGNACIONES}?tipo_pqrsdf=${encodeURIComponent(
        pqrs
      )}&radicado=${encodeURIComponent(
        radicado
      )}&fecha_radicado_desde=${encodeURIComponent(
        fecha_inicio
      )}&fecha_radicado_hasta=${encodeURIComponent(
        fecha_fin
      )}&estado_solicitud=${encodeURIComponent(estado)}`
    );

    if (response.data.success && response?.data?.data && response?.data?.data?.length > 0) {
      setAsignaciones(response.data.data);
      control_success(
        'Se han encontrado los siguiente datos que coinciden con la busqueda'
      );
      return;
    }
    showAlert('Opss', 'No se recibieron datos de la solicitud o la respuesta está vacía', 'warning');
    return []
  } catch (error: any) {
    console.error('Error al cargar las asignaciones de encuesta', error);
    showAlert('Opss', `${error?.response?.data?.detail}`, 'error');
  } finally {
    setLoading(false);
  }
};

const fetchSpqrs = async ({ settipo }: { settipo: any }): Promise<any> => {
  try {
    const res = await api.get<{ data: Pqr[] }>(API_URLS.SPQRS);
    settipo(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

const fetchTipoSolicitud = async ({
  setTipoPQRSDF,
}: {
  setTipoPQRSDF: any;
}): Promise<any> => {
  try {
    const res = await api.get<any[]>(API_URLS.TIPO_PQRSDF);
    const parsedData: TipoPQRSDF[] = res.data.map(
      ([codigo, descripcion]: [string, string]) => ({
        codigo,
        descripcion,
      })
    );
    setTipoPQRSDF(parsedData);
  } catch (error) {
    console.error(error);
  }
};

const cargarestado = async ({
  setestado,
}: {
  setestado: any;
}): Promise<any> => {
  try {
    const response = await api.get(API_URLS?.ESTADO);
    if (response?.data?.success) {
      setestado(response?.data?.data);
    }
  } catch (error: any) {
    console.error('Error al cargar las estado', error);
    control_error(error?.response?.data?.detail);
  }
};

export {
  fetchSpqrs,
  cargarestado,
  fetchTipoSolicitud,
  // cargarorganigrama,
  cargarAsignaciones,
};

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-unused-vars */
import { api } from '../../../../api/axios';
import { Pqr, TipoPQRSDF } from '../interface/types';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';
import { control_error, control_success } from '../../../../helpers';

const API_URLS = {
  ASIGNACIONES: '/gestor/pqr/consulta-estado-pqrsdf/',
  SPQRS: '/gestor/choices/cod-tipo-pqrs/',
  // ORGANIGRAMA: '/transversal/organigrama/unidades/get-list/organigrama-actual/',
  TIPO_PQRSDF: '/gestor/choices/tipo-solicitud-pqrsdf/',
  ESTADO: '/gestor/pqr/get-estado-solicitud/',
};

const cargarAsignaciones = async ({
  setAsignaciones,
  formData,
  id_persona,
}: {
  setAsignaciones: any;
  formData: any;
  id_persona: any;
}): Promise<any> => {
  try {
    const { tipo_solicitud, pqrs, radicado, fecha_desde, fecha_hasta, estado } =
      formData;

    const response = await api.get(
      `${API_URLS.ASIGNACIONES}?tipo_solicitud=${encodeURIComponent(
        tipo_solicitud
      )}&tipo_pqrsdf=${encodeURIComponent(pqrs)}&radicado=${encodeURIComponent(
        radicado
      )}&fecha_radicado_desde=${encodeURIComponent(
        fecha_desde
      )}&fecha_radicado_hasta=${encodeURIComponent(
        fecha_hasta
      )}&estado_solicitud=${encodeURIComponent(
        estado
      )}&id_persona_titular=${encodeURIComponent(id_persona)}`
    );

    if (response.data.success) {
      setAsignaciones(response.data.data);
      control_success('Datos encontrados');
    }
  } catch (error: any) {
    console.error('Error al cargar las asignaciones de encuesta', error);
    showAlert('Opss', `${error?.response?.data?.detail}`, 'error');
  }
};

const fetchSpqrs = async ({ setpqrs }: { setpqrs: any }): Promise<any> => {
  try {
    const res = await api.get<{ data: Pqr[] }>(API_URLS.SPQRS);
    setpqrs(res.data.data);
  } catch (error) {
    console.error(error);
  }
};

/*const cargarorganigrama = async ({
  setorganigrama,
}: {
  setorganigrama: any;
}): Promise<any> => {
  try {
    const response = await api.get(API_URLS.ORGANIGRAMA);
    if (response.data.success) {
      setorganigrama(response.data.data);
    }
  } catch (error: any) {
    console.error('Error al cargar las organigrama', error);
    control_error(error.response.data.detail);
  }
};*/

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

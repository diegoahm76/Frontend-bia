import { api } from '../../../../api/axios';
import type {
  ISeguimientoPAI,
  IProyectos,
  IMetaIndicador,
  Indicadores,
  IActividades,
  IProductos,
} from '../../types/types';

// ! ----------------------------------------------- [ SEGUIMIENTO PAI ] -----------------------------------------------
// ? ----------------------------------------------- [ GET ] -----------------------------------------------
export const get_seguimiento_pai = async (): Promise<ISeguimientoPAI[]> => {
  const response = await api.get(
    `seguimiento-planes/consultar-seguimiento-pai/`
  );
  return response.data.data;
};

export const get_proyectos = async (): Promise<IProyectos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-proyectos/`);
  return response.data.data;
};

export const get_productos = async (): Promise<IProductos[]> => {
  const response = await api.get(`seguimiento/planes/consultar-productos/`);
  return response.data.data;
};

export const get_actividades = async (): Promise<IActividades[]> => {
  const response = await api.get(`seguimiento/planes/consultar-actividades/`);
  return response.data.data;
};

export const get_indicadores = async (): Promise<Indicadores[]> => {
  const response = await api.get(`seguimiento/planes/consultar-indicadores/`);
  return response.data.data;
};

export const get_metas = async (): Promise<IMetaIndicador[]> => {
  const response = await api.get(`seguimiento/planes/consultar-metas/`);
  return response.data.data;
};

export const get_documentos_seguimiento_pai = async (
  id_seguimiento_pai: number
): Promise<any[]> => {
  const response = await api.get(
    `seguimiento-planes/consltar-seguimiento-documentos-id-pai/${id_seguimiento_pai}/`
  );

  // Extract the archivo property from each item in the array
  const archivos = response.data.data.map((item: any) => item.archivo);

  //  console.log('')(archivos, 'archivos');

  return archivos;
};
export const get_metas_id = async (
  id_indicador: number
): Promise<IMetaIndicador[]> => {
  const response = await api.get(
    `seguimiento/planes/consultar-metas-id-indicador/${id_indicador}/`
  );
  return response.data.data;
};
// ? ----------------------------------------------- [ POST ] -----------------------------------------------
export const post_seguimiento_pai = async (
  data: ISeguimientoPAI,
  datos: FormData,
  archivo: any
): Promise<any> => {
  const response = await api.post(
    `seguimiento-planes/crear-seguimiento-pai/`,
    data
  );
  if (
    archivo.length > 0 &&
    archivo[0] !== null &&
    response.data.data.id_seguimiento_pai
  ) {
    const id_seguimiento_pai = response.data.data.id_seguimiento_pai;
    datos.append('id_seguimiento_pai', id_seguimiento_pai);

    const response_archivos = await api.post(
      `seguimiento-planes/crear-seguimiento-pai-documentos/`,
      datos
    );

    return {
      reponse_general: response.data,
      response_archivos: response_archivos.data,
    };
  } else {
    return response.data;
  }
  // return response.data;
};

// ? ----------------------------------------------- [ PUT ] -----------------------------------------------
export const put_seguimiento_pai = async (
  id_detalle: number,
  data: ISeguimientoPAI,
  datos: FormData,
  archivo: any
): Promise<any> => {
  const response = await api.put(
    `seguimiento-planes/actualizar-seguimiento-pai/${id_detalle}/`,
    data
  );
  if (
    archivo.length > 0 &&
    archivo[0] !== null &&
    response.data.data.id_seguimiento_pai
  ) {
    const id_seguimiento_pai = response.data.data.id_seguimiento_pai;
    datos.append('id_seguimiento_pai', id_seguimiento_pai);

    const response_archivos = await api.post(
      `seguimiento-planes/crear-seguimiento-pai-documentos/`,
      datos
    );

    return {
      reponse_general: response.data,
      response_archivos: response_archivos.data,
    };
  } else {
    return response.data;
  }
  // return response.data;
};

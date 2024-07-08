import { api } from "../../../../api/axios";
import { handleApiError } from "../../../../utils/functions/errorManage";
import { control_warning } from "../../../almacen/configuracion/store/thunks/BodegaThunks";

/* eslint-disable @typescript-eslint/naming-convention */
export const getUnidadesOrgActual = async (): Promise<any> => {
  try{
    const url = `gestor/reporte_indices_archivos_carpetas/unidades/get/`
    const {data} = await api.get(url);


    if(!Array.isArray(data?.data) || !data?.success) {
      control_warning('Ha ocurrido un error al cargar los datos y/o no se han encontrado datos, por favor intente de nuevo o contacte al administrador del sistema.');
      return [];
    }

    //control_success('Unidades organizacionales cargadas correctamente.');
    return data?.data?.map((item: any) => ({
      value: item.id_unidad_organizacional,
      label: `${item.codigo} - ${item.nombre}`,
    }));

  }
  catch (error) {
    handleApiError(error);
  }
}


export const getOficinasByIdUnidad = async (idUnidad: number): Promise<any> => {
  try{
// `gestor/bandeja-tareas/unidad-organizacional/hijas/get/${idUnidad}`
    
    const url = `gestor/reporte_indices_archivos_carpetas/grupos/get/${idUnidad}`
    const {data} = await api.get(url);

    if(!Array.isArray(data?.data) || !data?.success) {
      control_warning('Ha ocurrido un error al cargar los datos y/o no se han encontrado datos, por favor intente de nuevo o contacte al administrador del sistema.');
      return [];
    }

    //control_success('Oficinas cargadas correctamente.');
    return data?.data?.map((item: any) => ({
      value: item.id_unidad_organizacional,
      label: `${item?.agrupacion_documental ?? 'N/A'} / ${item.codigo} - ${item.nombre}`,
    }));

  }
  catch (error) {
    handleApiError(error);
  }
}
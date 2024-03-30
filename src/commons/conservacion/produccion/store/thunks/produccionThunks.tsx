import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  set_nurseries,
  set_vegetal_materials,
  set_stage_changes,
  set_changing_person,
  set_persons,
  set_mezclas,
  set_bienes,
  set_preparaciones,
  set_preparacion_bienes,
  set_siembras_material_vegetal,
  set_current_siembra_material_vegetal,
  set_mortalidades,
  set_current_mortalidad,
  set_items_mortalidad,
  set_nro_mortalidad,
  set_persona_anula,
  set_incidencias,
  set_bienes_aux,
} from '../slice/produccionSlice';
import { api } from '../../../../../api/axios';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_error = (
  message: ToastContent = 'Algo pasó, intente de nuevo'
) =>
  toast.error(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_success = (message: ToastContent) =>
  toast.success(message, {
    position: 'bottom-right',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: 'light',
  });

// Obtener viveros
export const get_nurseries_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/camas-siembras/siembra/get-viveros/'
      );
      dispatch(set_nurseries(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nursery_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener material vegetal filtro
export const get_vegetal_materials_service = (
  id: number,
  code_bien: string,
  name: string,
  cod_etapa: string,
  anio: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/etapas/filtro-material-vegetal/${id}/?codigo_bien=${code_bien}&nombre=${name}&cod_etapa_lote=${cod_etapa ?? ''
        }&agno_lote=${anio ?? ''}`
      );
      dispatch(set_vegetal_materials(data.data));
      //  console.log('')(data);
      if ('data' in data) {
        if (data.data.length > 0) {
          control_success('Se encontraron materiales vegetales');
        } else {
          control_error('No se encontraron materiales vegetales');
        }
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_vegetal_materials_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener siembras
export const get_stage_changes_service = (
  id: number,
  code_bien: string,
  name: string,
  cod_etapa: string,
  anio: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/etapas/filtro-cambio-etapa/${id}/?codigo_bien=${code_bien}&nombre=${name}&cod_etapa_lote_origen=${cod_etapa ?? ''
        }&agno_lote=${anio ?? ''}`
      );
      //  console.log('')(data);
      dispatch(set_stage_changes(data.data));
      if (data.data.length > 0) {
        control_success('Se encontraron cambios de etapa');
      } else {
        control_error('No se encontraron cambios de etapa');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('set_stage_changes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener personas filtro
export const get_persons_service = (
  type: string | null,
  document: string | null,
  primer_nombre: string | null,
  primer_apellido: string | null,
  razon_social: string | null,
  comercial_name: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-filters/?tipo_documento=${type ?? ''
        }&numero_documento=${document ?? ''}&primer_nombre=${primer_nombre ?? ''
        }&primer_apellido=${primer_apellido ?? ''}&razon_social=${razon_social ?? ''
        }&nombre_comercial=${comercial_name ?? ''}`
      );
      dispatch(set_persons(data.data));
      if (data.data.length > 0) {
        control_success('Se encontrarón personas');
      } else {
        control_error('No se encontrarón personas');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_persons_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener persona por documento
export const get_person_document_service = (
  type: string,
  document: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-by-document/${type}/${document}/`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_changing_person(data.data));
        control_success('Se selecciono la persona ');
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_person_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener persona por iddocumento
export const get_person_id_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`personas/get-by-id/${id}/`);
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(
          set_changing_person({
            id_persona: data.data.id_persona,
            tipo_documento: data.data.tipo_documento,
            numero_documento: data.data.numero_documento,
            nombre_completo:
              String(data.data.primer_nombre) +
              ' ' +
              String(data.data.primer_apellido),
          })
        );
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_person_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener persona por iddocumento
export const get_person_anula_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`personas/get-by-id/${id}/`);

      if ('data' in data) {
        dispatch(
          set_persona_anula({
            id_persona: data.data.id_persona,
            tipo_documento: data.data.tipo_documento,
            numero_documento: data.data.numero_documento,
            nombre_completo:
              String(data.data.primer_nombre) +
              ' ' +
              String(data.data.primer_apellido),
          })
        );
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_person_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const get_mezclas_service = (name: string): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mezclas/get-list-mezclas/?nombre=${name ?? ''}`
      );
      //  console.log('')(data);
      dispatch(set_mezclas(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_mezcla_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// crear cambio de etapa
export const add_stage_change_service = (cambio: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'conservacion/etapas/guardar-cambio-etapa/',
        cambio
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crear cambio de etapa
export const annul_stage_change_service = (id: number, cambio: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/etapas/anular-cambio-etapa/${id}/`,
        cambio
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar cambio etapa
export const edit_stage_change_service = (cambio: any, id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/etapas/actualizar-cambio-etapa/${id}/`,
        cambio
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('edit_stage_change_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar siembra
export const edit_siembra_service = (siembra: any, id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(siembra, id);
      const { data } = await api.put(
        `conservacion/camas-siembras/siembra/update/${id}/`,
        siembra
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener bienes preparacion
export const get_bien_preparacion_id_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mezclas/get-items-preparacion-mezclas/?id_preparacion_mezcla=${id}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_preparacion_bienes(data.data));
      } else {
        // control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bien_preparacion_id_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener preparaciones filtro
export const get_preparaciones_service = (
  mezcla: number,
  vivero: string,
  name: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mezclas/filtro-preparacion-mezclas/?id_mezcla=${mezcla ?? ''
        }&id_vivero=${vivero ?? ''}&nombre_mezcla=${name ?? ''}`
      );
      dispatch(set_preparaciones(data.data));
      //  console.log('')(data);
      if ('data' in data) {
        if (data.data.length > 0) {
          control_success('Se encontraron preparaciones');
        } else {
          control_error('No se encontraron preparaciones');
        }
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_vegetal_materials_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crear cambio de etapa
export const add_preparacion_service = (preparacion: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        'conservacion/mezclas/crear-preparacion-mezclas/',
        preparacion
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar siembra
export const edit_preparacion_service = (preparacion: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        'conservacion/mezclas/actualizar-preparacion-mezclas/',
        preparacion
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('edit_preparacion_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener bienes preparacion
export const annul_preparacion_service = (
  id: number,
  preparacion: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/mezclas/anular-preparacion-mezclas/${id}/`,
        preparacion
      );

      if (data.success === true) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_person_document_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes incidencia
export const get_bienes_incidencia_service = (
  id_vivero: string | number,
  codigo_bien: string | null,
  nombre: string | null,
  tipo: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=`);
      const { data } = await api.get(
        `conservacion/incidencias/get-bienes-mezclas-by-lupa/${id_vivero}/?tipo_bien=${tipo ?? 'IN'
        }&codigo_bien=${codigo_bien ?? ''}&nombre=${nombre ?? ''}`
      );
      //  console.log('')(data);
      dispatch(set_bienes(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener bienes preparacion
export const get_bienes_service = (
  id_vivero: string | number,
  codigo_bien: string | null,
  nombre: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=`);
      const { data } = await api.get(
        `conservacion/mezclas/get-insumo-por-codigo-y-nombre/?id_vivero=${id_vivero}&codigo_bien=${codigo_bien ?? ''
        }&nombre=${nombre ?? ''}`
      );
      dispatch(set_bienes(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes preparacion aux
export const get_bienes_aux_service = (id_vivero: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/?codigo_bien=${codigo_bien ?? ""}&nombre=${nombre??""}&cod_tipo_elemento_vivero=`);
      const { data } = await api.get(
        `conservacion/mezclas/get-insumo-por-codigo-y-nombre/?id_vivero=${id_vivero}`
      );
      dispatch(set_bienes_aux(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_bienes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener lotes pór codigo de material vegetal
export const get_lots_code_service = (
  id_vivero: number | string,
  code: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mortalidad/material-vegetal/get-by-codigo/${id_vivero}/?codigo_bien=${code}/`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.data.length > 0) {
        if (data.data.length === 1) {
          dispatch(set_current_siembra_material_vegetal(data.data[0]));
          control_success('Se selecciono el lote');
        } else {
          dispatch(set_siembras_material_vegetal(data.data));
          control_success('Se encontraron lotes');
        }
      } else {
        control_error('No se encontró el lote');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_lots_code_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener lotes filtro
export const get_lots_service = (
  id_vivero: string | number,
  code: string | null,
  name: string | null,
  cod_etapa: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mortalidad/material-vegetal/filtro/${id_vivero}/?codigo_bien=${code ?? ''
        }&nombre=${name ?? ''}&cod_etapa_lote=${cod_etapa ?? ''}`
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_siembras_material_vegetal(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_lots_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener viveros cuarentena
export const get_nurseries_mortalidad_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/levantamiento-cuarentena/filtro-vivero/'
      );
      dispatch(set_nurseries(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nurseries_motalidad_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener mortalidades filtro
export const get_mortalidades_service = (nro: number | null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mortalidad/get-mortalidad-by-nro/?nro_registro_mortalidad=${nro ?? ''
        }`
      );
      // const { data } = await api.get('conservacion/ingreso-cuarentena/get-ingresos-cuarentena/');
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_mortalidades(data?.data?.items_mortalidad));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_mortalidades_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener mortalidades filtro
export const get_mortalidad_nro_service = (nro: number | null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mortalidad/get-mortalidad-by-nro/?nro_registro_mortalidad=${nro ?? ''
        }`
      );
      // const { data } = await api.get('conservacion/ingreso-cuarentena/get-ingresos-cuarentena/');
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_current_mortalidad(data.data));
        control_success('sé selecciono la mortalidad');
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_mortalidad_nro_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crearmortalidad
export const add_mortalidad_service = (mortalidad: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'conservacion/mortalidad/registrar/',
        mortalidad
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_mortalidad_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar ingreso a cuarentena
export const edit_mortalidad_service = (id: number, mortalidad: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/mortalidad/actualizar/${id}/`,
        mortalidad
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('edit_quarantine_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// borrar siembra
export const annul_mortalidad_service = (id: number, mortalidad: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/mortalidad/anular/${id}/`,
        mortalidad
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('annul_mortalidad_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener bienes mortalidad
export const get_bien_mortalidad_id_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mortalidad/get-items-mortalidad-by-id/${id}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_items_mortalidad(data.data));
      } else {
        // control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bien_mortalidad_id_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener viveros cuarentena
export const get_nro_mortalidad_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('conservacion/mortalidad/get-ultimo-nro/');
      dispatch(set_nro_mortalidad(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nro_mortalidad_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener incidenciaes filtro
export const get_incidencias_service = (nro: number | null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/incidencias/get-incidencia-by-vivero/${nro ?? ''}/`
      );
      // const { data } = await api.get('conservacion/ingreso-cuarentena/get-ingresos-cuarentena/');
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_incidencias(data.data));
        // control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_incidenciaes_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crearincidencia
export const add_incidencia_service = (
  id_vivero: number,
  incidencia: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `conservacion/incidencias/create-incidencias/${id_vivero}/`,
        incidencia
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_incidencia_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar ingreso a cuarentena
export const edit_incidencia_service = (id: number, incidencia: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/incidencias/actualizacion-incidencias/${id}/`,
        incidencia
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('edit_incidencia_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// borrar siembra
export const annul_incidencia_service = (id: number, incidencia: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/incidencias/anulacion-incidencias/${id}/`,
        incidencia
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('annul_incidencia_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener bienes incidencia
export const get_bien_incidencia_id_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/incidencias/get-consumo-by-incidencia/${id}`
      );
      //  console.log('')(data);
      if ('data' in data) {
        dispatch(set_preparacion_bienes(data.data));
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_bien_incidencia_id_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  initial_state_planting,
  set_goods,
  set_nurseries,
  set_vegetal_materials,
  set_germination_beds,
  set_planting_goods,
  set_plantings,
  set_current_planting,
  set_planting_person,
  set_persons,
  set_current_germination_beds,
  set_current_plant_quarantine,
  set_current_plant_seed_lot,
  set_plant_seed_lots,
  set_plant_quarantines,
  set_plant_quarantine_lifting,
  set_plant_quarantine_mortalities,
  set_current_good,
  initial_satate_current_plant_seed_lot,
  initial_satate_current_plant_quarantine,
  set_goods_aux,
} from '../slice/materialvegetalSlice';
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

// Obtener material vegetal
export const get_vegetal_materials_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/camas-siembras/siembra/get-material-vegetal/'
      );
      dispatch(set_vegetal_materials(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_vegetal_materials_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener camas germinacion
export const get_germination_beds_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/camas-siembras/siembra/get-camas-germinacion-siembra/${id}/`
      );
      dispatch(set_germination_beds(data.data));
      if (data.data.length <= 0) {
        control_error(
          'El vivero seleccionado no tiene camas de germinación disponibles'
        );
      }

      return data;
    } catch (error: any) {
      //  console.log('')('get_germination_beds_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener camas germinacion
export const get_germination_beds_id_service = (camas: number[]): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const camas_gemination_id: any = { camas_list: camas };
      const { data } = await api.post(
        'conservacion/camas-siembras/siembra/get-camas-germinacion-by-id-list/',
        camas_gemination_id
      );
      dispatch(set_current_germination_beds(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_germination_beds_id_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bienes siembra
export const get_planting_goods_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/camas-siembras/siembra/get-bienes-consumidos/${id}/`
      );
      dispatch(set_planting_goods(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_planting_goods_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener bienes vivero
export const get_goods_service = (
  id_vivero: string | number,
  codigo_bien: string | null,
  nombre: string | null,
  cod_elemento: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/?codigo_bien=${
          codigo_bien ?? ''
        }&nombre=${nombre ?? ''}&cod_tipo_elemento_vivero=${cod_elemento ?? ''}`
      );
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/`);

      dispatch(set_goods(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_planting_goods_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener bienes vivero
export const get_goods_aux_service = (id_vivero: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/`
      );
      // const { data } = await api.get(`conservacion/camas-siembras/siembra/get-bienes-por-consumir-lupa/${id_vivero}/`);
      //  console.log('')(data);
      dispatch(set_goods_aux(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_planting_goods_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener bien actual
export const get_good_code_siembra_service = (
  id_vivero: string | number,
  code: string | number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/bajas/get-bienes-bajas/${code}/${id_vivero}/`
      );
      if ('data' in data) {
        dispatch(set_current_good(data.data));
        control_success('Se selecciono el bien');
      } else {
        control_error('no sé encontrarion bienes');
      }

      return data;
    } catch (error: any) {
      //  console.log('')('get_good_code_baja_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener siembras
export const get_plantings_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/camas-siembras/siembra/get/'
      );
      //  console.log('')(data);
      dispatch(set_plantings(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_plantings_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener siembra actual
export const get_current_planting_service = (id: string | number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/camas-siembras/siembra/get/${id}/`
      );
      dispatch(set_current_planting(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_current_planting_service');
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
        `personas/get-personas-filters/?tipo_documento=${
          type ?? ''
        }&numero_documento=${document ?? ''}&primer_nombre=${
          primer_nombre ?? ''
        }&primer_apellido=${primer_apellido ?? ''}&razon_social=${
          razon_social ?? ''
        }&nombre_comercial=${comercial_name ?? ''}`
      );
      dispatch(set_persons(data.data));
      if (data.data.length > 0) {
        control_success('Se selecciono persona');
      } else {
        control_error('No se encontro persona');
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
      if ('data' in data) {
        if (data.data.length > 0) {
          dispatch(set_planting_person(data.data));
          control_success('Se selecciono la persona ');
        } else {
          control_error('No se encontro la persona');
        }
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

      if ('data' in data) {
        dispatch(
          set_planting_person({
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

// crear siembra
export const add_siembra_service = (siembra: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'conservacion/camas-siembras/siembra/create/',
        siembra
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
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
export const edit_siembra_service = (siembra: any, id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/camas-siembras/siembra/update/${id}/`,
        siembra
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// borrar siembra
export const delete_siembra_service = (id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `conservacion/camas-siembras/siembra/delete/${id}/`
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success === true) {
        control_success(data.detail);
        dispatch(set_current_planting(initial_state_planting));
        dispatch(set_planting_goods([]));
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener viveros cuarentena
export const get_nurseries_quarantine_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'conservacion/ingreso-cuarentena/get-viveros/'
      );
      dispatch(set_nurseries(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('get_nurseries_service');
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
        `conservacion/ingreso-cuarentena/get-lotes-etapa/${id_vivero}/${code}/`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.data.length > 0) {
        if (data.data.length === 1) {
          dispatch(set_current_plant_seed_lot(data.data[0]));
          control_success('Se selecciono el lote');
        } else {
          dispatch(set_plant_seed_lots(data.data));
          control_success('Se encontraron lotes');
        }
      } else {
        control_error('No se encontró el lote');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
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
  agno_lote: number | null,
  cod_etapa: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/ingreso-cuarentena/get-lotes-etapa/${id_vivero}/?codigo_bien=${
          code ?? ''
        }&nombre=${name ?? ''}&agno_lote=${agno_lote ?? ''}&cod_etapa_lote=${
          cod_etapa ?? ''
        }`
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_plant_seed_lots(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_MV_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener cuarentenas filtro
export const get_plant_quarantines_service = (
  code: string | null,
  name: string | null,
  agno_lote: number | null,
  cod_etapa: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/ingreso-cuarentena/get-ingreso-cuarentena/?codigo_bien=${
          code ?? ''
        }&nombre=${name ?? ''}&agno_lote=${agno_lote ?? ''}&cod_etapa_lote=${
          cod_etapa ?? ''
        }`
      );
      // const { data } = await api.get('conservacion/ingreso-cuarentena/get-ingresos-cuarentena/');
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_plant_quarantines(data.data));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener mortalidad por cuarentena id
export const get_mortalities_service = (id_cuarentena: number | null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/mortalidad/get-historial-mortalidad/${
          id_cuarentena ?? ''
        }/`
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        dispatch(set_plant_quarantine_mortalities(data.data));
        // control_success(data.detail)
      } else {
        // control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crear ingreso a cuarentena
export const add_plant_quarantine_service = (quarantine: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'conservacion/ingreso-cuarentena/create/',
        quarantine
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        dispatch(
          set_current_plant_seed_lot(initial_satate_current_plant_seed_lot)
        );
        dispatch(set_plant_seed_lots([]));
        dispatch(
          set_current_plant_quarantine(initial_satate_current_plant_quarantine)
        );
        dispatch(set_plant_quarantines([]));
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_quarantine_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar ingreso a cuarentena
export const edit_plant_quarantine_service = (
  quarantine: any,
  id: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/ingreso-cuarentena/update/${id}/`,
        quarantine
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        dispatch(set_plant_quarantines([]));
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

// anular cuarentena
export const annul_plant_quarantine_service = (
  id: number,
  quarantine: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/ingreso-cuarentena/anular/${id}/`,
        quarantine
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
      //  console.log('')('anular_quarantine_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener cuarentenas pór codigo de material vegetal
export const get_quareantines_code_service = (
  id_vivero: number | string,
  code: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/levantamiento-cuarentena/get-registro-cuarentena-by-codigo-bien/${id_vivero}/?codigo_bien=${code}`
      );
      //  console.log('')(data);
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.data.length > 0) {
        if (data.data.length === 1) {
          dispatch(set_current_plant_quarantine(data.data[0]));
          control_success('Se selecciono el ingreso a cuarentena');
        } else {
          dispatch(set_plant_quarantines(data.data));
          control_success('Se encontraron ingresos a cuarentena');
        }
      } else {
        control_error('No se encontró el ingreso a cuarentena');
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener cuarentenas levantamiento filtro
export const get_lifting_quarantines_service = (
  id_vivero: number | null,
  code: string | null,
  name: string | null,
  agno_lote: number | null,
  cod_etapa: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/levantamiento-cuarentena/get-registro-cuarentena-by-lupa/${
          id_vivero ?? ''
        }/?codigo_bien=${code ?? ''}&nombre=${name ?? ''}&agno_lote=${
          agno_lote ?? ''
        }&cod_etapa_lote=${cod_etapa ?? ''}`
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        if (data.data.length > 0) {
          dispatch(set_plant_quarantines(data.data));
          control_success(data.detail);
        } else {
          control_error('No sé encontrarón cuarentenas');
        }
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener levantamiento por cuarentena id
export const get_liftings_service = (id_cuarentena: number | null): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `conservacion/levantamiento-cuarentena/historial-levantamiento-cuarentena/${
          id_cuarentena ?? ''
        }/`
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      //  console.log('')(data);
      if (data.success === true) {
        if ('data' in data) {
          dispatch(set_plant_quarantine_lifting(data.data));
        } else {
          dispatch(set_plant_quarantine_lifting([]));
        }
        // control_success(data.detail)
      } else {
        // control_error(data.detail)
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_siembra_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crear ingreso a cuarentena
export const add_lifting_quarantine_service = (quarantine: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        'conservacion/levantamiento-cuarentena/guardar-levantamiento-cuarentena/',
        quarantine
      );
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (data.success) {
        control_success(data.detail);
      } else {
        control_error(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('add_quarantine_service');
      //  console.log('')(error);
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar ingreso a cuarentena
export const edit_lifting_quarantine_service = (
  quarantine: any,
  id: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/levantamiento-cuarentena/actualizar-levantamiento-cuarentena/${id}/`,
        quarantine
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
export const annul_lifting_quarantine_service = (
  id: number,
  quarantine: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `conservacion/levantamiento-cuarentena/anular-levantamiento-cuarentena/${id}/`,
        quarantine
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
      //  console.log('')('anular_quarantine_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

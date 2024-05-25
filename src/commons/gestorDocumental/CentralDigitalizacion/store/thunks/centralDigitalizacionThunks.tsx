/* eslint-disable @typescript-eslint/naming-convention */
import { useContext, type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices
import {
  set_digitization_request,
  set_digitization_requests,
  set_file_categories,
  set_file_origin,
  set_file_origins,
  set_file_typologies,
  set_file_typology,
  set_list_request_status,
  set_request_types,
  set_storage_mediums,
} from '../slice/centralDigitalizacionSlice';
import { api } from '../../../../../api/axios';
import { IObjListType } from '../../interfaces/central_digitalizacion';
import { OpcionOtrosContext } from '../../context/BusquedaOtrosDigitalizacion';

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

const map_list = (
  list: any[],
  is_choice: boolean,
  id?: number | string,
  key?: number | string,
  label?: number | string
): any => {
  //  console.log('')(list);
  let list_aux: IObjListType[] = [];
  if (is_choice) {
    list.forEach((objeto) => {
      list_aux.push({ id: objeto[0], key: objeto[0], label: objeto[1] });
    });
  } else {
    list.forEach((objeto) => {
      list_aux.push({
        id: objeto[id ?? ''],
        key: objeto[key ?? ''],
        label: objeto[label ?? ''],
      });
    });
  }
  return list_aux;
};

// Obtener tipos de solictud
export const get_request_types_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/tipo-solicitud/');
      dispatch(set_request_types(map_list(data, true)));
      //  console.log('')(data);
      return data;
    } catch (error: any) {
      //  console.log('')('get_request_types_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener estados de solicitud
export const get_list_request_status_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/estado-solicitud/');
      //  console.log('')(data);
      dispatch(set_list_request_status(map_list(data, true)));
      return data;
    } catch (error: any) {
      //  console.log('')('get_list_request_status_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener tipologias de archivo
export const get_file_typology_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'gestor/expedientes-archivos/expedientes/listar-tipologias/'
      );
      //  console.log('')(data);

      dispatch(
        set_file_typologies(
          map_list(
            data.data,
            false,
            'id_tipologia_documental',
            'id_tipologia_documental',
            'nombre'
          )
        )
      );
      return data;
    } catch (error: any) {
      //  console.log('')('get_file_typology_service');
      control_error(error.response.data.detail);
      return error as AxiosError;            
    }
  };
};
//gestor/central-digitalizacion/get-solicitudes-pendientes/
// gestor/central-digitalizacion/otros/get-solicitudes-pendientes/
// const {opcion_otros}=useContext(OpcionOtrosContext)

export const get_digitalization_requests_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/central-digitalizacion/get-solicitudes-pendientes/`,
        { params }
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_requests(data.data));
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const get_digitalization_requests_service_otros = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/central-digitalizacion/otros/get-solicitudes-pendientes/`,
        { params }
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_requests(data.data));
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};



export const get_Opas = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `/gestor/central-digitalizacion/opas/get-solicitudes-pendientes/`,
        { params }
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_requests(data.data));
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const get_digitalization_responses_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/central-digitalizacion/get-solicitudes-respondidas/`,
        { params }
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_requests(data.data));
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// repondidas OPAS 
export const get_digitalization_opas_responses_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/central-digitalizacion/opas/get-solicitudes-respondidas/`,
        { params }
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_requests(data.data));
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener personas filtro
export const get_digitalization_request_id_service = (id: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `/gestor/central-digitalizacion/get-solicitudes-by-id/${id}`
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_request(data.data));
        // control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      console.log('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


//opas
export const get_digitalization_opas = (id: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `/gestor/central-digitalizacion/opas/get-solicitudes-by-id/${id}`
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_request(data.data));
        // control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      console.log('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener medios almacenamientos
export const get_storage_mediums_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/medio-almacenamiento/');
      dispatch(set_storage_mediums(map_list(data, true)));
      return data;
    } catch (error: any) {
      //  console.log('')('get_storage_mediums_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// Obtener categorias de archivo
export const get_file_categories_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/tipo-archivo/');
      dispatch(set_file_categories(map_list(data, true)));
      //  console.log('')(data);
      return data;
    } catch (error: any) {
      //  console.log('')('get_file_categories_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener origenes de archivo
export const get_file_origin_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/origen-archivo/');
      //  console.log('')(data);
      dispatch(set_file_origins(map_list(data, true)));
      return data;
    } catch (error: any) {
      //  console.log('')('get_file_origin_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// crear metadata
export const add_metadata_service = (metadata: any, id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(metadata);
      const { data } = await api.post(
        `gestor/central-digitalizacion/crear-digitalizacion/`,
        metadata
      );
      //  console.log('')(data);

      control_success(data.detail);
      dispatch(get_digitalization_request_id_service(id));
      dispatch(get_digitalization_opas(id));

      
      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('add_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// crear metadata OPAS 
export const add_metadata_opas_service = (metadata: any, id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      //  console.log('')(metadata);
      const { data } = await api.post(
        `gestor/central-digitalizacion/opas/crear-digitalizacion/`,
        metadata
      );
      //  console.log('')(data);

      control_success(data.detail);
      dispatch(get_digitalization_request_id_service(id));
      dispatch(get_digitalization_opas(id));

      
      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('add_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar metadata OPAS 
export const edit_metadata_opas_service = (metadata: any, id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `/gestor/central-digitalizacion/opas/actualizar-digitalizacion/`,
        metadata
      );
      //  console.log('')(data);

      control_success(data.detail);
      // dispatch(get_digitalization_request_id_service(id));
      dispatch(get_digitalization_opas(id));

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('edit_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// editar metadata
export const edit_metadata_service = (metadata: any, id: number): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/central-digitalizacion/actualizar-digitalizacion/`,
        metadata
      );
      //  console.log('')(data);

      control_success(data.detail);
      dispatch(get_digitalization_request_id_service(id));
      dispatch(get_digitalization_opas(id));

      
      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('edit_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};






// // editar metadata_esta es la que funcina y d ebo dejar
// export const edit_metadata_service = (metadata: any, id: number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.put(
//         `gestor/central-digitalizacion/actualizar-digitalizacion/`,
//         metadata
//       );
//       //  console.log('')(data);

//       control_success(data.detail);
//       dispatch(get_digitalization_request_id_service(id));

//       // dispatch(set_pqr(data.data));
//       return data;
//     } catch (error: any) {
//       //  console.log('')('edit_metadata_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// editar metadata
export const delete_metadata_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/central-digitalizacion/eliminar-digitalizacion/`,
        { params }
      );
      console.log(data);

      control_success(data.detail);
      dispatch(
        get_digitalization_request_id_service(
          params.id_solicitud_de_digitalizacion
        )
      );

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      console.log('delete_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar metadata
export const delete_metadata_opas_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `/gestor/central-digitalizacion/opas/eliminar-digitalizacion/`,
        { params }
      );
      console.log(data);

      control_success(data.detail);
      dispatch(
        get_digitalization_opas(
          params.id_solicitud_de_digitalizacion
        )
      );

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      console.log('delete_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// editar metadata
export const response_request_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/central-digitalizacion/responder-digitalizacion/`,
        params
      );
      console.log(data);

      control_success(data.detail);
      dispatch(
        get_digitalization_request_id_service(
          params.id_solicitud_de_digitalizacion
        )
      );

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      console.log('response_request_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
//stiven_funcion_otros
export const response_request_service_otros = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/central-digitalizacion/otros/responder-digitalizacion/`,
        params
      );
      console.log(data);

      control_success(data.detail);
      dispatch(
        get_digitalization_request_id_service_otros(
          params.id_solicitud_de_digitalizacion
        )
      );

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      console.log('response_request_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};





//stiven_funcion_otros
export const get_digitalization_request_id_service_otros = (id: any): any => {

  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `/gestor/central-digitalizacion/otros/get-solicitudes-by-id/${id}`
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_request(data.data));
        // control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      console.log('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

//stiven_funcion_otros
export const add_metadata_service_otros = (id: number, archivo: any, datos_totales: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const formData = new FormData();

      formData.append('data_digitalizacion', JSON.stringify(datos_totales));
      if (archivo !== null) {
        formData.append(`archivo`, archivo);
      }


      const { data } = await api.post(
        `gestor/central-digitalizacion/otros/crear-digitalizacion/`,
        formData
      );
      //  console.log('')(data);

      control_success(data.detail);
      dispatch(get_digitalization_request_id_service_otros(id));
      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      //  console.log('')('add_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};






//stiven_funcion_otros

export const delete_metadata_service_otros = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/central-digitalizacion/otros/eliminar-digitalizacion/`,
        { params }
      );
      console.log(data);

      control_success(data.detail);
      dispatch(
        get_digitalization_request_id_service_otros(
          params.id_solicitud_de_digitalizacion
        )
      );

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      console.log('delete_metadata_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};






//stiven_funcion_otros
export const edit_metadata_service_otros = (id: number, archivo: any, datos_totales: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const formData = new FormData();

      formData.append('data_digitalizacion', JSON.stringify(datos_totales));
       if (archivo !== null) {
        formData.append(`archivo`, archivo);
       }

      // Realiza la solicitud a la API utilizando los datos preparados
      const { data } = await api.put(
        `gestor/central-digitalizacion/otros/actualizar-digitalizacion/`,
        formData
      );
      // Maneja el éxito de la solicitud
      control_success(data.detail);

      // Despacha una acción para obtener la solicitud de digitalización actualizada
      dispatch(get_digitalization_request_id_service_otros(id));

      return data;
    } catch (error: any) {
      // Maneja los errores de la solicitud
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
//stiven_funcion_otros
export const get_digitalization_responses_service_otros = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/central-digitalizacion/otros/get-solicitudes-respondidas/`,
        { params }
      );
      console.log(data);
      if (data.success) {
        dispatch(set_digitization_requests(data.data));
        control_success(data.detail);
      }
      return data;
    } catch (error: any) {
      //  console.log('')('get_digitalization_requests_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};









// editar metadata OPAS
export const response_request_opas_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/central-digitalizacion/opas/responder-digitalizacion/`,
        params
      );
      console.log(data);

      control_success(data.detail);
      dispatch(
        get_digitalization_opas(
          params.id_solicitud_de_digitalizacion
        )
      );

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      console.log('response_request_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};


// {
// 	"id_solicitud_de_digitalizacion": 45,
// 	"id_anexo": 195,
// 	"nro_folios_documento": 1,
// 	"asunto": "asunto metadato creado",
// 	"cod_origen_archivo": "F",
// 	"cod_categoria_archivo": "Tx",
// 	"tiene_replica_fisica": true,
// 	"tipologia_no_creada_TRD": null,
// 	"id_tipologia_doc": 1,
// 	"palabras_clave_doc": "palabra1|palabra2",
// 	"descripcion": "descripción metadato creado",
// 	"observacion_digitalizacion": "Observacion"
// }



// {
//   "id_solicitud_de_digitalizacion":55,
//   "id_anexo":471,
//   "nro_folios_documento":1,
//   "asunto":"m",
//   "cod_origen_archivo":"E",
//   "cod_categoria_archivo":"Im",
//   "tiene_replica_fisica":false,
//   "tipologia_no_creada_TRD":null,
//   "id_tipologia_doc":2,
//   "palabras_clave_doc":"m",
//   "descripcion":"m",
//   "observacion_digitalizacion":"m",
// }



// "fecha_creacion_doc":"2024-02-20",
// "es_version_original":false,
// "id_archivo_sistema":null,
// "tiene_tipologia":true,
// "fecha_creacion_doc_":"2024-02-20T13:11:02.232Z",
// "tipologia_no_creada_en_TRD":"",
// "id_persona_digitalizo":215,
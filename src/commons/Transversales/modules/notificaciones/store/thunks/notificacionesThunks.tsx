import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
  type AxiosError,
  // type AxiosResponse
} from 'axios';
// Slices

import { api } from '../../../../../../api/axios';
import { NavigateFunction } from 'react-router-dom';
import {
  get_ciudades,
  get_departamentos,
} from '../../../../../../request/getRequest';
import { showAlert } from '../../../../../../utils/showAlert/ShowAlert';
import {
  set_causas_notificacion,
  set_estados_notificacion,
  set_list_document_types,
  set_list_groups,
  set_list_status,
  set_notification_requests,
  set_tipos_notificacion,
  set_tipos_soporte,
} from '../slice/notificacionesSlice';
import { IObjListType } from '../../interfaces/notificaciones';

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
  console.log(list);
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

// obtener radicados filtro pqrsdf
export const get_solicitudes_notificacion = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-notificaciones/`,
        {
          params,
        }
      );
      console.log(data);

      dispatch(set_notification_requests(data.data));
      if (data.data.length > 0) {
        control_success(data.detail);
      } else {
        control_error(
          'No se encontrarón solicitudes con la busquedad ingresada'
        );
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};

// Obtener tipos documento
export const get_document_types_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/cod-tipo-documento/');
      console.log(data);
      dispatch(set_list_document_types(map_list(data.data, true)));
      return data;
    } catch (error: any) {
      console.log('get_document_types_service');
      control_error(error);
      return error as AxiosError;
    }
  };
};
// Obtener tipos documento
export const get_status_list_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'gestor/choices/cod-estado-notificaciones/'
      );
      console.log(data.data);

      dispatch(set_list_status(map_list(data.data, true)));
      return data;
    } catch (error: any) {
      console.log('get_document_types_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
// Obtener tipos documento
export const get_groups_list_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        'gestor/consecutivos-unidades/unidades_organigrama_actual/get/'
      );
      console.log(data);

      dispatch(
        set_list_groups(
          map_list(
            data.data,
            false,
            'id_unidad_organizacional',
            'id_unidad_organizacional',
            'nombre'
          )
        )
      );
      return data;
    } catch (error: any) {
      console.log('get_document_types_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

// obtener radicados filtro pqrsdf
export const get_tipos_notificacion = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-tipos-notificaciones/`
      );
      console.log(data);

      dispatch(set_tipos_notificacion(data.data));

      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};

export const add_tipo_notificacion = (tipo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `gestor/notificaciones/create-tipos-notificaciones/`,
        tipo
      );
      console.log(data);

      dispatch(get_tipos_notificacion());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón tipos');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const edit_tipo_notificacion = (tipo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-tipos-notificaciones/${tipo.id_tipo_notificacion_correspondencia}/`,
        tipo
      );
      console.log(data);

      dispatch(get_tipos_notificacion());

      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón tipos');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const delete_tipo_notificacion = (tipo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/notificaciones/delete-tipos-notificaciones/${tipo.id_tipo_notificacion_correspondencia}/`
      );
      console.log(data);

      dispatch(get_tipos_notificacion());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón tipos');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const get_causas_notificacion = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-Causas-notificaciones/`
      );
      console.log(data);

      dispatch(set_causas_notificacion(data.data));

      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};

export const add_causa_notificacion = (causa: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `gestor/notificaciones/create-Causas-notificaciones/`,
        causa
      );
      console.log(data);

      dispatch(get_causas_notificacion());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón causas');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const edit_causa_notificacion = (causa: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-Causas-notificaciones/${causa.id_causa_o_anomalia}/`,
        causa
      );
      console.log(data);

      dispatch(get_causas_notificacion());

      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón causas');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const delete_causa_notificacion = (causa: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/notificaciones/delete-Causas-notificaciones/${causa.id_causa_o_anomalia}/`
      );
      console.log(data);

      dispatch(get_causas_notificacion());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón causas');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const get_estados_notificacion = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-estado-notificaciones/`
      );
      console.log(data);

      dispatch(set_estados_notificacion(data.data));

      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};

export const add_estado_notificacion = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `gestor/notificaciones/create-estado-notificaciones/`,
        estado
      );
      console.log(data);

      dispatch(get_estados_notificacion());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón estados');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const edit_estado_notificacion = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-estado-notificaciones/${estado.id_estado_notificacion_correspondencia}/`,
        estado
      );

      dispatch(get_estados_notificacion());

      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón estados');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const delete_estado_notificacion = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/notificaciones/delete-estado-notificaciones/${estado.id_estado_notificacion_correspondencia}/`
      );
      console.log(data);

      dispatch(get_estados_notificacion());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón estados');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const get_tipos_soporte = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-tipos-anexos-notificaciones/`
      );
      console.log(data);

      dispatch(set_tipos_soporte(data.data));

      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};

export const add_tipo_soporte = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `gestor/notificaciones/create-tipos-anexos-notificaciones/`,
        estado
      );
      console.log(data);

      dispatch(get_tipos_soporte());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón estados');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const edit_tipo_soporte = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-tipos-anexos-notificaciones/${estado.id_tipo_anexo_soporte}/`,
        estado
      );

      dispatch(get_tipos_soporte());

      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón estados');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};
export const delete_tipo_soporte = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/notificaciones/delete-tipos-anexos-notificaciones/${estado.id_tipo_anexo_soporte}/`
      );
      console.log(data);

      dispatch(get_tipos_soporte());
      if (data.succes) {
        control_success(data.detail);
      } else {
        control_error('No se encontrarón estados');
      }
      return data;
    } catch (error: any) {
      console.log('get_filings_service');
      showAlert(
        'Opps!',
        error.response.data.detail ||
          'Ha ocurrido un error, por favor intente de nuevo',
        'error'
      );
      return error as AxiosError;
    }
  };
};

// Obtener tipos pqr
// export const get_pqr_types_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/cod-tipo-pqrs/');
//       dispatch(
//         set_pqr_types(map_list(data.data, false, 'value', 'value', 'label'))
//       );
//       return data;
//     } catch (error: any) {
//       console.log('get_pqr_types_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener formas presentacion pqr
// export const get_presentation_types_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         'gestor/choices/forma-presentacion-pqrsdf/'
//       );
//       dispatch(set_presentation_types(map_list(data, true)));
//       return data;
//     } catch (error: any) {
//       console.log('get_presentation_types_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener medios presentacion pqr
// export const get_media_types_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         'gestor/pqr/tipos_pqr/buscar-medio-solicitud/'
//       );
//       dispatch(
//         set_media_types(
//           map_list(
//             data.data,
//             false,
//             'id_medio_solicitud',
//             'id_medio_solicitud',
//             'nombre'
//           )
//         )
//       );
//       return data;
//     } catch (error: any) {
//       console.log('get_media_types_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener formas sucursales
// export const get_offices_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         'transversal/sucursales/sucursales-empresa-lista/3'
//       );
//       console.log(data);
//       dispatch(
//         set_destination_offices(
//           map_list(
//             data.data,
//             false,
//             'id_sucursal_empresa',
//             'id_sucursal_empresa',
//             'descripcion_sucursal'
//           )
//         )
//       );
//       return data;
//     } catch (error: any) {
//       console.log('get_offices_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener medios almacenamientos
// export const get_storage_mediums_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/medio-almacenamiento/');
//       dispatch(set_storage_mediums(map_list(data, true)));
//       return data;
//     } catch (error: any) {
//       console.log('get_storage_mediums_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener tipos radicados
// export const get_filed_types_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/tipo-radicado/');
//       console.log(data);
//       dispatch(set_filed_types(map_list(data, true)));
//       return data;
//     } catch (error: any) {
//       console.log('get_filed_types_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener categorias de archivo
// export const get_file_categories_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/tipo-archivo/');
//       dispatch(set_file_categories(map_list(data, true)));
//       console.log(data);
//       return data;
//     } catch (error: any) {
//       console.log('get_file_categories_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener origenes de archivo
// export const get_file_origin_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/origen-archivo/');
//       console.log(data);
//       dispatch(set_file_origins(map_list(data, true)));
//       return data;
//     } catch (error: any) {
//       console.log('get_file_origin_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // Obtener tipologias de archivo
// export const get_file_typology_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         'gestor/expedientes-archivos/expedientes/listar-tipologias/'
//       );
//       console.log(data);

//       dispatch(
//         set_file_typologies(
//           map_list(
//             data.data,
//             false,
//             'id_tipologia_documental',
//             'id_tipologia_documental',
//             'nombre'
//           )
//         )
//       );
//       return data;
//     } catch (error: any) {
//       console.log('get_file_typology_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // Obtener tipos persona
// export const get_person_types_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('choices/tipo-persona/');

//       dispatch(set_person_types(map_list(data, true)));
//       console.log(data);
//       return data;
//     } catch (error: any) {
//       console.log('get_person_types_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // Obtener zonas
// export const get_areas_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/tipo-zona/');

//       dispatch(set_areas(map_list(data, true)));
//       console.log(data);
//       return data;
//     } catch (error: any) {
//       console.log('get_areas_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // Obtener departamentos
// export const get_departments_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await get_departamentos('CO');
//       console.log(data);
//       dispatch(
//         set_departments(map_list(data.data, false, 'value', 'value', 'label'))
//       );
//       return data;
//     } catch (error: any) {
//       console.log('get_departments_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // Obtener departamentos
// export const get_municipalities_service = (department: string): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await get_ciudades(department);
//       console.log(data);
//       dispatch(
//         set_municipalities(
//           map_list(data.data, false, 'value', 'value', 'label')
//         )
//       );
//       return data;
//     } catch (error: any) {
//       console.log('get_municipalities_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // Obtener lista en nombre de
// export const get_list_applicant_types_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/tipo-consulta-pqrsdf/');
//       dispatch(set_list_applicant_types(map_list(data, true)));
//       console.log(data);
//       return data;
//     } catch (error: any) {
//       console.log('get_list_applicant_types_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // Obtener lista en representacion de
// export const get_list_on_behalf_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         'gestor/choices/tipo-representacion-pqrsdf/'
//       );
//       dispatch(set_list_on_behalf_of(map_list(data, true)));
//       console.log(data);
//       return data;
//     } catch (error: any) {
//       console.log('get_list_on_behalf_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // Obtener lista nuevo, o existente
// export const get_pqrs_status_aux_service = (): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get('gestor/choices/estado-pqrsdf/');
//       dispatch(set_list_pqr_status(map_list(data, true)));
//       console.log(data);
//       return data;
//     } catch (error: any) {
//       console.log('get_pqrs_status_aux_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener personas filtro
// export const get_persons_service = (
//   type: string | number | null,
//   document: string | number | null,
//   primer_nombre: string | null,
//   primer_apellido: string | null,
//   razon_social: string | null,
//   comercial_name: string | null,
//   is_person: boolean
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `personas/get-personas-filters/?tipo_documento=${
//           type ?? ''
//         }&numero_documento=${document ?? ''}&primer_nombre=${
//           primer_nombre ?? ''
//         }&primer_apellido=${primer_apellido ?? ''}&razon_social=${
//           razon_social ?? ''
//         }&nombre_comercial=${comercial_name ?? ''}`
//       );
//       console.log(data);
//       if (is_person) {
//         dispatch(set_persons(data.data));
//       } else {
//         dispatch(set_grantors(data.data));
//       }
//       if (data.data.length > 0) {
//         control_success('Se encontraron personas');
//       } else {
//         control_error('No se encontro persona');
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_persons_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener persona por documento
// export const get_person_document_service = (
//   type: string | number,
//   document: string | number,
//   is_person: boolean
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `personas/get-personas-by-document/${type}/${document}/`
//       );
//       console.log(data);

//       if ('data' in data) {
//         if (is_person) {
//           dispatch(set_person(data.data));
//         } else {
//           dispatch(set_grantor(data.data));
//         }
//         control_success('Se selecciono la persona ');
//       } else {
//         control_error(data.detail);
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_person_document_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener empresas filtro
// export const get_companies_service = (
//   type: string | number | null,
//   document: string | number | null,
//   razon_social: string | null,
//   comercial_name: string | null
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `personas/get-empresas-filters/?tipo_persona=J&tipo_documento=${
//           type ?? ''
//         }&numero_documento=${document ?? ''}&razon_social=${
//           razon_social ?? ''
//         }&nombre_comercial=${comercial_name ?? ''}`
//       );
//       dispatch(set_companies(data.data));
//       console.log(data);
//       if (data.data.length > 0) {
//         control_success('Se encontraron empresas');
//       } else {
//         control_error('No se encontro empresa');
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_companies_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener empresa por documento
// export const get_company_document_service = (
//   type: string | number,
//   document: string | number
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `personas/get-empresa-by-document/${type}/${document}/`
//       );
//       console.log(data);

//       if ('data' in data) {
//         dispatch(set_company(data.data));

//         control_success('Se selecciono la empresa ');
//       } else {
//         control_error(data.detail);
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_company_document_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener apoderados
// export const get_attorneys_service = (id: string | number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `personas/apoderados-personas/get-list/${id}/`
//       );
//       console.log(data);
//       dispatch(set_attorneys(data.data));

//       if ('data' in data) {
//         if (data.data.length > 0) {
//           control_success('Se encontraron apoderados');
//         } else {
//           control_error('No se encontro apoderado');
//         }
//       } else {
//         control_error(data.detail);
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_attorneys_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// export const get_attorney_document_service = (
//   type: string | number,
//   document: string | number
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `personas/get-personas-by-document/${type}/${document}/`
//       );
//       console.log(data);

//       if ('data' in data) {
//         dispatch(set_attorney(data.data));
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_attorney_document_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener pqrsdf
// export const get_pqrs_service = (id: string | number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(`gestor/pqr/get_pqrsdf/${id}/`);
//       console.log(data);
//       dispatch(set_pqrs(data.data));

//       if ('data' in data) {
//         if (data.data.length > 0) {
//           control_success('Se encontraron pqrs');
//         } else {
//           control_error('No se encontrarón pqrs');
//         }
//       } else {
//         control_error(data.detail);
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_pqrs_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener pqrsdf por id
// export const get_pqrsdf_id_service = (id: string | number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(`gestor/pqr/get_pqrsdf-panel/${id}`);
//       console.log(data);

//       if ('data' in data) {
//         dispatch(set_pqr(data.data));
//         // control_success('Se selecciono el pqrsdf ');
//       } else {
//         control_error(data.detail);
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_pqrsdf_id_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // crear pqrsdf
// export const add_pqrsdf_service = (
//   pqrsdf: any,
//   navigate: NavigateFunction,
//   navigate_flag?: boolean
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       console.log(pqrsdf);
//       const { data } = await api.post(`gestor/pqr/crear-pqrsdf/`, pqrsdf);
//       console.log(data);

//       control_success(data.detail);
//       if (navigate_flag ?? true) {
//         navigate(
//           `/app/gestor_documental/pqrsdf/crear_pqrsdf/${data.data.id_PQRSDF}`
//         );
//       }

//       dispatch(set_pqr(data.data));
//       return data;
//     } catch (error: any) {
//       console.log('add_pqrsdf_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // editar pqrsdf
// export const edit_pqrsdf_service = (
//   pqrsdf: any,
//   navigate: NavigateFunction
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.put(`gestor/pqr/update-pqrsdf/`, pqrsdf);
//       console.log(data);

//       control_success(data.detail);
//       navigate(
//         `/app/gestor_documental/pqrsdf/crear_pqrsdf/${data.data.id_PQRSDF}`
//       );
//       dispatch(set_pqr(data.data));

//       // if ('data' in data) {
//       //   dispatch(set_pqr(data.data));

//       // } else {
//       //   control_error(data.detail);
//       // }
//       return data;
//     } catch (error: any) {
//       console.log('edit_pqrsdf_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // borrar pqrsdf
// export const delete_pqrsdf_service = (
//   id: number | string,
//   is_web: boolean
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       // eslint-disable-next-line no-unused-vars
//       const params: any = {
//         id_PQRSDF: id,
//         isCreateForWeb: is_web,
//       };
//       const { data } = await api.delete(
//         `gestor/pqr/delete-pqrsdf/?id_PQRSDF=${id}&isCreateForWeb=${
//           is_web ? 'True' : 'False'
//         }`
//       );
//       console.log(data);

//       if (data.success) {
//         control_success(data.detail);
//         dispatch(set_pqr(initial_state_pqr));
//       }
//       return data;
//     } catch (error: any) {
//       console.log('delete_pqrsdf_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // radicar pqrsdf
// export const radicar_pqrsdf_service = (
//   id: number | string,
//   id_user: number,
//   is_web: boolean
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const params: any = {
//         id_PQRSDF: id,
//         id_persona_guarda: id_user,
//         isCreateForWeb: is_web,
//       };
//       const { data } = await api.post(`gestor/pqr/radicar-pqrsdf/`, params);
//       if (data.success) {
//         control_success(data.detail);
//         void dispatch(get_pqrsdf_id_service(id));
//         dispatch(
//           set_filed({
//             ...data.data,
//             numero_radicado_completo: `${data.data.prefijo_radicado}-${data.data.agno_radicado}-${data.data.nro_radicado}`,
//             nombre_tipo_radicado:
//               data.data.cod_tipo_radicado === 'E'
//                 ? 'Entrada'
//                 : data.data.cod_tipo_radicado === 'S'
//                 ? 'Salidad'
//                 : data.data.cod_tipo_radicado === 'I'
//                 ? 'Interno'
//                 : data.data.cod_tipo_radicado === 'U'
//                 ? 'Unico'
//                 : '',
//             titular: data.data.persona_titular,
//           })
//         );
//       }
//       return data;
//     } catch (error: any) {
//       console.log('delete_pqrsdf_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener raduiucado por id
// export const get_filed_id_service = (id: string | number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `gestor/radicados/get-radicado-by-id/${id}`
//       );
//       console.log(data);

//       if ('data' in data) {
//         dispatch(
//           set_filed({
//             ...data.data,
//             numero_radicado_completo: `${data.data.prefijo_radicado}-${data.data.agno_radicado}-${data.data.nro_radicado}`,
//             nombre_tipo_radicado:
//               data.data.cod_tipo_radicado === 'E'
//                 ? 'Entrada'
//                 : data.data.cod_tipo_radicado === 'S'
//                 ? 'Salidad'
//                 : data.data.cod_tipo_radicado === 'I'
//                 ? 'Interno'
//                 : data.data.cod_tipo_radicado === 'U'
//                 ? 'Unico'
//                 : '',
//             titular: data.data.persona_titular,
//           })
//         );
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_pqrsdf_id_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // obtener radicados filtro pqrsdf
// export const get_filings_service = (params: any): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(`gestor/radicados/imprimir-radicado/`, {
//         params,
//       });
//       dispatch(set_filings(data.data));
//       if (data.data.length > 0) {
//         control_success(data.detail);
//       } else {
//         control_error('No se encontrarón radicados con la busquedad ingresada');
//       }
//       return data;
//     } catch (error: any) {
//       console.log('get_filings_service');
//       showAlert(
//         'Opps!',
//         error.response.data.detail ||
//           'Ha ocurrido un error, por favor intente de nuevo',
//         'error'
//       );
//       return error as AxiosError;
//     }
//   };
// };

// // OTROS //

// // obtener otros
// export const get_others_service_id = (id: string | number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(
//         `gestor/radicados/otros/get_otros-panel/${id}/`
//       );
//       console.log(data);

//       if (data.success === true) {
//         dispatch(set_others(data.data));
//       } else {
//         control_error('No se encontrarón otros');
//       }

//       return data;
//     } catch (error: any) {
//       console.log('get_pqrs_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };
// // CREAR OTRO

// export const add_other_service = (
//   otro: any,

//   // eslint-disable-next-line no-unused-vars
//   navigate?: NavigateFunction
// ): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       console.log(otro);
//       const { data } = await api.post(
//         `gestor/radicados/otros/crear-otros/`,
//         otro
//       );
//       console.log(data);

//       control_success(data.detail);
//       // navigate(
//       //   `/app/gestor_documental/pqrsdf/crear_pqrsdf/${data.data.id_PQRSDF}`
//       // );

//       dispatch(set_others(data.data));
//       return data;
//     } catch (error: any) {
//       console.log('add_pqrsdf_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

// // solicitudes otros id titular

// export const get_others_service = (id: string | number): any => {
//   return async (dispatch: Dispatch<any>) => {
//     try {
//       const { data } = await api.get(`gestor/radicados/otros/get_otros/${id}/`);
//       console.log(data);

//       if (data.success === true) {
//         dispatch(set_others(data.data));
//       } else {
//         control_error('No se encontrarón otros');
//       }

//       return data;
//     } catch (error: any) {
//       console.log('get_pqrs_service');
//       control_error(error.response.data.detail);
//       return error as AxiosError;
//     }
//   };
// };

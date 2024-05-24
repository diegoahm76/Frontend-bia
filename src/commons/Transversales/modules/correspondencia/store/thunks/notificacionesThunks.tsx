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
  set_actos_administrativos,
  set_asignacion_funcionario,
  set_causas_notificacion,
  set_estados_notificacion,
  set_expedientes,
  set_list_document_types,
  set_list_groups,
  set_list_status,
  set_notification_requests,
  set_persons,
  set_serie_subserie,
  set_tipos_notificacion,
  set_tipos_soporte,
  set_tramites,
  set_unidades_marcadas,
  set_trd,
  set_tipos_acto_administrativo,
  set_tipos_documento_notificacion,
  set_notification_request,
  set_notifications_per_request,
  set_list_unidades_organizacionales,
  set_list_status_asignation,
  set_soportes,
} from '../slice/notificacionesSlice';
import { IObjListType } from '../../interfaces/notificaciones';
import { set_exhibits } from '../../../../../gestorDocumental/CentralDigitalizacion/store/slice/centralDigitalizacionSlice';

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
export const add_pqrsdf_service = (pqrsdf: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(pqrsdf);
      const { data } = await api.post(
        `gestor/notificaciones/create-notificacion-manual/`,
        pqrsdf
      );
      console.log(data);

      control_success(data.detail);
      // if (navigate_flag ?? true) {
      //   navigate(
      //     `/app/gestor_documental/pqrsdf/crear_pqrsdf/${data.data.id_PQRSDF}`
      //   );
      // }

      // dispatch(set_pqr(data.data));
      return data;
    } catch (error: any) {
      console.log('add_pqrsdf_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
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

export const get_solicitudes_notificacion_funcionario = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-notificaciones-tareas/`,
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
export const get_tareas_service_filter = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-tarear-funcionario/`,
        {
          params,
        }
      );
      console.log(data);

      dispatch(set_notifications_per_request(data.data));
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
export const aceptar_rechazar_solicitud_notificacion_service = (
  id_solicitud: any,
  justificacion: string
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/rechazo-notificacion/${id_solicitud}/`,
        {
          justificacion_rechazo: justificacion,
        }
      );
      console.log(data);

      dispatch(get_solicitudes_notificacion({ flag: 'CD' }));
      if (data.succes) {
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
export const aceptar_rechazar_asignacion_notificacion_service = (
  id_solicitud: any,
  flag: boolean,
  justificacion: string,
  id_funcionario: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-asignacion/${id_solicitud}/`,
        {
          justificacion_rechazo: justificacion,
          flag,
        }
      );
      console.log(data);

      dispatch(
        get_solicitudes_notificacion_funcionario({
          funcionario_asignado: id_funcionario,
          flag: 'CD',
        })
      );
      if (data.succes) {
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
export const aceptar_rechazar_asignacion_tarea_service = (
  id_solicitud: any,
  flag: boolean,
  justificacion: string,
  id_funcionario: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-asignacion-tarea/${id_solicitud}/`,
        {
          justificacion_rechazo: justificacion,
          flag,
        }
      );
      console.log(data);

      dispatch(
        get_solicitudes_notificacion_funcionario({
          funcionario_asignado: id_funcionario,
          flag: 'CD',
        })
      );
      if (data.succes) {
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
export const actualizar_tarea_service = (
  id_solicitud: any,
  id_estado: string,
  id_funcionario: number
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-tarea/${id_solicitud}/`,
        {
          id_estado_actual_registro: id_estado,
        }
      );
      console.log(data);

      dispatch(
        get_solicitudes_notificacion_funcionario({
          funcionario_asignado: id_funcionario,
          flag: 'CD',
        })
      );
      if (data.succes) {
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
export const get_solicitud_notificacion_id_service = (tipo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-notificacion/${tipo}/`
      );
      console.log(data);

      dispatch(set_notification_request(data.data));

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
      const { data } = await api.get(
        'gestor/notificaciones/get-tipos-documentos-notificaciones/'
      );
      console.log(data);
      dispatch(
        set_list_document_types(
          map_list(
            data.data,
            false,
            'id_tipo_documento',
            'id_tipo_documento',
            'nombre'
          )
        )
      );
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
export const get_status_asignation_list_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get('gestor/choices/estado-asignacion-tarea/');
      console.log(data.data);

      dispatch(set_list_status_asignation(map_list(data.data, true)));
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
export const get_tipos_documento_notification = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-tipos-documentos-notificaciones/`
      );
      console.log(data);

      dispatch(set_tipos_documento_notificacion(data.data));

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

export const add_tipo_documento_notificacion = (tipo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `gestor/notificaciones/create-tipos-documentos-notificaciones/`,
        tipo
      );
      console.log(data);

      dispatch(get_tipos_documento_notification());
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
export const edit_tipo_documento_notificacion = (tipo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/update-tipos-documentos-notificaciones/${tipo.id_tipo_documento}/`,
        tipo
      );
      console.log(data);

      dispatch(get_tipos_documento_notification());

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
export const delete_tipo_documento_notificacion = (tipo: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.delete(
        `gestor/notificaciones/delete-tipos-documentos-notificaciones/${tipo.id_tipo_documento}/`
      );
      console.log(data);

      dispatch(get_tipos_documento_notification());
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

export const get_asignaciones_id_person_service = (
  id_person: string | number | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-asignaciones/?id_persona_asignada=${
          id_person ?? ''
        }`
      );
      console.log(data);
      dispatch(set_asignacion_funcionario(data.data));

      if (data.succes) {
        control_success('Se encontraron datos');
      } else {
        control_error('No se encontro persona');
      }
      return data;
    } catch (error: any) {
      console.log('get_persons_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

export const add_asignacion_notificacion = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `gestor/notificaciones/create-asignacion/`,
        estado
      );
      console.log(data);
      dispatch(
        get_solicitud_notificacion_id_service(
          estado.id_notificacion_correspondencia
        )
      );
      dispatch(get_solicitudes_notificacion({ flag: 'CD' }));
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
export const cancelar_asignacion_notificacion = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/cancelar-asignacion-notificacion/${estado}/`
      );
      console.log(data);
      // dispatch(
      //   get_solicitud_notificacion_id_service(
      //     estado.id_notificacion_correspondencia
      //   )
      // );
      dispatch(get_solicitudes_notificacion({ flag: 'CD' }));
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
export const add_asignacion_tarea = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.post(
        `gestor/notificaciones/create-asignacion-tarea/`,
        estado
      );
      console.log(data);
      dispatch(
        get_solicitud_notificacion_id_service(
          estado.id_notificacion_correspondencia
        )
      );
      dispatch(
        get_solicitudes_notificacion_funcionario({
          funcionario_asignado: estado.id_persona_asignada,
          flag: 'CD',
        })
      );
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
export const cancelar_asignacion_tarean = (estado: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.put(
        `gestor/notificaciones/cancelar-asignacion-tarea/${estado}/`
      );
      console.log(data);
      // dispatch(
      //   get_solicitud_notificacion_id_service(
      //     estado.id_notificacion_correspondencia
      //   )
      // );
      dispatch(get_solicitudes_notificacion({ flag: 'CD' }));
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
export const get_tipos_acto_administrativo_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`gestor/notificaciones/get-tipos-actos/`);
      console.log(data);

      dispatch(set_tipos_acto_administrativo(data.data));

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

// obtener radicados filtro pqrsdf
export const get_expedientes_filter = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/consulta/get-list/`,
        {
          params,
        }
      );
      console.log(data);

      dispatch(set_expedientes(data.data));
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
export const get_acto_administrativo_filter = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`gestor/notificaciones/get-actos/`, {
        params,
      });
      console.log(data);

      dispatch(set_actos_administrativos(data.data));
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
export const get_tramite_filter = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(`gestor/notificaciones/get-tramites/`, {
        params,
      });
      console.log(data);

      dispatch(set_tramites(data.data));
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

export const get_personas_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-funcionario/${params}/`
      );
      console.log(data);

      dispatch(set_persons(data.data));

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

export const get_trd_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/trd-actual-retirados/`
      );
      console.log(data);

      dispatch(set_trd(data.data));

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

export const obtener_unidades_marcadas = (id_organigrama: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `transversal/organigrama/unidades/get-sec-sub/${id_organigrama}`
      );

      dispatch(set_unidades_marcadas(data.data));

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

export const obtener_serie_subserie = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/expedientes-archivos/expedientes/serie-subserie-unidad-trd/get/`,
        { params }
      );
      console.log(data.data);
      dispatch(set_serie_subserie(data.data));

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
export const get_subdirecciones_service = (): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/panel_ventanilla/unidades/agrupacion/get/`
      );
      console.log(data);

      dispatch(
        set_list_unidades_organizacionales(
          map_list(
            data.data,
            false,
            'id_unidad_organizacional',
            'id_unidad_organizacional',
            'nombre_unidad'
          )
        )
      );

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

export const get_grupos_id_unidad_service = (
  id_unidad_organizacional: any
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/panel_ventanilla/subseccion-grupo/get/${id_unidad_organizacional}/`
      );

      dispatch(
        set_list_groups(
          map_list(
            data.data,
            false,
            'id_unidad_organizacional',
            'id_unidad_organizacional',
            'nombre_unidad'
          )
        )
      );

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

export const get_funcionarios_unidad_service = (params: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-funcionario/${params}/`
      );
      console.log(data.data);
      dispatch(set_persons(data.data));

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

export const publicar_gaceta_service = (soportes: any, id: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      console.log(soportes);
      const { data } = await api.put(
        `gestor/notificaciones/update-registro-notificacion-gaceta/${id}/`,
        soportes
      );
      console.log(data);
      void dispatch(get_anexos_tarea(id));
      control_success(data.detail);

      return data;
    } catch (error: any) {
      console.log('add_pqrsdf_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const get_anexos_notificacion = (id: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-datos-notificacion-anexos-gaceta/${id}/`
      );
      console.log(data);

      dispatch(set_exhibits(data.data));

      return data;
    } catch (error: any) {
      console.log('add_pqrsdf_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};
export const get_anexos_tarea = (id: any): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `gestor/notificaciones/get-datos-notificacion-anexos-registro/${id}/`
      );
      console.log(data);

      dispatch(set_soportes(data.data));

      return data;
    } catch (error: any) {
      console.log('add_pqrsdf_service');
      control_error(error.response.data.detail);
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

// obtener personas filtro
export const get_persons_service = (
  type: string | number | null,
  document: string | number | null,
  primer_nombre: string | null,
  primer_apellido: string | null,
  razon_social: string | null,
  comercial_name: string | null
): any => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const { data } = await api.get(
        `personas/get-personas-responsible-filters/?tipo_documento=${
          type ?? ''
        }&numero_documento=${document ?? ''}&primer_nombre=${
          primer_nombre ?? ''
        }&primer_apellido=${primer_apellido ?? ''}&razon_social=${
          razon_social ?? ''
        }&nombre_comercial=${comercial_name ?? ''}`
      );
      dispatch(set_persons(data.data));

      return data;
    } catch (error: any) {
      console.log('get_persons_service');
      control_error(error.response.data.detail);
      return error as AxiosError;
    }
  };
};

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

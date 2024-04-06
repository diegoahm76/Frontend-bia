/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
    type AxiosError,
    // type AxiosResponse
} from 'axios';
// Slices

import { api } from '../../../../../api/axios';
import { set_configuraciones } from '../slice/indexConfiTiemposRespPlazoAccion';

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


export const get_configuraciones = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('gestor/configuracion-tiempos-respuesta-accion/configuracion_tiempos_respuesta/get/'
            );
            //  console.log('')(data)
            if (data.succes === true) {
                return dispatch(set_configuraciones(data.data));
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// actualizar 

export const actualizar: any = (
    id: number,
    configurar: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // //  console.log('')(despacho);
            const { data } = await api.put(`gestor/configuracion-tiempos-respuesta-accion/configuracion_tiempos_respuesta/update/${id}/`, configurar);
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail);
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
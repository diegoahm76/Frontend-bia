/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
    type AxiosError,
    // type AxiosResponse
} from 'axios';
import { api } from '../../../../../../api/axios';
import { set_tipologias, set_trd } from '../slice/indexCierreExpedientes';
// Slices



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




// lista de trd

export const get_trd = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('gestor/expedientes-archivos/expedientes/listar-trd/');

            if (data.success === true) {
                dispatch(set_trd(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

export const get_tipologias = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('gestor/expedientes-archivos/expedientes/listar-topologias/');

            if (data.success === true) {
                dispatch(set_tipologias(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};



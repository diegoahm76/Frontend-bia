/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
import { type AxiosError } from 'axios';
import { api } from '../../../../../api/axios';
import { set_depositos } from '../slice/indexArchivoFisico';
import { set_estantes } from '../../../deposito/store/slice/indexDeposito';

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

export const get_depositos = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('gestor/depositos-archivos/archivoFisico/listar-depositos/');
            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_depositos(data.data));
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};



export const estante_deposito = (
    id: number,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/archivoFisico/listar-estante-id/${id}/`

            );
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success === true) {
                dispatch(set_estantes(data.data));
                control_success(data.detail);
            } else {
                control_error(data.detail);
            }
            return data;
        } catch (error: any) {

            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

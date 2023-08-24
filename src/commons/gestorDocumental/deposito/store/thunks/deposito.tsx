import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
    type AxiosError,
    // type AxiosResponse
} from 'axios';
// Slices

import { api } from '../../../../../api/axios';
import { set_depositos, set_sucursales } from '../slice/indexDeposito';

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
export const get_sucursales = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('transversal/sucursales/sucursales-empresa-lista/3'
            );
            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_sucursales(data.data));
            } else {
                control_error(data.detail);
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

export const get_depositos_filtro = (
    nombre_deposito: string | null,
    identificacion_por_entidad: string | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/deposito/buscar-deposito/?nombre_deposito=${nombre_deposito ?? ''}&identificacion_por_entidad=${identificacion_por_entidad ?? ''}`);

            if (data.success === true) {
                dispatch(set_depositos(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
// lista de depositos

export const get_depositos = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('gestor/depositos-archivos/deposito/listar/');

            if (data.success === true) {
                dispatch(set_depositos(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};



export const crear_deposito: any = (
    deposito: any,

) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            console.log(deposito)
            const { data } = await api.post('gestor/depositos-archivos/deposito/crear/', deposito);

            console.log(data)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail)
            } else {
                control_error(data.detail)
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            console.log(error);
            control_error(error.response);

            return error as AxiosError;

        };
    }
}

// actualizar

export const editar_deposito: any = (
    id: number,
    deposito: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // console.log(despacho);
            const { data } = await api.patch(`gestor/depositos-archivos/deposito/actualizar/${id}/`, deposito);
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail);
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            console.log(error);
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// eliminar
export const eliminar_deposito = (
    id: number,


): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.delete(`gestor/depositos-archivos/deposito/eliminar/${id}/`

            );
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail);
            } else {
                control_error(data.detail);
            }
            return data;
        } catch (error: any) {
            console.log('annul_despacho_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
    type AxiosError,
    // type AxiosResponse
} from 'axios';
import { api } from '../../../../../../api/axios';
import { set_expedientes, set_tipologias, set_trd } from '../slice/indexCierreExpedientes';
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



// buscar expediente 

export const get_busqueda_avanzada_expediente = (
    titulo_expediente: string | null,
    trd_nombre: string | number | null,
    fecha_apertura_expediente: string | number | null,
    codigos_uni_serie_subserie: string | null,
    id_serie_origen: string | null,
    id_subserie_origen: string | null,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/expedientes-archivos/expedientes/buscar-expediente/?trd_nombre=${trd_nombre ?? ''}&fecha_apertura_expediente=${fecha_apertura_expediente ?? ''}&titulo_expediente=${titulo_expediente ?? ''}&codigos_uni_serie_subserie=${codigos_uni_serie_subserie ?? ''}&id_serie_origen=${id_serie_origen ?? ''}&id_subserie_origen=${id_subserie_origen ?? ''}`);

            if (data.success === true) {
                dispatch(set_expedientes(data.data));

            }
            console.log(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

export const crear_archivo_soporte: any = (
    archivo: any,
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.post('gestor/expedientes-archivos/expedientes/agregar-archivo-soporte/', archivo);
            //  dispatch(get_nurseries_service());
            control_success('El archivo se agrego correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            console.log(error.response.data);
            return error as AxiosError;
        }
    };
};
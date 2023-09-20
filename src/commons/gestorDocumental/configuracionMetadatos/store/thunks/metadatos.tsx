/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
import { type AxiosError } from 'axios';
import { api } from '../../../../../api/axios';
import { set_metadatos, set_valores_metadatos } from '../slice/indexMetadatos';


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


// crear 
export const crear_metadato: any = (

    metadato: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // console.log(despacho);
            const { data } = await api.post('gestor/metadatos/metadatos-personalizados/crear/', metadato);
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success === true) {
                dispatch(set_metadatos(data.data));
                control_success(data.detail);
            }

            return data;
        } catch (error: any) {
            console.log(error);
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};




// perfil sistema



export const get_tipo_doc = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('listas/tipo-documento/');
            if (data.success === true) {
                //   control_success(data.detail);
                // dispatch(set_tipo_documento(data.data));
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// listar valores metadato

export const get_valores_metadato = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('gestor/metadatos/valores-metadatos/listar/');

            if (data.success === true) {
                dispatch(set_valores_metadatos(data.data));

            }
            console.log(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
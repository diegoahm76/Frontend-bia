/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
import { type AxiosError } from 'axios';
import { api } from '../../../../../api/axios';
import { set_alerta, set_destinatario, set_perfil_sistema, set_persona, set_tipo_documento } from '../slice/indexAlertas';

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

export const get_configuracion_alerta = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('transversal/alertas/configuracion_clase_alerta/get-by-subsistema/RECA');
            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_alerta(data.data));
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

export const programar_repeticion: any = (
    cod: number,
    programacion: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // console.log(despacho);
            const { data } = await api.put(`transversal/alertas/configuracion_clase_alerta/update/${cod}/`, programacion);
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
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


export const get_persona_alerta = (
    cod: string,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`transversal/alertas/personas_alertar/get-by-configuracion/${cod ?? ''}/`);

            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_destinatario(data.data));
            }
            console.log(data)
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


export const get_perfiles_sistema = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('listas/perfiles_sistema/');
            if (data.success === true) {
                //   control_success(data.detail);
                //  dispatch(set_alerta(data.data));
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// perfil sistema

export const get_perfil_sistema = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('listas/perfiles_sistema/');
            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_perfil_sistema(data.data));
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

export const get_tipo_doc = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('listas/tipo-documento/');
            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_tipo_documento(data.data));
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};



export const get_busqueda_persona = (
    tipo_documento: string | null,
    numero_documento: number,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`personas/get-personas-by-document/${tipo_documento ?? ''}/${numero_documento ?? ''}/`);

            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_persona(data.data));
            }
            console.log(data)
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


export const get_busqueda_avanzada_persona = (
    tipo_documento: number | null,
    numero_documento: string | number | null,
    primer_nombre: string | null,
    primer_apellido: string | null,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`personas/get-personas-filters/?tipo_documento=${tipo_documento ?? ''}&numero_documento=${numero_documento ?? ''}&primer_nombre=${primer_nombre ?? ''}&primer_apellido=${primer_apellido ?? ''}`);

            if (data.success === true) {
                dispatch(set_persona(data.data));

            }
            console.log(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
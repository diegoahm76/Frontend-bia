
import { api } from '../../../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
import { type Dispatch } from 'react';
import { get_cv_others, get_marks, get_others } from '../slices/indexCvOtrosActivos';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
    toast.error(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    });

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message: ToastContent) =>
    toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light'
    });


export const get_marca_service = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/marcas/get-list');
            dispatch(get_marks(data));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};

export const get_others_all_service: any = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/bienes/catalogo-bienes/get-by-nombre-nroidentificador/?cod_tipo_activo=OAc`);
            console.log(data)
            dispatch(get_others(data.Elementos));
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// Obtener Hoja de Vida otro
export const get_cv_others_service = (id: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`aalmacen/hoja-de-vida/otros/get-by-id/${id}/`);
            dispatch(get_cv_others(data.Elementos));
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// Crear Hoja de Vida PC
export const create_cv_others_service: any = (form_data: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.post('almacen/hoja-de-vida/otros/create/', form_data);
            control_success('La hoja de vida se creo correctamente');
            dispatch(get_others_all_service());
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// Eliminar Hoja de Vida PC
export const delete_cv_others_service = (id: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.delete(`almacen/hoja-de-vida/otros/delete/${id}/`);
            dispatch(get_cv_others_service(id));
            control_success('La hoja de vida se eliminó correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
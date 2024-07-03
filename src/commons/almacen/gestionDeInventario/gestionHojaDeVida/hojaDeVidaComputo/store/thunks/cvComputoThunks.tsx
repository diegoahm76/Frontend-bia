
import { api } from '../../../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
// Interfaces
import { get_marks, set_computers, set_current_cv_computer, set_maintenance, } from '../../store/slices/indexCvComputo';
import { type Dispatch } from 'react'
import { type NavigateFunction } from 'react-router-dom';


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
            //  console.log('')(data)
            dispatch(get_marks(data));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};


// Obtener Artculo por nombre o codigo

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const get_computers_all_service: any = (nombre?: string, doc_identificador_nro?: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            let url = `almacen/bienes/catalogo-bienes/get-by-nombre-nroidentificador/?cod_tipo_activo=Com`;
            if (nombre) {
                url += `&nombre=${nombre}`;
            }
            if (doc_identificador_nro) {
                url += `&doc_identificador_nro=${doc_identificador_nro}`;
            }
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(url);
            //  console.log('')(data)
            dispatch(set_computers(data.Elementos));
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Obtener Hoja de Vida PC

export const get_cv_computer_id = (id: number): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/hoja-de-vida/computadores/get-by-id-bien/${id}/`);
            //  console.log('')(data)
            if (data.success === true) {
                dispatch(set_current_cv_computer(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            //TODO: Agregado para prueba
            dispatch(set_current_cv_computer({}));
            return error as AxiosError;
        }
    };
};

// Obtener programados

export const get_maintenance = (id: number | null): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/mantenimientos/programados/get-list/${id ?? ''}/`);

            if (data.status === true) {
                dispatch(set_maintenance(data.detail));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
             //TODO: Agregado para prueba
             dispatch(set_maintenance([]));
            return error as AxiosError;
        }
    };
};
export const get_cv_computer_service: (id: any) => any = (id: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/hoja-de-vida/computadores/get-by-id-bien/${id}/`);
            //  console.log('')(data)

            if (data.success === true) {
                dispatch(set_current_cv_computer(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// CREAR HOJA DE VIDA
export const create_cv_computers_service: any = (
    cv: any,
    navigate: NavigateFunction

) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.post(
                'almacen/hoja-de-vida/computadores/create/', cv
            );
            control_success('La hoja de vida se creo correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            //  console.log('')(error.response.data);
            return error as AxiosError;
        }
    };
};
// Actualizar Hoja de Vida PC
export const update_cv_computers_service: any = (id: string | number, hoja_vida: any) => {
    return async (dispatch: Dispatch<any>) => {

        try {
            const { data } = await api.put(`almacen/hoja-de-vida/computadores/update/${id}/`, hoja_vida);
            control_success('La hoja de vida se actualizó correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Eliminar Hoja de Vida PC
export const delete_cv_computers_service: any = (id: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.delete(`almacen/hoja-de-vida/computadores/delete/${id}/`);
            control_success('La hoja de vida se eliminó correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
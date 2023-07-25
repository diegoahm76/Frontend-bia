/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { toast, type ToastContent } from 'react-toastify';
import { api } from '../../../../../../api/axios';
import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
import {
    set_bienes,
    set_bienes_entrada,
    set_current_bien,
    set_entradas,
    set_entregas,
    set_nro_entrega,
    set_persona_entrega,
} from '../slice/indexEntrega';

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
const control_success = (message: ToastContent) =>
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

// obtener numero de entrega
export const get_num_entrega = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/entregas/get-number-despacho/');

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                dispatch(set_nro_entrega(data.data));
            }
            console.log(data);
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};
// obtener entregas
export const get_entregas_service = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/entregas/get-entregas`);

            if (data.success === true) {
                dispatch(set_entregas(data.data));
                console.log(data);
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

// obtener entradas disponibles
export const get_entradas_disponible = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/entregas/get-entradas-entregas/`);

            if (data.success === true) {
                dispatch(set_entradas(data.data));
                console.log(data);
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

// obtener persona por iddocumento
export const get_person_id_entrega = (id: number): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`personas/get-by-id/${id}/`);

            if ('data' in data) {
                dispatch(
                    set_persona_entrega({
                        id_persona: data.data.id_persona,
                        tipo_documento: data.data.tipo_documento,
                        numero_documento: data.data.numero_documento,
                        nombre_completo:
                            String(data.data.primer_nombre) +
                            ' ' +
                            String(data.data.primer_apellido),
                    })
                );
            } else {
                control_error(data.detail);
            }
            return data;
        } catch (error: any) {
            console.log('get_person_document_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// tipo de entrada

export const get_tipo_entrada = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/bienes/entradas/tipos-entradas/`);
            if (data.success === true) {
                // dispatch(set_entregas(data.data));
                console.log(data);
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

// Obtener bienes por numero de solicitud

export const get_bienes_entrada = (id_entrada_almacen: number | null): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            console.log(
                `almacen/entregas/get-items-entradas-entregas/${id_entrada_almacen ?? ''
                }`
            );
            const { data } = await api.get(
                `almacen/entregas/get-items-entradas-entregas/${id_entrada_almacen ?? ''
                }/`
            );
            if (data.success === true) {
                dispatch(set_bienes_entrada(data.data));
                console.log(data);
                control_success(data.detail);
            } else {
                control_error(data.detail);
            }

            return data;
        } catch (error: any) {
            // console.log('get_planting_goods_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// obtener bienes
export const get_bien_code_service = (code: string, fecha: string): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(
                `almacen/despachos/agregar-bienes-consumo-conservacion-by-lupa/?codigo_bien_solicitado=${code}&fecha_despacho=${fecha}`
            );
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions

            if (data.data.length > 0) {
                if (data.data.length === 1) {
                    dispatch(set_current_bien(data.data[0]));
                    control_success('Se selecciono el bien');
                } else {
                    dispatch(set_bienes(data.data));
                    control_success('Se encontraron bienes');
                }
            }

            return data;
        } catch (error: any) {

            return error as AxiosError;
        }
    };
};

// Crear entrega
export const crear_entrega: any = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log(despacho);
            const { data } = await api.post('almacen/entregas/create-entrega/');
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail);
            }
            control_success('se agrego correctamente');
            return data;
        } catch (error: any) {
            console.log(error);
            //  control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// Editar entrega
export const editar_entrega: any = (
    id: number,
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // console.log(despacho);
            const { data } = await api.put(`almacen/entregas/actualizar-entrega/${id}/`);
            console.log(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail);
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            console.log(error);
            //  control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
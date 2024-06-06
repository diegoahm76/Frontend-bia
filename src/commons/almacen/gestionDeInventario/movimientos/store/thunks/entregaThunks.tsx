/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { toast, type ToastContent } from 'react-toastify';
import { api } from '../../../../../../api/axios';
import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
import {
    set_bienes,
    set_bienes_entrada,
    set_bienes_entrega,
    set_current_bien,
    set_current_entrada,
    set_entradas,
    set_entregas,
    set_nro_entrega,
    set_persona_entrega,
} from '../slice/indexEntrega';
import { set_bodega_seleccionada } from '../../../../configuracion/store/slice/BodegaSlice';

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
            //  console.log('')(data);
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
                //  console.log('')(data);
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
export const get_entradas_disponible = (
    numero_entrada: string | null,
    id_tipo_entrada: string | null | number
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/entregas/get-entradas-entregas/?numero_entrada_almacen=${numero_entrada ?? ''}&id_tipo_entrada=${id_tipo_entrada ?? ''}`);

            if (data.success === true) {
                dispatch(set_entradas(data.data));
                //  console.log('')(data);
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

// entradas por id
export const get_entrada_id = (
    id_entrada: number | null
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/bienes/entradas/get-list/?id_entrada=${id_entrada ?? ''}`);
            //  console.log('')(data)
            if (data.success === true) {
                dispatch(set_current_entrada(data.data.info_entrada));
                // dispatch(set_bienes_entrada(data.data.info_items_entrada));
                //  console.log('')(data);

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// bodega por id
export const get_bodega_id = (
    id_bodega: number | null
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/bodega/get-by-id/${id_bodega ?? ''}/`);
            dispatch(set_bodega_seleccionada(data));
            //  console.log('')(data);


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
            //  console.log('')('get_person_document_service');
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
                //  console.log('')(data);
                //  control_success(data.detail);
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
            const { data } = await api.get(
                `almacen/entregas/get-items-entradas-entregas/${id_entrada_almacen ?? ''
                }/`
            );
            //  console.log('')(data)
            if (data.success === true) {
                dispatch(set_bienes_entrada(data.data));
                //  console.log('')(data);
                control_success(data.detail);
            } else {
                control_error(data.detail);
            }

            return data;
        } catch (error: any) {
            // //  console.log('')('get_planting_goods_service');
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
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions

            if (data.data.length > 0) {
                if (data.data.length === 1) {
                    dispatch(set_current_bien(data.data[0]));

                } else {
                    dispatch(set_bienes(data.data));

                }
            }

            return data;
        } catch (error: any) {

            return error as AxiosError;
        }
    };
};

// Crear entrega
export const crear_entrega: any = (entrega: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.post('almacen/entregas/create-entrega/', entrega);
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail);
            }

            return data;
        } catch (error: any) {
            //  console.log('')(error);
            //  control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// Editar entrega
export const editar_entrega: any = (
    id: number,
    entrada: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // //  console.log('')(despacho);
            const { data } = await api.patch(`almacen/entregas/actualizar-entrega/${id}/`, entrada);
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


// anular despacho
export const annul_despacho_service = (
    id: number,
    entrega: any,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.patch(`almacen/entregas/anular-entrega/${id}/`,
                entrega
            );
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail);
            } else {
                control_error(data.detail);
            }
            return data;
        } catch (error: any) {
            //  console.log('')('annul_despacho_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// obtener entregas
export const get_entregas_services = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/entregas/get-entregas/');

            if (data.success === true) {
                dispatch(set_entregas(data.data));
                if(data?.data?.length > 0){
                    control_success("Entregas cargadas correctamente")
                }else{
                    control_error("No hay entregas disponibles")
                }
                //  console.log('')(data);
                // control_success(data.detail);
            } else {
                // control_error(data.detail);
            }
            return data;
        } catch (error: any) {

            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// obtener bienes entregas
export const get_bien_entrega_services = (id: number | null | undefined): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/entregas/get-items-entregas/${id ?? ""}/`);

            if (data.success === true) {
                dispatch(set_bienes_entrega(data.data));
                //  console.log('')(data);
                // control_success(data.detail);
            } else {
                // control_error(data.detail);
            }
            return data;
        } catch (error: any) {

            //  control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
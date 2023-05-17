/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { toast, type ToastContent } from 'react-toastify';

import { api } from '../../../../../api/axios';
// import { type AxiosError } from 'axios';


import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
// import { log } from 'console';
import { get_unidad_organizacional, set_numero_solicitud, set_bienes, set_unidades_medida, set_solicitudes, set_current_solicitud, set_bienes_solicitud, set_persona_solicita, set_current_bien, set_current_funcionario, set_funcionarios, set_numero_solicitud_vivero, } from './slices/indexSolicitudBienesConsumo';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_error = (message: ToastContent = 'Algo pasó, intente de nuevo') =>
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


// obtener numero de solicitud
export const get_num_solicitud = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/solicitudes/get-nro-documento-solicitudes-bienes-consumo/');

            if (data.success) {
                dispatch(set_numero_solicitud(data["Número de solicitud"]))
            }
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};


// obtener numero de solicitud PARA  VIVERO
export const get_num_solicitud_vivero = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/solicitudes-vivero/get-nro-documento-solicitudes-bienes-consumo-vivero/true/');

            if (data.success) {
                dispatch(set_numero_solicitud_vivero(data["Número de solicitud"]))
            }
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};


// crear consumo
export const crear_solicitud_bien_consumo: any = (
    solicitud: any,

) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            console.log(solicitud)
            const { data } = await api.put('almacen/solicitudes/crear-solicitud-bienes-de-consumo/', solicitud);
            //  dispatch(get_solicitud_consumo_id());
            console.log(data)
            if (data.success) {
                control_success(data.detail)
            } else {
                control_error(data.detail)
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            console.log(error);
            control_error(error.response.data.detail);

            return error as AxiosError;

        };
    }
}

// crear consumo VIVERO
export const crear_solicitud_bien_consumo_vivero: any = (
    solicitud_vivero: any,

) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            console.log(solicitud_vivero)
            const { data } = await api.put('almacen/solicitudes-vivero/crear-solicitud/', solicitud_vivero);
            //  dispatch(get_solicitud_consumo_id());
            console.log(data)
            if (data.success) {
                control_success(data.detail)
            } else {
                control_error(data.detail)
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            console.log(error);
            control_error(error.response.data.detail);

            return error as AxiosError;

        };
    }
}






// obtener niveles organizacioneles

export const get_uni_organizacional = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('transversal/organigrama/unidades/get-list/organigrama-actual/');
            console.log(data.data, "data")
            dispatch(get_unidad_organizacional(data.data));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};


// obtener medidas
export const get_medida_service = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/unidades-medida/get-list/');
            console.log("medida")
            console.log(data)
            dispatch(set_unidades_medida(data));
            return data;
        } catch (error: any) {
            console.log('get_medida_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// obtener bienes de consumo 

export const get_bienes_consumo = (id: string | null, nombre: string | null): any => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.get(`almacen/solicitudes/filtro-bienes-solicitud/?nombre=${nombre ?? ""}&codigo_bien=${id ?? ""}`);
            console.log(data)
            if ('detail' in data) {
                dispatch(set_bienes(data.detail));

                if (data.detail.length > 0) {
                    control_success("Se encontrarón bienes")
                } else {
                    control_error("No se encontrarón bienes")
                }
            } else {
                control_error("No se encontrarón bienes")
            }
            return data;
        } catch (error: any) {
            console.log('data');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// obtener bienes de consumo 

export const get_bienes_consumo_codigo_bien = (codigo: string | null): any => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.get(`almacen/solicitudes/get-bienes-solicitud/?codigo_bien=${codigo ?? ""}`);
            console.log(data)
            if ('detail' in data) {
                dispatch(set_current_bien(data.detail[0]))
                if (data.detail.length > 0) {
                    control_success("Se encontró bien")
                } else {
                    control_error("No se encontrón bien")
                }
            } else {
                control_error("No se encontrón bien")

            }

            return data;
        } catch (error: any) {
            console.log('data');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};




export const get_solicitud_service = (id: number | string): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/get-solicitud-by-id/${id ?? ""}/`);
            console.log('Solicitudes recuperadas:', data);
            dispatch(set_current_solicitud(data.detail.info_solicitud));
            dispatch(set_bienes_solicitud(data.detail.info_items));
            return data;
        } catch (error: any) {
            console.log('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

export const get_solicitudes_id_persona_service = (id: number | string): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/get-solicitudes-no-aprobadas/${id ?? ""}`);
            console.log('Solicitudes recuperadas:', data);
            dispatch(set_solicitudes(data.data))
            if ('data' in data) {
                if (data.data.length > 0) {
                    control_success("Se encontrarón solicitudes")
                } else {
                    control_error("No se encontrarón solicitudes")
                }
            } else {
                control_error("No se encontrarón solicitudes")
            }
            return data;
        } catch (error: any) {
            console.log('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// obtener persona por iddocumento
export const get_person_id_service = (id: number,): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`personas/get-by-id/${id}/`);
            console.log(data)
            if ("data" in data) {
                dispatch(set_persona_solicita({ id_persona: data.data.id_persona, unidad_organizacional: data.data.nombre_unidad_organizacional_actual, nombre: String(data.data.primer_nombre) + " " + String(data.data.primer_apellido) }))

            } else {
                control_error(data.detail)
            }
            return data;
        } catch (error: any) {
            console.log('get_person_document_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// obtener persona por documento
export const get_funcionario_document_service = (
    type: string,
    document: number | "",
    id_unidad_para_la_que_solicita: number | null | string,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/search-funcionario/?tipo_documento=${type ?? ""}&numero_documento=${document ?? ""}&id_unidad_para_la_que_solicita=${id_unidad_para_la_que_solicita ?? ""}`);
            if ("data" in data) {
                if (data.data.length > 0) {
                    dispatch(set_current_funcionario(data.data))
                    control_success("Se selecciono la persona ")
                } else {
                    control_error("No se encontro la persona")
                }
            } else {
                control_error(data.detail)
            }
            return data;
        } catch (error: any) {
            console.log('get_person_document_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// obtener funcionario por filtro

export const get_funcionario_service = (
    type: string | null,
    document: number | null | string,
    primer_nombre: string | null,
    primer_apellido: string | null,
    id_unidad_para_la_que_solicita: number | null | string,


): any => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.get(


                `almacen/solicitudes/search-funcionario-filtros/?tipo_documento=${type ?? ""}&numero_documento=${document ?? ""}&primer_nombre=${primer_nombre ?? ""}&primer_apellido=${primer_apellido ?? ""}&id_unidad_para_la_que_solicita=${id_unidad_para_la_que_solicita ?? ""}`

            );
            console.log(data)
            dispatch(set_funcionarios(data.data));
            if (data.data.length > 0) {
                control_success("Se econtrarón funcionarios")
            } else {
                control_error("No se econtrarón funcionarios")
            }
            return data;
        } catch (error: any) {
            console.log(error);
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};




// anular solicitud 


export const anular_solicitud: any = (id: string | number) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.delete(
                `almacen/solicitudes/anular-solicitudes-bienes/${id}/`
            );
            dispatch(get_solicitud_service(id));
            control_success('Se anulo la solicitud');

            return data;
        } catch (error: any) {
            console.log('anular solicitud');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { toast, type ToastContent } from 'react-toastify';

import { api } from '../../../../../api/axios';
// import { type AxiosError } from 'axios';


import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
// import { log } from 'console';
import { get_unidad_organizacional, set_numero_solicitud, set_bienes, set_unidades_medida, set_solicitudes, set_current_solicitud, set_bienes_solicitud, set_persona_solicita, set_current_bien, set_current_funcionario, set_funcionarios, set_numero_solicitud_vivero, set_current_solicitud_vivero, set_solicitudes_vivero, set_current_bien_vivero, set_bienes_vivero, set_coordinador_vivero } from './slices/indexSolicitudBienesConsumo';


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

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                dispatch(set_numero_solicitud(data["Número de solicitud"]))
            }
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
}


// obtener numero de solicitud PARA  VIVERO
export const get_num_solicitud_vivero = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/solicitudes-vivero/get-nro-documento-solicitudes-bienes-consumo-vivero');

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data) {
                dispatch(set_numero_solicitud_vivero(data.detail))
            }
            //  console.log('')(data)
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
            //  console.log('')(solicitud)
            const { data } = await api.put('almacen/solicitudes/crear-solicitud-bienes-de-consumo/', solicitud);

            //  console.log('')(data)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail)
            } else {
                control_error(data.detail)
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response.data.detail);

            return error as AxiosError;

        };
    }
}

// EDITAR SOLICITUD
export const editar_solicitud: any = (

    solicitud: any,
    // bienes: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(solicitud)
            const { data } = await api.put(`almacen/solicitudes/crear-solicitud-bienes-de-consumo/`, solicitud);
            // await api.patch(`conservacion/solicitudes/update-items-solicitud/${id}/`, bienes);
            //  dispatch(get_solicitud_consumo_id());
            //  console.log('')(data)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail)
            } else {
                control_error(data.detail)
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response.data.detail);

            return error as AxiosError;

        };
    }
}






// crear SOLICITUD PARA VIVERO
export const crear_solicitud_bien_consumo_vivero: any = (
    solicitud: any,

) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(solicitud)
            const { data } = await api.put('almacen/solicitudes-vivero/crear-solicitud/', solicitud);
            //  dispatch(get_solicitud_consumo_id());
            //  console.log('')(data)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail)
            } else {
                control_error(data.detail)
            }
            // control_success(' se agrego correctamente');
            return data;
        } catch (error: any) {
            //  console.log('')(error);
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
            dispatch(set_unidades_medida(data));
            return data;
        } catch (error: any) {
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
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// BUSCAR BIENES DE CONSUMO VIVERO

export const get_bienes_vivero_consumo = (id: string | null, nombre: string | null, nombre_cientifico: string | null, cod_tipo_elemento_vivero: string | null): any => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.get(`almacen/solicitudes/filtro-bienes-solicitable-vivero/?codigo_bien=${id ?? ""}&nombre_cientifico=${nombre_cientifico ?? ""}&nombre=${nombre ?? ""}&cod_tipo_elemento_vivero=${cod_tipo_elemento_vivero ?? ""}`);
            if ('detail' in data) {
                dispatch(set_bienes_vivero(data.detail));

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
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// OBTENER BIENES PARA VIVERO 

export const get_bienes_consumo_vivero_codigo_bien = (codigo: string | null): any => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.get(`almacen/solicitudes/get-bien-solicitable-vivero/?codigo_bien=${codigo ?? ""}`);
            if ('detail' in data) {
                dispatch(set_current_bien_vivero(data.detail[0]))
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
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Obtener bienes por numero de solicitud

export const get_bienes_solicitud = (
    id_solicitud_consumibles: number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.get(`almacen/solicitudes/get-solicitud-by-id/${id_solicitud_consumibles ?? ""}/`);
            dispatch(set_bienes_solicitud(data.detail.info_items));
            if (data.data.length > 0) {
                // control_success("Se encontrarón bienes")
            } else {
                // control_error("No se encontrarón bienes")
            }
            return data;
        } catch (error: any) {
            // control_error(error.response.detail.info_items);
            return error as AxiosError;
        }
    };
};



// OBTENER SOLICITUD POR ID de solicitud por id 
export const get_solicitud_service = (id: number | string): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/get-solicitud-by-id/${id ?? ""}/`);
            dispatch(set_current_solicitud(data.detail.info_solicitud));
            dispatch(set_bienes_solicitud(data.detail.info_items));
            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// OBTENER SOLICITUD POR ID de solicitud por id 
export const get_solicitud_service_vivero = (id: number | string): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/get-solicitud-by-id/${id ?? ""}/`);
            //  console.log('')('Solicitudes recuperadas:', data);
            dispatch(set_current_solicitud_vivero(data.detail.info_solicitud));
            dispatch(set_bienes_solicitud(data.detail.info_items));
            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            //  console.log('')('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};



// OBTENER SOLICITUD POR TIPO Y DOCUMENTO 
export const get_solicitud_documento_service = (

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/get-solicitudes-pendientes-por-aprobar/`);
            //  console.log('')('Solicitudes recuperadas:', data);
            dispatch(set_solicitudes(data.detail));

            return data;
        } catch (error: any) {
            //  console.log('')('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// obtener solicitudes que no han sido aprobadas id persona para aprobacion 

export const get_solicitudes_id_persona_service = (id: number | string): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/get-solicitudes-no-aprobadas/${id ?? ""}`);
            //  console.log('')('Solicitudes recuperadas:', data);
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
            //  console.log('')('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


export const get_solicitudes_id_persona_service_vivero = (id: number | string): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/get-solicitudes-no-aprobadas/${id ?? ""}`);
            //  console.log('')('Solicitudes recuperadas:', data);
            dispatch(set_solicitudes_vivero(data.data))
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
            //  console.log('')('get_solicitud_service');
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
            //  console.log('')(data)
            if ("data" in data) {
                dispatch(set_persona_solicita({ id_persona: data.data.id_persona, unidad_organizacional: data.data.nombre_unidad_organizacional_actual, nombre: String(data.data.primer_nombre) + " " + String(data.data.primer_apellido) }))

            } else {
                control_error(data.detail)
            }
            return data;
        } catch (error: any) {
            //  console.log('')('get_person_document_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// obtener persona por iddocumento
export const get_funcionario_id_service = (id: number | null,): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`personas/get-by-id/${id ?? ""}/`);
            if ("data" in data) {
                // //  console.log('')(data)

                dispatch(set_current_funcionario({ id_persona: data.data.id_persona, tipo_documento: data.data.tipo_documento, numero_documento: data.data.numero_documento, nombre_unidad_organizacional_actual: data.data.nombre_unidad_organizacional_actual, nombre_completo: String(data.data.primer_nombre) + " " + String(data.data.primer_apellido) }))

            } else {
                control_error(data.detail)
            }
            return data;
        } catch (error: any) {
            //  console.log('')('get_person_document_service');
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
            //  console.log('')('get_person_document_service');
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
            //  console.log('')(data)
            dispatch(set_funcionarios(data.data));
            // if (data.data.length > 0) {
            //     control_success("Se econtrarón funcionarios")
            // } else {
            //     control_error("No se econtrarón funcionarios")
            // }
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};




// aprobarr solicitud 


export const aprobacion_solicitud_pendiente: any = (
    form_data: any,
    id: string | number
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.put(
                `almacen/solicitudes/aprobacion-solicitudes-pendientes/${id}/`, form_data
            );
            //  console.log('')(data)
            dispatch(get_solicitud_service(id));
            if (data.success === true) {
                control_success("Se aprobó la solicitud")
            } else {
                control_error("La solicitud ya fue aprobada")
            }
            return data;
        } catch (error: any) {
            //  console.log('')('aprobar solicitud');
            control_error(error.response.data);
            return error as AxiosError;
        }
    };
};

// aprobarr solicitud VIVERO


export const aprobacion_solicitud_pendiente_vivero: any = (
    form_data: any,
    id: string | number
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.put(
                `almacen/solicitudes-vivero/aprobacion-solicitudes-pendientes-vivero/${id}/`, form_data
            );
            //  console.log('')(data)
            dispatch(get_solicitud_service_vivero(id));
            control_success('Se aprobo la solicitud de vivero');

            return data;
        } catch (error: any) {
            //  console.log('')('aprobar solicitud');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// ANULAR SOLICITUD

export const anular_solicitud_service: any = (
    form_data: any,
    id: string | number) => {
    return async (dispatch: Dispatch<any>) => {
        try {

            //  console.log('')(form_data)
            const { data } = await api.put(
                `almacen/solicitudes/anular-solicitudes-bienes/${id}/`, form_data

            );
            //  console.log('')(data)
            dispatch(get_solicitud_service(id));
            control_success('Se anulo la solicitud');

            return data;
        } catch (error: any) {

            control_error(error.response.data.detail);
            //  console.log('')(error);
            return error as AxiosError;
        }
    };
};



// buscar solicitudes a despachar 

export const get_solicitudes_pendientes_despacho = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/solicitudes/solicitudes-pendientes-por-despachar/');
            dispatch(set_solicitudes(data['Solicitudes pendientes por despahcar']))
            //  console.log('')(data);
            //  console.log('')(data, "data")
            if ('data' in data) {
                if (data.length > 0) {
                    control_success("Se encontrarón solicitudes aprobadas por despachar")
                } else {
                    control_error("No se encontrarón solicitudes")
                }
            }
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};



export const get_solicitudes_despacho_fecha = (fecha: string | number,): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/despachos/get-solicitudes-aprobados-abiertos/?fecha_despacho=${fecha}`);
            dispatch(set_solicitudes(data.data))
            //  console.log('')(data);
            //  console.log('')(data, "data")
            if ('data' in data) {
                if (data.data.length > 0) {
                    control_success("Se encontrarón solicitudes aprobadas por despachar")
                } else {
                    control_error("No se encontrarón solicitudes")
                }
            }
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};


// rechazar SOLICITUD por parte de almacen

export const rechazar_solicitud_service: any = (
    form_data: any,
    id: string | number) => {
    return async (dispatch: Dispatch<any>) => {
        try {

            //  console.log('')(form_data)
            const { data } = await api.put(
                `almacen/solicitudes/rechazo-solicitudes-bienes-desde-almacen/${id}/`, form_data

            );
            //  console.log('')(data)
            dispatch(get_solicitud_service(id));
            control_success('Se rechazó la solicitud');

            return data;
        } catch (error: any) {

            control_error(error.response.data.detail);
            //  console.log('')(error);
            return error as AxiosError;
        }
    };
};


// obtener coordinador de vivero
export const get_coordinador_actual = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/solicitudes-vivero/search-coordinador-viveros/get/');

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success === true) {
                dispatch(set_coordinador_vivero(data.data))
            }
            //  console.log('')(data)
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
}
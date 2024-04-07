
import { toast, type ToastContent } from 'react-toastify';

import { api } from '../../../../../api/axios';
import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
import { get_unidad_organizacional, set_bienes, set_bienes_solicitud, set_current_bien, set_current_funcionario, set_current_solicitud, set_funcionarios, set_numero_solicitud, set_nurseries, set_persona_solicita, set_solicitudes } from '../slices/indexSolicitud';


// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const control_error = (message: ToastContent  = 'Algo pasó, intente de nuevo') =>
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


// CREAR SOLICITUD
export const crear_solicitud: any = (
    solicitud: any,
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(solicitud)
            const { data } = await api.post('conservacion/solicitudes/create/', solicitud);
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
// EDITAR SOLICITUD
export const editar_solicitud: any = (
    id: number,
    solicitud: any,
    // bienes: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(solicitud)
            const { data } = await api.put(`conservacion/solicitudes/update-solicitud/${id}/`, solicitud);
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
// EDITAR SOLICITUD
export const delete_item_solicitud_service: any = (
    id: number,
    item: any,
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(item)
            const { data } = await api.patch(`conservacion/solicitudes/update-items-solicitud/${id}/`, item);
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


// obtener persona por documento
export const get_funcionario_document_service = (
    type: string,
    document: number | "",
    id_unidad_para_la_que_solicita: number | null | string,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/solicitudes/search-funcionario/?tipo_documento==${type ?? ""}&numero_documento=${document ?? ""}&id_unidad_para_la_que_solicita=${id_unidad_para_la_que_solicita ?? ""}`);
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



// obtener persona por iddocumento
export const get_person_id_service = (id: number,): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`personas/get-by-id/${id}/`);
            //  console.log('')(data)
            if ("data" in data) {
                dispatch(set_persona_solicita({ id_persona: data.data.id_persona, unidad_organizacional: data.data.nombre_unidad_organizacional_actual, id_unidad_organizacional_actual: data.data.id_unidad_organizacional_actual, nombre: String(data.data.primer_nombre) + " " + String(data.data.primer_apellido) }))

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
                `almacen/solicitudes/search-funcionario-filtros/?tipo_documento=${document ?? ""}&primer_nombre=${primer_nombre ?? ""}&primer_apellido=${primer_apellido ?? ""}&id_unidad_para_la_que_solicita=${id_unidad_para_la_que_solicita ?? ""}`

            );
            //  console.log('')(data)
            dispatch(set_funcionarios(data.data));
            if (data.data.length > 0) {
                control_success("Se econtrarón funcionarios")
            } else {
                control_error("No se econtrarón funcionarios")
            }
            return data;
        } catch (error: any) {
            //  console.log('')(error);
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
            //  console.log('')('get_fiuncionario_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// obtener numero de solicitud
export const get_num_solicitud = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('conservacion/solicitudes/get-numero-consecutivo/');
            //  console.log('')(data)

            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                dispatch(set_numero_solicitud(data.data))
            }
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
}

// obtener niveles organizacioneles

export const get_uni_organizacional = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('transversal/organigrama/unidades/get-list/organigrama-actual/');
            //  console.log('')(data.data, "data")
            dispatch(get_unidad_organizacional(data));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};

// OBTENER SOLICITUD
export const get_solicitud_service = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`conservacion/solicitudes/get-listar-solicitudes/`);
            //  console.log('')('Solicitudes recuperadas:', data);
            dispatch(set_solicitudes(data.data));

            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            //  console.log('')('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// OBTENER SOLICITUD POR APROBAR funcionario

export const get_solicitud_aprobacion = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`conservacion/funcionario/list-solicitudes/`);
            //  console.log('')('Solicitudes recuperadas:', data);
            dispatch(set_solicitudes(data.data));

            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            //  console.log('')('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// OBTENER SOLICITUD POR APROBAR COORDINADOR

export const get_solicitud_aprobacion_coordinador = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`conservacion/funcionario/coordinador/list-solicitudes/`);
            //  console.log('')('Solicitudes recuperadas:', data);
            dispatch(set_solicitudes(data.data));

            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            //  console.log('')('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// OBTENER SOLICITUD POR despachar

export const get_solicitudes_despacho = (
    id_vivero: number,
    solicitud: number|string,
    fecha: string,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(fecha, solicitud, id_vivero)
            const { data } = await api.get(`conservacion/despachos/get-solicitudes-por-nro-despacho-y-id-vivero/?id_vivero=${id_vivero}&nro_solicitud=${solicitud}&fecha_aprobado=${fecha}`);
            //  console.log('')('Solicitudes recuperadas:', data);
            dispatch(set_solicitudes(data.data));

            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            //  console.log('')('get_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// OBTENER VIVEROS
export const get_nurcery = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`conservacion/bajas/get-viveros/`);
            //  console.log('')('Viveros Recuperados:', data);
            dispatch(set_nurseries(data.data));

            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            //  console.log('')('get_nurcery');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// OBTENER VIVEROS
export const get_municipios = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`choices/municipios/`);
            //  console.log('')('Municipios Recuperados:', data);
            dispatch(set_nurseries(data));

            // dispatch(setID(Number(id)))
            return data;
        } catch (error: any) {
            //  console.log('')('get_municipios');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};


// Obtener bienes vivero por codigo
export const get_bienes_service_codigo = (
    id_vivero: string | number,
    codigo_bien: string | null,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(`conservacion/solicitudes/get-bien-by-codigo/${id_vivero}/${codigo_bien ?? ""}`)
            const { data } = await api.get(`conservacion/solicitudes/get-bien-by-codigo/${id_vivero}/${codigo_bien ?? ""}`);
            dispatch(set_current_bien(data.data));
            //  console.log('')(data)
            if (data.data.length > 0) {
                control_success("Se encontrarón bienes")
            } else {
                control_error("No se encontrarón bienes")
            }
            return data;
        } catch (error: any) {
            // //  console.log('')('get_planting_goods_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};



// Obtener bienes vivero 
export const get_bienes_service = (
    id_vivero: string | number,
    tipo_bien: string | null,
    codigo_bien: string | null,
    nombre_bien: string | null
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`conservacion/solicitudes/get-bien-by-codigo/${id_vivero ?? ""}/?cod_tipo_elemento_vivero=${tipo_bien ?? ""}&codigo_bien=${codigo_bien ?? ""}&nombre=${nombre_bien ?? ""}`);
            dispatch(set_bienes(data.data));
            //  console.log('')(data)
            if (data.data.length > 0) {
                control_success("Se encontrarón bienes")
            } else {
                control_error("No se encontrarón bienes")
            }
            return data;
        } catch (error: any) {
            // //  console.log('')('get_planting_goods_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Obtener bienes por numero de solicitud

export const get_bienes_solicitud = (
    id_solicitud_viveros: number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(`conservacion/solicitudes/get-listar-solicitudes-by-id/${id_solicitud_viveros ?? ""}`)
            const { data } = await api.get(`conservacion/solicitudes/get-listar-solicitudes-by-id/${id_solicitud_viveros ?? ""}/`);
            dispatch(set_bienes_solicitud(data.data));
            //  console.log('')(data)
            if (data.data.length > 0) {
                // control_success("Se encontrarón bienes")
            } else {
                // control_error("No se encontrarón bienes")
            }
            return data;
        } catch (error: any) {
            // //  console.log('')('get_planting_goods_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Obtener solicitud by id

export const get_solicitud_id_service = (
    id_solicitud_viveros: number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`conservacion/funcionario/get-solicitud/${id_solicitud_viveros ?? ""}/`);
            dispatch(set_current_solicitud(data.data_maestro));
            //  console.log('')(data)
            
            return data;
        } catch (error: any) {
            // //  console.log('')('get_planting_goods_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// anular solicitud
export const annul_solicitud_service = (
    id: number,
    solicitud: any
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.put(`conservacion/solicitudes/anular-solicitud/${id}/`, solicitud);
            //  console.log('')(data)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success(data.detail)

            } else {
                control_error(data.detail)
            }
            return data;
        } catch (error: any) {
            //  console.log('')('annul_solicitud_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// APROBAR SOLICITUD funcionario

export const aprobacion_solicitud_funcionario: any = (
    solicitud: any,
    id: string | number
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.patch(
                `conservacion/funcionario/procesar-solicitud-responsable/${id}/`,
                solicitud
            );
            //  console.log('')(data)
            dispatch(get_solicitud_service());
            control_success('Se aprobo la solicitud');

            return data;
        } catch (error: any) {
            //  console.log('')('aprobar solicitud');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// APROBAR SOLICITUD coordinador

export const aprobacion_solicitud_coordinador: any = (
    solicitud: any,
    id: string | number
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.patch(
                `conservacion/funcionario/coordinador/procesar-solicitud/${id}/`,
                solicitud
            );
            //  console.log('')(data)
            dispatch(get_solicitud_aprobacion_coordinador());
            control_success('Se aprobo la solicitud');

            return data;
        } catch (error: any) {
            //  console.log('')('aprobar solicitud');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
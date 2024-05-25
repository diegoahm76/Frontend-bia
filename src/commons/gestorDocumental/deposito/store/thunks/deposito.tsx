/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { type Dispatch } from 'react';
import { toast, type ToastContent } from 'react-toastify';
// import Swal from 'sweetalert2'; // , { type SweetAlertResult }
import {
    type AxiosError,
    // type AxiosResponse
} from 'axios';
// Slices

import { api } from '../../../../../api/axios';
import { set_bandejas, set_cajas, set_carpetas, set_depositos, set_estantes, set_rotulo_crpetas, set_sucursales } from '../slice/indexDeposito';

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


export const get_sucursales = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('transversal/sucursales/sucursales-empresa-lista/3'
            );
            if (data.success === true) {
                //   control_success(data.detail);
                dispatch(set_sucursales(data.data));
            } else {
                control_error(data.detail);
            }
            return data;
        } catch (error: any) {
            //    control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

export const get_depositos_filtro = (
    nombre_deposito: string | null,
    identificacion_por_entidad: string | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/deposito/buscar-deposito/?nombre_deposito=${nombre_deposito ?? ''}&identificacion_por_entidad=${identificacion_por_entidad ?? ''}`);

            if (data.success === true) {
                dispatch(set_depositos(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
// lista de depositos

export const get_depositos = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('gestor/depositos-archivos/deposito/listar/');

            if (data.success === true) {
                dispatch(set_depositos(data.data));

            }
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};



export const crear_deposito: any = (
    deposito: any,

) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            //  console.log('')(deposito)
            const { data } = await api.post('gestor/depositos-archivos/deposito/crear/', deposito);

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
            control_error(error.response);

            return error as AxiosError;

        };
    }
}

// actualizar

export const editar_deposito: any = (
    id: number,
    deposito: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // //  console.log('')(despacho);
            const { data } = await api.patch(`gestor/depositos-archivos/deposito/actualizar/${id}/`, deposito);
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

// eliminar
export const eliminar_deposito = (
    id: number,

): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.delete(`gestor/depositos-archivos/deposito/eliminar/${id}/`

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

            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// listar bandejas
export const get_bandejas_id = (
    id: number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/bandejaEstante/listar-bandejas-por-estante/${id ?? ''}/`);

            if (data.success === true) {
                dispatch(set_bandejas(data.data));

            }
            //  console.log('')(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
// crear bandeja

export const crear_bandeja: any = (
    bandeja: any,

) => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.post('gestor/depositos-archivos/bandejaEstante/crear/', bandeja);

            //  console.log('')(data)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                //  control_success(data.detail)
            } else {
                control_error(data.detail)
            }
            control_success('Se creo correctamente la bandeja');
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response);

            return error as AxiosError;

        };
    }
};


// actualizar

export const editar_bandeja: any = (
    id: number,
    bandeja: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // //  console.log('')(despacho);
            const { data } = await api.put(`gestor/depositos-archivos/bandejaEstante/actualizar-bandeja/${id}/`, bandeja);
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success('Se actualizó correctamente la bandeja');
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

// listar estantes por deposito 

export const get_estantes_deposito = (
    nombre_deposito: string | null,
    identificacion_estante: string | number | null,
    orden_estante: string | number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/bandejaEstante/buscar-estante/?nombre_deposito=${nombre_deposito ?? ''}&identificacion_estante=${identificacion_estante ?? ''}&orden_estante=${orden_estante ?? ''}`);

            if (data.success === true) {
                dispatch(set_estantes(data.data));

            }
            //  console.log('')(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// mover bandeja

export const mover_bandeja_seleccionada: any = (
    id: number,
    bandeja: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.put(`gestor/depositos-archivos/bandejaEstante/mover-bandeja/${id}/`, bandeja);
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success('Se traslado correctamente la bandeja');
            }
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// eliminar bandeja
export const eliminar_bandeja = (
    id: number | string,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.delete(`gestor/depositos-archivos/bandejaEstante/eliminar/${id}/`

            );
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success('Se eliminó la bandeja correctamente');
            }
            return data;
        } catch (error: any) {


            return error as AxiosError;
        }
    };
};




// listar carpetas 


export const get_carpeta_id = (
    id: number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/carpetaCaja/listar-carpetas-por-caja/${id ?? ''}`);

            if (data.success === true) {
                dispatch(set_carpetas(data.data));

            }
            //  console.log('')(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};


// listar caja por bandeja

export const get_caja_id = (
    id: number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/cajaBandeja/listar-cajas-por-bandeja/${id ?? ''}/`);

            if (data.success === true) {
                //   dispatch(set_carpetas(data.data));

            }
            //  console.log('')(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// crear carpeta

export const crear_carpeta: any = (
    carpeta: any,

) => {
    return async (dispatch: Dispatch<any>) => {
        try {

            const { data } = await api.post('gestor/depositos-archivos/carpetaCaja/crear/', carpeta);

            //  console.log('')(data)
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                //  control_success(data.detail)
            }
            control_success('Se creo correctamente la carpeta');
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response);

            return error as AxiosError;

        };
    }
};


// actualizar carpeta

export const editar_carpeta: any = (
    id: number,
    carpeta: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // //  console.log('')(despacho);
            const { data } = await api.put(`gestor/depositos-archivos/carpetaCaja/actualizar-carpeta/${id}/`, carpeta);
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                //   control_success(data.detail);
            }
            control_success('Se actualizó correctamente');
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};



// eliminar carpeta
export const eliminar_carpeta = (
    id: number | string,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.delete(`gestor/depositos-archivos/deposito/eliminar/${id}/`

            );
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                // control_success(data.detail);
            }
            control_success('Se eliminó la carpeta correctamente');
            return data;
        } catch (error: any) {


            return error as AxiosError;
        }
    };
};



export const get_busqueda_avanzada = (
    identificacion_deposito: string | null,
    identificacion_estante: string | number | null,
    identificacion_bandeja: string | number | null,
    identificacion_caja: string | number | null,
    identificacion_carpeta: string | number | null,
    orden_estante: string | number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/carpetCaja/busqueda-avanzada-carpetas/?identificacion_deposito=${identificacion_deposito ?? ''}&identificacion_estante=${identificacion_estante ?? ''}&orden_estante=${orden_estante ?? ''}&identificacion_caja=${identificacion_caja ?? ''}&identificacion_bandeja=${identificacion_bandeja ?? ''}&identificacion_carpeta=${identificacion_carpeta ?? ''}`);

            if (data.success === true) {
                dispatch(set_cajas(data.data));

            }
            //  console.log('')(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};

// mover carpeta

export const mover_carpeta_seleccionada: any = (
    id: number,
    carpeta: any
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.put(`gestor/depositos-archivos/carpetaCaja/mover-carpeta/${id}/`, carpeta);
            //  console.log('')(data);
            // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
            if (data.success) {
                control_success('Se traslado correctamente la carpeta');
            }
            return data;
        } catch (error: any) {
            //  console.log('')(error);
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};


export const get_rotulo_carpeta = (
    id: number | null,
): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get(`gestor/depositos-archivos/carpetaCaja/rotulo/${id ?? ''}/`);

            if (data.success === true) {
               dispatch(set_rotulo_crpetas(data.data));

            }
            console.log(data)
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);

            return error as AxiosError;
        }
    };
};
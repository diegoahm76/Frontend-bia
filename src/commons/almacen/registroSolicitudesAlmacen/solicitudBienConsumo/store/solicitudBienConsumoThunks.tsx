
import { toast, type ToastContent } from 'react-toastify';

import { api } from '../../../../../api/axios';
// import { type AxiosError } from 'axios';

import { type NavigateFunction } from 'react-router-dom';
import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
// import { log } from 'console';
import { set_info_solicitud, get_unidad_organizacional } from './slices/indexSolicitudBienesConsumo';

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
// obtener ultimo id bienes consumo
export const get_solicitud_consumo_id = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/solicitudes/get-nro-documento-solicitudes-bienes-consumo');
            console.log(data)
            dispatch(set_info_solicitud(data.data));
            return data;
        } catch (error: any) {
            console.log('solicitud');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// crear consumo
export const crear_solicitud_bien_consumo: any = (
    solic_consumo: any,
    navigate: NavigateFunction
) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api
                .post("almacen/solicitudes/crear-solicitud-bienes-de-consumo/", solic_consumo);
            dispatch(get_solicitud_consumo_id());
            control_success('El vivero se agrego correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            console.log(error.response.data);
            return error as AxiosError;

        };
    }
}

// obtener niveles organizacioneles

export const get_uni_organizacional = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/organigrama/unidades/get-list/organigrama-actual/');
            console.log(data.data, "data")
            dispatch(get_unidad_organizacional(data.data));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};

// obtener funcionario responsable

// export const get_funcionario_responsable = (): any => {
//     return async (dispatch: Dispatch<any>) => {
//         try {
//             const { data } = await api.get('almacen/solicitudes/search-funcionario/?tipo_documento&numero_documento&id_unidad_para_la_que_solicita');
//             console.log(data, "data")
//             dispatch(get_funcionario_responsable());
//             return data;
//         } catch (error: any) {
//             return error as AxiosError;
//         }
//     };
// };

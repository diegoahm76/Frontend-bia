import { toast, type ToastContent } from 'react-toastify';

import { api } from '../../../../../../api/axios';
// import { type AxiosError } from 'axios';


import { type Dispatch } from 'react';
import { type AxiosError } from 'axios';
import { get_bodega } from '../../../../configuracion/store/slice/BodegaSlice';




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
// const control_success = (message: ToastContent) =>
//     toast.success(message, {
//         position: 'bottom-right',
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         progress: undefined,
//         theme: 'light'
//     });



// Obtener Bodega
export const get_bodega_service = (): any => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.get('almacen/bodega/get-list/');
            console.log(data)
            dispatch(get_bodega(data));
            return data;
        } catch (error: any) {
            console.log('get_bodega_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

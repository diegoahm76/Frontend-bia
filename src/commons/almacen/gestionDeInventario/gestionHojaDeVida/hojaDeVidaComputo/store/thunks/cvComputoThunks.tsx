
import {api} from '../../../../../../../api/axios';
// Types
import { type AxiosError, } from 'axios';
// Reducers
import { toast, type ToastContent } from 'react-toastify';
// Interfaces
import {   get_cv_computers, get_cv_maintenance } from '../../store/slices/indexCvComputo';
import { type Dispatch } from 'react';


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

// Obtener Mantenimientos
export const get_cv_maintenance_service = (id_articulo: number) => {
    return async (dispatch:Dispatch<any>) => {
        try {
            const { data } = await api.get(`almacen/mantenimientos/programados/get-five-list/${id_articulo}/`);
            dispatch(get_cv_maintenance(data.data));
            return data;
        } catch (error: any) {
            console.log('get_cv_maintenance_service');
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// // // Obtener Artculo por nombre o codigo

// // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
// export const get_cv_article_all_service = (serial: string, nombre: string, cod_tipo_activo: any) =>{
//     // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
//     const element_modal_id = document.getElementById("modal-article-id")!;
//     return async (
//         dispatch: Dispatch<any>,
//         getState: any
//       ): Promise<AxiosResponse | AxiosError> => {
      
//         try {
//             // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
//             const { data } = await api.get(`almacen/bienes/catalogo-bienes/get-by-nombre-nroidentificador/?cod_tipo_activo=${cod_tipo_activo}&nombre=${nombre}&doc_identificador_nro=${serial}`);
//             dispatch(get_cv_articles(data.Elementos));
//             void Swal.fire({
//                 target: element_modal_id,
//                 position: "center",
//                 icon: "success",
//                 title: data.detail,
//                 showConfirmButton: true,
//                 confirmButtonText: 'Aceptar',
//                 timer: 2000,
//             });
//             return data;
//         } catch (error: any) {
//             control_error(error.response.data.detail);
//            void Swal.fire({
//                 target: element_modal_id,
//                 position: "center",
//                 icon: "error",
//                 title: error.response.data.detail,
//                 showConfirmButton: true,
//                 confirmButtonText: 'Aceptar',
//                 timer: 2000,
//             });
//             return error as AxiosError;
//         }
//     };
// };

// Obtener Hoja de Vida PC
export const get_cv_computers_service = (id: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/bienes/catalogo-bienes/get-by-nro-identificador/?cod_tipo_activo=Com&doc_identificador_nro=${id}`);
            dispatch(get_cv_computers(data.Elementos));
            control_success('El bien se agrego correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Crear Hoja de Vida PC
export const create_cv_computers_service = (formdata: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.post('almacen/hoja-de-vida/computadores/create/', formdata);
            control_success('La hoja de vida se creo correctamente');
            dispatch(get_cv_computers(null));
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Actualizar Hoja de Vida PC
export const update_cv_computers_service = (id: string, file: any) => {
    return async (dispatch: Dispatch<any>) => {
        const formdata = new FormData()
        formdata.append('sistema_operativo', id);
        formdata.append('suite_ofimatica', id);
        formdata.append('antivirus', id);
        formdata.append('color', id);
        formdata.append('tipo_de_equipo', id);
        formdata.append('tipo_almacenamiento', id);
        formdata.append('capacidad_almacenamiento', id);
        formdata.append('procesador', id);
        formdata.append('memoria_ram', id);
        formdata.append('observaciones_adicionales', id);
        formdata.append('otras_aplicaciones', id);
        formdata.append('id_articulo', id);
        formdata.append('ruta_imagen_foto', file);
        try {
            const { data } = await api.put(`almacen/hoja-de-vida/computadores/update/${id}/`, formdata);
            dispatch(get_cv_computers_service(id));
            control_success('La hoja de vida se actualizó correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Eliminar Hoja de Vida PC
export const delete_cv_computers_service = (id: string) => {
    return async (dispatch: Dispatch<any>) =>{
        try {
            const { data } = await api.delete(`almacen/hoja-de-vida/computadores/delete/${id}/`);
            dispatch(get_cv_computers_service(id));
            control_success('La hoja de vida se eliminó correctamente');
            return data;
        } catch (error: any) {
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
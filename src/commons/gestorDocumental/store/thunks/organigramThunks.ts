import Swal, { type SweetAlertResult } from 'sweetalert2'
import { api } from '../../../../api/axios';
// import { type NavigateFunction } from 'react-router-dom';
// Types
import { type AxiosError, type AxiosResponse } from "axios";
// Reducers

import { get_mold_organigrams, get_organigrams, 
    // current_organigram, 
    // get_levels, 
    // get_unitys 
} from "../slices/organigramSlice";
import { type IObjOrganigram } from '../../interfaces/organigrama';
// Interfaces
// import { type FormValuesUnitys, type IObjCreateOrganigram, type IObjLevels } from '../interfaces/organigrama';

const notification_error = async (message = 'Algo pasó, intente de nuevo'): Promise<SweetAlertResult> => await Swal.mixin({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
}).fire();

// Obtener Organigrama
export const get_mold_organigrams_service = (id: string | number | null) => {
    return async (dispatch: (arg0: { payload: any; type: `${string}/${string}`; }) => void): Promise<AxiosResponse | AxiosError> => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/organigrama/unidades/get-jerarquia/${id}/`);
            dispatch(get_mold_organigrams(data.data));
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Obtener Organigrama
export const get_organigrams_service = () => {
    return async (dispatch: (arg0: { payload: IObjOrganigram[]; type: "organigram/get_organigrams"; }) => void): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await api.get("almacen/organigrama/get/");
            dispatch(get_organigrams(data.Organigramas));
            console.log(data);
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// // Agregar Organigrama
// export const add_organigrams_service = (organigrama: IObjCreateOrganigram, navigate: NavigateFunction) => {
//     return async (dispatch): Promise<AxiosResponse | AxiosError> => {
//         try {
//             const { data } = await api.post("almacen/organigrama/create/", organigrama);
//             dispatch(get_organigrams_service());
//             dispatch(current_organigram(data.detail));
//             void Swal.fire("Correcto", "El organigrama se agrego correctamente", "success");
//             navigate('/dashboard/gestordocumental/organigrama/edicion-organigrama')
//             return data;
//         } catch (error: any) {
//             void notification_error(error.response.data.detail);
//             navigate('/dashboard/gestordocumental/organigrama/crearorganigrama')
//             return error as AxiosError;
//         }
//     };
// };
// // Editar Organigrama
// export const edit_organigrams_service = (organigrama: IObjCreateOrganigram, id: string) => {
//     return async (dispatch): Promise<AxiosResponse | AxiosError> => {
//         try {
//             const { data } = await api.patch(`almacen/organigrama/update/${id}/`, organigrama);
//             dispatch(get_organigrams_service());
//             void Swal.fire("Correcto", "El organigrama se editó correctamente", "success");
//             return data;
//         } catch (error: any) {
//             void notification_error(error.response.data.detail);
//             return error as AxiosError;
//         }
//     };
// };
// // Finalizar Organigrama
// export const to_finalize_organigram_service = (id: string, navigate: NavigateFunction) => {
//     return async (dispatch): Promise<AxiosResponse | AxiosError> => {
//         try {
//             const { data } = await api.put(`almacen/organigrama/finalizar/${id}/`);
//             dispatch(get_organigrams_service());
//             void Swal.fire({
//                 position: "center", icon: "info", title: "Atención", text: data.detail,
//             });
//             navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
//             return data;
//         } catch (error: any) {
//             void notification_error(error.response.data.detail);
//             return error as AxiosError;
//         }
//     };
// };

// // Niveles
// // Obtener Niveles
// export const get_levels_service = (id: string | number | null) => {
//     return async (dispatch): Promise<AxiosResponse | AxiosError> => {
//         try {
//             const { data } = await api.get(`almacen/organigrama/niveles/get-by-organigrama/${id}/`);
//             dispatch(get_levels(data.data));
//             return data;
//         } catch (error: any) {
//             void notification_error(error.response.data.detail);
//             return error as AxiosError;
//         }
//     };
// };

// // Actualizar Niveles
// export const update_levels_service = (id: string | number | null, newLevels: IObjLevels[]) => {
//     return async (dispatch): Promise<AxiosResponse | AxiosError> => {
//         try {
//             const { data } = await api.put(`almacen/organigrama/niveles/update/${id}/`, newLevels);
//             dispatch(get_levels_service(id));
//             void Swal.fire("Correcto", "Proceso Exitoso", "success");
//             return data;
//         } catch (error: any) {
//             void notification_error(error.response.data.detail);
//             return error as AxiosError;
//         }
//     };
// };
// // Unidades

// // Obtener Unidades
// export const get_unitys_service = (id: string | number | null) => {
//     return async (dispatch): Promise<AxiosResponse | AxiosError> => {
//         try {
//             const { data } = await api.get(`almacen/organigrama/unidades/get-by-organigrama/${id}/`);
//             dispatch(get_unitys(data.data));
//             return data;
//         } catch (error: any) {
//             void notification_error(error.response.data.detail);
//             return error as AxiosError;
//         }
//     };
// };

// // Actualizar Unidades
// export const update_unitys_service = (id: string | number | null, newUnitys: FormValuesUnitys[], cleanUnitys: () => void) => {
//     return async (dispatch): Promise<AxiosResponse | AxiosError> => {
//         try {
//             const { data } = await api.put(`almacen/organigrama/unidades/update/${id}/`, newUnitys);
//             dispatch(get_unitys_service(id));
//             void Swal.fire("Correcto", "Proceso Exitoso", "success");
//             return data;
//         } catch (error: any) {
//             void notification_error(error.response.data.detail);
//             return error as AxiosError;
//         }
//     };
// };

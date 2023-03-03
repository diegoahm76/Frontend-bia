import { type Dispatch } from 'react';
import { type NavigateFunction } from 'react-router-dom';
import Swal, { type SweetAlertResult } from 'sweetalert2'
// import { toast } from 'react-toastify';
// import "react-toastify/dist/ReactToastify.css";
import { api } from '../../../../api/axios';
import { type AxiosError, type AxiosResponse } from "axios";
// Slices
import { get_mold_organigrams, get_organigrams, 
    current_organigram, 
    get_levels, 
    get_unitys 
} from "../slices/organigramSlice";
// Interfaces
import { type IObjOrganigram, 
    type IObjCreateOrganigram,
    type FormValuesUnitys, 
     type IObjLevels, 
     type IObjUnitys
} from '../../interfaces/organigrama';

const notification_error = async (message = 'Algo pasó, intente de nuevo'): Promise<SweetAlertResult> => await Swal.mixin({
    position: "center",
    icon: "error",
    title: message,
    showConfirmButton: true,
    confirmButtonText: "Aceptar",
}).fire();

// Obtener Organigrama
export const get_mold_organigrams_service = (id: string | number | null) => {
    return async (dispatch: Dispatch<any>) => {
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
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Agregar Organigrama
export const add_organigrams_service = (organigrama: any, navigate: NavigateFunction) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.post("almacen/organigrama/create/", organigrama);
            dispatch(get_organigrams_service());
            dispatch(current_organigram(data.detail));
            void Swal.fire("Correcto", "El organigrama se agrego correctamente", "success");
            navigate('/dashboard/gestor-documental/organigrama/editar-organigrama')
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            navigate('/dashboard/gestor-documental/organigrama/crear-organigrama')
            return error as AxiosError;
        }
    };
};
// Editar Organigrama
export const edit_organigrams_service = (organigrama: IObjCreateOrganigram, id: string) => {
    return async (dispatch: Dispatch<any>): Promise<AxiosResponse | AxiosError> => {
        try {
            console.log("Testing dentro de edit_organigrams_service")
            const { data } = await api.patch(`almacen/organigrama/update/${id}/`, organigrama);
            dispatch(get_organigrams_service());
            void Swal.fire("Correcto", "El organigrama se editó correctamente", "success");
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Finalizar Organigrama
export const to_finalize_organigram_service = (id: string, navigate: NavigateFunction) => {
    return async (dispatch: (arg0: (dispatch: (arg0: { payload: IObjOrganigram[]; type: "organigram/get_organigrams"; }) => void) => Promise<AxiosResponse<any, any> | AxiosError<unknown, any
        // Types
        >>) => void): Promise<AxiosResponse | AxiosError> => {
        try {
            const { data } = await api.put(`almacen/organigrama/finalizar/${id}/`);
            dispatch(get_organigrams_service());
            void Swal.fire({
                position: "center", icon: "info", title: "Atención", text: data.detail,
            });
            navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Niveles
// Obtener Niveles
export const get_levels_service = (id: string | number | null) => {
    return async (dispatch: (arg0: { payload: IObjLevels[]; type: "organigram/get_levels"; }) => void): Promise<AxiosResponse | AxiosError> => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/organigrama/niveles/get-by-organigrama/${id}/`);
            dispatch(get_levels(data.data));
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Actualizar Niveles
export const update_levels_service = (id: string | number | null, newLevels: IObjLevels[]) => {
    return async (dispatch: (arg0: (dispatch: (arg0: { payload: IObjLevels[]; type: "organigram/get_levels"; }) => void) => Promise<AxiosResponse<any, any> | AxiosError<unknown, any>>) => void): Promise<AxiosResponse | AxiosError> => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.put(`almacen/organigrama/niveles/update/${id}/`, newLevels);
            dispatch(get_levels_service(id));
            void Swal.fire("Correcto", "Proceso Exitoso", "success");
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};
// Unidades

// Obtener Unidades
export const get_unitys_service = (id: string | number | null) => {
    return async (dispatch: (arg0: { payload: IObjUnitys[]; type: "organigram/get_unitys"; }) => void): Promise<AxiosResponse | AxiosError> => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/organigrama/unidades/get-by-organigrama/${id}/`);
            dispatch(get_unitys(data.data));
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Actualizar Unidades
export const update_unitys_service = (id: string | number | null, newUnitys: FormValuesUnitys[], cleanUnitys: () => void) => {
    return async (dispatch: (arg0: (dispatch: (arg0: { payload: IObjUnitys[]; type: "organigram/get_unitys"; }) => void) => Promise<AxiosResponse<any, any> | AxiosError<unknown, any>>) => void): Promise<AxiosResponse | AxiosError> => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.put(`almacen/organigrama/unidades/update/${id}/`, newUnitys);
            dispatch(get_unitys_service(id));
            void Swal.fire("Correcto", "Proceso Exitoso", "success");
            return data;
        } catch (error: any) {
            void notification_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

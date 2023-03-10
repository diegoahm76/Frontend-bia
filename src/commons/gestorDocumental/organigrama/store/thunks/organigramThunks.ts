import { type Dispatch } from 'react';
import { type NavigateFunction } from 'react-router-dom';
import { toast , type ToastContent} from 'react-toastify';
import Swal
// , { type SweetAlertResult } 
from 'sweetalert2'
import { api } from '../../../../../api/axios';
import { type AxiosError, 
    // type AxiosResponse 
} from "axios";
// Slices
import { get_mold_organigrams, get_organigrams, 
    current_organigram, 
    get_levels, 
    get_unitys 
} from "../slices/organigramSlice";
// Interfaces
import { 
    // type IObjOrganigram, 
    type IObjCreateOrganigram,
    // type FormValuesUnitys, 
    //  type IObjLevels, 
    //  type IObjUnitys
} from '../../interfaces/organigrama';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_error = (message:ToastContent = 'Algo pasó, intente de nuevo') => (
    toast.error(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
);

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const control_success = (message:ToastContent) => (
    toast.success(message, {
        position: 'bottom-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      })
);

// Obtener Organigrama
export const get_mold_organigrams_service = (id: string | number | null) => {
    
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/organigrama/unidades/get-jerarquia/${id}/`);
            dispatch(get_mold_organigrams(data.data));
            return data;
        } catch (error: any) {
            console.log("get_mold_organigrams_service");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Obtener Organigrama
export const get_organigrams_service = ():any => {
    return async (dispatch: Dispatch<any>)=> {
        try {
            const { data } = await api.get("almacen/organigrama/get/");
            dispatch(get_organigrams(data.Organigramas));
            return data;
        } catch (error: any) {
            console.log("get_organigrams_service");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Agregar Organigrama
export const add_organigrams_service = (organigrama: any, navigate: NavigateFunction) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            console.log(organigrama);   
            const { data } = await api.post("almacen/organigrama/create/", organigrama);
            
            dispatch(get_organigrams_service());
            dispatch(current_organigram(data.detail));
            control_success("El organigrama se agrego correctamente");
            navigate('/dashboard/gestor-documental/organigrama/editar-organigrama')
            return data;
        } catch (error: any) {
            console.log("add_organigrams_service");
            control_error(error.response.data.detail);
            console.log(error.response.data); 
            navigate('/dashboard/gestor-documental/organigrama/crear-organigrama')
            return error as AxiosError;
        }
    };
};

// Editar Organigrama
export const edit_organigrams_service = (organigrama: IObjCreateOrganigram, id: string) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.patch(`almacen/organigrama/update/${id}/`, organigrama);
            dispatch(get_organigrams_service());
            control_success("El organigrama se editó correctamente");
            return data;
        } catch (error: any) {
            console.log("edit_organigrams_service");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Finalizar Organigrama
export const to_finalize_organigram_service = (id: string, navigate: NavigateFunction) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const { data } = await api.put(`almacen/organigrama/finalizar/${id}/`);
            dispatch(get_organigrams_service());
            void Swal.fire({
                position: "center", icon: "info", title: "Atención", text: data.detail,
            });
            navigate('/dashboard/gestordocumental/organigrama/crearorganigrama');
            return data;
        } catch (error: any) {
            console.log("to_finalize_organigram_service");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Niveles
// Obtener Niveles
export const get_levels_service = (id: string | number | null) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/organigrama/niveles/get-by-organigrama/${id}/`);
            dispatch(get_levels(data.data));
            return data;
        } catch (error: any) {
            console.log("get_levels_service");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Actualizar Niveles
export const update_levels_service = (id: string | number | null, newLevels: any) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.put(`almacen/organigrama/niveles/update/${id}/`, newLevels);
            dispatch(get_levels_service(id));
            control_success("Proceso Exitoso");
            return data;
        } catch (error: any) {
            console.log("update_levels_service");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Unidades
// Obtener Unidades
export const get_unitys_service = (id: string | number | null) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`almacen/organigrama/unidades/get-by-organigrama/${id}/`);
            dispatch(get_unitys(data.data));
            return data;
        } catch (error: any) {
            console.log("get_unitys_service");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

// Actualizar Unidades
export const update_unitys_service = (id: string | number | null, new_unitys: any, cleanUnitys: () => void) => {
    return async (dispatch: Dispatch<any>) => {
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            console.log(id, new_unitys);
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.put(`almacen/organigrama/unidades/update/${id}/`, new_unitys);
            dispatch(get_unitys_service(id));
            control_success("Proceso Exitoso");
            return data;
        } catch (error: any) {
            console.log("update_unitys_service fail");
            control_error(error.response.data.detail);
            return error as AxiosError;
        }
    };
};

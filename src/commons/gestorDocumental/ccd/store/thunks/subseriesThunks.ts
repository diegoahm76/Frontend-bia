import {type Dispatch } from 'react';
import Swal from 'sweetalert2'
import { api } from '../../../../../api/axios';
// Types
import { type AxiosError, type AxiosResponse } from "axios";
// Reducers
import { get_subseries_ccd } from '../slices/subseriesSlice';
// Interfaces
import { type ISubSeriesObject } from '../../interfaces/ccd';

// Consulta subseries documentales
export const get_subseries_service = () => {
    return async (dispatch: Dispatch<any>, getState:any ): Promise<AxiosResponse | AxiosError> => {    
        const { ccd_current } = getState().ccd;
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.get(`gestor/ccd/subseries/get-by-id/${ccd_current.id_ccd}/`);
            dispatch(get_subseries_ccd(data.data));
            return data;
        } catch (error: any) {
            return error as AxiosError;
        }
    };
};


// Crear, actualizar y/o eliminar subseries
export const create_subseries_service = (newSubSeries: ISubSeriesObject[], clean: () => void) => {
    return async (dispatch: Dispatch<any>, getState:any ): Promise<AxiosResponse | AxiosError> => { 
        const { ccd_current } = getState().ccd;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const element_modal_id = document.getElementById("modal-serie-subserie-id")!;
        try {
            // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
            const { data } = await api.put(`gestor/ccd/subseries/update/${ccd_current.id_ccd}/`, newSubSeries);
            dispatch(get_subseries_service());
            clean();
            void Swal.fire({
                target: element_modal_id,
                position: "center",
                icon: "success",
                title: data.detail,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                timer: 2000,
            });
            return data;
        } catch (error: any) {
            void Swal.fire({
                target: element_modal_id,
                position: "center",
                icon: "error",
                title: error.response.data.detail,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                timer: 2000,
            });
            return error as AxiosError;
        }
    };
};
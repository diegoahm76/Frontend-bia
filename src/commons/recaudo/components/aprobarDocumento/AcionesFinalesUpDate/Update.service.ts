/* eslint-disable @typescript-eslint/naming-convention */

import Swal from "sweetalert2";
import { control_success } from "../../../../gestorDocumental/ccd/componentes/crearSeriesCcdDialog/utils/success_errors";
import { control_error } from "../../../../gestorDocumental/alertasgestor/utils/control_error_or_success";
import { api } from "../../../../../api/axios";


export const handleActionClick = async (id: any) => {
    const swalOptions: any = {
        title: '¿Estás seguro de aprobar este documento?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, aprobar',
        cancelButtonText: 'Cancelar',
    };

    try {
        const result = await Swal.fire(swalOptions);

        if (result.isConfirmed) {
            const updateUrl = `/recaudo/formulario/actualizar_formulario/${id}/`;
            const requestBody = {
                aprobado: true,
            };

            const res = await api.put(updateUrl, requestBody);

            if (res.status === 200) {
                control_success(res.data.detail);
            } else {
                control_success('Error al aprobar documento');
            }
        }
    } catch (error) {
        control_error('Error al aprobar documento');
    }
};
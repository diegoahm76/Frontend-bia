/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../api/axios";
import {  control_success } from '../../../../helpers';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';

const cargarAsignaciones = async ({
    setAsignaciones,
    formData
}: {
    setAsignaciones: any,
    formData:any,
}): Promise<any> => {
    try {
        const response = await api.get(`/gestor/pqr/consulta-estado-pqrsdf/?tipo_solicitud=${formData.tipo_solicitud}&tipo_pqrsdf=${formData.pqrs}&radicado=${formData.radicado}&fecha_radicado_desde=${formData.fecha_desde}&fecha_radicado_hasta=${formData.fecha_hasta}&estado_solicitud=${formData.estado}`);
        if (response.data.success) {
            setAsignaciones(response?.data?.data);

            control_success("Datos encontrados")
        }
    } catch (error: any) {
        console.error('Error al cargar las asignaciones de encuesta', error);
        // control_error(error.response.data.detail);
        showAlert("Opss", `${error?.response?.data?.detail}`, "error")
    }
};

export {
    cargarAsignaciones
}
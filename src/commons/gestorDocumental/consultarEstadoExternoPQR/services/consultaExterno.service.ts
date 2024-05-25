/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../api/axios";
import { control_error, control_success } from '../../../../helpers';
import { showAlert } from '../../../../utils/showAlert/ShowAlert';
import { Pqr, TipoPQRSDF } from "../interface/types";




const cargarAsignaciones = async ({
    setAsignaciones,
    formData
  }: {
    setAsignaciones: any,
    formData: any,
  }): Promise<any> => {
    try {
        const response = await api.get(`/gestor/pqr/consulta-estado-pqrsdf/?tipo_solicitud=${formData.tipo_solicitud}&tipo_pqrsdf=${formData.pqrs}&radicado=${formData.radicado}&fecha_radicado_desde=${formData.fecha_desde}&fecha_radicado_hasta=${formData.fecha_hasta}&estado_solicitud=${formData.estado}`);
        if (response.data.success) {
            // Filtra las asignaciones para incluir solo las que tienen los estados deseados
            const asignacionesFiltradas = response.data.data.filter((asignacion:any) => 
              ['RESPONDIDA', 'EN GESTION', 'RADICADO'].includes(asignacion.Estado)
            );
  
            setAsignaciones(asignacionesFiltradas); // Actualiza el estado con las asignaciones filtradas
  
            control_success("Datos encontrados")
        }
    } catch (error: any) {
        console.error('Error al cargar las asignaciones de encuesta', error);
        // control_error(error.response.data.detail);
        showAlert("Opss", `${error?.response?.data?.detail}`, "error")
    }
  };

// const cargarAsignaciones = async ({
//     setAsignaciones,
//     formData
// }: {
//     setAsignaciones: any,
//     formData: any,
// }): Promise<any> => {
//     try {
//         const response = await api.get(`/gestor/pqr/consulta-estado-pqrsdf/?tipo_solicitud=${formData.tipo_solicitud}&tipo_pqrsdf=${formData.pqrs}&radicado=${formData.radicado}&fecha_radicado_desde=${formData.fecha_desde}&fecha_radicado_hasta=${formData.fecha_hasta}&estado_solicitud=${formData.estado}`);
//         if (response.data.success) {
//             setAsignaciones(response?.data?.data);

//             control_success("Datos encontrados")
//         }
//     } catch (error: any) {
//         console.error('Error al cargar las asignaciones de encuesta', error);
//         // control_error(error.response.data.detail);
//         showAlert("Opss", `${error?.response?.data?.detail}`, "error")
//     }
// };

// Efecto para cargar los datos del pqrs

const fetchSpqrs = async ({
    setpqrs,
}: {
    setpqrs: any,
}): Promise<any> => {
    try {
        const url = "/gestor/choices/cod-tipo-pqrs/";
        const res = await api.get<{ data: Pqr[] }>(url);
        setpqrs(res.data.data);
    } catch (error) {
        console.error(error);
    }
};

//Organigrama 
const cargarorganigrama = async ({
    setorganigrama,
}: {
    setorganigrama: any,
}): Promise<any> => {
    try {
        const response = await api.get('/transversal/organigrama/unidades/get-list/organigrama-actual/');
        if (response.data.success) {
            setorganigrama(response.data.data);
        }
    } catch (error: any) {
        console.error('Error al cargar las organigrama', error);
        control_error(error.response.data.detail);
    }
};

//Tipo de PQRSDF
const fetchTipoPQRSDF = async ({
    setTipoPQRSDF,
}: {
    setTipoPQRSDF: any,
}): Promise<any> => {
    try {
        const url = "/gestor/choices/tipo-solicitud-pqrsdf/";
        const res = await api.get<any[]>(url); // Como la respuesta es un array de arrays
        const parsedData: TipoPQRSDF[] = res.data.map(([codigo, descripcion]: [string, string]) => ({
            codigo,
            descripcion,
        }));
        setTipoPQRSDF(parsedData);
    } catch (error) {
        console.error(error);
    }
};

//Estado 
const cargarestado = async ({
    setestado,
}: {
    setestado: any,
}): Promise<any> => {
    try {
        const response = await api.get('/gestor/pqr/get-estado-solicitud/');
        if (response.data.success) {
            setestado(response.data.data);
        }
    } catch (error: any) {
        console.error('Error al cargar las estado', error);
        control_error(error.response.data.detail);
    }
};
export {
    fetchSpqrs,
    cargarestado,
    fetchTipoPQRSDF,
    cargarorganigrama,
    cargarAsignaciones,

}

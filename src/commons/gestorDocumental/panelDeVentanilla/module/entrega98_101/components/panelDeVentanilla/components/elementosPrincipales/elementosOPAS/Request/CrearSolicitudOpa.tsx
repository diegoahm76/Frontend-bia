/* eslint-disable @typescript-eslint/naming-convention */
import Swal from "sweetalert2";
import { api } from "../../../../../../../../../../../api/axios";
import { control_success } from "../../../../../../../../../../seguridad/components/SucursalEntidad/utils/control_error_or_success";

export const CrearSolicitudOpa = async (id_tramite_opa:any) => {
    try {
        const url = `gestor/panel_ventanilla/opas/solicitud_juridica/create/`;
        const data = {
          "id_solicitud_tramite": id_tramite_opa
        }

        const respuesta = await api.post(url, data);

        if (respuesta && respuesta.data) {
          Swal.fire({
            icon: 'success',
            title: 'Detalle de la liquidación',
            showConfirmButton: true,
          });
        } else {
          console.error('Error en la solicitud:', respuesta ? respuesta.statusText : 'Response undefined');
        }
      } catch (error: any) {
        control_success(error.response?.data?.detail || 'Revisa que estés enviando todos los campos');
      }
    };


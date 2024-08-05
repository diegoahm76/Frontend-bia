import Swal from "sweetalert2";
import { api } from "../../../../../../../api/axios";
import { showAlert } from "../../../../../../../utils/showAlert/ShowAlert";

/* eslint-disable @typescript-eslint/naming-convention */
export const postRespuestaOPA = async (
  formData: any,
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const url = `gestor/bandeja-tareas/opa/respuesta/create/`;
  const url_guardado = `gestor/pqr/archivar-pqrsdf/`;
  const {
    respuesta: { id_solicitud_tramite },
  } = formData;
  console.log('respuesta', id_solicitud_tramite);
  try {
    if (!formData || typeof formData !== 'object') {
       showAlert('Opss!', 'Faltan valores para realizar la solicitud', 'warning');
    }

    if (typeof setLoadingButton !== 'function') {
      showAlert('Opss!', 'Ha ocurrido un error con el botón de carga de la solicitud', 'warning');
    }

    setLoadingButton(true);
    const response = await api.post(url, formData);

    if (!response || typeof response !== 'object') {
      showAlert('Opss!', 'Ha ocurrido un error con la respuesta de la solicitud', 'warning');
    }

    console.log(response);
    return Promise.resolve(response);
  } catch (error) {
    console.error(error);
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ha ocurrido un error',
      footer: 'Por favor intente nuevamente',
    });
    throw error;
  } finally {
    setLoadingButton(false);
  }
};
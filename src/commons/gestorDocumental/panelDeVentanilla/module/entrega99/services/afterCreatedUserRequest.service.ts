/* eslint-disable @typescript-eslint/naming-convention */

import Swal from 'sweetalert2';
import { api } from '../../../../../../api/axios';

const baseUrl = `gestor/panel_ventanilla/pqrsdf/solicitud/`;
export const getDetalleSolicitud = async (
  idSolicitud: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `${baseUrl}get/id/${idSolicitud}/`;
    const { data } = await api.get(url);
    return data?.data;
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al cargar la información de la solicitud y/o no hay información asociada a la solicitud',
    });
  } finally {
    setLoading(false);
  }
};

export const getAnexosSolicitud = async (
  idSolicitud: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    setLoading(true);
    const url = `${baseUrl}anexos/get/${idSolicitud}/`;

    const { data } = await api.get(url);
    return data?.data;
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al cargar los anexos de la solicitud y/o no hay anexos asociados a la solicitud',
    });
  } finally {
    setLoading(false);
  }
};

export const getMetadatosByAnexo = async (id_anexo_PQR : number, handleModal: any) => {
  try {
  const url = `${baseUrl}anexos/meta-data/get/${id_anexo_PQR}/`;
  const { data } = await api.get(url);
  console.log(data?.data);
  return data?.data;
  } catch (error) {
    await Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Error al cargar los metadatos de la solicitud o no hay metadatos asociados al anexo',
    });
    handleModal(false)
    return error;
  }
};

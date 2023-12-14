/* eslint-disable @typescript-eslint/naming-convention */

import { api } from "../../../../../../api/axios";

const baseUrl = `gestor/panel_ventanilla/pqrsdf/solicitud/`;
export const getDetalleSolicitud = async (idSolicitud: number) => {
  try{ 
    const url = `${baseUrl}get/id/${idSolicitud}/`;
    const {data} = await api.get(url);
    console.log(data);
   }
  catch(error){}
}


export const getAnexosSolicitud = async (idSolicitud: number) => {
  try{}
  catch(error){}
}

export const getMetadatosByAnexo = async (idAnexo: number) => {
  try{}
  catch(error){}
}
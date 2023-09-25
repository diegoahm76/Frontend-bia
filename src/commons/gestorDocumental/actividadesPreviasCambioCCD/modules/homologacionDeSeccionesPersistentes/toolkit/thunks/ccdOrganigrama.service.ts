import { api } from "../../../../../../../api/axios";

/* eslint-disable @typescript-eslint/naming-convention */
export const functionGetCcdHomologacionSeries = async () => {
  try{
    const url = 'gestor/ccd/get-homologacion-busqueda/'
    const {data} = await api.get(url)
    console.log(data)
  }catch(err){
    console.log(err);
  }
}
/* eslint-disable @typescript-eslint/naming-convention */
import { api } from "../../../../../../../../../api/axios";
import { control_success } from "../../../../../../../../../helpers";
import { handleApiError } from "../../../../../../../../../utils/functions/errorManage";
import { control_warning } from "../../../../../../../../almacen/configuracion/store/thunks/BodegaThunks";

export const getOpasPerPerson = async (idPersona: number, setLoading: 
    React.Dispatch<React.SetStateAction<boolean>>,

  ): Promise<any> => {
  try{
    setLoading(true)
    console.log('idPersona', idPersona)
    // gestor/solicitudes/opas/persona/get/215/
    const url = `gestor/solicitudes/opas/persona/get/${idPersona}/`
    const {data} = await api.get(url)
    console.log('data siuu', data?.data)
    return data?.data;
  }
  catch(error){
    handleApiError(error, 'Problemas con la conexión o no hay datos disponibles. Si estás en el proceso de selección de apoderado, no es necesario que elijas uno ahora.')
    return [];
  }
  finally{
    setLoading(false)
  }
}

export const getRelatedRequirements = async (idOpa: number, setLoading:React.Dispatch<React.SetStateAction<boolean>>): Promise<any> => {
  try{
    setLoading(true)
    console.log('idopaa', idOpa)
    const url = `gestor/solicitudes/opas/requerimientos/get/${idOpa}/`
    const {data} = await api.get(url)
    
    if(data?.data.length === 0){
      control_warning('No hay requerimientos relacionados a esta OPA')
      return [];
    }

    control_success('Requerimientos relacionados a la OPA encontrados')
    return data?.data;
  }
  catch(error){
    handleApiError(error, 'Problemas con la conexión o no hay datos disponibles.')
    return [];
  }finally{
    setLoading(false)
  }
}
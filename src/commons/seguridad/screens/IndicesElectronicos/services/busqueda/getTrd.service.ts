import { api } from "../../../../../../api/axios";
import { showAlert } from "../../../../../../utils/showAlert/ShowAlert";

/* eslint-disable @typescript-eslint/naming-convention */
export const getTrdExp = async () => {
  try {

    const url = `gestor/trd/get-terminados/`;

    const {data} = await api.get(url);
    console.log(data)

  if(data?.data?.length > 0){
      return data.data;
    }
    return [];
  } catch (error) {
    showAlert(
      'Ops...',
      'Error al obtener los "TRDS" ',
      'error'
    )
    return [];
  }
}

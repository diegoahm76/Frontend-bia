import axios from "axios";
import { api } from "../../../../../../api/axios";

/* eslint-disable @typescript-eslint/naming-convention */
export const getInitialData = async (id_PQRSDF: string) => {



  try{

    const [responseTitular, responseSolicita] = await Promise.all([
      api.get(`gestor/panel_ventanilla/pqrsdf/titular/get/${id_PQRSDF}/`),
      api.get(`gestor/panel_ventanilla/pqrsdf/solicita/get/`),
    ]);

    console.log('responseTitular', responseTitular);
    console.log('responseSolicita', responseSolicita);
    // return { responseTitular, responseSolicita };
  }
  catch(error){}
  finally{}
}
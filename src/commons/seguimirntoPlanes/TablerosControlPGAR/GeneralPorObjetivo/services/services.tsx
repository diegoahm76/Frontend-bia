

import { AxiosResponse } from "axios";
import { api } from "../../../../../api/axios";

// ? ----------------------------------------------- [ GET ] -----------------------------------------------

  //Servicios para obtener los datos de los planes PGAR

  export const get_tablero_por_objetivo = async (
    id_objetivo: number,
    agno: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/tablero-control-objetivos/${id_objetivo}/?agno=${agno}`
    );
    return response.data.data;
  };

  export const get_tablero_por_eje = async (
    id_planPAI: number,
    id_planPGAR: number,
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/tablero-control-ejes/?planPAI=${id_planPAI}&planPGAR=${id_planPGAR}`
    );
    return response.data.data;
  }

  export const get_tablero_por_objetivo_ejes = async (
    id_planPAI: number,
    id_eje: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/tablero-control-objetivo-ejes/?planPAI=${id_planPAI}&eje_estrategico=${id_eje}`
    );
    return response.data.data;
  };

  export const get_tablero_general_ejes = async (
    id_planPAI: number,
    id_planPGAR: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/tablero-control-general-ejes/?planPAI=${id_planPAI}&planPGAR=${id_planPGAR}`
    );
    return response.data.data;
  };

  export const get_tablero_general_objetivos = async (
    id_planPAI: number,
    id_planPGAR: number
  ): Promise<any> => {
    const response = await api.get(
      `seguimiento/planes/tablero-control-general-objetivos/?planPAI=${id_planPAI}&planPGAR=${id_planPGAR}`
    );
    return response.data.data;
  };

  // --------------------------- BUSQUEDAS AVANZADAS ------------------------------------------

  // ? ----------------------------------------------- [ POST ] -----------------------------------------------

  // ? ----------------------------------------------- [ PUT ] -----------------------------------------------

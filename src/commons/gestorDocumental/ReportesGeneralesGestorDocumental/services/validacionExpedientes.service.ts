import { api } from "../../../../api/axios";
import { handleApiError } from "../../../../utils/functions/errorManage";

/* eslint-disable @typescript-eslint/naming-convention */
export const validateExp = async (expediente: string) => {
  try {
    const { data } = await api.get(`/expedientes/${expediente}`);
    return data;
  } catch (error) {
    handleApiError(error);
  }
}
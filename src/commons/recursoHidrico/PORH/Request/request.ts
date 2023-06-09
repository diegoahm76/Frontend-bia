import { api } from "../../../../api/axios";
import type{ ResponseServer } from "../../../../interfaces/globalModels";


export const get_data_id = async (id: number, set_data: any, url: string): Promise<any[]> => {
    const { data } = await api.get<ResponseServer<any[]>>(
      `hidrico/programas/${url}/${id}/`
    );
    set_data(data.data);
    return data.data;
  };
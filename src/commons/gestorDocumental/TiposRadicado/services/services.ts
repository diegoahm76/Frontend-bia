import { api } from '../../../../api/axios';
import type { ValueProps } from '../../../recursoHidrico/Instrumentos/interfaces/interface';
import type { IConsecutivos } from '../types/types';

// * get tipos radicado
export const get_tipos_radicado = async (): Promise<ValueProps[]> => {
    const response = await api.get(`gestor/choices/cod-tipo-consecutivo/`);
    const data = response.data.data;
    return data ?? [];
};

// * get datos consecutivos
export const get_datos_consecutivos = async (agno: number | string, cod_tipo_radicado: string): Promise<IConsecutivos> => {
    const response = await api.get(`gestor/adminitrador_radicados/config_tipos_radicado_agno/get/${agno}/${cod_tipo_radicado}/`);
    const data = response.data.data;
    return data ?? [];
};

// ? post
export const post_tipos_radicado = async (data: any): Promise<any> => {
    const response = await api.post(`gestor/adminitrador_radicados/config_tipos_radicado_agno/create/`, data);
    return response.data;
};

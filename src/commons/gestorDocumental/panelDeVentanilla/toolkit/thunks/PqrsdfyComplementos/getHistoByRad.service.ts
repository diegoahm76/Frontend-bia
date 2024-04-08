/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosError } from 'axios';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';

export const getHistoricoByRadicado = async (
  radicado: string = '',
  handleLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    handleLoading(true);
    const encodedRadicado = encodeURIComponent(radicado);
    const url = `gestor/panel_ventanilla/historico/get/?radicado=${encodedRadicado}`;
    const { data } = await api.get(url);
    //  console.log('')(data);
    if (data?.data?.length === 0) {
      control_error('No sé encontró histórico de solicitudes');
      return [];
    }
    control_success('Historico de solicitudes cargado correctamente');
    return data?.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      control_error(error?.response?.data?.detail);
      return [];
    } else {
      return [];
      console.error(error);
    }
  } finally {
    handleLoading(false);
  }
};

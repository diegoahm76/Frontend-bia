/* eslint-disable @typescript-eslint/naming-convention */

import { AxiosError } from 'axios';
import { api } from '../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../helpers';

export const getHistoricoOtrosByRadicado = async (
  radicado: string = '',
  handleLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  handleLoading(true);
  const encodedRadicado = encodeURIComponent(radicado);
  const url = `gestor/panel_ventanilla/otros/historico/get/?radicado=${encodedRadicado}`;

  return api.get(url)
    .then(({ data }) => {
      if (data?.data?.length === 0) {
        control_error('No sé encontró histórico de solicitudes de otros');
        return [];
      }
      control_success('Historico de solicitudes de otros cargado correctamente');
      return data?.data;
    })
    .catch((error: unknown) => {
      if (error instanceof AxiosError) {
        control_error(error?.response?.data?.detail);
      } else {
        console.error(error);
      }
      return [];
    })
    .finally(() => {
      handleLoading(false);
    });
};
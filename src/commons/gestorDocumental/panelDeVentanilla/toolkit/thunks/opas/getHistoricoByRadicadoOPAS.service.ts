/* eslint-disable @typescript-eslint/naming-convention */
import { AxiosError } from "axios";
import { control_error, control_success } from "../../../../../../helpers";
import { api } from "../../../../../../api/axios";

export const getHistoricoByRadicadoOPAS = async (
  radicado: string = '',
  handleLoading: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    handleLoading(true);
    const encodedRadicado = encodeURIComponent(radicado);
    const url = `gestor/panel_ventanilla/opas/historico/get/?radicado=${encodedRadicado}`;
    const { data } = await api.get(url);
    //  console.log('')(data);
    if (data?.data?.length === 0) {
      control_error('No sé encontró histórico de solicitudes para la(s) OPAS');
      return [];
    }
    control_success('Historico de solicitudes de OPAS cargado correctamente');
    return data?.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      control_error(error?.response?.data?.detail);
      return [];
    } else {
      console.error(error);
      return [];
    }
  } finally {
    handleLoading(false);
  }
};

/* eslint-disable @typescript-eslint/naming-convention */
import { api } from '../../../../../api/axios';
import { control_error, control_success } from '../../../../../helpers';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';

export const get_restricciones_series_documentales = async (
  id_cat_serie_und: number,
  setLoadingRestricciones: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  try {
    setLoadingRestricciones(true);
    const url = `gestor/permisos/restricciones-permisos/get/${id_cat_serie_und}/`;
    const { data } = await api.get(url);
    if (data?.succes) {
      control_success('Se encontraron restricciones');
      // console.log(data);

      const datas = {
        restriccionParaTodasLasUnidades: {
          denegar_borrado_docs: data?.data?.denegar_borrado_docs,
          denegar_anulacion_docs: data?.data?.denegar_anulacion_docs,
          excluir_und_actual_respon_series_doc_restriccion:
            data?.data?.excluir_und_actual_respon_series_doc_restriccion
        },
        restriccionesOtros: {
          denegar_conceder_acceso_doc_na_resp_series:
            data?.data?.denegar_conceder_acceso_doc_na_resp_series,
          denegar_conceder_acceso_exp_na_resp_series:
            data?.data?.denegar_conceder_acceso_exp_na_resp_series
        }
        //* tambien viene una propiedad id por ahi, revisar si es necesario extraerla para realizar otra solicitud o proceso  --- id_cat_serie_und_org_ccd
      };

      const arrayRestriccionesParaTodasLasUnidades = Object.entries(
        datas.restriccionParaTodasLasUnidades
      ).map(([key, value]) => {
        return {
          id: key,
          value: value,
          checked: data?.data[key],
          che: key
        };
      });

      const arrayRestriccionesOtros = Object.entries(
        datas.restriccionesOtros
      ).map(([key, value]) => {
        return {
          id: key,
          value: value
        };
      });

      console.log(
        'arrayRestriccionesParaTodasLasUnidades',
        arrayRestriccionesParaTodasLasUnidades
      );
      console.log('arrayRestriccionesOtros', arrayRestriccionesOtros);

      return {
        arrayRestriccionesParaTodasLasUnidades,
        arrayRestriccionesOtros
      };
    } else {
      control_warning('Hubo un error al obtener las restricciones');
      return {
        arrayRestriccionesParaTodasLasUnidades: [],
        arrayRestriccionesOtros: []
      };
      // return [];
    }
  } catch (error: any) {
    control_error(
      error?.response?.data?.detail ||
        'Hubo un error al obtener las restricciones'
    );
    console.log(error);
  } finally {
    setLoadingRestricciones(false);
  }
};

/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import Swal from 'sweetalert2';
import { api } from '../../../../../../../../api/axios';
import {
  control_error,
  control_success
} from '../../../../../../../../helpers';
import { control_warning } from '../../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

// ! ----- Consulta de tabla temporal que es usada para manejar los datos de la tabla de la pantalla -- //

export const consultarTablaTemporal =
  async (/* setLoading: any */): Promise<any> => {
    // setLoading(true);
    try {
      const url = `transversal/organigrama/listado-registro-temporal/`;
      const { data } = await api.get(url);
      // //  console.log('')(data);
      //* revisar ese data.data luego, ya que cuando si existen registros retorna una lista y otros valores muy útiles, pero cuando no, retorna un objeto con un mensaje
      return {
        data: data?.data,
        success: data?.success,
        detail: data?.detail,
        totalData: data
      };
    } catch (error: any) {
      // control_warning('No hay datos para mostrar');
      // setLoading(false);
      return {
        data: [],
        success: false,
        detail: error?.response?.data?.detail,
        totalData: {}
      };
    } finally {
      // setLoading(false);
    }
  };

// ? -- consulta del organigrama actual -- //
export const get_organigrama_acual = async (navigate: any): Promise<any> => {
  try {
    const url = `transversal/organigrama/get/`;
    const { data } = await api.get(url);
    const dataToReturn = data.Organigramas.filter((el: any) => el.actual);

    if (dataToReturn.length === 0) {
      void Swal.fire({
        icon: 'warning',
        title: 'NO HAY ORGANIGRAMA ACTUAL',
        text: 'Porfavor seleccione uno para usar ésta opción de este módulo',
        showCloseButton: false,
        allowOutsideClick: false,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Reiniciar módulo',
        confirmButtonText: 'Ir a seleccionar organigrama',
        confirmButtonColor: '#042F4A',

        allowEscapeKey: false
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate('/app/gestor_documental/organigrama/crear');
        } else {
          window.location.reload();
        }
      });
    }

    return dataToReturn;
  } catch (error: any) {
    //  console.log('')(error);
  }
};

// ? ---- get organigramas disponibles con sus respectivas validaciones -- //
export const getOrganigramasDispobibles = async (): Promise<any> => {
  try {
    const url = `transversal/organigrama/get-terminados/`;
    const { data } = await api.get(url);
    //  console.log('')('dataaaaaaaaa', data);
    const dataToReturn = data?.filter(
      (el: any) => el.fecha_terminado && !el.fecha_retiro_produccion
    );
    return dataToReturn;
  } catch (error: any) {
    //  console.log('')(error);
  }
};

// ? --- get organigrama anterior al actual -- //

export const get_organigrama_anterior = async (navigate: any): Promise<any> => {
  try {
    const url1 =
      'transversal/organigrama/unidades/get-list/organigrama-retirado-reciente/';
    const { data } = await api.get(url1);

    const url2 = `transversal/organigrama/get/`;
    const { data: data2 } = await api.get(url2);

    const dataToReturn = data2?.Organigramas?.filter(
      (el: any) => el.id_organigrama === data?.data[0]?.id_organigrama
    );
    //  console.log('')('dataToReturn', dataToReturn);

    if (dataToReturn.length === 0) {
      void Swal.fire({
        icon: 'warning',
        title: 'NO HAY ORGANIGRAMA ANTERIOR AL ACTUAL',
        text: 'Alguno organigrama debe salir de producción para usar esa opción de éste módulo',
        showCloseButton: false,
        allowOutsideClick: false,
        showCancelButton: true,
        showConfirmButton: true,
        cancelButtonText: 'Reiniciar módulo',
        confirmButtonText: 'Ir a organigramas',
        confirmButtonColor: '#042F4A',

        allowEscapeKey: false
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate('/app/gestor_documental/organigrama/crear');
        } else {
          window.location.reload();
        }
      });
    }

    return dataToReturn;
  } catch (error: any) {
    //  console.log('')(error);
  }
};

// ! ------ GET PERSONAS DE ORGANIGRAMA ACTUAL Y DE ORGANIGRAMA QUE SELECCIONE PARA REALIZAR EL TRASLADO DE UNIDADES ------ //

export const getListadoPersonasOrganigramaActual = async (): Promise<any> => {
  try {
    const url = `transversal/organigrama/listado-personas-organigrama/`;
    const { data } = await api.get(url);
    return data;
  } catch (error: any) {
    //  console.log('')(error);
  }
};

export const getListaUnidadesOrganigramaSeleccionado = async (
  id_organigrama: number
): Promise<any> => {
  try {
    const url = `transversal/organigrama/unidades/get-by-organigrama/${id_organigrama}/`;
    const { data } = await api.get(url);
    return data;
  } catch (error: any) {
    //  console.log('')(error);
  }
};

//* con esta funcion consulto si hay personas sin actualizar, eso quiere decir que si no hay por defecto entro a la primera opcion ya que no se ha realizado el cambio de organigrama, si trae registros en porqu eel cambio de organigrama ya se realizó y por ende se debe entrar a la segunda opcion ()
export const getPersonasSinActualizarOrganigramaAnteriorAlActual =
  async (): Promise<any> => {
    try {
      const url = `transversal/organigrama/get-unidad-organizacional-after/`;
      const { data } = await api.get(url);
      return {
        data: data?.data,
        success: data?.success,
        detail: data?.detail
      };
    } catch (error: any) {
      //  console.log('')(error);
      return {
        data: [],
        success: false,
        detail: error?.response?.data?.detail
      };
    }
  };

export const putCrearRegistrosTemporalesT026 = async (
  id_organigrama_posible_cambio: number,
  data_almacenar_tabla_temporal: any,
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  if (data_almacenar_tabla_temporal.length === 0)
    return control_warning('No hay datos para guardar el traslado masivo');
  try {
    setLoadingButton(true);
    const url = `transversal/organigrama/guardar-actualizacion-unidad/${id_organigrama_posible_cambio}/`;
    const { data } = await api.put(url, data_almacenar_tabla_temporal);
    //  console.log('')('data retorno creación de tabla temporal', data);
    control_success('Traslado masivo de unidad guardado con éxito');
    return data;
  } catch (error: any) {
    //  console.log('')(error);
    control_error('Error al guardar traslado masivo de unidades');
  } finally {
    setLoadingButton(false);
  }
};

// ! get unidades organizacionales de organigrama actual
export const getUnidadesOrganizacionalesOrganigramaActual =
  async (): Promise<any> => {
    try {
      const url = `transversal/organigrama/unidades/get-list/organigrama-actual/`;
      const { data } = await api.get(url);
      //  console.log('')('unidades organizacionales de organigrama actual', data);
      return data;
    } catch (error: any) {
      //  console.log('')(error);
    }
  };

// ! proceder a realizar el traslado masivo de unidar por entidad
export const putTrasladoMasivoUnidadesPorEntidad = async (
  data_traslado_masivo: any,
  setLoadingButton: React.Dispatch<React.SetStateAction<boolean>>
): Promise<any> => {
  if (data_traslado_masivo.length === 0)
    return control_warning('No hay datos para proceder al traslado masivo');

  try {
    setLoadingButton(true);
    const url = `transversal/organigrama/finalizar-actualizacion-unidad/`;
    const { data } = await api.put(url, data_traslado_masivo);
    //  console.log('')('data retorno creación de tabla temporal', data);
    control_success('Traslado masivo realizado con éxito');
    return data;
  } catch (error: any) {
    //  console.log('')(error);
    control_error('Error al realizar el traslado masivo');
  } finally {
    setLoadingButton(false);
  }
};

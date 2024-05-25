/* eslint-disable @typescript-eslint/naming-convention */
// ? get seccion - subseccion que no aplicaba para la homologación

import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { control_success } from '../../../../../../../helpers';

export const GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE = async (
  idCcdNuevo: number,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  navigate?: any,
  dispatch?: any,
  callback?: any
) => {
  try {
    setLoading(true);
    const url = `gestor/ccd/unidades-ccd-actual/get/${idCcdNuevo}`;
    const response = await api.get(url);

    if (response?.data?.data?.coincidencias) {
      await Swal.fire({
        icon: 'warning',
        title: '¡CUIDADO!',
        text: 'Hay coincidencias pendientes por confirmar, desea continuar?',
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Continuar en este módulo',
        confirmButtonText:
          'Ir a módulo de homologación de secciones persistentes',
        confirmButtonColor: '#042F4A',
        cancelButtonColor: 'none',
        allowEscapeKey: false,
      }).then(async (result: any) => {
        if (result.isConfirmed) {
          navigate(
            '/app/gestor_documental/ccd/actividades_previas_cambio_ccd/homologacion_secciones_persistentes'
          );
        } else {
          if (!response?.data?.data?.unidades.length) {
            await Swal.fire({
              icon: 'warning',
              title: '¡ATENCIÓN!',
              text: 'No hay unidades pendientes por confirmar en este CCD',
              showCloseButton: true,
              allowOutsideClick: false,
              allowEscapeKey: false,
            });
            return {
              unidades: [],
              id_ccd_actual: response?.data?.data?.id_ccd_actual,
              id_ccd_nuevo: response?.data?.data?.id_ccd_nuevo,
            };
          }
          return {
            unidades: response?.data?.data?.unidades,
            id_ccd_actual: response?.data?.data?.id_ccd_actual,
            id_ccd_nuevo: response?.data?.data?.id_ccd_nuevo,
          };
        }
      });
    }

    if (!response?.data?.data?.unidades.length) {
      await Swal.fire({
        icon: 'warning',
        title: '¡ATENCIÓN!',
        text: 'No hay unidades pendientes por confirmar en este CCD',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
      return {
        unidades: [],
        id_ccd_actual: response?.data?.data?.id_ccd_actual,
        id_ccd_nuevo: response?.data?.data?.id_ccd_nuevo,
      };
    }

    return {
      unidades: response?.data?.data?.unidades,
      id_ccd_actual: response?.data?.data?.id_ccd_actual,
      id_ccd_nuevo: response?.data?.data?.id_ccd_nuevo,
    };
  } catch (error: any) {
    if (error?.response?.status === 403) {
      //  console.log('')('error', error?.response?.status);
      await Swal.fire({
        icon: 'warning',
        title: '¡CUIDADO!',
        text: error?.response?.data?.detail,
        showCloseButton: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        cancelButtonText: 'Reiniciar módulo',
        confirmButtonText:
          'Ir a módulo de homologación de secciones persistentes',
        confirmButtonColor: '#042F4A',
        allowEscapeKey: false,
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate(
            '/app/gestor_documental/ccd/actividades_previas_cambio_ccd/homologacion_secciones_persistentes'
          );
          dispatch(callback());
        }
      });
    }
    return [];
  } finally {
    setLoading(false);
  }
};

// ? get series - subseries asociadas a la seccion - subseccion que no aplicaba para la homologación

export const GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE = async ({
  idUnidadActual,
  idCcdActual,
  idCcdNuevo,
  setLoading,
}: {
  idUnidadActual: number;
  idCcdActual: number;
  idCcdNuevo: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = `gestor/ccd/cat-serie-ccd-actual/get/?id_ccd_actual=${idCcdActual}&id_ccd_nuevo=${idCcdNuevo}&id_unidad_actual=${idUnidadActual}`;
    const { data } = await api.get(url);

    const returnedData = data.data.coincidencias || [];

    if (returnedData.length > 0) {
      control_success('Catálogo de series encontradas' || data?.detail);
      return returnedData;
    }

    control_warning('No hay catálago de series asociadas a esta unidad, seleccione una unidad diferente para continuar');


    return returnedData;
  } catch (error: any) {
    //  console.log('')(error?.response?.status);

    if (error?.response?.status === 500) {
      void Swal.fire({
        icon: 'warning',
        title: '¡ATENCIÓN!',
        text: 'No hay catálago de series asociadas a esta unidad, seleccione una unidad diferente para continuar',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
    return [];
  } finally {
    //* establecer el loader
    setLoading(false);
  }
};

export const GET_UNIDADES_ORGNAIZACIONALES_UNIDADES_RESP = async ({
  idCcdNuevo,
  setLoading,
}: {
  idCcdNuevo: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  try {
    setLoading(true);
    const url = `gestor/ccd/unidades-ccd-nuevo/get/${176}`;
    const { data } = await api.get(url);

    if (data?.data.length > 0) {
      control_success('Unidades organizacionales encontradas' || data?.detail);
      return data?.data;
    }
    control_warning('No hay unidades organizacionales, seleccione una unidad diferente para continuar');
    return [];
  } catch (error: any) {
    //  console.log('')(error?.response?.status);

    if (error?.response?.status === 500) {
      void Swal.fire({
        icon: 'warning',
        title: '¡ATENCIÓN!',
        text: 'No hay unidades organizacionales, seleccione una unidad diferente para continuar',
        showCloseButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
      });
    }
    return [];
  } finally {
    //* establecer el loader
    setLoading(false);
  }
};

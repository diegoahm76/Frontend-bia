/* eslint-disable @typescript-eslint/naming-convention */
// ? get seccion - subseccion que no aplicaba para la homologación

import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

export const GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE = async (
  idCcdNuevo: number,
  navigate?: any
) => {
  try {
    const url = `gestor/ccd/unidades-ccd-actual/get/${idCcdNuevo}`;
    const response = await api.get(url);

    if (response?.data?.data?.coincidencias) {
      void Swal.fire({
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
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate(
            '/app/gestor_documental/ccd/actividades_previas_cambio_ccd/homologacion_secciones_persistentes'
          );
        } else {
          if (!response?.data?.data?.unidades.length) {
            control_warning('No hay unidades pendientes por confirmar');
          }
          return {
            unidades: response?.data?.data?.unidades,
            id_ccd_actual: response?.data?.data?.id_ccd_actual,
            id_ccd_nuevo: response?.data?.data?.id_ccd_nuevo,
          };
        }
      });
    }

    console.log({
      unidades: response?.data?.data?.unidades,
      id_ccd_actual: response?.data?.data?.id_ccd_actual,
      id_ccd_nuevo: response?.data?.data?.id_ccd_nuevo,
    });

    if (!response?.data?.data?.unidades.length) {
      control_warning('No hay unidades pendientes por confirmar');
    }

    return {
      unidades: response?.data?.data?.unidades,
      id_ccd_actual: response?.data?.data?.id_ccd_actual,
      id_ccd_nuevo: response?.data?.data?.id_ccd_nuevo,
    };
  } catch (error: any) {
    if (error?.response?.status === 403) {
      console.log('error', error?.response?.status);
      void Swal.fire({
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
        }
      });
    }
    return [];
  } finally {
    //* establecer el loader
  }
};

// ? get series - subseries asociadas a la seccion - subseccion que no aplicaba para la homologación

export const GET_SERIES_ASOCIADA_UNIDAD_SIN_RESPONSABLE = async ({
  idCcdActual,
  idCcdNuevo,
  idUnidadActual,
}: {
  idCcdActual: number;
  idCcdNuevo: number;
  idUnidadActual: number;
}) => {
  try {
    const url = `gestor/ccd/series-ccd-actual/get/${idCcdActual}/${idCcdNuevo}/${idUnidadActual}`;
    const { data } = await api.get(url);
    // console.log('data', data);
  } catch (error) {
    return [];
  } finally {
    //* establecer el loader
  }
};

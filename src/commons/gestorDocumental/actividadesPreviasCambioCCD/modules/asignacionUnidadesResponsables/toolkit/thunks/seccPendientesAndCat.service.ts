/* eslint-disable @typescript-eslint/naming-convention */
// ? get seccion - subseccion que no aplicaba para la homologación

import Swal from 'sweetalert2';
import { api } from '../../../../../../../api/axios';

export const GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE = async (
  idCcdNuevo: number,
  navigate?: any
) => {
  try {
    const url = `gestor/ccd/unidades-ccd-actual/get/${idCcdNuevo}`;
    const response = await api.get(url);
    console.log('data GET_UNIDADES_NO_RESPONSABLE_PERSISTENTE', response);

    if (response?.data.coincidencias) {
      void Swal.fire({
        icon: 'warning',
        title: '¡ESPERA!',
        text: 'Hay coincidencias pendientes por confirmar, desea continuar?',
        showCloseButton: true,
        allowOutsideClick: false,
        showConfirmButton: true,
        cancelButtonText: 'Continuar',
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
        }
      });
      return response?.data?.data;
    }

    return response?.data?.data;
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

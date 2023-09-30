import { AxiosResponse } from 'axios';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';
import Swal from 'sweetalert2';
import { NavBar } from './../../../../../../../components/NavBar';

/* eslint-disable @typescript-eslint/naming-convention */
export const functionGetCcdHomologacionSeries = async (
  SetLoadingRequest: any,
  navigate: any
): Promise<any> => {
  try {
    SetLoadingRequest(true);
    const url = 'gestor/ccd/get-homologacion-busqueda/';
    const {
      data,
    }: AxiosResponse<{ data: any[]; detail?: string; message?: string }> =
      await api.get(url);
    if (data?.data.length === 0) {
      control_success(data?.detail ?? 'Se han encontrado los siguientes datos');
      return data?.data;
    } else {
      void Swal.fire({
        icon: 'warning',
        title: 'ACTUALMENTE NO HAY UN CCD DISPONIBLE',
        text: 'Sin un CCD diferente al actual no se puede realizar la homologación de series documentales',
        showCloseButton: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        cancelButtonText: 'Reiniciar módulo',
        confirmButtonText: 'Ir a administración de instrumentos archivísticos',
        confirmButtonColor: '#042F4A',
        allowEscapeKey: false,
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate('/app/gestor_documental/activacion_instrumentos_archivisticos');
        }
      });
    }
  } catch (err) {
    control_error('No se han encontrado datos que coincidan');
    return [];
  } finally {
    SetLoadingRequest(false);
  }
};

export const validacionInicialCCD = async (navigate: any): Promise<any> => {
  try {
    const url = 'gestor/ccd/get-homologacion-busqueda/';
    const {
      data,
    }: AxiosResponse<{ data: any[]; detail?: string; message?: string }> =
      await api.get(url);
    if (data?.data.length > 0) {
      // control_success(data?.detail ?? 'Se han encontrado los siguientes datos');
      if (
        data?.data.length > 1
        // && data?.data?.some((element: any) => element?.actual)
      ) {
        data?.data?.some((element: any) => element?.actual);
        console.log('hay más de un ccd disponible');
      }

      console.log(data?.data);
      return data?.data;
    } else {
      // control_error('No se han encontrado datos que coincidan');
      console.log([]);
      return [];
    }
  } catch (err) {
    // control_error('No se han encontrado datos que coincidan');
    return [];
  }
};

/* if (elementosNoRepetidos.length === 0) {
  void Swal.fire({
    icon: 'warning',
    title: 'NO HAY PERSONAS PARA TRASLADAR',
    text: 'No se encuentran personas disponibles para realizar el traslado masivo de unidades organizacionales',
    showCloseButton: false,
    allowOutsideClick: false,
    showCancelButton: true,
    showConfirmButton: true,
    cancelButtonText: 'Reiniciar módulo',
    confirmButtonText: 'Ir a administrador de personas',
    confirmButtonColor: '#042F4A',

    allowEscapeKey: false
  }).then((result: any) => {
    if (result.isConfirmed) {
      navigate('/app/transversal/administracion_personas');
    } else {
      window.location.reload();
    }
  });
} else {
  console.log('no haz salido del módulo')
}
*/

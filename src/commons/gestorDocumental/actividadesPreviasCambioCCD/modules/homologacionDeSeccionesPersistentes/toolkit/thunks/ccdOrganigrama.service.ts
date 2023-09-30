import { AxiosResponse } from 'axios';
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';
import Swal from 'sweetalert2';
import { NavBar } from './../../../../../../../components/NavBar';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';

/* eslint-disable @typescript-eslint/naming-convention */

// ! --------- GET CCDS DISPONIBLES PARA HOMOLOGAR SERIES DOCUMENTALES ---------
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

// ! --------- GET CCD ACTUAL, VALIDACIÓN INICIAL DEL MÓDULO ---------
export const validacionInicialCCD = async (navigate: any): Promise<any> => {
  try {
    const url = 'gestor/ccd/get-validacion-homologacion/';
    const {
      data,
    }: AxiosResponse<{ data: any[]; detail?: string; message?: string }> =
      await api.get(url);
    if (data?.data.length > 0) {
      if (
        data?.data?.some((element: any) => element?.actual)
      ) {
        void Swal.fire({
          icon: 'warning',
          title: 'NO HAY CCD ACTUAL',
          text: 'Sin un CCD actual no se puede realizar la homologación de series documentales',
          showCloseButton: false,
          allowOutsideClick: true,
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
      console.log(data?.data);
      return data?.data;
    } else {
      void Swal.fire({
        icon: 'warning',
        title: 'ACTUALMENTE NO HAY UN CCD DISPONIBLE',
        text: 'Sin CCDs en el sistema no es posible usar el módulo de homologación de series documentales',
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
    return [];
  }
};

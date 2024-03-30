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
    const { data } = await api.get(url);

    const datos = [...(data?.data ?? [])];

    if (datos.length > 0) {
      control_success('Se han encontrado los siguientes CCDs disponibles' || data?.detail);
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
          navigate(
            '/app/gestor_documental/activacion_instrumentos_archivisticos'
          );
        }
      });
    }
    return datos;
  } catch (err) {
    control_error('Ha ocurrido un error al cargar los datos');
    return [];
  } finally {
    SetLoadingRequest(false);
  }
};

// ! --------- GET CCD ACTUAL, VALIDACIÓN INICIAL DEL MÓDULOgit  ---------
export const validacionInicialCCD = async (navigate: any): Promise<any> => {
  try {
    const url = 'gestor/ccd/get-validacion-homologacion/';
    const { data } = await api.get(url);

    const datos = [...data?.data ?? []];

    const elementoActual = datos.find((element: any) => element?.actual);
    if (!elementoActual) {
      void Swal.fire({
        icon: 'warning',
        title: 'NO HAY CCD ACTUAL',
        text: 'Sin un CCD actual no se puede realizar la homologación de series documentales',
        showCloseButton: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        cancelButtonText: 'Reiniciar módulo',
        confirmButtonText:
          'Ir a administración de instrumentos archivísticos',
        confirmButtonColor: '#042F4A',
        allowEscapeKey: false,
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate(
            '/app/gestor_documental/activacion_instrumentos_archivisticos'
          );
        }
      });
    }

    if (datos.length > 0) {
      // control_success(data?.detail ?? 'Se han encontrado los siguientes datos');
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
          navigate(
            '/app/gestor_documental/activacion_instrumentos_archivisticos'
          );
        }
      });
    }
    // //  console.log('')(datos);
    return datos;
  } catch (err) {
    control_error('Ha ocurrido un error al cargar los datos');
    return [];
  }
};
import { api } from '../../../../../../../api/axios';
import { control_error, control_success } from '../../../../../../../helpers';
import Swal from 'sweetalert2';
import { control_warning } from '../../../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { type GridValueGetterParams } from '@mui/x-data-grid';

/* eslint-disable @typescript-eslint/naming-convention */

// ! --------- GET CCDS DISPONIBLES PARA HOMOLOGAR SERIES DOCUMENTALES ---------
export const functionGetCcdAsignacionUnidadesResp = async (
  SetLoadingRequest: any,
  navigate: any
): Promise<any> => {
  try {
    SetLoadingRequest(true);
    const url = 'gestor/ccd/get-homologacion-busqueda/';
    const { data } = await api.get(url);

    const datos = [...(data?.data ?? [])];

    if (datos.length > 0) {
      control_success(
        'Se han encontrado los siguientes CCDs disponibles' || data?.detail
      );
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
    control_error('No se han encontrado datos que coincidan');
    return [];
  } finally {
    SetLoadingRequest(false);
  }
};

// ! --------- GET CCD ACTUAL, VALIDACIÓN INICIAL DEL MÓDULOgit  ---------
export const validacionInicialCcdAsignacionUnidadesResp = async (
  navigate: any
): Promise<any> => {
  try {
    const url = 'gestor/ccd/get-validacion-homologacion/';
    const { data } = await api.get(url);

    const datos = [...(data?.data ?? [])];

    const elementoActual = datos.find((element: any) => element?.actual);
    if (!elementoActual) {
      void Swal.fire({
        icon: 'warning',
        title: 'ACTUALMENTE NO HAY CCD ACTUAL EN EL SISTEMA',
        text: 'Sin un CCD actual no se puede realizar la asignación de unidades responsables del CCD',
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

    if (datos.length > 0) {
      // control_success(data?.detail ?? 'Se han encontrado los siguientes datos');
    } else {
      void Swal.fire({
        icon: 'warning',
        title: 'ACTUALMENTE NO HAY UN CCD DISPONIBLE',
        text: 'Sin CCDs en el sistema no es posible usar el módulo de asignación de unidades responsables',
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
    return [];
  }
};

export const getCcdActual = async (
  params: GridValueGetterParams,
  navigate: any
) => {
  try {
    const url = 'gestor/ccd/get-validacion-homologacion/';
    const { data } = await api.get(url);
    const ccdActual = data?.data?.find((element: any) => element?.actual);

    /*    //  console.log('')(ccdActual?.id_organigrama);
    //  console.log('')(params.row.id_organigrama); */

    if (params.row.id_organigrama === ccdActual?.id_organigrama) {
      void Swal.fire({
        icon: 'warning',
        title: 'NO SE PUEDE USAR EL CCD',
        text: 'El CCD seleccionado fue creado usando el mismo organigrama que el CCD actual, por lo tanto no se puede usar en este módulo',
        showCloseButton: false,
        allowOutsideClick: false,
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: 'Reiniciar módulo',
        cancelButtonColor: '#FF0000',
        confirmButtonText: 'Administrar instrumentos archivísticos',
        confirmButtonColor: '#042F4A',
        allowEscapeKey: false,
      }).then((result: any) => {
        if (result.isConfirmed) {
          navigate(
            '/app/gestor_documental/activacion_instrumentos_archivisticos'
          );
        }
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    return [];
  }
};

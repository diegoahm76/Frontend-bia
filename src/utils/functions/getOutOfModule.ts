
import Swal from "sweetalert2";

/* eslint-disable @typescript-eslint/naming-convention */

export const getOutModule = (navigate: any, resetFunctions?: Function[] | null | undefined, text?: string): void => {
  void Swal.fire({
    title: text ?? '¿Está seguro de salir del módulo?, la información no guardada se perderá.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, salir',
    cancelButtonText: 'No, cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Salida!',
        'Ha salido del módulo.',
        'success',
      );
      // ! funciones de reset, desde los formularios hasta los estados de redux que se han implementado en el módulo
      resetFunctions?.map((callback: Function) => {
        callback();
      })
      navigate("/app/home", { replace: true });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelado',
        'Información conservada, puede continuar.',
        'info'
      );
    }
  });
};


export const reset_all = (resetFunctions: Function[]): void => {
  void Swal.fire({
    title: '¿Está seguro de limpiar todos los campos?, la información no guardada se perderá.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Si, limpiar',
    cancelButtonText: 'No, cancelar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33'
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire(
        'Limpiado!',
        'Todos los campos han sido limpiados.',
        'success',
      );
      // ! funciones de reset, desde los formularios hasta los estados de redux que se han implementado en el módulo
      resetFunctions?.map((callback: Function) => {
        callback();
      })
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      Swal.fire(
        'Cancelado',
        'Información conservada.',
        'info'
      );
    }
  });
};



/* eslint-disable @typescript-eslint/naming-convention */

import { control_success } from "../../../../../../../../../helpers";

export const handleCleanField = (resetFn: Function): void => {
  resetFn() as () => void;
  control_success('Se limpiaron los campos') as (message: string) => void;
};

/*export const handleSave = (data: any, resetFn: Function) => {
  //  console.log('')(data);
  resetFn();
  control_success('Se guardaron los datos');
}*/

export const handleCloseModal = async (
  resetFn: Function,
  closeModalFn: Function
): Promise<void> => {
  closeModalFn(false);

 /* await Swal.fire({
    title: '¿Estas seguro?',
    text: 'Si cierras el modal se perderan los datos ingresados',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
  }).then((result: { isConfirmed: boolean }) => {
    if (result.isConfirmed) {
      resetFn();
      closeModalFn(false);
    }
  });*/
};

/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';

export const AccionesFinales = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
}: any): JSX.Element => {
  const [LoadingButton, setLoadingButton] = useState(false);

  //* handleSumbit

  const handleSubmit = async () => {
    setLoadingButton(true);
    await Swal.fire({
      title: '¿Está seguro de enviar la solicitud al usuario?',
      text: 'Una vez enviada la solicitud no podrá realizar cambios',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        const secondResult = await Swal.fire({
          title: 'Advertencia',
          text: 'Una vez enviada la solicitud no podrá realizar cambios',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Enviar',
          cancelButtonText: 'Cancelar',
        });

        if (secondResult.isConfirmed) {
          //* se debe activar el envío de la solicitud al usuario y luego el swal y el mensaje de success
          setLoadingButton(false);
          Swal.fire({
            title: 'Solicitud enviada',
            icon: 'success',
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setLoadingButton(false);
          Swal.fire({
            title: 'Solicitud cancelada',
            icon: 'error',
            showConfirmButton: false,
            timer: 1500,
          });
        }
      } else {
        setLoadingButton(false);
        Swal.fire({
          title: 'Solicitud cancelada',
          icon: 'error',
          showConfirmButton: false,
          timer: 1500,
        });
      }
      setLoadingButton(false);
    });
  };

  return (
    <AccionesFinalModulo
      loadingButton={LoadingButton}
      handleSubmit={handleSubmit}
      reset_states={() => console.log('cancel')}
    />
  );
};

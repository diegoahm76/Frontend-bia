/* eslint-disable @typescript-eslint/naming-convention */
import { useState } from 'react';
import { AccionesFinalModulo } from '../../../../../../../utils/AccionesFinalModulo/Atom/AccionesFinalModulo';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';
import { resetItems } from '../../toolkit/slice/AsignacionUsuarioSlice';
import { useAppDispatch, useAppSelector } from '../../../../../../../hooks';
import { useStepperContext } from '@mui/material';
import { useSstepperFn } from '../../hook/useSstepperFn';

export const AccionesFinales = ({
  controlFormulario,
  handleSubmitFormulario,
  errorsFormulario,
  resetFormulario,
  watchFormulario,
  setInfoReset,
}: any): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();

  //* context

  const { handleReset } = useSstepperFn();

  const [LoadingButton, setLoadingButton] = useState(false);

  const { anexosCreados } = useAppSelector(
    (state) => state.AsignacionUsuarioSlice
  );

  //* handleSumbit

  /*   const sendDataByFormData = async () => {
      try{
        const formData = new FormData();
        formData.append('solicitud_usu_PQRSDF', 'asunto,descripcion,id_pqrsdf');
        anexosCreados.map((anexo: any) => {
          formData.append('archivo', anexo?.ruta_soporte);
        });
        anexosCreados.map((anexo: any) => {
          formData.append('anexo', {valores: 'x'});
        });
      }catch(err){}
    }*/

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
          console.log(anexosCreados);
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

  const reset = () => {
    dispatch(resetItems());
    handleReset();
    resetFormulario();
  };

  return (
    <AccionesFinalModulo
      loadingButton={LoadingButton}
      handleSubmit={handleSubmit}
      reset_states={reset}
    />
  );
};

/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { ParteInicial } from '../components/parteInicial/screen/ParteInicial';
import { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useStepperRequerimiento } from '../../../../../bandejaDeTareas/hook/useStepperRequerimiento';
import { useBandejaTareas } from '../../../../../bandejaDeTareas/hook/useBandejaTareas';
import { Title } from '../../../../../../../components';
import { StepperRequerimientoAlUsuario } from '../components/stepper/StepperRequerimientoUsuario';
import { resetItems } from '../../../toolkit/slice/ResRequerimientoOpaSlice';
import { useAppDispatch } from '../../../../../../../hooks';

export const MainResReqOpaScreen = (): JSX.Element => {
  //* dispatch declaration
  const dispatch = useAppDispatch();
  const { handleReset } = useStepperRequerimiento();

  useEffect(() => {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Recuerda que sí sales del módulo y no radicas la respuesta, la información se perderá',
      confirmButtonText: 'Entendido',
    });

    // ? tambien se entra a re iniciar el módulo de asignación de usuario || mejor cuando se de en el finish y se envie la solicitud al usuario, por tanto se hará en el componente de stepper o en submit de envío
    // dispatch(resetItems())
    handleReset();
  }, []);

  //* se usa acá para que atraviese todos los componentes necesarios que se trabajan dentro de la solicitud de asignación a usuario
  const {
    controlFormulario,
    handleSubmitFormulario,
    errorsFormulario,
    resetFormulario,
    watchFormulario,
    setInfoReset,
  } = useBandejaTareas();

  const props = {
    controlFormulario,
    handleSubmitFormulario,
    errorsFormulario,
    resetFormulario,
    watchFormulario,
    setInfoReset,
  };

  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '40px',
          mb: '30px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Responder requerimiento sobre una OPA" />
          {/* parte Inicial */}
          <ParteInicial />
          {/*stepper*/}
          <StepperRequerimientoAlUsuario {...props} />
        </Grid>
      </Grid>
    </>
  );
};

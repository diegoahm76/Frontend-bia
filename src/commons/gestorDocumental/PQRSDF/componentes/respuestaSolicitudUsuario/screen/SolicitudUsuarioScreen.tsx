/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { Title } from '../../../../../../components';
import { ParteInicial } from '../components/parteInicial/screen/ParteInicial';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { useAppSelector } from '../../../../../../hooks';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { useNavigate } from 'react-router-dom';
import { getInitialData } from '../services/getInitialData.service';
import { useStepperResSolicitudUsuario } from '../hook/useStepperResSolicitudUsuario';
import { useResSolicitudUsu } from '../hook/useResSolicitudUsu';
import { StepperResSolicitudUsario } from '../components/stepper/StepperResSolicitudUsario';
import { Parte1Screen } from '../components/parte1/screen/Parte1Screen';

export const SolicitudUsuarioScreen = (): JSX.Element => {
  const { handleReset } = useStepperResSolicitudUsuario();
  /*  const navigate = useNavigate();

  //* redux state
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );


  //* context declaration
  const { setInfoInicialUsuario, infoInicialUsuario } = useContext(RequerimientoUsarioContext.);
  const { generalLoading, handleGeneralLoading, handleSecondLoading } =
    useContext(ModalAndLoadingContext);*/
  {
    /*de entrada al módulo se van a tener que realizar ciertas solictudes para llenar infomación dentro de los campos de la entrega*/
  }

  {
    /* esa información debe pasaar derecho a los frames predispuestos */
  }

  useEffect(() => {
    Swal.fire({
      icon: 'warning',
      title: 'Advertencia',
      text: 'Recuerda que sí sales del módulo, la información que no hayas guardado se borrará.',
      confirmButtonText: 'Entendido',
    });

    // ? tambien se entra a re iniciar el módulo de asignación de usuario || mejor cuando se de en el finish y se envie la solicitud al usuario, por tanto se hará en el componente de stepper o en submit de envío
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
  } = useResSolicitudUsu();

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
          <Title title="Requerimiento sobre una solicitud" />
          {/* parte Inicial */}
          <ParteInicial />

          <Parte1Screen
            controlFormulario={controlFormulario}
            handleSubmitFormulario={handleSubmitFormulario}
            errorsFormulario={errorsFormulario}
            resetFormulario={resetFormulario}
            watchFormulario={watchFormulario}
            setInfoReset={setInfoReset}
          />

        
          {/*stepper*/}
          <StepperResSolicitudUsario {...props} />
        </Grid>
      </Grid>
    </>
  );
};

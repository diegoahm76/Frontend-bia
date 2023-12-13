/* eslint-disable @typescript-eslint/naming-convention */

import { Grid } from '@mui/material';
import { StepperAsignacionUsuario } from '../components/stepper/StepperAsignacionUsuario';
import { Title } from '../../../../../../components';
import { ParteInicial } from '../components/parteInicial/screen/ParteInicial';
import { useContext, useEffect } from 'react';
import Swal from 'sweetalert2';
import { usePanelVentanilla } from '../../../hook/usePanelVentanilla';
import { useAppSelector } from '../../../../../../hooks';
import { useSstepperFn } from '../hook/useSstepperFn';
import { SolicitudAlUsuarioContext } from '../context/SolicitudUsarioContext';
import { ModalAndLoadingContext } from '../../../../../../context/GeneralContext';
import { useNavigate } from 'react-router-dom';
import { getInitialData } from '../services/getInitialData.service';

export const AsignacionUsuarioScreen = (): JSX.Element => {


  const navigate = useNavigate();

  //* redux state
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );

  const { handleReset } = useSstepperFn();

  //* context declaration
  const { setInfoInicialUsuario, infoInicialUsuario } = useContext(SolicitudAlUsuarioContext);
  const { generalLoading, handleGeneralLoading, handleSecondLoading } =
    useContext(ModalAndLoadingContext);
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
      text: 'Recuerda que sí sales del módulo, la información no hayas guardado se borrará.',
      confirmButtonText: 'Entendido',
    });

    // ? tambien se entra a re iniciar el módulo de asignación de usuario || mejor cuando se de en el finish y se envie la solicitud al usuario, por tanto se hará en el componente de stepper o en submit de envío
  }, []);

  //* se usa acá para que atraviese todos los componentes necesarios que se trabajan dentro de la solicitud de asignación a usuario
  const {
    controlFormulario,
    handleSubmitFormulario,
    errorsFormulario,
    resetFormulario,
    watchFormulario,
    setInfoReset,
  } = usePanelVentanilla();

  const props = {
    controlFormulario,
    handleSubmitFormulario,
    errorsFormulario,
    resetFormulario,
    watchFormulario,
    setInfoReset,
  };

  useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) {
      console.log('noo curentttt')
      navigate('/app/gestor_documental/panel_ventanilla/');
      return;
    }
    //* deberian pasar dos cosas también, que se resetee el stepper y que se resetee el formulario y todos los demás campos guardados
    handleReset();


console.log('hiii perrassasasasas')

    void getInitialData(
      currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
      navigate,
      handleGeneralLoading,
      handleSecondLoading
    ).then((data: any) => {
      setInfoInicialUsuario(data);
    });
  }, []);


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
          <Title title="Solicitud al usuario sobre PQRSDF" />
          {/* parte Inicial */}
          <ParteInicial/>
          {/*stepper*/}
          <StepperAsignacionUsuario {...props} />
        </Grid>
      </Grid>
    </>
  );
};

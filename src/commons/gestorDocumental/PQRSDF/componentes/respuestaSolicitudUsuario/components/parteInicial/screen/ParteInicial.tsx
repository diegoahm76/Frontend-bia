/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect } from 'react';
import { PerSolicitaRequerimiento } from '../components/perSolicitaRequerimiento/PerSolicitaRequerimiento';
import { PersonaTitular } from '../components/personaTitular/PersonaTitular';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../utils/Loader/Loader';
import { useAppSelector } from '../../../../../../../../hooks';
import { useNavigate } from 'react-router-dom';
import { useStepperResSolicitudUsuario } from '../../../hook/useStepperResSolicitudUsuario';

export const ParteInicial: React.FC  = (): JSX.Element => {
 
  const { generalLoading } =
  useContext(ModalAndLoadingContext);

  const navigate = useNavigate();
  const {handleReset}=useStepperResSolicitudUsuario();
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = useAppSelector(
    (state: any) =>
      state.BandejaTareasSlice.currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );


useEffect(() => {
  if (!currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas) {
    navigate('/app/gestor_documental/bandeja_tareas/');
    return;
  }
  //* deberian pasar dos cosas también, que se resetee el stepper y que se resetee el formulario y todos los demás campos guardados
  handleReset();

}, []);



  if (generalLoading) {
    return (
      <Grid
        container
        sx={{
          position: 'relative',
          justifyContent: 'center',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '2rem',
          mt: '1.2rem',
          mb: '1.2rem',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Loader altura={400} />
      </Grid>
    );
  }

  return (
    <>
      <PersonaTitular />
      <PerSolicitaRequerimiento />
    </>
  );
};

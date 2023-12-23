/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect } from 'react';
import { PerSolicitaRequerimiento } from '../components/perSolicitaRequerimiento/PerSolicitaRequerimiento';
import { PersonaTitular } from '../components/personaTitular/PersonaTitular';
import { ModalAndLoadingContext } from '../../../../../../../../context/GeneralContext';
import { Grid } from '@mui/material';
import { Loader } from '../../../../../../../../utils/Loader/Loader';

export const ParteInicial: React.FC  = (): JSX.Element => {
 
  const { generalLoading } =
  useContext(ModalAndLoadingContext);



/*  //* navigate declaration
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

 useEffect(() => {
    if (!currentElementPqrsdComplementoTramitesYotros) {
      //  console.log('')('noo curentttt')
      navigate('/app/gestor_documental/panel_ventanilla/');
      return;
    }
    //* deberian pasar dos cosas también, que se resetee el stepper y que se resetee el formulario y todos los demás campos guardados
    handleReset();


//  console.log('')('hiii perrassasasasas')

    void getInitialData(
      currentElementPqrsdComplementoTramitesYotros?.id_PQRSDF,
      navigate,
      handleGeneralLoading,
      handleSecondLoading
    ).then((data) => {
      setInfoInicialUsuario(data);
    });
  }, []);
*/
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

/* eslint-disable @typescript-eslint/naming-convention */
import React, { useContext } from 'react';
import { Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BotonInformativo } from '../../utils/BotonInformativo';
import { BuscarTramitesProcesoScreen } from '../../components/BuscarTramitesProceso/BuscarTramitesProcesoScreen';
import { CustomizedSteppers } from '../../components/sterper/Steper';
import { ControlledAccordions } from '../../components/ListaChequeoSolicitudPermisoConsecio/ListaChequeoSolicitudPermisoConsecio';
import { VisorDocumento } from '../../components/VisorDocumentos/VisorDocumento';
import { VistaCompleta } from '../../components/VIistaCompleta/VistaCompleta';
import { StepperContext } from '../../../context/SteperContext';
import { Title } from '../../../../../../components';

export const MenuPantallaPrincipalJuridicaTramites = (): JSX.Element => {
  const { set_id, activeStep, id, setActiveStep } = useContext(StepperContext);
  // Hook para la navegación
  const navigate = useNavigate();

  // Función para redirigir a la página de Nuevo Trámite
  const RedirigirNuevoTramite = () => {
    navigate('/app/gestor_documental/tramites/nuevotramite');
  };

  // Mensaje informativo para el botón informativo
  const data_informacion =
    'Módulo de revisión jurídica de trámites. En esta sección podrás consultar los trámites en proceso y redirigirte a los respectivos módulos de tramitación.';

  return (
    <>
      {/* Contenedor principal */}
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        {/* Título */}
        <Grid item xs={12}>
          <Title title="Módulo de revisión Juridica de Trámites" />
          <CustomizedSteppers />
        </Grid>

        {/* Botón informativo */}
        <Grid container justifyContent="flex-end" alignItems="center">
          <Grid item xs={1}>
            <BotonInformativo texto={data_informacion} />
          </Grid>
        </Grid>
      </Grid>

      {/* 
      <Button onClick={() => setActiveStep(activeStep + 1)}>
        Incrementar activeStep
      </Button>
      <Button onClick={() => setActiveStep(activeStep => activeStep - 1)}>
        Decrementar activeStep
      </Button>

      <>{activeStep}</>
      <>{id}</> */}

      {activeStep === 0 && (
        <>
          <BuscarTramitesProcesoScreen />
        </>
      )}

      {activeStep === 1 && (
        <>
          <VistaCompleta />
        </>
      )}

      {activeStep === 2 && (
        <>
          <ControlledAccordions />
        </>
      )}

      {activeStep === 3 && (
        <>
          <VisorDocumento />
        </>
      )}
    </>
  );
};

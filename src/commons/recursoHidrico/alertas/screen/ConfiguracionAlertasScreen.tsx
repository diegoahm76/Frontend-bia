/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { SeleccionAlerta } from '../components/SeleccionAlerta';
import { ProgramacionAlerta } from '../components/ProgramacionAlerta';
import { Destinatarios } from '../components/Destinatarios';
import { ConfiguracionGeneral } from '../components/ConfiguracionGeneral';
import { useAlertaHook } from '../utils/useAlertaHook';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConfiguracionAlertasScreen: React.FC = () => {
  const { alertas } = useAlertaHook();

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="Configuración de alertas - Recurso hidrico" />
        </Grid>
      </Grid>
      <SeleccionAlerta />
      {alertas ? (
        <>
          <ProgramacionAlerta />
          <Destinatarios />
          <ConfiguracionGeneral />
        </>
      ) : null}
    </>
  );
};

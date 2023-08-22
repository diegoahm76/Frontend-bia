/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { BusquedaAvanzadaDepositos } from '../components/BusquedaAvanzadaDepositos';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { BusquedaEstante } from '../components/BusquedaEstante';
import { useAppSelector } from '../../../../../hooks';
import { AgregarEstantes } from '../components/AgregarEstantes';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstantesScreen: React.FC = () => {
  const { mode_estante } = useAppSelector((state) => state.deposito);

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
          <Title title="Estantes por deposito de archivo de la entidad" />
        </Grid>
      </Grid>
      <BusquedaAvanzadaDepositos />
      {mode_estante.crear && <AgregarEstantes />}
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
        <Grid container spacing={2} justifyContent="flex-end">
          <BusquedaEstante />
          <Grid item>
            <ButtonSalir />
            {/* <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                // set_id_deposito(null);
              }}
            >
              Agregar estante
            </Button> */}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

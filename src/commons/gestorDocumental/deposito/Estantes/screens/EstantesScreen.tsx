/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { useContext, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import DeleteIcon from '@mui/icons-material/Delete';

import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { BusquedaAvanzadaDepositos } from '../components/BusquedaAvanzadaDepositos';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { BusquedaEstante } from '../components/BusquedaEstante';
import { useAppSelector } from '../../../../../hooks';
import { AgregarEstantes } from '../components/AgregarEstantes';
import { ListarEstantes } from '../components/ListarEstantes';
import { ListarBandejas } from '../components/ListarBandejas';
import { useEstantesHook } from '../hooks/useEstantesHook';
import { DataContext } from '../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstantesScreen: React.FC = () => {
  const { mode_estante } = useAppSelector((state) => state.deposito);

  const {
    data_watch_estantes
  } = useEstantesHook();

  const { id_deposito } = useContext(DataContext);

  return (
    <>
      <form
        onSubmit={(e) => {
          // void on_submit_advance(e);
          console.log('submit');
        }}
        // style={{
        //   width: '100%',
        //   height: 'auto',
        //   display: 'flex',
        //   alignItems: 'center',
        //   justifyContent: 'center',
        // }}
      >
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
        <ListarBandejas />
        <ListarEstantes />
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
              <LoadingButton
                variant="outlined"
                color="primary"
                loading={false}
                disabled={false}
                startIcon={<CleaningServicesIcon />}
              >
                Limpiar
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="error"
                loading={false}
                disabled={false}
                startIcon={<DeleteIcon />}
              >
                Borrar
              </LoadingButton>
            </Grid>

            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                loading={false}
                disabled={!data_watch_estantes.identificacion_por_deposito}
                startIcon={<SaveIcon />}
              >
                Guardar
              </LoadingButton>
            </Grid>
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
      </form>
    </>
  );
};

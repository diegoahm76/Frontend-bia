/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

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
import { DataContext } from '../context/context';
import { useEstantesHook } from '../hooks/useEstantesHook';
import { SeleccionarEstante } from '../components/SeleccionarEstante';
import { EditarEstante } from '../components/EditarEstante';
import { ButtonEliminar } from '../../../../../utils/Eliminar/Eliminar';
import { delete_estante } from '../services/services';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstantesScreen: React.FC = () => {
  const { mode_estante, data_estantes, deposito_estante } = useAppSelector(
    (state) => state.deposito
  );

  const {
    id_deposito,
    identificacion_deposito,
    fetch_data_estantes_depositos,
  } = useContext(DataContext);

  const { onsubmit_estantes, is_saving_estante } = useEstantesHook();

  return (
    <>
      <form
        onSubmit={(e) => {
          void onsubmit_estantes(e);
        }}
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
        {mode_estante.crear ? <AgregarEstantes /> : null}
        {mode_estante.ver ? <SeleccionarEstante /> : null}
        {mode_estante.editar ? <EditarEstante /> : null}
        {deposito_estante?.id_deposito ? <ListarEstantes /> : null}
        {deposito_estante?.id_estante_deposito ? <ListarBandejas /> : null}
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
            {data_estantes.id_estante_deposito ? (
              <>
                <Grid item>
                  <ButtonEliminar
                    id={data_estantes.id_estante_deposito}
                    confirmationMessage="¿Estás seguro de eliminar este estante?"
                    successMessage="El estante se eliminó correctamente"
                    Disabled={!data_estantes.id_estante_deposito}
                    deleteFunction={async () =>
                      await delete_estante(
                        data_estantes?.id_estante_deposito ?? 0
                      )
                    }
                    fetchDataFunction={async () => {
                      await fetch_data_estantes_depositos();
                    }}
                  />
                </Grid>
              </>
            ) : null}

            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                loading={is_saving_estante}
                disabled={
                  identificacion_deposito === '' ||
                  !id_deposito ||
                  is_saving_estante
                }
                startIcon={<SaveIcon />}
              >
                Guardar
              </LoadingButton>
            </Grid>
            <Grid item>
              <ButtonSalir />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

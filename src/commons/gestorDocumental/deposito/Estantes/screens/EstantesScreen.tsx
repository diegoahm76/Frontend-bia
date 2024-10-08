/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { lazy, useContext, useEffect } from 'react';

import { LoadingButton } from '@mui/lab';
import SaveIcon from '@mui/icons-material/Save';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
// import DeleteIcon from '@mui/icons-material/Delete';

import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { AgregarEstantes } from '../components/AgregarEstantes';
import { ListarEstantes } from '../components/ListarEstantes';
import { BusquedaAvanzadaDepositos } from '../components/BusquedaAvanzadaDepositos';
import { BusquedaEstante } from '../components/BusquedaEstante';
import { ListarBandejas } from '../components/ListarBandejas';
import { EditarEstante } from '../components/EditarEstante';
import { ButtonEliminar } from '../../../../../utils/Eliminar/Eliminar';
import { SeleccionarEstante } from '../components/SeleccionarEstante';
import { delete_estante } from '../services/services';
import { DataContext } from '../context/context';
import { useEstantesHook } from '../hooks/useEstantesHook';
import { confirmarAccion } from '../../utils/function';
import { set_current_mode_estantes } from '../../store/slice/indexDeposito';

// const ButtonSalir = lazy(async () => {
//   const module = await import('../../../../../components/Salir/ButtonSalir');
//   return { default: module.ButtonSalir };
// });

// const ButtonEliminar = lazy(async () => {
//   const module = await import('../../../../../utils/Eliminar/Eliminar');
//   return { default: module.ButtonEliminar };
// });

// const EditarEstante = lazy(async () => {
//   const module = await import('../components/EditarEstante');
//   return { default: module.EditarEstante };
// });

// const SeleccionarEstante = lazy(async () => {
//   const module = await import('../components/SeleccionarEstante');
//   return { default: module.SeleccionarEstante };
// });

// const ListarBandejas = lazy(async () => {
//   const module = await import('../components/ListarBandejas');
//   return { default: module.ListarBandejas };
// });

// const ListarEstantes = lazy(async () => {
//   const module = await import('../components/ListarEstantes');
//   return { default: module.ListarEstantes };
// });

// const AgregarEstantes = lazy(async () => {
//   const module = await import('../components/AgregarEstantes');
//   return { default: module.AgregarEstantes };
// });

// const BusquedaAvanzadaDepositos = lazy(async () => {
//   const module = await import('../components/BusquedaAvanzadaDepositos');
//   return { default: module.BusquedaAvanzadaDepositos };
// });

// const BusquedaEstante = lazy(async () => {
//   const module = await import('../components/BusquedaEstante');
//   return { default: module.BusquedaEstante };
// });

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EstantesScreen: React.FC = () => {
  const { mode_estante, data_estantes, deposito_estante } = useAppSelector(
    (state) => state.deposito
  );
  const dispatch = useAppDispatch();
  const {
    id_deposito,
    identificacion_deposito,
    nuevo_orden,
    fetch_data_estantes_depositos,
  } = useContext(DataContext);

  const {
    onsubmit_estantes,
    is_saving_estante,
    onsubmit_editar,
    limpiar_formulario,
  } = useEstantesHook();

  useEffect(() => {
    dispatch(
      set_current_mode_estantes({
        crear: false,
        editar: false,
        ver: false,
      })
    );
  }, []);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode_estante.editar) {
            if (nuevo_orden) {
              void confirmarAccion(
                onsubmit_editar,
                '¿Estás seguro de actualizar el orden del estante?'
              );
              // onsubmit_editar();
            } else {
              onsubmit_editar();
            }
          } else {
            void onsubmit_estantes();
          }
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
                onClick={() => {
                  limpiar_formulario();
                }}
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
                  is_saving_estante ||
                  mode_estante.ver
                }
                startIcon={<SaveIcon />}
              >
                {mode_estante.editar ? 'Actualizar' : 'Guardar'}
              </LoadingButton>
            </Grid>{' '}
            <Grid item>
              <ButtonSalir />
            </Grid>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

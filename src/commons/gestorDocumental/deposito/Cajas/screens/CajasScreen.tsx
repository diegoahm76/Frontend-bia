/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { BusquedaEstanteCajas } from '../components/BusquedaEstanteCajas';
import { LoadingButton } from '@mui/lab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { lazy, useContext } from 'react';
import { useAppSelector } from '../../../../../hooks';
import { DataContext } from '../../Estantes/context/context';
import { delete_caja } from '../services/services';
import { useCajaHook } from '../hook/useCajaHook';
import { confirmarAccion } from '../../utils/function';

const RegistrarCaja = lazy(async () => {
  const module = await import('../components/RegistrarCajas');
  return { default: module.RegistrarCaja };
});

const ListarCajas = lazy(async () => {
  const module = await import('../components/ListarCajas');
  return { default: module.ListarCajas };
});

const BusquedaCajas = lazy(async () => {
  const module = await import('../components/BusquedaCajas');
  return { default: module.BusquedaCajas };
});

const ButtonSalir = lazy(async () => {
  const module = await import('../../../../../components/Salir/ButtonSalir');
  return { default: module.ButtonSalir };
});

const ButtonEliminar = lazy(async () => {
  const module = await import('../../../../../utils/Eliminar/Eliminar');
  return { default: module.ButtonEliminar };
});

const ListarCarpetas = lazy(async () => {
  const module = await import('../components/ListarCarpetas');
  return { default: module.ListarCarpetas };
});

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CajasScreen: React.FC = () => {
  const { nuevo_orden, fetch_data_caja_bandeja } = useContext(DataContext);

  const { cajas, mode_estante } = useAppSelector((state) => state.deposito);

  const {
    onsubmit_cajas,
    onsubmit_update_cajas,
    is_saving_cajas,
    limpiar_formulario_cajas,
  } = useCajaHook();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode_estante.crear) {
            void onsubmit_cajas();
          }
          if (mode_estante.editar) {
            if (nuevo_orden) {
              void confirmarAccion(
                onsubmit_update_cajas,
                '¿Estás seguro de actualizar el orden de la caja?'
              );
            } else {
              void onsubmit_update_cajas();
            }
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
            <Title title="Cajas por bandeja" />
          </Grid>
        </Grid>
        <BusquedaEstanteCajas />
        {mode_estante.crear || mode_estante.editar ? <RegistrarCaja /> : null}
        {cajas.id_bandeja ? <ListarCajas /> : null}
        {cajas.id_caja ? <ListarCarpetas /> : null}
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
          justifyContent="flex-end"
        >
          <BusquedaCajas />
          <Grid item>
            <LoadingButton
              variant="outlined"
              color="primary"
              loading={false}
              disabled={false}
              onClick={() => {
                limpiar_formulario_cajas();
              }}
              startIcon={<CleaningServicesIcon />}
            >
              Limpiar
            </LoadingButton>{' '}
          </Grid>
          {cajas.id_caja ? (
            <>
              <Grid item>
                <ButtonEliminar
                  id={cajas.id_caja}
                  confirmationMessage="¿Estás seguro de eliminar esta caja?"
                  successMessage="La caja se eliminó correctamente"
                  Disabled={!cajas.id_caja}
                  deleteFunction={async () =>
                    await delete_caja(cajas?.id_caja ?? 0)
                  }
                  fetchDataFunction={async () => {
                    await fetch_data_caja_bandeja();
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
              loading={is_saving_cajas}
              disabled={
                is_saving_cajas ||
                !cajas.id_bandeja ||
                (!mode_estante.crear && !mode_estante.editar)
              }
              startIcon={<SaveIcon />}
            >
              {mode_estante.crear
                ? 'Guardar'
                : mode_estante.editar
                ? 'Actualizar'
                : 'Guardar'}{' '}
            </LoadingButton>
          </Grid>
          <Grid item>
            <ButtonSalir />
          </Grid>
        </Grid>
      </form>
    </>
  );
};

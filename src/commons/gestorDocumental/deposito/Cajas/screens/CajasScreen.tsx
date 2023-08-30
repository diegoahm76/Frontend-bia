/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { BusquedaEstanteCajas } from '../components/BusquedaEstanteCajas';
import { LoadingButton } from '@mui/lab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { lazy } from 'react';
import { useAppSelector } from '../../../../../hooks';

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
  const { cajas, mode_estante } = useAppSelector((state) => state.deposito);

  return (
    <>
      <form
        onSubmit={(e) => {
          //   void onsubmit_estantes(e);
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
        <Grid container spacing={2} justifyContent="flex-end">
          <BusquedaCajas />
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
          {/* {data_estantes.id_estante_deposito ? (
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
            ) : null} */}

          <Grid item>
            <LoadingButton
              variant="contained"
              color="success"
              type="submit"
              loading={false}
              disabled={false}
              startIcon={<SaveIcon />}
            >
              Guardar
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

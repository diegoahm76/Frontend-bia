import { Grid } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { BusquedaEstanteCajas } from '../components/BusquedaEstanteCajas';
import { LoadingButton } from '@mui/lab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
// import { ButtonEliminar } from '../../../../../utils/Eliminar/Eliminar';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import { BusquedaCajas } from '../components/BusquedaCajas';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CajasScreen: React.FC = () => {
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

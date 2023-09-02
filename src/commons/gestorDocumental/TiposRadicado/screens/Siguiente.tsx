/* eslint-disable @typescript-eslint/naming-convention */
import { Grid } from '@mui/material';
import { Title } from '../../../../components/Title';
import { LoadingButton } from '@mui/lab';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SaveIcon from '@mui/icons-material/Save';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';

export const Siguiente: React.FC = () => {
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          // guardar();
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
            <Title title="Administración de tipos de radicados y sus consecutivos" />
          </Grid>
        </Grid>
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
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                loading={false}
                disabled={false}
                startIcon={<CleaningServicesIcon />}
                // onClick={() => {
                //   limpiar_formulario();
                // }}
              >
                Limpiar
              </LoadingButton>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                type="submit"
                loading={false}
                disabled={false}
                startIcon={<SaveIcon />}
              >
                {/* {mode_estante.editar ? 'Actualizar' : 'Guardar'} */}
                Guardar
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

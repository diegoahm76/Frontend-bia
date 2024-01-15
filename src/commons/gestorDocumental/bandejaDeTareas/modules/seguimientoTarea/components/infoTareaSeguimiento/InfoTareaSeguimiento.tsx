/* eslint-disable @typescript-eslint/naming-convention */
import { useAppSelector } from '../../../../../../../hooks';
import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../components';
import { formatDate } from '../../../../../../../utils/functions/formatDate';

export const InfoTareaSeguimiento = (): JSX.Element => {
  //* redux states
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = useAppSelector(
    (state) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        justifyContent: 'center',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Title title="Seguimiento a respuesta de la tarea" />
        <section
          style={{
            marginTop: '2.2rem',
          }}
        >
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                zIndex: 2,
              }}
            >
              <TextField
                fullWidth
                disabled
                label="Tipo de tarea"
                size="small"
                variant="outlined"
                value={
                  currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea ??
                  'N/A'
                }
                sx={{ mt: '.2rem', mb: '.45rem' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={6}
              sx={{
                zIndex: 2,
              }}
            >
              <TextField
                fullWidth
                disabled
                label="Asignado por:"
                size="small"
                variant="outlined"
                value={
                  currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.asignado_por ??
                  'N/A'
                }
                sx={{ mt: '.2rem', mb: '.45rem' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                zIndex: 2,
              }}
            >
              <TextField
                fullWidth
                disabled
                label="Fecha de asignación"
                size="small"
                variant="outlined"
                value={
                  formatDate(
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.fecha_asignacion
                  ) ?? 'N/A'
                }
                sx={{ mt: '.3rem', mb: '.45rem' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={4}
              sx={{
                zIndex: 2,
              }}
            >
              <TextField
                fullWidth
                disabled
                label="Fecha de radicado"
                size="small"
                variant="outlined"
                value={
                  formatDate(
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.fecha_radicado
                  ) ?? 'N/A'
                }
                sx={{ mt: '.3rem', mb: '.45rem' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                disabled
                label="Radicado"
                size="small"
                variant="outlined"
                value={
                  currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.radicado ??
                  'N/A'
                }
                sx={{ mt: '.2rem', mb: '.45rem' }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </section>
      </Grid>
    </Grid>
  );
};

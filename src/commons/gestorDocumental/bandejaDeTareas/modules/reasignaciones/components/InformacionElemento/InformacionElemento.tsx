/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { Title } from '../../../../../../../components';
import { useAppSelector } from '../../../../../../../hooks';
import { formatDate } from '../../../../../../../utils/functions/formatDate';
import { InputLabel } from '@mui/material';

export const InformacionElemento: React.FC = (): JSX.Element => {
  //* redux states
  const currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas = useAppSelector(
    (state) =>
      state.BandejaTareasSlice
        .currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas
  );
  return (
    <Grid item xs={12}>
      <Title title="Información de la solicitud seleccionada en bandeja de tareas" />
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
                currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea
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
                currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.asignado_por
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
                )
                ?? 'N/A'
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
                )
                ?? 'N/A'
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
              value={currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.radicado}
              sx={{ mt: '.2rem', mb: '.45rem' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={5.5}
          sx={{
            width: '60%',
            margin: '.6rem auto',
            display: 'flex',
            justifyContent: 'center',
          }}
          >
            <TextField
              fullWidth
              disabled
              label="Unidad organizacional actual"
              size="small"
              variant="outlined"
              value={'Grupo: agua subterráneas'}
              sx={{ mt: '.2rem', mb: '.45rem' }}
              InputLabelProps={{
                shrink: true,
              }}
            />
          </Grid>
        </Grid>
      </section>
    </Grid>
  );
};

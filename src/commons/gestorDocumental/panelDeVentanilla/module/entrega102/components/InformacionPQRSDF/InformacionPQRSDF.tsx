/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { Title } from '../../../../../../../components';
import { useAppSelector } from '../../../../../../../hooks';

export const InformacionPQRSDF: React.FC = (): JSX.Element => {
  //* redux states
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  return (

      <Grid item xs={12}>
        <Title title="Información de la PQRSDF" />
        <section
          style={{
            marginTop: '2.2rem',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                disabled
                label="Radicado"
                size="small"
                variant="outlined"
                value={currentElementPqrsdComplementoTramitesYotros?.radicado}
                sx={{ mt: '.2rem', mb: '.45rem' }}
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
                label="Titular"
                size="small"
                variant="outlined"
                value={
                  currentElementPqrsdComplementoTramitesYotros?.nombre_completo_titular
                }
                sx={{ mt: '.2rem', mb: '.45rem' }}
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
                label="Cantidad de anexos"
                size="small"
                variant="outlined"
                value={
                  currentElementPqrsdComplementoTramitesYotros?.cantidad_anexos
                }
                sx={{ mt: '.2rem', mb: '.45rem' }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={12}
              sx={{
                zIndex: 2,
              }}
            >
              <TextField
                fullWidth
                disabled
                label="Asunto"
                size="small"
                variant="outlined"
                value={currentElementPqrsdComplementoTramitesYotros?.asunto}
                sx={{ mt: '.3rem', mb: '.45rem' }}
              />
            </Grid>
          </Grid>
        </section>
      </Grid>
  );
};

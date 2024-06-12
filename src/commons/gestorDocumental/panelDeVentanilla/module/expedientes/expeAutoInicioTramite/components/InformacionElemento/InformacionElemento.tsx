/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { Title } from '../../../../../../../../components';
import { useAppSelector } from '../../../../../../../../hooks';
import { formatDate } from '../../../../../../TramitesServicios/utils/FormatoFecha';


export const InformacionElemento: React.FC = (): JSX.Element => {
  //* redux states
  const currentElementPqrsdComplementoTramitesYotros = useAppSelector(
    (state) =>
      state.PanelVentanillaSlice.currentElementPqrsdComplementoTramitesYotros
  );
  return (
    <Grid item xs={12}>
      <Title
        title={`Información de la solicitud de: ${
          currentElementPqrsdComplementoTramitesYotros?.tipo ||
          currentElementPqrsdComplementoTramitesYotros?.tipo_solicitud
        }`}
      />
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
              inputProps={{
                shrink: true,
              }}
              label="Titular de la solicitud"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.nombre_completo_titular ??
                'N/A'
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
              inputProps={{
                shrink: true,
              }}
              label="Nombre del proyecto"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.nombre_proyecto ??
                'N/A'
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
              inputProps={{
                shrink: true,
              }}
              label="Costo del proyecto"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.costo_proyecto
                  ? `COP ${currentElementPqrsdComplementoTramitesYotros.costo_proyecto.toLocaleString(
                      'es-CO'
                    )}`
                  : `COP ${0}`
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
              inputProps={{
                shrink: true,
              }}
              label="¿Pagado?"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.pagado
                  ? 'Sí'
                  : 'No'
              }
              sx={{ mt: '.3rem', mb: '.45rem' }}
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
              inputProps={{
                shrink: true,
              }}
              label="Cantidad de predios"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.cantidad_predios ??
                0
              }
              sx={{ mt: '.3rem', mb: '.45rem' }}
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
              inputProps={{
                shrink: true,
              }}
              label="Cantidad de anexos"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.cantidad_anexos ??
                0
              }
              sx={{ mt: '.3rem', mb: '.45rem' }}
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
              inputProps={{
                shrink: true,
              }}
              label="Radicado"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.radicado ?? 'N/A'
              }
              sx={{ mt: '.3rem', mb: '.45rem' }}
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
              inputProps={{
                shrink: true,
              }}
              label="Fecha de radicado"
              size="small"
              variant="outlined"
              value={
                formatDate(currentElementPqrsdComplementoTramitesYotros?.fecha_radicado) ??
                'N/A'
              }
              sx={{ mt: '.3rem', mb: '.45rem' }}
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
              inputProps={{
                shrink: true,
              }}
              label="Sede"
              size="small"
              variant="outlined"
              value={
                currentElementPqrsdComplementoTramitesYotros?.sede ??
                'N/A'
              }
              sx={{ mt: '.3rem', mb: '.45rem' }}
            />
          </Grid>
        </Grid>
      </section>
    </Grid>
  );
};

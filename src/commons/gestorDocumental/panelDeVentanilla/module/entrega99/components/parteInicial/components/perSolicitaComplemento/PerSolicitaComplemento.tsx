/* eslint-disable @typescript-eslint/naming-convention */

import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';

export const PerSolicitaComplemento = (): JSX.Element => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
        justifyContent: 'center',
      }}
    >
      <Title title="Persona que solicita el complemento de información" />
      <form
        style={{
          marginTop: '3rem',
          justifyContent: 'center',
        }}
      >
        <Grid
          sx={{
            justifyContent: 'center',
          }}
          container
          spacing={2}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombres"
              variant="outlined"
              value={'Cristiano'}
              inputProps={{
                maxLength: 50,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Apellidos"
              variant="outlined"
              value={'Alias el bicho'}
              inputProps={{
                maxLength: 10,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Tipo de documento"
              disabled
              variant="outlined"
              value={'Cédula de ciudadanía'}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              size="small"
              label="Número de documento"
              variant="outlined"
              disabled
              value={'21201918'}
            />
          </Grid>

          <Grid item xs={12} sm={8}>
            <TextField
              fullWidth
              size="small"
              label="Unidad organizacional solicitante"
              variant="outlined"
              disabled
              value={'Dirección general de tecnologías de la información y las comunicaciones'}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

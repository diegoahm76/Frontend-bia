/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import { Title } from '../../../../../../../../../components';

export const PersonaTitular = (): JSX.Element => {
  return (
    <Grid
      item
      xs={12}
      sx={{
        mt: '2rem',
      }}
    >
      <Title title="Persona titular de la PQRSDF" />
      <form
        style={{
          marginTop: '3rem',
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              disabled
              size="small"
              label="Nombres"
              variant="outlined"
              value={'Pedro'}
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
              value={'Perez'}
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
              value={'1006877856'}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

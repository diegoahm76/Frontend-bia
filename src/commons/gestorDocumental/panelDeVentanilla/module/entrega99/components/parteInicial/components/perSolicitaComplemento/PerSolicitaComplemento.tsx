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
      <Title title="Persona titular de la PQRSDF" />
      <form
        style={{
          marginTop: '3rem',
          justifyContent: 'center',
        }}
        onSubmit={(e: any) => {
          console.log('submit');
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
              required
              fullWidth
              disabled={false}
              size="small"
              label="Nombre CCD"
              variant="outlined"
              value={'siuuuu'}
              onChange={(e) => {
                console.log(e);
              }}
              inputProps={{
                maxLength: 50,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              disabled={false}
              size="small"
              label="Versión CCD"
              variant="outlined"
              value={'iji siuu'}
              inputProps={{
                maxLength: 10,
              }}
              onChange={(e) => {
                console.log(e);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              size="small"
              label="Valor aumento series CCD"
              disabled={false}
              variant="outlined"
              value={'hola sss'}
              onChange={() => {}}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              size="small"
              label="valor aumento subseries CCD"
              variant="outlined"
              disabled={false}
              value={'hola'}
              onChange={() => {}}
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              size="small"
              label="valor aumento subseries CCD"
              variant="outlined"
              disabled={false}
              value={'hola'}
              onChange={() => {}}
            />
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack, TextField } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
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
        onSubmit={(e: any) => {
          console.log('submit');
        }}
      >
        <Grid container spacing={2}>
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
        </Grid>
      </form>
    </Grid>
  );
};

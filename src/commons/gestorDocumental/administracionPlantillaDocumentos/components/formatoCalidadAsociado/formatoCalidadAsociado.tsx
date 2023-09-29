/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';

export const FormatoCalidadAsociado: React.FC = () => {
  return (
    <>
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            style={{ width: '80%', margin: 4 }}
            variant="outlined"
            size="small"
            label="Formato de calidad asociado"
            value={'xml'}
            fullWidth
            name="Numero identificación "
          />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <TextField
            style={{ width: '80%', margin: 4 }}
            size="small"
            label="Version formato calidad "
            value={12}
            fullWidth
            name="Numero identificación "
          />
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <TextField
            style={{ width: '80%', margin: 4 }}
            variant="outlined"
            size="small"
            label="Disponibilidad "
            value={'ninguna'}
            fullWidth
            name="Numero identificación "
          />
        </Grid>
      </Grid>
    </>
  );
};

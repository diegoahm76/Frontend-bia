import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import { useEffect, useState } from 'react';

// interface IProps {
//   set_porh: any;
// }

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaPorh: React.FC = () => {
  const [is_search, set_is_search] = useState(false);

  useEffect(() => {
    set_is_search(false);
  }, []);

  return (
    <>
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          label="Nombre PORH *"
          value='PORH RIO CHICAMOCHA'
          disabled={true}
          fullWidth
          size="small"
          margin="dense"
          required
          autoFocus
        />
      </Grid>
      <Grid item xs={12} sm={6} md={2} container justifyContent="end">
        <LoadingButton
          type="submit"
          variant="contained"
          color="primary"
          loading={is_search}
          disabled={is_search}
        >
          Buscar
        </LoadingButton>
      </Grid>
    </>
  );
};

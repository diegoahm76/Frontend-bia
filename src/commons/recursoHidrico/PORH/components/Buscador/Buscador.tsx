import { LoadingButton } from '@mui/lab';
import { Grid, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BusquedaPorh: React.FC = () => {

  const { set_is_general, set_is_consulta, } = useContext(DataContext);
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
          // type="submit"
          onClick={() => {
            set_is_general(true);
            set_is_consulta(false);
          }}
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

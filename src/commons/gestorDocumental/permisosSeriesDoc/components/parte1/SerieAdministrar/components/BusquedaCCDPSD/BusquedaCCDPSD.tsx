/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { type FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';

export const BusquedaCCDPSD: FC<any> = (): JSX.Element => {
  return (
    <>
      <Grid item xs={12} sm={4}
      >
        <TextField
          fullWidth
          label="Nombre del TCA"
          size="small"
          variant="outlined"
          // la prop value se debe reemplazar por aquello que se seleccione de la busqueda
         // value={}
          InputLabelProps={{ shrink: true }}
          /* onChange={(e) => {
            if (e.target.value.length === 50)
              control_warning('máximo 50 caracteres');
            onChange(e.target.value);
          }} */
          inputProps={{ maxLength: 50 }}
        />
      </Grid>
      <Grid item xs={12} sm={3}>
        <TextField
          fullWidth
          label="Nombre del TCA"
          size="small"
          variant="outlined"
          // la prop value se debe reemplazar por aquello que se seleccione de la busqueda
         // value={}
          InputLabelProps={{ shrink: true }}
         /* onChange={(e) => {
            if (e.target.value.length === 50)
              control_warning('máximo 50 caracteres');
            onChange(e.target.value);
          }}
          inputProps={{ maxLength: 50 }} */
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          // onClick={() => {
          //  console.log('buscando')
          // }}
        />
      </Grid>
    </>
  );
};

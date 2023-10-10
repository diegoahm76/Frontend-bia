/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import {  Grid, TextField } from '@mui/material';
import {  type FC } from 'react';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';


export const VistaOrgSeccionesResp: FC<any> = (): JSX.Element => {
    // ! states from redux
 // const { ccdOrganigramaCurrentBusqueda } = useAppSelector((state) => state.HomologacionesSlice);

  return (
    <>
      <Grid item xs={12} sm={4} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre organigrama del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
         value={''}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={4} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Versión organigrama del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={''}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

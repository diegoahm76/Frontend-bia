/* eslint-disable @typescript-eslint/naming-convention */
import { Grid, TextField } from '@mui/material';
import React from 'react';
import { stylesGrid } from '../../../../../../../../permisosSeriesDoc/utils/styles';
import { useAppSelector } from '../../../../../../../../../../hooks';

export const SeleccionOrgVista = () => {

         //* get redux states
         const {ccdOrganigramaCurrentBusquedaOfiResp} = useAppSelector(
          (state) => state.DelOfiResSlice
        )

  return (
    <>
      <Grid item xs={12} sm={4} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre organigrama del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={ccdOrganigramaCurrentBusquedaOfiResp?.nombre_organigrama ?? ''}
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
          value={ccdOrganigramaCurrentBusquedaOfiResp?.version_organigrama ?? ''}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

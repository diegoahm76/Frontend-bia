/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext, type FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { stylesGrid } from '../../../../../../../../permisosSeriesDoc/utils/styles';


export const VistaOrganigrama: FC<any> = (): JSX.Element => {
  // ! states from redux
 //  const { ccd_current_busqueda } = useAppSelector((state) => state.PsdSlice);

  // ? context necesarios
//  const { handleSeleccionCCD_PSD } = useContext(ModalContextPSD);

  return (
    <>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre organigrama del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
         value={/* ccd_current_busqueda?.nombre || */ 'organigrama seleccionado'}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Versión organigrama del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={/* ccd_current_busqueda?.version || */ 'versión seleccionada'}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  );
};

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext, type FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ModalContextPSD } from '../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { stylesGrid } from '../../../../../permisosSeriesDoc/utils/styles';
import { useAppSelector } from '../../../../../../../hooks';

export const BusquedaCCDPSD: FC<any> = (): JSX.Element => {
  // ! states from redux
  const { ccd_current_busqueda } = useAppSelector((state) => state.PsdSlice);

  // ? context necesarios
  const { handleSeleccionCCD_PSD } = useContext(ModalContextPSD);

  return (
    <>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={ccd_current_busqueda?.nombre || ''}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Versión del CCD"
          size="small"
          variant="outlined"
          disabled={true}
          value={ccd_current_busqueda?.version || ''}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => {
            handleSeleccionCCD_PSD(true);
          }}
        >
          BUSCAR CCD
          </Button>
      </Grid>
    </>
  );
};

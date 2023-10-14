/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext } from 'react';
import { stylesGrid } from '../../../../../../../../permisosSeriesDoc/utils/styles';
import { ModalContextPSD } from '../../../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import SearchIcon from '@mui/icons-material/Search';

export const SeleccionCcdVista = (params: any): JSX.Element => {
  const { setccdList } = params;

  // ? context necesarios
  const { handleSeleccionCCD_PSD, setLoadingButtonPSD: setLoadingRequest } =
    useContext(ModalContextPSD);

  return (
    <>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={/*ccdOrganigramaCurrentBusqueda?.nombre ??*/ ''}
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
          value={/* ccdOrganigramaCurrentBusqueda?.version || */ ''}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={12} sm={1} sx={stylesGrid}>
        <Button
          color="primary"
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={() => {
            handleSeleccionCCD_PSD(true);
            /* void functionGetCcdHomologacionSeries(
              setLoadingRequest,
              navigate
            ).then((data: any) => {
              setccdList(data);
            }); */
          }}
        >
          BUSCAR
        </Button>
      </Grid>
    </>
  );
};

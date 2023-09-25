/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext, type FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { stylesGrid } from '../../../../../../../../permisosSeriesDoc/utils/styles';
import { ModalContextPSD } from '../../../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { functionGetCcdHomologacionSeries } from '../../../../../toolkit/thunks/ccdOrganigrama.service';
import { useAppSelector } from '../../../../../../../../../../hooks';
// import { useAppSelector } from '../../../../../../../../../../hooks';

export const VistaCcd: FC<any> = (params:any): JSX.Element => {
  const {
    setccdList,
  } = params
  // ! states from redux
 const { ccdOrganigramaCurrentBusqueda } = useAppSelector((state) => state.HomologacionesSlice);

  // ? context necesarios
  const { handleSeleccionCCD_PSD, setLoadingButtonPSD: setLoadingRequest, } = useContext(ModalContextPSD);

  return (
    <>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={ccdOrganigramaCurrentBusqueda?.nombre ?? ''}
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
          value={ccdOrganigramaCurrentBusqueda?.version || ''}
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
            void functionGetCcdHomologacionSeries(setLoadingRequest).then((data: any) => {
              setccdList(data)
            })
          }}
        >
          BUSCAR
          </Button>
      </Grid>
    </>
  );
};

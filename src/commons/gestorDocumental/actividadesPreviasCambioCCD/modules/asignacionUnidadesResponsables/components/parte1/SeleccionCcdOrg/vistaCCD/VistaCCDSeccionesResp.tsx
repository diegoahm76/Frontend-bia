/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext, type FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';

import { useNavigate } from 'react-router-dom';
import { ModalContextPSD } from '../../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import { stylesGrid } from '../../../../../../../permisosSeriesDoc/utils/styles';
import {
  functionGetCcdAsignacionUnidadesResp,
  getCcdActual,
} from '../../../../toolkit/thunks/busquedaOrgCcd.service';
import { useAppSelector } from '../../../../../../../../../hooks';
// import { useAppSelector } from '../../../../../../../../../../hooks';

export const VistaCcdSeccionesResp: FC<any> = (params: any): JSX.Element => {
  const { setccdList } = params;
  //* navigate declaration
  const navigate = useNavigate();
  // ! states from redux
  const { ccdOrganigramaCurrentBusqueda } = useAppSelector(
    (state) => state.AsigUniRespSlice
  );

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
          value={ccdOrganigramaCurrentBusqueda?.nombre || ''}
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
            void functionGetCcdAsignacionUnidadesResp(
              setLoadingRequest,
              navigate
            ).then((resBusquedaCcd: any) => {
              setccdList(resBusquedaCcd);
            });
          }}
        >
          BUSCAR
        </Button>
      </Grid>
    </>
  );
};

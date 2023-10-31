/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext } from 'react';
import { stylesGrid } from '../../../../../../../../permisosSeriesDoc/utils/styles';
import { ModalContextPSD } from '../../../../../../../../permisosSeriesDoc/context/ModalContextPSD';
import SearchIcon from '@mui/icons-material/Search';
import { functionGetCcdHomologacionSeries as functionGetCcdOrgDelegUniResp  } from '../../../../../../homologacionDeSeccionesPersistentes/toolkit/thunks/ccdOrganigrama.service';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../../../../../../../../../hooks';

export const SeleccionCcdVista = (params: any): JSX.Element => {
  const { setccdList } = params;

  //* navigate declaration
  const navigate = useNavigate()

  // ? context necesarios
  const { handleSeleccionCCD_PSD, setLoadingButtonPSD: setLoadingRequest } =
    useContext(ModalContextPSD);

        //* get redux states
        const {ccdOrganigramaCurrentBusquedaOfiResp} = useAppSelector(
          (state) => state.DelOfiResSlice
        )

  return (
    <>
      <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={ccdOrganigramaCurrentBusquedaOfiResp?.nombre ?? ''}
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
          value={ccdOrganigramaCurrentBusquedaOfiResp?.version ?? ''}
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
            void functionGetCcdOrgDelegUniResp(
              setLoadingRequest,
              navigate
            ).then((data: any) => {
              setccdList(data);
            });
          }}
        >
          BUSCAR
        </Button>
      </Grid>
    </>
  );
};

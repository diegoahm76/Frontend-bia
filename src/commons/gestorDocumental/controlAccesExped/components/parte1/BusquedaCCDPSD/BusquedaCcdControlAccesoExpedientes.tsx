/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, TextField } from '@mui/material';
import { useContext, type FC } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { ModalContextPSD } from '../../../../permisosSeriesDoc/context/ModalContextPSD';
import { stylesGrid } from '../../../../permisosSeriesDoc/utils/styles';
import { useAppSelector } from '../../../../../../hooks';
import { gridStyles } from '../../../../ccd/screens/utils/constants';
import { Title } from '../../../../../../components';
import { containerStyles } from '../../../../tca/screens/utils/constants/constants';

export const BusquedaCcdControlAccesoExpedientes: FC<any> = (): JSX.Element => {
  // ! states from redux
  const { currentCcdCtrlAccesoExp } = useAppSelector((state) => state.ctrlAccesoExpSlice);
  // ? context necesarios
  const { handleSeleccionCCD_PSD } = useContext(ModalContextPSD);

  return (
    <Grid container sx={containerStyles}>
        <Title title="Control de acceso de clasificación de expedientes del CCD" />
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center'
          }}
        >
          {/* cajas de texto en las que se asignan los valores de la búsqueda de los ccd (nombre y versión CCD) */}

          <Grid item xs={12} sm={2.8} sx={stylesGrid}>
        <TextField
          fullWidth
          label="Nombre del CCD seleccionado"
          size="small"
          variant="outlined"
          disabled={true}
          value={currentCcdCtrlAccesoExp?.nombre || ''}
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
          value={currentCcdCtrlAccesoExp?.version || ''}
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
          BUSCAR
          </Button>
      </Grid>
        </Grid>
    </Grid>
  );
};

/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
/* import ModalSeleccionCCDPSD from '../ModalSeleccionCCDPSD/ModalSeleccionCCDPSD'; */
import { Grid } from '@mui/material';
import { DialogBusqueda } from '../../DialogBusquedaCCD/DialogBusquedaCCD';
import { BusquedaCCDPSD } from '../components/BusquedaCCDPSD/BusquedaCCDPSD';
import { containerStyles } from '../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../components/Title';

export const ControlAccesoClasificacion: FC<any> = (): JSX.Element => {
  return (
    <>
      <Grid container sx={containerStyles}>
        {/*    <Grid item xs={12} sm={12}> */}
        <Title title="Control de acceso de clasificación de expedientes del CCD" />
        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center'
          }}
        >
          {/* cajas de texto en las que se asignan los valores de la búsqueda de los ccd (nombre y versión CCD) */}

          <BusquedaCCDPSD />
        </Grid>
      </Grid>

      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
      <DialogBusqueda />
      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
    </>
  );
};

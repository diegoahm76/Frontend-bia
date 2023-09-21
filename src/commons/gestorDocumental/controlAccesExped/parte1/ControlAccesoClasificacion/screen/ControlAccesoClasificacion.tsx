/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
/* import ModalSeleccionCCDPSD from '../ModalSeleccionCCDPSD/ModalSeleccionCCDPSD'; */
import { Grid } from '@mui/material';
import { DialogBusquedaCcdControlAccesoExp } from '../../DialogBusquedaCCD/DialogBusquedaCCD';
import { containerStyles } from '../../../../tca/screens/utils/constants/constants';
import { Title } from '../../../../../../components/Title';
import { BusquedaCcdControlAccesoExpedientes } from '../components/BusquedaCCDPSD/BusquedaCcdControlAccesoExpedientes';

export const ControlAccesoClasificacion: FC<any> = (): JSX.Element => {
  return (
    <>
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

          <BusquedaCcdControlAccesoExpedientes />
        </Grid>
      </Grid>

      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
      <DialogBusquedaCcdControlAccesoExp />
      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
    </>
  );
};

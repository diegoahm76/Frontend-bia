/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
/* import ModalSeleccionCCDPSD from '../ModalSeleccionCCDPSD/ModalSeleccionCCDPSD'; */
import { Grid } from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { ModalSeleccionCCDPSD } from '../../ModalSeleccionCCDPSD/ModalSeleccionCCDPSD';
import { Title } from '../../../../../../../components';
import { BusquedaCCDPSD } from '../components/BusquedaCCDPSD/BusquedaCCDPSD';
import { SeleccionSeccion } from '../components/SeleccionSeccion/SeleccionSeccion';

export const SerieAdministrar: FC<any> = (): JSX.Element => {
  return (
    <>
      <Grid container sx={containerStyles}>
        {/*    <Grid item xs={12} sm={12}> */}
        <Title title="Serie a Administrar" />
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

        <Grid
          container
          spacing={3}
          sx={{
            justifyContent: 'center'
          }}
        >
          {/* aqui me encargo de elegir la respectiva sección o subsección sobre la cual voy a realizar la búsqueda de las series y subseries asociadas */}

          <SeleccionSeccion />
        </Grid>
      </Grid>

      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
      <ModalSeleccionCCDPSD />
      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
    </>
  );
};

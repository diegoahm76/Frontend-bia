/* eslint-disable @typescript-eslint/naming-convention */
import { type FC } from 'react';
/* import ModalSeleccionCCDPSD from '../ModalSeleccionCCDPSD/ModalSeleccionCCDPSD'; */
import { Grid } from '@mui/material';
import { containerStyles } from '../../../../../tca/screens/utils/constants/constants';
import { ModalSeleccionCCDPSD } from '../../ModalSeleccionCCDPSD/ModalSeleccionCCDPSD';
import { Title } from '../../../../../../../components';
import { BusquedaCCDPSD } from '../components/BusquedaCCDPSD/BusquedaCCDPSD';

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
          <BusquedaCCDPSD />
        </Grid>

        <Grid container spacing={4}>
          <BusquedaCCDPSD />
        </Grid>

        {/*  <Stack
              direction="row"
              justifyContent="flex-end"
              spacing={2}
              sx={{ mb: '20px', mt: '20px' }}
            >
              <Button
                color="primary"
                variant="contained"
                startIcon={<SearchIcon />}
                onClick={openModalBusquedaTca}
              >
                BUSCAR
              </Button>
            </Stack> */}
        {/* </Grid> */}
      </Grid>

      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
      <ModalSeleccionCCDPSD />
      {/* se define modal de búsqueda de los CCD para la administración de la serie */}
    </>
  );
};

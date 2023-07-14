/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { Box, Button, /* Divider, */ Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../components';

//* Icons
import GradingIcon from '@mui/icons-material/Grading';
import SearchIcon from '@mui/icons-material/Search';
import { ModalContextTRD } from '../../../context/ModalsContextTrd';
import { BusquedaTipologias } from '../components/BusquedaTipologias/BusquedaTipologias';
import { AdministrarTipologiasDocumentales } from '../components/AdmistrarTipologias/AdministrarTipologiasDocumentales';

export const TipologiasScreen = (): JSX.Element => {
  const {
    openModalBusquedaTipologiasDocumentales,
    openModalAdministracionTipologiasDocumentales
  } = useContext(ModalContextTRD);

  return (
    <>
      <Grid
        item
        sx={{
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Title title="Tipologías documentales" />
          <Stack
            direction="row"
            justifyContent="center"
            spacing={2}
            sx={{ m: '40px 0' }}
          >
            {/* buttons start */}
            <Button
              // color="info"
              color="primary"
              variant="contained"
              // disabled={true}
              startIcon={<GradingIcon />}
              onClick={() => {
                openModalAdministracionTipologiasDocumentales();
                console.log('ESTABLECER TIPOLOGÍAS'); // ? this is the function to open the modal
              }}
            >
              {/* this button must be part of the TRD administration */}
              ADMINISTRAR TIPOLOGÍAS DOCUMENTALES
            </Button>
            <Button
              // color="info"
              color="primary"
              variant="outlined"
              startIcon={<SearchIcon />}
              onClick={() => {
                openModalBusquedaTipologiasDocumentales();
                console.log('BUSCANDO TIPOLOGÍAS'); // ? this is the function to open the modal
              }}
            >
              BUSCAR TIPOLOGÍAS DOCUMENTALES
            </Button>

            {/* buttons end */}
          </Stack>
        </Box>
      </Grid>

      {/*  modules that will appear */}

      <BusquedaTipologias />
      <AdministrarTipologiasDocumentales />
      {/*  modules that will appear */}
    </>
  );
};

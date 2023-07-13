/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable @typescript-eslint/naming-convention */

import { useContext } from 'react';
import { Box, Button, /* Divider, */ Grid, Stack } from '@mui/material';
import { Title } from '../../../../../../../components';

//* Icons
import GradingIcon from '@mui/icons-material/Grading';
import SearchIcon from '@mui/icons-material/Search';
import { ModalContextTRD } from '../../../../context/ModalsContextTrd';
import { BusquedaTipologias } from '../BusquedaTipologias/BusquedaTipologias';

export const AdministrarTipologias = (): JSX.Element => {
  const { openModalBusquedaTipologiasDocumentales } =
    useContext(ModalContextTRD);

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
          <Title title="Administrar tipologías" />
          <h3>I will use this space to create the mockup number 1.1</h3>

          {/* <DataGrid
            sx={{
              marginTop: '.5rem',
            }}
            density="compact"
            autoHeight
            rows={catalado_series_subseries_unidad_organizacional}
            columns={columns_catalogo}
            pageSize={5}
            rowsPerPageOptions={[5]}
            experimentalFeatures={{ newEditingApi: true }}
            getRowId={(row) => row.id_cat_serie_und}
          /> */}

          <Stack
            direction="row"
            justifyContent="flex-end"
            spacing={2}
            sx={{ m: '20px 0' }}
          >
            {/* buttons start */}
            <Button
              // color="info"
              color="primary"
              variant="outlined"
              startIcon={<GradingIcon />}
              onClick={() => console.log('ESTABLECER TIPOLOGÍAS')}
            >
              ESTABLECER TIPOLOGÍAS
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

      {/*  modules that will appear */}
    </>
  );
};

/* eslint-disable @typescript-eslint/naming-convention */
import { Button, Grid, Stack } from '@mui/material';
import { type FC } from 'react';
import { Link } from 'react-router-dom';

//* icons
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export const AdminTcaScreen: FC<any> = (): JSX.Element => {
  return (
    <>
      <Grid
        item
        sx={{
          width: '100%',
          marginTop: '1rem'
        }}
      >
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ m: '20px 0' }}
        >
          {/* buttons start */}
          <Link to="/app/gestor_documental/tca/">
            <Button
              color="success"
              variant="contained"
              startIcon={<ArrowBackIcon />}
              /* onClick={() => {
                dispatch(set_selected_item_from_catalogo_trd_action(null));
                closeModalAdministracionTRD();
              }} */
            >
              REGRESAR A TCA
            </Button>
          </Link>
        </Stack>

        {/*    <Grid
          item
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26'
          }}
        >
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <Title title="Cuadro de clasificación documental Seleccionado - (Administración TRD)" />

              {trd_current?.actual ? null : (
                <DataGrid
                  sx={{
                    marginTop: '.5rem'
                  }}
                  density="compact"
                  autoHeight
                  rows={
                    catalado_series_subseries_unidad_organizacional.filter(
                      (item: any) =>
                        !catalogo_trd.some(
                          (otherItem: any) =>
                            otherItem.id_cat_serie_und === item.id_cat_serie_und
                        )
                    ) || []
                  }
                  columns={columns_catalogo_ccd}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  experimentalFeatures={{ newEditingApi: true }}
                  getRowId={(row) => row.id_cat_serie_und ?? 0}
                />
              )}

              {trd_current?.actual &&
              catalado_series_subseries_unidad_organizacional.filter(
                (item: any) =>
                  !catalogo_trd.some(
                    (otherItem: any) =>
                      otherItem.id_cat_serie_und === item.id_cat_serie_und
                  )
              ).length > 0 &&
              !buttonAddNewTRDRelationActual ? (
                <Button
                  sx={{
                    marginTop: '1rem'
                  }}
                  variant="contained"
                  color="warning"
                  onClick={() => {
                    // setButton(true);
                    setButtonAddNewTRDRelationActual(true);
                    console.log('agregar nueva relacion ccd');
                  }}
                >
                  AGREGAR NUEVA RELACION CCD
                </Button>
              ) : null}

              {buttonAddNewTRDRelationActual &&
              trd_current?.actual &&
              catalado_series_subseries_unidad_organizacional.filter(
                (item: any) =>
                  !catalogo_trd.some(
                    (otherItem: any) =>
                      otherItem.id_cat_serie_und === item.id_cat_serie_und
                  )
              ).length > 0 ? (
                <>
                  <DataGrid
                    sx={{
                      marginTop: '.5rem'
                    }}
                    density="compact"
                    autoHeight
                    rows={
                      catalado_series_subseries_unidad_organizacional.filter(
                        (item: any) =>
                          !catalogo_trd.some(
                            (otherItem: any) =>
                              otherItem.id_cat_serie_und ===
                              item.id_cat_serie_und
                          )
                      ) || []
                    }
                    columns={columns_catalogo_ccd}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                    experimentalFeatures={{ newEditingApi: true }}
                    getRowId={(row) => row.id_cat_serie_und ?? 0}
                  />
                  <Button
                    sx={{
                      marginTop: '1rem'
                    }}
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      setButtonAddNewTRDRelationActual(false);
                      console.log('agregar nueva relacion ccd');
                    }}
                  >
                    CANCELAR AGREGAR NUEVA RELACION CCD
                  </Button>
                </>
              ) : null}
            </Box>
          </Grid>
        </Grid> */}

        {/*  <Grid
          container
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26'
          }}
        >
          <Grid xs={12}>
            <Box sx={{ width: '100%' }}>
              <Title title="Catalogo TRD - Tabla de retención documental - (Administración TRD)" />
              <DataGrid
                sx={{
                  marginTop: '.5rem'
                }}
                density="compact"
                autoHeight
                rows={catalogo_trd || []}
                columns={columns_catalogo_trd}
                pageSize={5}
                rowsPerPageOptions={[5]}
                experimentalFeatures={{ newEditingApi: true }}
                getRowId={(row) => row.id_catserie_unidadorg ?? 0}
              />
            </Box>
          </Grid>
        </Grid> */}

        {/* {modalAdministracionTRD ? (
          <Grid
            container
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26'
            }}
          >
            <FormTRDAdmin />
          </Grid>
        ) : null} */}
      </Grid>
    </>
  );
};

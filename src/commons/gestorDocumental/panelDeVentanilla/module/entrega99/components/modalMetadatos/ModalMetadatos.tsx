/* eslint-disable @typescript-eslint/naming-convention */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import React from 'react';
import { Title } from '../../../../../../../components';
import { LoadingButton } from '@mui/lab';
import CloseIcon from '@mui/icons-material/Close';
import { Controller } from 'react-hook-form';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { usePanelVentanilla } from '../../../../hook/usePanelVentanilla';
import Select from 'react-select';

export const ModalMetadatos = (): JSX.Element => {
  const { controlManejoMetadatosModal } = usePanelVentanilla();

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={true} // es un boolean
        onClose={() => {}} // funcion de manejo del boolean
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log(' jjiji siuu guardando metadatos');
            //? va a ser necesario almacenar los datos de los metadatos que se establezcan
          }}
        >
          <DialogTitle>
            <Title title="Metadatos del archivo seleccionado" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /*dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Categoría del archivo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          ); */
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Tiene réplica física
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Controller
                  name="id_ccd"
                  control={controlManejoMetadatosModal}
                  rules={{ required: true }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error },
                  }) => (
                    <div>
                      <Select
                        value={value}
                        // name="id_ccd"
                        onChange={(selectedOption) => {
                          console.log(selectedOption);
                          /* dispatch(
                            getServiceSeriesSubseriesXUnidadOrganizacional(
                              selectedOption.item
                            )
                          );*/
                          onChange(selectedOption);
                        }}
                        // isDisabled={trd_current != null}
                        options={[]}
                        placeholder="Seleccionar"
                      />
                      <label>
                        <small
                          style={{
                            color: 'rgba(0, 0, 0, 0.6)',
                            fontWeight: 'thin',
                            fontSize: '0.75rem',
                            marginTop: '0.25rem',
                            marginLeft: '0.25rem',
                          }}
                        >
                          Origen del archivo
                        </small>
                      </label>
                    </div>
                  )}
                />
              </Grid>
              {/*<Grid item xs={12} sm={3}>
                <LoadingButton
                  loading={false}
                  color="primary"
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                >
                  BUSCAR
                </LoadingButton>
              </Grid>*/}
            </Grid>

            {/*   <DataGrid
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={trds}
              columns={columns_trd_busqueda}
              pageSize={10}
              rowsPerPageOptions={[10]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_trd}
            /> */}
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="outlined"
                color="primary"
                onClick={() => {
                  console.log('limpiando campos del modal de metadatos');
                }}
                startIcon={<CleanIcon />}
              >
                LIMPIAR BÚSQUEDA
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  console.log('cerrando modal');
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

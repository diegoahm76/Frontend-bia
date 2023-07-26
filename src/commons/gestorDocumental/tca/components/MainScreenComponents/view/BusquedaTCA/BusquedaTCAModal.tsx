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
  IconButton,
  Stack,
  TextField
} from '@mui/material';
import { useContext, type FC } from 'react';
import { Controller } from 'react-hook-form';
import { DataGrid } from '@mui/x-data-grid';

import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';

import { use_tca } from '../../../../hooks/use_tca';
import { v4 as uuidv4 } from 'uuid';
import { ModalContextTCA } from '../../../../context/ModalContextTca';
export const BusquedaTCAModal: FC<any> = (): JSX.Element => {
  // ? use_tca

  const { control_search_tca } = use_tca();

  // ? manage modal
  const { closeModalBusquedaTca, modalBusquedaTca } =
    useContext(ModalContextTCA);

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalBusquedaTca}
        onClose={closeModalBusquedaTca}
      >
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            // console.log(form_data_searched_trd_modal);

            console.log('buscando...');

            /*  dispatch(
              get_searched_trd(
                form_data_searched_trd_modal.nombre,
                form_data_searched_trd_modal.version,
                setCreateTRDLoadingButton
              )
            ); */
          }}
        >
          <DialogTitle>
            Consultar los TRD que coincidan con el criterio de búsqueda
            <IconButton
              aria-label="close"
              onClick={closeModalBusquedaTca}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500]
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center'
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4.5}>
                <Controller
                  name="nombre"
                  control={control_search_tca}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Nombre del TRD"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // console.log(e.target.value);
                      }}
                      error={!!error}
                      /* helperText={
                    error
                      ? 'Es obligatorio subir un archivo'
                      : 'Seleccione un archivo'
                  } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={4.5}>
                <Controller
                  name="version"
                  control={control_search_tca}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      // margin="dense"
                      fullWidth
                      label="Versión del TRD"
                      size="small"
                      variant="outlined"
                      value={value}
                      InputLabelProps={{ shrink: true }}
                      onChange={(e) => {
                        onChange(e.target.value);
                        // console.log(e.target.value);
                      }}
                      // error={!!error}
                      /* helperText={
                    error
                      ? 'Es obligatorio subir un archivo'
                      : 'Seleccione un archivo'
                  } */
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Button
                  // loading={createTRDLoadingButton}
                  variant="outlined"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR
                </Button>
                {/* <LoadingButton
                  loading={createTRDLoadingButton}
                  variant="outlined"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR
                </LoadingButton> */}
              </Grid>
            </Grid>
            <DataGrid
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={[] /*  trds  */}
              columns={[] /* columns_trd_busqueda */}
              pageSize={5}
              rowsPerPageOptions={[7]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => uuidv4()}
            />
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                variant="contained"
                color="success"
                onClick={() => {
                  // console.log('cerrando');
                  // reset_searched_trd_modal();
                }}
                startIcon={<CleanIcon />}
              >
                LIMPIAR BÚSQUEDA
              </Button>
              <Button
                variant="outlined"
                onClick={closeModalBusquedaTca}
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

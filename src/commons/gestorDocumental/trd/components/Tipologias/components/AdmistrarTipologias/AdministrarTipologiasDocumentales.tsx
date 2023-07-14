/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
import { useContext } from 'react';
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

//* context
import { ModalContextTRD } from '../../../../context/ModalsContextTrd';
//* controller react-hook-form
import { Controller } from 'react-hook-form';
//* Icons
import CloseIcon from '@mui/icons-material/Close';
import CleanIcon from '@mui/icons-material/CleaningServices';
import SearchIcon from '@mui/icons-material/Search';
import { use_trd } from '../../../../hooks/use_trd';

export const AdministrarTipologiasDocumentales = (): JSX.Element => {

  //* se repiten los controladores de la busqueda de tipologias documentales
  const {
    controlBusquedaTipologiasDocumentales
  } = use_trd();

  //* context elements that are used in this component
  const {
    closeModalAdministracionTipologiasDocumentales,
    modalAdministracionTipologiasDocumentales
  } = useContext(ModalContextTRD);

  //* reset all when the modal is closed
  const resetOnCloseModal = (): any => {
    closeModalAdministracionTipologiasDocumentales();
    /* reset_searched_trd_modal({
      nombre: '',
      version: ''
    });
    dispatch(get_trds([])); */
  };

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={modalAdministracionTipologiasDocumentales}
        onClose={resetOnCloseModal}
      >
        <Box
          component="form"
          onSubmit={(e: any) => {
            e.preventDefault();
            console.log('administrando tipologias documentales');
            /* dispatch(
              get_tipologias_documentales_by_name(
                form_data_searched_tipologia_documental.nombre
              )
            ); */
          }}
        >
          <DialogTitle>
            Búsqueda de Tipologias Documentales
            <IconButton
              aria-label="close"
              onClick={resetOnCloseModal}
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
              <Grid item xs={12} sm={6.5}>
                <Controller
                  name="nombre"
                  control={controlBusquedaTipologiasDocumentales}
                  defaultValue=""
                  // rules={{ required: false }}
                  render={({
                    field: { onChange, value },
                    fieldState: { error }
                  }) => (
                    <TextField
                      margin="dense"
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
              <Grid item xs={12} sm={5.5}>
                <Button
                  variant="contained"
                  type="submit"
                  startIcon={<SearchIcon />}
                  color="primary"
                >
                  BUSCAR
                </Button>
                <Button
                  variant="contained"
                  startIcon={<CleanIcon />}
                  color="success"
                  sx={{ ml: '10px' }}
                  onClick={() => {
                    console.log(
                      'limpiando admistrador de tipologías documentales'
                    );
                    /* resetBusquedaTipologiasDocumentales({
                      nombre: ''
                    }); */
                  }}
                >
                  LIMPIAR
                </Button>
              </Grid>
            </Grid>
            {/* <DataGrid
              sx={{ mt: '15px' }}
              density="compact"
              autoHeight
              rows={tipologias}
              columns={columns_tipologias_documentales_trd}
              pageSize={5}
              rowsPerPageOptions={[7]}
              experimentalFeatures={{ newEditingApi: true }}
              getRowId={(row) => row.id_tipologia_documental}
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
                onClick={resetOnCloseModal}
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

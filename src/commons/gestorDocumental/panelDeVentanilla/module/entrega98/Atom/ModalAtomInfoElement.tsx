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

// ? icons
import CloseIcon from '@mui/icons-material/Close';

// ? components
import { Title } from '../../../../../../components';
import { RenderDataGrid } from '../../../../tca/Atom/RenderDataGrid/RenderDataGrid';

export const ModalAtomInfoElement = (props: any): JSX.Element => {
  // ! debe recibir una cantidad de props aprox de 10

  /*
    1. Estado de apertura y cierre
    2. manejador de apertura y cierre
    3. título de la información
  
  */

  const { infoTitle } = props;
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="lg"
        // ? ----- numero 1 -----
        open={true}
        // ? ---  numero 2 -----
        onClose={() => {
          console.log('cerrando modal de información de elemento');
        }}
      >
{/*        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            console.log('buscando trd');
          }}
        >*/}
          <DialogTitle>
            <Title title={infoTitle || 'Título provisional'} />
          </DialogTitle>
          <Divider />

          {/* contenido de los elementos (apertura) */}
          <DialogContent
            sx={{
              mb: '.5rem',
              mt: '1.3rem',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Nombre del TRD"
                  size="small"
                  variant="outlined"
                  // value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    // onChange(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Versión del TRD"
                  size="small"
                  variant="outlined"
                  // value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    // onChange(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Versión del TRD"
                  size="small"
                  variant="outlined"
                  // value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    // onChange(e.target.value);
                    console.log(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  fullWidth
                  label="Versión del TRD"
                  size="small"
                  variant="outlined"
                  // value={value}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => {
                    // onChange(e.target.value);
                    console.log(e.target.value);
                    // console.log(e.target.value);
                  }}
                />
              </Grid>
            </Grid>

            {/* listado de anexos */}
            <div
              style={{
                marginTop: '2rem',
              }}
            >
              <RenderDataGrid
                rows={[]}
                columns={[]}
                title="Listado de anexos"
                aditionalElement={
                  //* este elemento adicional en realidad va a ir dentro de las filas de la tabla (ya que la vista del anexo se maneja por id)
                  <>
                    <Button
                      color="primary"
                      variant="contained"
                      onClick={() => {
                        console.log(
                          'viendo información del anexo seleccionado'
                        );
                      }}
                    >
                      Ver Información del anexo seleccionado
                    </Button>
                  </>
                }
              />
            </div>
          </DialogContent>

          {/* contenido de los elementos (cierre) */}

          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                color="error"
                variant="contained"
                // ? ---  numero 2 -----
                onClick={() => {
                  console.log('cerrando modal de información de elemento');
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR
              </Button>
            </Stack>
          </DialogActions>
       {/* </Box> */}
      </Dialog>
    </>
  );
};

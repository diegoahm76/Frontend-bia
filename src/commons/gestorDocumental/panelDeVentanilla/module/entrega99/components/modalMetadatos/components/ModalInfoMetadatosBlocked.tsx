/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/naming-convention */
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Title } from '../../../../../../../../components';

export const ModalInfoMetadatosBlocked: React.FC = (): JSX.Element => {
  //* se debe manejar un loader ya que a través de ello se consultatá un servicio para los metadatos que están asociados a un archivo

  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={false}
        onClose={() => {
          // handleModalAgregarMetadatos(false);
          //* tambien se deben limpiar los datos que se recojan en el modal
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información metadatos" />
          </DialogTitle>
          <Divider />
          <DialogContent
            sx={{
              mb: '0px',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 10,
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Categoría del archivo"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 10,
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Réplica física"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Origen del archivo"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {/*Inicio de segunda fila*/}
              <Grid
                item
                xs={12}
                sm={4}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                  zIndex: 5,
                }}
              >
                {/* aqui se dispne a unir los campos en los que está si o no (la tipología relacionada y la que no (cuando es cual)) */}
                <TextField
                  disabled
                  fullWidth
                  label="Tipología relacionada"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Asunto"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: '1.2rem',
                  mb: '1.2rem',
                }}
              >
                <TextField
                  disabled
                  multiline
                  rows={4}
                  fullWidth
                  label="Descripción"
                  size="small"
                  variant="outlined"
                  value={'jeje siuu'}
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              <Grid item xs={12} sm={12} sx={{ mt: '1.2rem', mb: '1.2rem' }}>
                <Autocomplete
                  value={['jeje siuu', 'jeje siuusdds', 'jeje ssdsdfsdiuu']}
                  disabled
                  multiple
                  id="tags-filled"
                  options={[]}
                  freeSolo
                  renderTags={(value: readonly string[], getTagProps) =>
                    value.map((option: string, index: number) => (
                      <Chip
                        variant="outlined"
                        label={option}
                        {...getTagProps({ index })}
                      />
                    ))
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Palabras claves"
                      placeholder="Seleccionar"
                    />
                  )}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <Divider />
          <DialogActions>
            <Stack
              direction="row"
              spacing={2}
              sx={{ mr: '15px', mb: '10px', mt: '10px' }}
            >
              <Button
                color="error"
                variant="outlined"
                onClick={() => {
                  console.log('closing modal');
                  /*handleCloseModal(
                    resetManejoMetadatosModalFunction,
                    handleModalAgregarMetadatos
                  );*/
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

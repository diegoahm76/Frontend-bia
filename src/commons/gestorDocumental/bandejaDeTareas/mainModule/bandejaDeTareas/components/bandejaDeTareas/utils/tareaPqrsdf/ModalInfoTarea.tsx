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
import CloseIcon from '@mui/icons-material/Close';
import { useContext } from 'react';
import { ModalAndLoadingContext } from '../../../../../../../../../context/GeneralContext';
import { Title } from '../../../../../../../../../components';
import { useAppSelector } from '../../../../../../../../../hooks';

export const ModalInfoTarea = (): JSX.Element => {
  const {
    // eslint-disable-next-line no-unused-vars
    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas,
  } = useAppSelector((state) => state.BandejaTareasSlice);

  const { thirdLoading, handleThirdLoading } = useContext(
    ModalAndLoadingContext
  );
  return (
    <>
      <Dialog
        fullWidth
        maxWidth="md"
        open={thirdLoading}
        onClose={() => {
          handleThirdLoading(false);
        }}
      >
        <Box component="form">
          <DialogTitle>
            <Title title="Información resumida de la tarea seleccionada" />
          </DialogTitle>
          <Divider />

          <DialogContent
            sx={{
              mt: '1.2rem',
              mb: '1.2rem',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '1rem',
                  mb: '1rem',
                }}
              >
                <TextField
                  fullWidth
                  label="Asignado para:"
                  disabled
                  size="small"
                  variant="outlined"
                  value={
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.asignado_para ??
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 50 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '1rem',
                  mb: '1rem',
                }}
              >
                <TextField
                  fullWidth
                  disabled
                  type="text"
                  label="Asignado por:"
                  size="small"
                  variant="outlined"
                  //* se debe poner la condicional del reset
                  value={
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.asignado_por ??
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '1rem',
                  mb: '1rem',
                }}
              >
                <TextField
                  fullWidth
                  disabled
                  label="radicado"
                  size="small"
                  variant="outlined"
                  value={
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.radicado ||
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  mt: '1rem',
                  mb: '1rem',
                  zIndex: 5,
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  label="Estado de la tarea"
                  size="small"
                  variant="outlined"
                  value={
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.estado_tarea?.toUpperCase() ??
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
                />
              </Grid>

              {currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tipo_tarea !==
                'RESPONDER OTRO' ? (
                <>
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      mt: '1rem',
                      mb: '1rem',
                    }}
                  >
                    <TextField
                      disabled
                      fullWidth
                      label="Días para respuesta / Tiempo de respuesta"
                      size="small"
                      variant="outlined"
                      value={
                        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.dias_para_respuesta ??
                        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.tiempo_respuesta ??
                        'N/A'
                      }
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ maxLength: 50 }}
                    />
                  </Grid>

                  <Grid
                    item
                    xs={12}
                    sm={6}
                    sx={{
                      mt: '1rem',
                      mb: '1rem',
                    }}
                  >
                    <TextField
                      disabled
                      fullWidth
                      label="¿Tiene requerimientos pendientes por respuesta?"
                      size="small"
                      variant="outlined"
                      value={
                        currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.requerimientos_pendientes_respuesta
                          ? 'SI'
                          : 'N/A'
                      }
                      InputLabelProps={{ shrink: true }}
                      inputProps={{ maxLength: 255 }}
                    />
                  </Grid>
                </>
              ): (<></>)}

              {/*TERCER FILA DE INFORMACIÓN*/}

              <Grid
                item
                xs={12}
                sm={12}
                sx={{
                  mt: '1rem',
                  mb: '1rem',
                }}
              >
                <TextField
                  disabled
                  fullWidth
                  multiline
                  rows={5}
                  label="Comentario de asignacion"
                  size="small"
                  variant="outlined"
                  value={
                    currentElementBandejaTareasPqrsdfYTramitesYOtrosYOpas?.comentario_asignacion ??
                    'N/A'
                  }
                  InputLabelProps={{ shrink: true }}
                  inputProps={{ maxLength: 255 }}
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
                variant="contained"
                onClick={() => {
                  handleThirdLoading(false);
                  // setInfoDenuncia(null);
                }}
                startIcon={<CloseIcon />}
              >
                CERRAR MODAL
              </Button>
            </Stack>
          </DialogActions>
        </Box>
      </Dialog>
    </>
  );
};

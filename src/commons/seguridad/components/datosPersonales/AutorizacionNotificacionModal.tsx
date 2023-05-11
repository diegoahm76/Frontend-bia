import { type Dispatch, type SetStateAction } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  Select,
  Stack,
  TextField,
} from '@mui/material';

interface Iprops {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const AutorizacionNotificacionModal = ({
  is_modal_active,
  set_is_modal_active,
}: Iprops) => {
  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={is_modal_active}
      onClose={() => {
        set_is_modal_active(false);
      }}
    >
      <DialogTitle>Cambiar Autorizacion de notificiación</DialogTitle>
      <DialogContent>
        <DialogContentText
          component={'span'}
          id="alert-dialog-slide-description"
        >
          <Box
            component="form"
            sx={{ mt: '20px' }}
            noValidate
            autoComplete="off"
          >
            <Grid container>
              <Grid item container spacing={2} xs={12} sm={4}>
                <Grid item xs={12} sm={12}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel>¿Autoriza?</InputLabel>
                    <Select label="¿Autoriza?" required>
                      {/* //! TODO: REALIZAR EL SETEO DEL SELECT */}
                    </Select>
                    <FormHelperText>
                      Autoriza notificaciones judiciales por correo electronico
                    </FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                  <FormControl required size="small" fullWidth>
                    <InputLabel>¿Autoriza?</InputLabel>
                    <Select label="¿Autoriza?" required>
                      {/* //! TODO: REALIZAR EL SETEO DEL SELECT */}
                    </Select>
                    <FormHelperText>
                      Autoriza notificaciones informativas a traves de mensajes
                      de texto
                    </FormHelperText>
                  </FormControl>
                </Grid>
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                sx={{
                  pl: '150px',
                  pt: '50px',
                }}
              >
                <TextField
                  helperText="Fecha cambio del sistema"
                  type="date"
                  size="small"
                  fullWidth
                />
              </Grid>
            </Grid>

            <Stack justifyContent="center" direction="row" spacing={2}>
              <Button color="success" variant="contained">
                Aceptar
              </Button>
              <Button
                color="error"
                variant="contained"
                onClick={() => {
                  set_is_modal_active(false);
                }}
              >
                Salir
              </Button>
            </Stack>
          </Box>
        </DialogContentText>
      </DialogContent>
    </Dialog>
  );
};

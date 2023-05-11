import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { type SetStateAction, type Dispatch } from 'react';

interface Iprops {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/explicit-function-return-type
export const CambioContrasenaModal = ({
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
      <DialogTitle>Cambiar contraseña</DialogTitle>
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
                  <TextField
                    type="password"
                    label="Nueva contraseña"
                    helperText="Ingrese la nueva contraseña"
                    size="small"
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    type="password"
                    label="Confirmar contraseña"
                    helperText="Ingrese de nuevo la contraseña"
                    size="small"
                    fullWidth
                  />
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ pl: '150px' }}>
                <Typography variant="h6">
                  Criterios de establecimiento de contraseña
                </Typography>
                <Typography>
                  La contraseña debe tener al menos una letra mayúscula.
                </Typography>
                <Typography>
                  La contraseña debe tener al menos un número.
                </Typography>
                <Typography>
                  La contraseña debe tener al menos un carácter especial.
                </Typography>
              </Grid>
            </Grid>
            <Stack
              sx={{
                display: 'flex',
                flexDirection: 'row',
                p: '20px',
              }}
            >
              <Button sx={{ mr: '400px' }} color="warning" variant="contained">
                Cambiar contraseña
              </Button>
              <Button
                sx={{ mt: '20px' }}
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

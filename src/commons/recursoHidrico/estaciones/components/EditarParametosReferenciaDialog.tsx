import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputAdornment, TextField } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';
import { AcUnit } from '@mui/icons-material';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarParametosReferenciaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
    >
      <DialogTitle>Editar Parametros Referencia</DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <Box>
          <Grid container spacing={1} >
            <Grid item xs={12}>
              <TextField
                label="Frecuencia solicitud de datos"
                className="order-1 mt-3"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>

            <Grid item xs={12} sm={6} >
              <TextField
                label="Temperatura máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Temperatura mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AcUnit />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Humedad máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Humedad mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Presión Barometrica máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Presión Barometrica mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Velocidad del viento máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Velocidad del viento mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Dirección del viento máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Dirección del viento mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Precipitación máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Precipitación mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Luminosidad máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Luminosidad mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Nivel de Agua máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Nivel de Agua mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Velocidad del Agua máxima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
            <Grid item xs={12} sm={6} >
              <TextField
                label="Velocidad del Agua mínima"
                type="number"
                size="small"
                margin="dense"
                required
                autoFocus
                fullWidth

              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              onClick={handle_close}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Actializar
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>

  );
};

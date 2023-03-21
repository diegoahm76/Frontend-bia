import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { type Dispatch, type SetStateAction } from 'react';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarAlertaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {

  const handle_close = (): void => {
    set_is_modal_active(false);
  }
  const tipo_estacion = [
    {
      value: 'TMP',
      label: 'Temperatura'
    },
    {
      value: 'HUR',
      label: 'Humedad',
    },
    {
      value: 'PRB',
      label: 'Presion barometrica'
    },
    {
      value: 'VDV',
      label: 'Velocidad del viento',
    },
    {
      value: 'DDV',
      label: 'Direccion del viento'
    },
    {
      value: 'PCT',
      label: 'Precipitacion',
    },
    {
      value: 'LMN',
      label: 'Luminosidad'
    },
    {
      value: 'NDA',
      label: 'Nivel del agua',
    },
    {
      value: 'VDA',
      label: 'velocidad del agua',
    },
  ]
  return (
    <Dialog open={is_modal_active}
      onClose={handle_close}
      maxWidth="xs">
      <Box component="form">
        <DialogTitle>Editar Configuracion Alerta Estación</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Nombre Variable"
                select
                fullWidth
              >
                {tipo_estacion.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensaje Maximo"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensaje Minimo"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Mensaje estable"
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Frecuencia de alerta"
                type="number"
                fullWidth
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handle_close}>Cancelar</Button>
          <Button variant="contained" color="primary">Actualizar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

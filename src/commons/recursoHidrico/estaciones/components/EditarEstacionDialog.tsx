/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Select from 'react-select/dist/declarations/src/Select';
import { control_error } from '../../../../helpers/controlError';
import { consultar_estaciones } from '../../requets/Request';
import { type Estaciones } from '../interfaces/interfaces';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

const edit_model_estacion = {
  nombre_estacion: "",
  cod_tipo_estacion: "",
  latitud: 0,
  longitud: 0,
  cod_municipio: "",
  indicaciones_ubicacion: "",
};
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarEstacionDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active }) => {

  const estacion = async (): Promise<void> => {
    try {
      const response = await consultar_estaciones();
      const new_estacion = response.map((estaciones: Estaciones) => ({

        id_estacion: estaciones.id_estacion,
        fecha_modificacion: estaciones.fecha_modificacion,
        nombre_estacion: estaciones.nombre_estacion,
        cod_tipo_estacion: estaciones.cod_tipo_estacion,
        latitud: estaciones.latitud,
        longitud: estaciones.longitud,
        indicaciones_ubicacion: estaciones.indicaciones_ubicacion,
        fecha_modificacion_coordenadas: estaciones.fecha_modificacion_coordenadas,
        id_persona_modifica: estaciones.id_persona_modifica,

      }))

    } catch (err) {
      control_error(err);
    }
  };

  useEffect(() => {
    void estacion()
  }, []);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }
  const {
    handleSubmit,
    formState: { errors },
  } = useForm();

  const tipo_estacion = [
    {
      value: 'AG',
      label: 'Agua'
    },
    {
      value: 'AI',
      label: 'Aire',
    },
  ]
  return (
    <Dialog open={is_modal_active}
      onClose={handle_close}
      maxWidth="xs">
      <Box component="form">
        <DialogTitle>Editar Estación</DialogTitle>
        <Divider />
        <DialogContent sx={{ mb: '0px' }}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <TextField
                label="Nombre Estación"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Tipo de Estación"
                select
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
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
                label="Latitud"
                type="number"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Longitud"
                type="number"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Municipio"
                type="text"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Indicaciones de Ubicación"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handle_close}>Cancelar</Button>
          <Button variant="contained" color="primary" >Actualizar</Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}

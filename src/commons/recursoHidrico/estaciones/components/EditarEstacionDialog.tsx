/* eslint-disable @typescript-eslint/no-misused-promises */

import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, MenuItem, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction } from 'react';
import { useForm } from 'react-hook-form';
import { control_error } from '../../../../helpers/controlError';
import { control_success, editar_estacion } from '../../requets/Request';
import { municipios_meta, type IEstacionEstaciones } from '../interfaces/interfaces';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  estacion_editado: any;
  set_estacion_editado: Dispatch<SetStateAction<any>>;
  estacion: () => Promise<void>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarEstacionDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, estacion_editado, set_estacion_editado, estacion }) => {

  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm<IEstacionEstaciones>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (is_modal_active && estacion_editado) {
      reset(estacion_editado);
    }
  }, [is_modal_active, estacion_editado, reset]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }

  const on_submit = async (data: IEstacionEstaciones): Promise<any> => {
    try {
      const datos_estacion = {

        nombre_estacion: data.nombre_estacion,
        cod_tipo_estacion: data.cod_tipo_estacion,
        latitud: data.latitud,
        longitud: data.longitud,
        cod_municipio: data.cod_municipio,
        indicaciones_ubicacion: data.indicaciones_ubicacion,
      };
      await editar_estacion(estacion_editado.id_estacion, datos_estacion);
      set_estacion_editado(null);
      set_is_modal_active(false);
      control_success('La estación se actualizó correctamente')
      void estacion()
      reset();
    } catch (error) {
      control_error(error);
    }
  };

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
      <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
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
                defaultValue={estacion_editado?.nombre_estacion}
                {...register("nombre_estacion", {
                  required: true,
                  pattern: /^[a-zA-Z\s]{3,30}$/
                })}
                error={Boolean(errors.nombre_estacion)}
                helperText={
                  (errors.nombre_estacion?.type === "required") ? "Este campo es obligatorio" :
                    (errors.nombre_estacion?.type === "pattern") ? "El nombre debe tener de 3 a 30 caracteres y solo letras mayúsculas o minúsculas" : ""
                }
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
                defaultValue={estacion_editado?.cod_tipo_estacion}
                {...register("cod_tipo_estacion", { required: true })}
                error={Boolean(errors.cod_tipo_estacion)}
                helperText={(errors.cod_tipo_estacion != null) ? "Este campo es obligatorio" : ""}
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
                defaultValue={estacion_editado?.latitud}
                {...register("latitud", { required: true })}
                error={Boolean(errors.latitud)}
                helperText={(errors.latitud != null) ? "Este campo es obligatorio" : ""}
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
                defaultValue={estacion_editado?.longitud}
                {...register("longitud", { required: true })}
                error={Boolean(errors.longitud)}
                helperText={(errors.longitud != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Municipio"
                select
                type="text"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={estacion_editado?.cod_municipio}
                {...register("cod_municipio", { required: true })}
                error={Boolean(errors.cod_municipio)}
                helperText={(errors.cod_municipio != null) ? "Este campo es obligatorio" : ""}
              >
                {municipios_meta.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Indicaciones de Ubicación"
                fullWidth
                size="small"
                margin="dense"
                required
                autoFocus
                defaultValue={estacion_editado?.indicaciones_ubicacion}
                {...register("indicaciones_ubicacion", {
                  required: true,
                  maxLength: 250
                })}
                inputProps={{ maxLength: 250 }}
                error={Boolean(errors.indicaciones_ubicacion)}
                helperText={(errors.indicaciones_ubicacion != null) ? "Este campo es obligatorio" : ""}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {
            handle_close();
            reset();
          }}>Cancelar</Button>
          <Button variant="contained" color="primary" type='submit' >ACTUALIZAR</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

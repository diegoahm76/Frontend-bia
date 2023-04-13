/* eslint-disable @typescript-eslint/no-misused-promises */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, InputAdornment, TextField } from '@mui/material';
import type React from 'react';
import { useEffect, type Dispatch, type SetStateAction } from 'react';

import { useForm } from 'react-hook-form';
import { type ParametrosEditar } from '../interfaces/interfaces';
import { control_success, editar_parametro } from '../../requets/Request';
import { control_error } from '../../../../helpers/controlError';
import { AirplanemodeActive, AirplanemodeInactive, Bloodtype, BloodtypeOutlined, Compress, Expand, FlightLand, FlightTakeoff, Grain, KitesurfingRounded, Lightbulb, LightbulbOutlined, PoolRounded, Thunderstorm, WaterOutlined, WavesRounded, WbSunny, WbSunnyOutlined } from '@mui/icons-material';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
  parametro_editado: any;
  set_parametro_editado: Dispatch<SetStateAction<any>>;
  parametros: () => Promise<void>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarParametosReferenciaDialog: React.FC<IProps> = ({ is_modal_active, set_is_modal_active, parametro_editado, set_parametro_editado, parametros,}) => {

  const {
    register,
    reset,
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    formState: { errors },
  } = useForm<ParametrosEditar>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (is_modal_active && parametro_editado) {
      reset(parametro_editado);
    }
  }, [is_modal_active, parametro_editado, reset]);

  const handle_close = (): void => {
    set_is_modal_active(false);
  }
  const on_submit = async (data: ParametrosEditar): Promise<any> => {
    try {
      const datos_parametro = {

        frecuencia_solicitud_datos: data.frecuencia_solicitud_datos,
        temperatura_ambiente_max: data.temperatura_ambiente_max,
        temperatura_ambiente_min: data.temperatura_ambiente_min,
        humedad_ambiente_max: data.humedad_ambiente_max,
        humedad_ambiente_min: data.humedad_ambiente_min,
        presion_barometrica_max: data.presion_barometrica_max,
        presion_barometrica_min: data.presion_barometrica_min,
        velocidad_viento_max: data.velocidad_viento_max,
        velocidad_viento_min: data.velocidad_viento_min,
        direccion_viento_max: data.direccion_viento_max,
        direccion_viento_min: data.direccion_viento_min,
        precipitacion_max: data.precipitacion_max,
        precipitacion_min: data.precipitacion_min,
        luminosidad_max: data.luminosidad_max,
        luminosidad_min: data.luminosidad_min,
        nivel_agua_max: data.nivel_agua_max,
        nivel_agua_min: data.nivel_agua_min,
        velocidad_agua_max: data.velocidad_agua_max,
        velocidad_agua_min: data.velocidad_agua_min,

      };
      await editar_parametro(parametro_editado.id_parametro_referencia, datos_parametro);
      set_parametro_editado(null);
      set_is_modal_active(false);
      control_success('El parametro se actualizó correctamente')
      void parametros()
      reset()
    } catch (error) {
      control_error(error);
    }
  };
  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
    >
      <DialogTitle>Editar Parametros Referencia</DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form onSubmit={handleSubmit(on_submit)} noValidate autoComplete="off">
          <Grid container spacing={1} >
          <Grid item xs={12}>
              <TextField
                className="order-1 mt-3"
                type="text"
                size="small"
                margin="dense"
                fullWidth
                value={parametro_editado?.nombre_estacion}
                disabled
              />
            </Grid>
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
                defaultValue={parametro_editado?.frecuencia_solicitud_datos}
                {...register("frecuencia_solicitud_datos", {
                  required: true,
                  min: 1,
                  max: 15,
                  pattern: /^[1-9]{1}$|^[1-9]{1}[0-5]{1}$/
                })}
                error={Boolean(errors.frecuencia_solicitud_datos)}
                helperText={
                  (errors.frecuencia_solicitud_datos?.type === "required") ? "Este campo es obligatorio" :
                    (errors.frecuencia_solicitud_datos?.type === "min" || errors.frecuencia_solicitud_datos?.type === "max" || errors.frecuencia_solicitud_datos?.type === "pattern") ? "Debe ingresar un número entero entre 1 y 15" : ""
                }
                inputProps={{
                  step: "1",
                  min: "1",
                  max: "15",
                  pattern: "^[1-9]{1}$|^[1-9]{1}[0-5]{1}$"
                }}
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
                defaultValue={parametro_editado?.temperatura_ambiente_max}
                {...register("temperatura_ambiente_max", { required: true })}
                error={Boolean(errors.temperatura_ambiente_max)}
                helperText={(errors.temperatura_ambiente_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <WbSunny />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.temperatura_ambiente_min}
                {...register("temperatura_ambiente_min", { required: true })}
                error={Boolean(errors.temperatura_ambiente_min)}
                helperText={(errors.temperatura_ambiente_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <WbSunnyOutlined />
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
                defaultValue={parametro_editado?.humedad_ambiente_max}
                {...register("humedad_ambiente_max", { required: true })}
                error={Boolean(errors.humedad_ambiente_max)}
                helperText={(errors.humedad_ambiente_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Bloodtype />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.humedad_ambiente_min}
                {...register("humedad_ambiente_min", { required: true })}
                error={Boolean(errors.humedad_ambiente_min)}
                helperText={(errors.humedad_ambiente_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <BloodtypeOutlined />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.presion_barometrica_max}
                {...register("presion_barometrica_max", { required: true })}
                error={Boolean(errors.presion_barometrica_max)}
                helperText={(errors.presion_barometrica_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Expand />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.presion_barometrica_min}
                {...register("presion_barometrica_min", { required: true })}
                error={Boolean(errors.presion_barometrica_min)}
                helperText={(errors.presion_barometrica_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Compress />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.velocidad_viento_max}
                {...register("velocidad_viento_max", { required: true })}
                error={Boolean(errors.velocidad_viento_max)}
                helperText={(errors.velocidad_viento_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AirplanemodeActive />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.velocidad_viento_min}
                {...register("velocidad_viento_min", { required: true })}
                error={Boolean(errors.velocidad_viento_min)}
                helperText={(errors.velocidad_viento_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <AirplanemodeInactive />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.direccion_viento_max}
                {...register("direccion_viento_max", { required: true })}
                error={Boolean(errors.direccion_viento_max)}
                helperText={(errors.direccion_viento_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FlightTakeoff />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.direccion_viento_min}
                {...register("direccion_viento_min", { required: true })}
                error={Boolean(errors.direccion_viento_min)}
                helperText={(errors.direccion_viento_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <FlightLand />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.precipitacion_max}
                {...register("precipitacion_max", { required: true })}
                error={Boolean(errors.precipitacion_max)}
                helperText={(errors.precipitacion_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Thunderstorm />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.precipitacion_min}
                {...register("precipitacion_min", { required: true })}
                error={Boolean(errors.precipitacion_min)}
                helperText={(errors.precipitacion_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Grain />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.luminosidad_max}
                {...register("luminosidad_max", { required: true })}
                error={Boolean(errors.luminosidad_max)}
                helperText={(errors.luminosidad_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Lightbulb />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.luminosidad_min}
                {...register("luminosidad_min", { required: true })}
                error={Boolean(errors.luminosidad_min)}
                helperText={(errors.luminosidad_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <LightbulbOutlined />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.nivel_agua_max}
                {...register("nivel_agua_max", { required: true })}
                error={Boolean(errors.nivel_agua_max)}
                helperText={(errors.nivel_agua_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <WavesRounded />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.nivel_agua_min}
                {...register("nivel_agua_min", { required: true })}
                error={Boolean(errors.nivel_agua_min)}
                helperText={(errors.nivel_agua_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <WaterOutlined />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.velocidad_agua_max}
                {...register("velocidad_agua_max", { required: true })}
                error={Boolean(errors.velocidad_agua_max)}
                helperText={(errors.velocidad_agua_max != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <KitesurfingRounded />
                    </InputAdornment>
                  )
                }}
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
                defaultValue={parametro_editado?.velocidad_agua_min}
                {...register("velocidad_agua_min", { required: true })}
                error={Boolean(errors.velocidad_agua_min)}
                helperText={(errors.velocidad_agua_min != null) ? "Este campo es obligatorio" : ""}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <PoolRounded />
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button
              variant="text"
              color="primary"
              onClick={() => {
                handle_close();
                reset();
            }}
            >
              Cancelar
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Actializar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>

  );
};

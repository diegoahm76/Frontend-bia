/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import dayjs from 'dayjs';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, TextField, Tooltip, Typography } from "@mui/material";
import { Title } from "../../../../components/Title";
import { Controller } from "react-hook-form";
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";
import { LoadingButton } from "@mui/lab";
import { useActividadHook } from "../hooks/UseActividadHook";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarActividadPgar: React.FC = () => {
    const {
      control_actividad,
      errors_actividad,
      reset_actividad,
      data_watch_actividad,
      register_actividad,
      set_value_actividad,

      onsubmit_actividad,
      onsubmit_editar,
      is_saving_actividad,

      limpiar_formulario_actividad,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    } = useActividadHook();


    const dispatch = useAppDispatch();

    const { mode, actividad_pgar } = useAppSelector((state) => state.planes);

    useEffect(() => {
      if (mode.crear) {
        limpiar_formulario_actividad();
      }
      if (mode.editar) {
        set_value_actividad(
          'fecha_creacion',
          dayjs(actividad_pgar.fecha_creacion).format('YYYY-MM-DD')
        );
        set_fecha_creacion(actividad_pgar.fecha_creacion);
        reset_actividad({
            nombre_actividad: actividad_pgar.nombre_actividad,
            numero_actividad: actividad_pgar.numero_actividad,
            nombre_plan: actividad_pgar.nombre_plan,
            nombre_objetivo: actividad_pgar.nombre_objetivo,
            nombre_eje_estrategico: actividad_pgar.nombre_eje_estrategico,
            nombre_meta: actividad_pgar.nombre_meta,
            nombre_linea_base: actividad_pgar.nombre_linea_base,
            id_linea_base: actividad_pgar.id_linea_base,
            id_eje_estrategico: actividad_pgar.id_eje_estrategico,
            id_meta_eje: actividad_pgar.id_meta_eje,
            id_plan: actividad_pgar.id_plan,
            id_objetivo: actividad_pgar.id_objetivo,
            fecha_creacion: actividad_pgar.fecha_creacion,
            cumplio: actividad_pgar.cumplio,
        });
      }
    }, [mode, actividad_pgar]);


    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (mode.crear) {
              onsubmit_actividad();
            }
            if (mode.editar) {
              onsubmit_editar();
            }
          }}
        >
          <Grid
            container
            spacing={2}
            m={2}
            p={2}
            sx={{
              position: 'relative',
              background: '#FAFAFA',
              borderRadius: '15px',
              p: '20px',
              m: '10px 0 20px 0',
              mb: '20px',
              boxShadow: '0px 3px 6px #042F4A26',
            }}
          >
            <Grid item xs={12}>
              <Title title="Registro de Actividad" />
            </Grid>
            {mode.editar ? (
              <>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_plan"
                        control={control_actividad}
                        rules={{ required: false }}
                        render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre plan"
                            variant="outlined"
                            value={value}
                            disabled={true}
                            required={true}
                            onChange={onChange}
                        />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_objetivo"
                        control={control_actividad}
                        rules={{ required: false }}
                        render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre objetivo"
                            variant="outlined"
                            value={value}
                            disabled={true}
                            required={true}
                            onChange={onChange}
                        />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="nombre_eje_estrategico"
                    control={control_actividad}
                    rules={{ required: false }}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        fullWidth
                        size="small"
                        label="Nombre del Eje Estratégico"
                        variant="outlined"
                        value={value}
                        disabled={true}
                        required={true}
                        onChange={onChange}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_meta"
                        control={control_actividad}
                        rules={{ required: false }}
                        render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre meta"
                            variant="outlined"
                            value={value}
                            disabled={true}
                            required={true}
                            onChange={onChange}
                        />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_linea_base"
                        control={control_actividad}
                        rules={{ required: false }}
                        render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre línea base"
                            variant="outlined"
                            value={value}
                            disabled={true}
                            required={true}
                            onChange={onChange}
                        />
                        )}
                    />
                </Grid>
                <Grid item xs={12} sm={6}></Grid>
              </>
            ) : null}
            <Grid item xs={12} sm={6}>
              <Controller
                name="numero_actividad"
                control={control_actividad}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Número de la actividad"
                    variant="outlined"
                    multiline
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_actividad.numero_actividad}
                    helperText={
                      errors_actividad.numero_actividad
                        ? 'Es obligatorio ingresar un número de actividad'
                        : 'Ingrese un número de actividad'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nombre_actividad"
                control={control_actividad}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre de la actividad"
                    variant="outlined"
                    multiline
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_actividad.nombre_actividad}
                    helperText={
                      errors_actividad.nombre_actividad
                        ? 'Es obligatorio ingresar un nombre de actividad'
                        : 'Ingrese un nombre de actividad'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
              <Controller
                name="cumplio"
                control={control_actividad}
                rules={{
                  required: data_watch_actividad.cumplio
                    ? 'Este campo es requerido'
                    : false,
                }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormControl>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={value}
                          onChange={(e) => {
                            onChange(e.target.checked);
                          }}
                          // name="checkedB"
                          color="primary"
                        />
                      }
                      label={
                        value ? (
                          <Typography variant="body2">
                            <strong>Actividad cumplida</strong>
                            <Tooltip title="SI" placement="right">
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'green',
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        ) : (
                          <Typography variant="body2">
                            <strong>Actividad no cumplida</strong>
                            <Tooltip title="No" placement="right">
                              <InfoIcon
                                sx={{
                                  width: '1.2rem',
                                  height: '1.2rem',
                                  ml: '0.5rem',
                                  color: 'orange',
                                }}
                              />
                            </Tooltip>
                          </Typography>
                        )
                      }
                    />
                  </FormControl>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label="Fecha de creación *"
                  value={fecha_creacion}
                  onChange={(value) => {
                    handle_change_fecha_creacion(value);
                  }}
                  renderInput={(params: any) => (
                    <TextField
                      {...params}
                      fullWidth
                      size="small"
                      {...register_actividad('fecha_creacion', {
                        required: true,
                      })}
                      error={!!errors_actividad.fecha_creacion}
                      helperText={
                        errors_actividad.fecha_creacion
                          ? 'Es obligatorio la fecha de creacion de la meta'
                          : 'Elige una fecha'
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid container spacing={2} justifyContent="flex-end" mt={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  disabled={false}
                  onClick={() => {
                    limpiar_formulario_actividad();
                    dispatch(
                      set_current_mode_planes({
                        ver: true,
                        crear: false,
                        editar: false,
                      })
                    );
                  }}
                >
                  Cerrar
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  color="warning"
                  disabled={false}
                  onClick={() => {
                    limpiar_formulario_actividad();
                    dispatch(
                      set_current_mode_planes({
                        ver: true,
                        crear: true,
                        editar: false,
                      })
                    );
                  }}
                >
                  Limpiar
                </Button>
              </Grid>
              <Grid item>
                <LoadingButton
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={is_saving_actividad}
                  startIcon={<SaveIcon />}
                  loading={is_saving_actividad}
                >
                  {mode.editar ? 'Actualizar' : 'Guardar'}
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </>
    );
  };

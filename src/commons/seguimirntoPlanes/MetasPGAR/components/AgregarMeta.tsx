/* eslint-disable @typescript-eslint/naming-convention */

import { useEffect } from "react";
import { useMetapgarHook } from "../hooks/UseMetapgarHook";
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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarMetaPgar: React.FC = () => {
    const {
      control_meta,
      errors_meta,
      reset_meta,
      data_watch_meta,
      register_meta,
      set_value_meta,

      onsubmit_meta,
      onsubmit_editar,
      is_saving_meta,

      limpiar_formulario_meta,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    } = useMetapgarHook();


    const dispatch = useAppDispatch();

    const { mode, meta_pgar } = useAppSelector((state) => state.planes);

    useEffect(() => {
      if (mode.crear) {
        limpiar_formulario_meta();
      }
      if (mode.editar) {
        set_value_meta(
          'fecha_creacion',
          dayjs(meta_pgar.fecha_creacion).format('YYYY-MM-DD')
        );
        set_fecha_creacion(meta_pgar.fecha_creacion);
        reset_meta({
            nombre_plan: meta_pgar.nombre_plan_objetivo,
            nombre_eje_estrategico: meta_pgar.nombre_eje_estrategico,
            nombre_objetivo: meta_pgar.nombre_objetivo,
            tipo_eje_estrategico: meta_pgar.tipo_eje_estrategico,
            nombre_plan_objetivo: meta_pgar.nombre_plan_objetivo,
            nombre_meta_eje: meta_pgar.nombre_meta_eje,
            numero_meta_eje: meta_pgar.numero_meta_eje,
            id_eje_estrategico: meta_pgar.id_eje_estrategico,
            id_plan: meta_pgar.id_plan,
            id_objetivo: meta_pgar.id_objetivo,
            fecha_creacion: meta_pgar.fecha_creacion,
            cumplio: meta_pgar.cumplio,
        });
      }
    }, [mode, meta_pgar]);


    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (mode.crear) {
              onsubmit_meta();
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
              <Title title="Registro de Metas PGAR" />
            </Grid>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_plan"
                        control={control_meta}
                        rules={{ required: false }}
                        render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre del Plan"
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
                    control={control_meta}
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
                name="numero_meta_eje"
                control={control_meta}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Número meta"
                    variant="outlined"
                    multiline
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_meta.numero_meta_eje}
                    helperText={
                      errors_meta.numero_meta_eje
                        ? 'Es obligatorio ingresar un número de meta'
                        : 'Ingrese un número de meta'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nombre_meta_eje"
                control={control_meta}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre meta PGAR"
                    variant="outlined"
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_meta.nombre_meta_eje}
                    helperText={
                      errors_meta.nombre_meta_eje
                        ? 'Es obligatorio ingresar un nombre de meta'
                        : 'Ingrese un nombre de meta'
                    }
                  />
                )}
              />
            </Grid>
            <Grid
              item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Controller
                name="cumplio"
                control={control_meta}
                // defaultValue=""
                rules={{
                  required: data_watch_meta.cumplio
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
                            <strong>Meta cumplida</strong>
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
                            <strong>Meta no cumplida</strong>
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
                      {...register_meta('fecha_creacion', {
                        required: true,
                      })}
                      error={!!errors_meta.fecha_creacion}
                      helperText={
                        errors_meta.fecha_creacion
                          ? 'Es obligatorio la fecha de creacion de la meta'
                          : 'Ingrese una fecha'
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
                    limpiar_formulario_meta();
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
                    limpiar_formulario_meta();
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
                  disabled={is_saving_meta}
                  startIcon={<SaveIcon />}
                  loading={is_saving_meta}
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

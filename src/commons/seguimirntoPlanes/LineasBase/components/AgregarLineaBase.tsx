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
import { useLineaBaseHook } from "../hooks/UseLineaBaseHook";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarLineaBase: React.FC = () => {
    const {
      control_linea,
      errors_linea,
      reset_linea,
      data_watch_linea,
      register_linea,
      set_value_linea,

      onsubmit_linea,
      onsubmit_editar,
      is_saving_linea,

      limpiar_formulario_linea,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    } = useLineaBaseHook();


    const dispatch = useAppDispatch();

    const { mode, linea_base } = useAppSelector((state) => state.planes);

    useEffect(() => {
      if (mode.crear) {
        limpiar_formulario_linea();
      }
      if (mode.editar) {
        set_value_linea(
          'fecha_creacion',
          dayjs(linea_base.fecha_creacion).format('YYYY-MM-DD')
        );
        set_fecha_creacion(linea_base.fecha_creacion);
        reset_linea({
            nombre_plan: linea_base.nombre_plan,
            nombre_eje_estrategico: linea_base.nombre_eje_estrategico,
            nombre_objetivo: linea_base.nombre_objetivo,
            nombre_meta: linea_base.nombre_meta,
            tipo_eje_estrategico: linea_base.tipo_eje_estrategico,
            nombre_linea_base: linea_base.nombre_linea_base,
            fecha_creacion: linea_base.fecha_creacion,
            cumplio: linea_base.cumplio,
            id_eje_estrategico: linea_base.id_eje_estrategico,
            id_meta_eje: linea_base.id_meta_eje,
            id_plan: linea_base.id_plan,
            id_objetivo: linea_base.id_objetivo,
        });
      }
    }, [mode, linea_base]);


    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (mode.crear) {
              onsubmit_linea();
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
              <Title title="Registro de Linea Base" />
            </Grid>
            {mode.editar ? (
              <>
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_meta"
                        control={control_linea}
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
                    name="nombre_eje_estrategico"
                    control={control_linea}
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
              </>
            ) : null}
            <Grid item xs={12} sm={6}>
              <Controller
                name="nombre_linea_base"
                control={control_linea}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre linea base"
                    variant="outlined"
                    multiline
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_linea.nombre_linea_base}
                    helperText={
                      errors_linea.nombre_linea_base
                        ? 'Es obligatorio ingresar un nombre de linea base'
                        : 'Ingrese un nombre de linea base'
                    }
                  />
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
                      {...register_linea('fecha_creacion', {
                        required: true,
                      })}
                      error={!!errors_linea.fecha_creacion}
                      helperText={
                        errors_linea.fecha_creacion
                          ? 'Es obligatorio la fecha de creacion de la linea base'
                          : 'Elige una fecha'
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Controller
                name="cumplio"
                control={control_linea}
                rules={{
                  required: data_watch_linea.cumplio
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
                            <strong>Línea base cumplida</strong>
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
                            <strong>Línea base no cumplida</strong>
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
            <Grid container spacing={2} justifyContent="flex-end" mt={1}>
              <Grid item>
                <Button
                  variant="contained"
                  color="error"
                  disabled={false}
                  onClick={() => {
                    limpiar_formulario_linea();
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
                    limpiar_formulario_linea();
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
                  disabled={is_saving_linea}
                  startIcon={<SaveIcon />}
                  loading={is_saving_linea}
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

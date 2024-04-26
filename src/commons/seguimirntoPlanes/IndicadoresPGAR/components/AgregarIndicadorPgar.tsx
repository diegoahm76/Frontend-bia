/* eslint-disable @typescript-eslint/naming-convention */

import { useContext, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../hooks";
import dayjs from 'dayjs';
import { Button, Checkbox, FormControl, FormControlLabel, Grid, MenuItem, TextField, Tooltip, Typography } from "@mui/material";
import { Title } from "../../../../components/Title";
import { Controller } from "react-hook-form";
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { set_current_mode_planes } from "../../store/slice/indexPlanes";
import { LoadingButton } from "@mui/lab";
import { useIndicadorPgarHook } from "../hooks/UseIndicadorHook";
import { tipo_indicador, tipo_medida } from "../choices/selects";
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarIndicadorPgar: React.FC = () => {
    const {
      control_indicador,
      errors_indicador,
      reset_indicador,
      data_watch_indicador,
      register_indicador,
      set_value_indicador,

      onsubmit_indicador,
      onsubmit_editar,
      is_saving_indicador,

      limpiar_formulario_indicador,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    } = useIndicadorPgarHook();


    const dispatch = useAppDispatch();
    const {data_mediciones, data_unidades_organizacionales, fetch_data_mediciones, fetch_data_unidades} = useContext(DataContextPgar)
    const { mode, indicador_pgar } = useAppSelector((state) => state.planes);

    useEffect(() => {
      fetch_data_mediciones();
      fetch_data_unidades();
    }, []);

    useEffect(() => {
      if (mode.crear) {
        limpiar_formulario_indicador();
      }
      if (mode.editar) {
        set_value_indicador(
          'fecha_creacion',
          dayjs(indicador_pgar.fecha_creacion).format('YYYY-MM-DD')
        );
        set_fecha_creacion(indicador_pgar.fecha_creacion);
        reset_indicador({
            nombre_indicador: indicador_pgar.nombre_indicador,
            numero_indicador: indicador_pgar.numero_indicador,
            medida: indicador_pgar.medida,
            tipo_indicador: indicador_pgar.tipo_indicador,
            nombre_actividad: indicador_pgar.nombre_actividad,
            nombre_plan: indicador_pgar.nombre_plan,
            nombre_eje_estrategico: indicador_pgar.nombre_eje_estrategico,
            nombre_meta: indicador_pgar.nombre_meta,
            nombre_linea_base: indicador_pgar.nombre_linea_base,
            entidad_responsable: indicador_pgar.entidad_responsable,
            id_medicion: indicador_pgar.id_medicion,
            id_linea_base: indicador_pgar.id_linea_base,
            id_objetivo: indicador_pgar.id_objetivo,
            id_unidad_organizacional: indicador_pgar.id_unidad_organizacional,
            fecha_creacion: indicador_pgar.fecha_creacion,
            cumplio: indicador_pgar.cumplio,
        });
      }
    }, [mode, indicador_pgar]);


    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (mode.crear) {
              onsubmit_indicador();
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
              <Title title="Registro de Indicador" />
            </Grid>
            {mode.editar ? (
              <>
                <Grid item xs={12} sm={6}>
                  <Controller
                    name="nombre_eje_estrategico"
                    control={control_indicador}
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
                        control={control_indicador}
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
                        control={control_indicador}
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
                <Grid item xs={12} sm={6}>
                    <Controller
                        name="nombre_actividad"
                        control={control_indicador}
                        rules={{ required: false }}
                        render={({ field: { onChange, value } }) => (
                        <TextField
                            fullWidth
                            size="small"
                            label="Nombre actividad"
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
            <Grid item xs={12} sm={6} md={7}>
              <Controller
                name="nombre_indicador"
                control={control_indicador}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre del indicador"
                    variant="outlined"
                    multiline
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_indicador.nombre_indicador}
                    helperText={
                      errors_indicador.nombre_indicador
                        ? 'Es obligatorio ingresar un nombre de indicador'
                        : 'Ingrese un nombre de indicador'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={5}>
              <Controller
                name="numero_indicador"
                control={control_indicador}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Número del indicador"
                    variant="outlined"
                    multiline
                    type={'number'}
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_indicador.numero_indicador}
                    helperText={
                      errors_indicador.numero_indicador
                        ? 'Es obligatorio ingresar un número de indicador'
                        : 'Ingrese un número de indicador'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_medicion"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de medición"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.id_medicion}
                  helperText={
                    errors_indicador.id_medicion
                      ? 'Es obligatorio ingresar un tipo de medición'
                      : 'Ingrese un tipo de medición'
                  }
                >
                  {data_mediciones.map((option) => (
                    <MenuItem key={option.id_medicion} value={option.id_medicion}>
                      {option.nombre_medicion}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
            <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="medida"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de medida"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.medida}
                  helperText={
                    errors_indicador.medida
                      ? 'Es obligatorio ingresar un tipo de medida'
                      : 'Ingrese un tipo de medida'
                  }
                >
                  {tipo_medida.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="tipo_indicador"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tipo de indicador"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.tipo_indicador}
                  helperText={
                    errors_indicador.tipo_indicador
                      ? 'Es obligatorio ingresar un tipo de indicador'
                      : 'Ingrese un tipo de indicador'
                  }
                >
                  {tipo_indicador.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Controller
              name="id_unidad_organizacional"
              control={control_indicador}
              defaultValue=""
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Unidad organizacional"
                  size="small"
                  margin="dense"
                  select
                  fullWidth
                  required={true}
                  error={!!errors_indicador.id_unidad_organizacional}
                  helperText={
                    errors_indicador.id_unidad_organizacional
                      ? 'Es obligatorio ingresar una unidad organizacional'
                      : 'Ingrese una unidad organizacional'
                  }
                >
                  {data_unidades_organizacionales.map((option) => (
                    <MenuItem key={option.id_unidad_organizacional} value={option.id_unidad_organizacional}>
                      {option.nombre}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8}>
              <Controller
                name="entidad_responsable"
                control={control_indicador}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Entidad Responsable"
                    variant="outlined"
                    multiline
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_indicador.entidad_responsable}
                    helperText={
                      errors_indicador.entidad_responsable
                        ? 'Es obligatorio ingresar una entidad responsable'
                        : 'Ingrese una entidad responsable'
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6} style={{ display: 'flex', justifyContent: 'center' }}>
              <Controller
                name="cumplio"
                control={control_indicador}
                rules={{
                  required: data_watch_indicador.cumplio
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
                            <strong>Indicador cumplido</strong>
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
                            <strong>Indicador no cumplido</strong>
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
                      {...register_indicador('fecha_creacion', {
                        required: true,
                      })}
                      error={!!errors_indicador.fecha_creacion}
                      helperText={
                        errors_indicador.fecha_creacion
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
                    limpiar_formulario_indicador();
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
                    limpiar_formulario_indicador();
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
                  disabled={is_saving_indicador}
                  startIcon={<SaveIcon />}
                  loading={is_saving_indicador}
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

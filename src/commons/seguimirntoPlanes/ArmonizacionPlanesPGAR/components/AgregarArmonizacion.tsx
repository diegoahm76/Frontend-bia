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
import { useArmonizacionHook } from "../hooks/UseArmonizacionHook";
import { DataContextPgar } from "../../SeguimientoPGAR/context/context";

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarArmonizacionPlanes: React.FC = () => {
    const {
      control_armonizacion,
      errors_armonizacion,
      reset_armonizacion,
      data_watch_armonizacion,
      register_armonizacion,
      set_value_armonizacion,

      onsubmit_armonizacion,
      onsubmit_editar,
      is_saving_armonizacion,

      limpiar_formulario_armonizacion,

      // fecha
      fecha_creacion,
      set_fecha_creacion,
      handle_change_fecha_creacion,
    } = useArmonizacionHook();


    const dispatch = useAppDispatch();
    const {data_planes_pai, data_planes_pgar, fetch_data_planes_pai, fetch_data_planes_pgar} = useContext(DataContextPgar)
    const { mode, armonizacion_pgar } = useAppSelector((state) => state.planes);

    useEffect(() => {
      fetch_data_planes_pai();
      fetch_data_planes_pgar();
    }, [])

    useEffect(() => {
      if (mode.crear) {
        limpiar_formulario_armonizacion();
      }
      if (mode.editar) {
        set_value_armonizacion(
          'fecha_creacion',
          dayjs(armonizacion_pgar.fecha_creacion).format('YYYY-MM-DD')
        );
        set_fecha_creacion(armonizacion_pgar.fecha_creacion);
        reset_armonizacion({
            nombre_relacion: armonizacion_pgar.nombre_relacion,
            id_planPGAR: armonizacion_pgar.id_planPGAR,
            id_planPAI: armonizacion_pgar.id_planPAI,
            fecha_creacion: armonizacion_pgar.fecha_creacion,
            estado: armonizacion_pgar.estado,
        });
      }
    }, [mode, armonizacion_pgar]);


    return (
      <>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (mode.crear) {
              onsubmit_armonizacion();
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
              <Title title="Registro de Armonización" />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="id_planPGAR"
                control={control_armonizacion}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Plan PGAR"
                    size="small"
                    margin="dense"
                    select
                    fullWidth
                    disabled={mode.editar ? true : false}
                    required={true}
                    error={!!errors_armonizacion.id_planPGAR}
                    helperText={
                      errors_armonizacion.id_planPGAR
                        ? 'Es obligatorio elegir un plan PGAR'
                        : 'Elija un plan PGAR'
                    }
                  >
                    {data_planes_pgar.map((option) => (
                      <MenuItem key={option.id_plan} value={option.id_plan}>
                        {option.nombre_plan}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="id_planPAI"
                control={control_armonizacion}
                defaultValue=""
                rules={{ required: true }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Plan PAI"
                    size="small"
                    margin="dense"
                    select
                    disabled={mode.editar ? true : false}
                    fullWidth
                    required={true}
                    error={!!errors_armonizacion.id_planPAI}
                    helperText={
                      errors_armonizacion.id_planPAI
                        ? 'Es obligatorio elegir un plan PAI'
                        : 'Elija un plan PAI'
                    }
                  >
                    {data_planes_pai.map((option) => (
                      <MenuItem key={option.id_plan} value={option.id_plan}>
                        {option.nombre_plan}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="nombre_relacion"
                control={control_armonizacion}
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    fullWidth
                    size="small"
                    label="Nombre armonización"
                    variant="outlined"
                    multiline
                    value={value}
                    disabled={false}
                    required={true}
                    onChange={onChange}
                    error={!!errors_armonizacion.nombre_relacion}
                    helperText={
                      errors_armonizacion.nombre_relacion
                        ? 'Es obligatorio ingresar un nombre de armonización'
                        : 'Ingrese un nombre de armonización'
                    }
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
                      {...register_armonizacion('fecha_creacion', {
                        required: true,
                      })}
                      error={!!errors_armonizacion.fecha_creacion}
                      helperText={
                        errors_armonizacion.fecha_creacion
                          ? 'Es obligatorio la fecha de creacion de la meta'
                          : 'Elige una fecha'
                      }
                    />
                  )}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Controller
                name="estado"
                control={control_armonizacion}
                rules={{
                  required: data_watch_armonizacion.estado
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
                          color="primary"
                        />
                      }
                      label={
                        value ? (
                          <Typography variant="body2">
                            <strong>Armonización Vigente</strong>
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
                            <strong>Armonización no Vigente</strong>
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
                    limpiar_formulario_armonizacion();
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
                    limpiar_formulario_armonizacion();
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
                  disabled={is_saving_armonizacion}
                  startIcon={<SaveIcon />}
                  loading={is_saving_armonizacion}
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

/* eslint-disable @typescript-eslint/naming-convention */
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { Controller } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { ButtonSalir } from '../../../../../components/Salir/ButtonSalir';
import SaveIcon from '@mui/icons-material/Save';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import { useContext, useEffect } from 'react';
import { set_current_mode_planes } from '../../../store/slice/indexPlanes';
import { useProductoHook } from '../../hooks/useProductoHook';
import { DataContextProductos } from '../../context/context';
//* FECHAS
// import type { Dayjs } from 'dayjs';
// import dayjs from 'dayjs';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import InfoIcon from '@mui/icons-material/Info';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarProducto: React.FC = () => {
  const {
    control_producto,
    errors_producto,
    reset_producto,
    register_producto,
    data_watch_producto,
    set_value_producto,

    onsubmit_producto,
    onsubmit_editar,
    is_saving_producto,

    limpiar_formulario_producto,
    fecha_creacion,
    set_fecha_creacion,
    handle_change_fecha_creacion,
  } = useProductoHook();

  const dispatch = useAppDispatch();
  // * declaracion de context

  const { set_id_plan, set_id_programa } = useContext(DataContextProductos);

  const { mode, producto } = useAppSelector((state) => state.planes);

  useEffect(() => {
    if (mode.crear) {
      limpiar_formulario_producto();
    }
    if (mode.editar) {
      set_value_producto(
        'fecha_creacion',
        dayjs(producto.fecha_creacion).format('YYYY-MM-DD')
      );
      set_fecha_creacion(producto.fecha_creacion);
      set_id_plan(producto.id_plan);
      set_id_programa(producto.id_programa);
      reset_producto({
        id_plan: producto.id_plan,
        set_id_programa: producto.id_programa,
        id_producto: producto.id_producto,
        nombre_producto: producto.nombre_producto,
        numero_producto: producto.numero_producto,
        nombre_proyecto: producto.nombre_proyecto,
        fecha_creacion: producto.fecha_creacion,
        cumplio: producto.cumplio,
      });
    }
  }, [mode, producto]);

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (mode.crear) {
            onsubmit_producto();
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
            <Title title="Registro de productos" />
          </Grid>
          {mode.editar ? (
            <>
              <Grid item xs={12} sm={6}>
                <Controller
                  name="nombre_proyecto"
                  control={control_producto}
                  rules={{ required: false }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      fullWidth
                      size="small"
                      label="Nombre del proyecto"
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
              name="nombre_producto"
              control={control_producto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Nombre del producto"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  error={!!errors_producto.nombre_producto}
                  helperText={
                    errors_producto.nombre_producto
                      ? 'Es obligatorio ingresar un nombre'
                      : 'Ingrese un nombre'
                  }
                />
              )}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Controller
              name="numero_producto"
              control={control_producto}
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  label="Numero del producto"
                  type="number"
                  variant="outlined"
                  multiline
                  value={value}
                  disabled={false}
                  required={true}
                  onChange={onChange}
                  // error={!!errors_producto.numero_producto}
                  // helperText={
                  //   errors_producto.numero_producto
                  //     ? 'Es obligatorio ingresar un nombre'
                  //     : 'Ingrese un nombre'
                  // }
                />
              )}
            />
          </Grid>
          <Grid
            sx={{
              marginBottom: '10px',
              width: 'auto',
            }}
            item
            xs={12}
            sm={6}
          >
            <Controller
              name="cumplio"
              control={control_producto}
              // defaultValue=""
              rules={{
                required: data_watch_producto.cumplio
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
                          <strong>Producto cumplido</strong>
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
                          <strong>Producto no cumplido</strong>
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
          <Grid item xs={12} sm={6} md={4}>
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
                    {...register_producto('fecha_creacion', {
                      required: true,
                    })}
                    error={!!errors_producto.fecha_creacion}
                    helperText={
                      errors_producto.fecha_creacion
                        ? 'Es obligatoria la fecha de creación'
                        : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>

          <Grid container spacing={2} justifyContent="flex-end">
            <Grid item>
              <Button
                variant="outlined"
                color="warning"
                disabled={false}
                onClick={() => {
                  limpiar_formulario_producto();
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
                disabled={is_saving_producto}
                startIcon={<SaveIcon />}
                loading={is_saving_producto}
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

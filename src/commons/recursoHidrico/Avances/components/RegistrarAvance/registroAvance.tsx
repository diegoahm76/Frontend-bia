import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Box, Button, TextField } from '@mui/material';
import { Fragment, useContext, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { type FieldValues, type SubmitHandler, useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_success } from '../../../requets/Request';
import { control_error } from '../../../../../helpers';
import { LoadingButton } from '@mui/lab';
import { agregar_avance } from '../../request/request';
import dayjs from 'dayjs';
import { DataContext } from '../../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const RegistroAvance: React.FC = () => {

  const {
    id_proyecto,
    fetch_data_avances,
  } = useContext(DataContext);

  const {
    register,
    reset,
    handleSubmit: handle_submit,
    setValue: set_value,
    formState: { errors },
  } = useForm();

  // fecha
  const [fecha_reporte, set_fecha_reporte] = useState<Date | null>(new Date());
  const [is_saving, set_is_saving] = useState(false);

  const [archivos, set_archivos] = useState<Array<File | null>>([null]); // Cambio aquí
  const [nombres_archivos, set_nombres_archivos] = useState<string[]>(['']); // Cambio aquí

  const handle_fecha_reporte_change = (date: Date | null): void => {
    set_value('fecha_reporte', date)
    set_fecha_reporte(date)
  };

  const agregar_otroarchivo = (): void => {
    set_archivos([...archivos, null]);
    set_nombres_archivos([...nombres_archivos, '']);
  };

  const handle_file_select = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ): void => {
    const file = e.target.files?.[0];
    const updated_archivos = [...archivos];
    if (file != null) {
      updated_archivos[index] = file;
      set_archivos(updated_archivos);
      const updated_nombres_archivos = [...nombres_archivos];
      updated_nombres_archivos[index] = file.name; // Guardar el nombre del archivo
      set_nombres_archivos(updated_nombres_archivos);
    }
  };

  const handle_nombre_archivo_change = (e: any, index: any): void => {
    const nombre_archivo = e.target.value;
    const updated_nombres_archivos = [...nombres_archivos];
    updated_nombres_archivos[index] = nombre_archivo;
    set_nombres_archivos(updated_nombres_archivos);
  };

  const on_submit: SubmitHandler<FieldValues> = async (data) => {
    try {
      set_is_saving(true);
      const fecha_reporte = dayjs(data.fecha_reporte).format('YYYY-MM-DD');
      const datos_avance = new FormData();

      datos_avance.append('accion', data.accion);
      datos_avance.append('fecha_reporte', fecha_reporte);
      datos_avance.append('descripcion', data.descripcion);

      archivos.forEach((archivo, index) => {
        if (archivo != null) {
          datos_avance.append(`evidencia`, archivo);
          datos_avance.append(`nombre_archivo`, nombres_archivos[index]);
        }
      });

      await agregar_avance(id_proyecto as number, datos_avance);
      set_is_saving(false);
      reset();
      control_success('Se agregó avance correctamente');
      void fetch_data_avances();
    } catch (error) {
      set_is_saving(false);
      control_error(error);
    }
  };

  const reset_form = ():void => {
    reset();
    set_nombres_archivos(['']);
    set_archivos([null]);
  };

  // Validar si todos los campos obligatorios están completos
  const is_form_valid = nombres_archivos.every(nombre => nombre !== '') && Object.keys(errors).length === 0;

  return (
    <>
      <Box component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handle_submit(on_submit)}
        style={{ width: '100%' }} // Añadido estilo para ocupar toda la pantalla
      >
        <Grid container spacing={2} mt={0.1}>
          <Grid item xs={12}>
            <Title title=" REGISTRO DE AVANCE" />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Acción"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              {...register('accion', { required: true })}
              error={Boolean(errors.accion)}
              helperText={
                (errors.accion?.type === "required") ? "Este campo es obligatorio" : ''
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={esLocale}>
              <DatePicker
                label="Fecha Avance"
                inputFormat="YYYY/MM/DD"
                openTo="day"
                views={['year', 'month', 'day']}
                value={fecha_reporte}
                onChange={handle_fecha_reporte_change}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    size="small"
                    {...params}
                    {...register('fecha_reporte', { required: true })}
                    error={Boolean(errors.fecha_reporte)}
                    helperText={
                      (errors.fecha_reporte?.type === "required") ? "Este campo es obligatorio" : ''
                    }
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Descripcción"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              {...register('descripcion', { required: true })}
              error={Boolean(errors.descripcion)}
              helperText={
                (errors.descripcion?.type === "required") ? "Este campo es obligatorio" : ''
              }
            />
          </Grid>
          {archivos.map((file, index) => (
            <Fragment key={index}>
              <Grid item xs={12} sm={6}>
                <Button
                  variant="outlined"
                  fullWidth
                  component="label"
                  startIcon={<CloudUploadIcon />}
                >
                  {nombres_archivos[index] !== ''
                    ? nombres_archivos[index]
                    : 'Seleccione archivo soporte'}
                  <input
                    hidden
                    type="file"
                    required
                    autoFocus
                    style={{ opacity: 0 }}
                    onChange={(e) => { handle_file_select(e, index); }}
                  />
                </Button>
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Nombre Archivo"
                  fullWidth
                  size="small"
                  margin="dense"
                  required
                  autoFocus
                  value={nombres_archivos[index]}
                  onChange={(e) => { handle_nombre_archivo_change(e, index); }}
                />
              </Grid>
            </Fragment>
          ))}
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              color='primary'
              size="large"
              onClick={agregar_otroarchivo}
            >
              Agregar archivo
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              variant="outlined"
              color="error"
              onClick={reset_form} // Use the modified reset function
            >
              Limpiar
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              variant="contained"
              color='success'
              size="large"
              type='submit'
              disabled={!is_form_valid || is_saving} // Cambio aquí
              loading={is_saving}
            >
              Agregar
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Box, Button, TextField } from '@mui/material';
import { Fragment, useContext, useState, useEffect } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_success } from '../../../requets/Request';
import { control_error } from '../../../../../helpers';
import { LoadingButton } from '@mui/lab';
import { editar_avance } from '../../request/request';
import { DataContext } from '../../context/contextData';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarAvance: React.FC = () => {
  const { id_avance,
    info_avance,
    is_select_avance,
    set_is_select_avance,
    set_is_editar_avance,
    is_editar_avance,
  } = useContext(DataContext);

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [fecha_reporte, set_fecha_reporte] = useState<Date | null>(null);
  const [is_saving, set_is_saving] = useState(false);
  const [archivos, set_archivos] = useState<Array<File | null>>([null]);
  const [nombres_archivos, set_nombres_archivos] = useState<string[]>(['']);

  useEffect(() => {
    if (info_avance) {
      setValue('accion', info_avance.accion || '');
      setValue('fecha_reporte', info_avance.fecha_reporte || null);
      setValue('descripcion', info_avance.descripcion || '');
      set_fecha_reporte(info_avance.fecha_reporte ? new Date(info_avance.fecha_reporte) : null);
      // set_archivos(info_avance.evidencias.map(() => null));
      // set_nombres_archivos(info_avance.evidencias.map((evidencia) => evidencia.nombre_archivo || ''));
    }
  }, [info_avance, setValue]);

  const handle_fecha_reporte_change = (date: Date | null): void => {
    setValue('fecha_reporte', date);
    set_fecha_reporte(date);
  };

  const agregar_otroarchivo = (): void => {
    set_archivos([...archivos, null]);
    set_nombres_archivos([...nombres_archivos, '']);
  };

  const handle_file_select = (e: React.ChangeEvent<HTMLInputElement>, index: number): void => {
    const file = e.target.files?.[0];
    const updated_archivos = [...archivos];
    if (file != null) {
      updated_archivos[index] = file;
      set_archivos(updated_archivos);
    }
  };

  const handle_nombre_archivo_change = (e: any, index: any): void => {
    const nombre_archivo = e.target.value;
    const updated_nombres_archivos = [...nombres_archivos];
    updated_nombres_archivos[index] = nombre_archivo;
    set_nombres_archivos(updated_nombres_archivos);
  };

  const on_submit = async (data: any): Promise<void> => {
    try {
      set_is_saving(true);
      const datos_avance = new FormData();

      datos_avance.append('accion', data.accion);
      datos_avance.append('descripcion', data.descripcion);

      archivos.forEach((archivo, index) => {
        if (archivo != null) {
          datos_avance.append(`evidencia_${index}`, archivo);
          datos_avance.append(`nombre_archivo_${index}`, nombres_archivos[index]);
        }
      });

      await editar_avance(id_avance as number, datos_avance);
      set_is_saving(false);
      reset();
      control_success('Se editó avance correctamente');
    } catch (error) {
      set_is_saving(false);
      control_error(error);
    }
  };

  const is_form_valid = nombres_archivos.every((nombre) => nombre !== '') && Object.keys(errors).length === 0;

  return (
    <>
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(on_submit)}
      >
        <Grid container spacing={2} mt={0.1}>
          {is_select_avance && (
            <Grid item xs={12}>
              <Title title=" INFORMACIÓN DE AVANCE" />
            </Grid>
          )}
          {is_editar_avance && (
            <Grid item xs={12}>
              <Title title=" EDICIÓN DE AVANCE" />
            </Grid>
          )}
          <Grid item xs={12} sm={6}>
            <TextField
              label="Acción"
              fullWidth
              size="small"
              margin="dense"
              disabled={is_select_avance}
              required={is_editar_avance}
              autoFocus
              {...register('accion', { required: true })}
              error={Boolean(errors.accion)}
              helperText={errors.accion?.type === 'required' ? 'Este campo es obligatorio' : ''}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
              <DatePicker
                label="Fecha Avance"
                inputFormat="YYYY/MM/DD"
                openTo="day"
                views={['year', 'month', 'day']}
                value={fecha_reporte}
                disabled={is_select_avance || is_editar_avance}
                onChange={handle_fecha_reporte_change}
                renderInput={(params) => (
                  <TextField
                    fullWidth
                    size="small"
                    disabled={is_select_avance || is_editar_avance}
                    {...params}
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
              disabled={is_select_avance}
              required={is_editar_avance}
              autoFocus
              {...register('descripcion', { required: true })}
              error={Boolean(errors.descripcion)}
              helperText={errors.descripcion?.type === 'required' ? 'Este campo es obligatorio' : ''}
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
                    disabled={is_select_avance}
                    required={is_editar_avance}
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
                  disabled={is_select_avance}
                  required={is_editar_avance}
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
              color="primary"
              size="large"
              onClick={agregar_otroarchivo}
            >
              Agregar archivo
            </LoadingButton>
          </Grid>
          {is_editar_avance && (
            <Grid item>
              <LoadingButton
                variant="contained"
                color="success"
                size="large"
                type="submit"
                disabled={!is_form_valid || is_saving}
                loading={is_saving}
              >
                Actualizar
              </LoadingButton>
            </Grid>
          )}
          {is_select_avance && (
            <Grid item>
              <LoadingButton
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  set_is_select_avance(false);
                  set_is_editar_avance(true);
                }}
              >
                Editar Avance
              </LoadingButton>
            </Grid>
          )}

        </Grid>
      </Box>
    </>
  );
};

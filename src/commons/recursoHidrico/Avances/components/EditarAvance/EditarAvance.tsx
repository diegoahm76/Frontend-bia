/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Box, Button, TextField, Tooltip, Typography } from '@mui/material';
import { Fragment, useContext, useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { control_success } from '../../../requets/Request';
import { control_error } from '../../../../../helpers';
import { LoadingButton } from '@mui/lab';
import { editar_avance } from '../../request/request';
import { DataContext } from '../../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import type { Evidencia } from '../../Interfaces/interfaces';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarAvance: React.FC = () => {
  const {
    id_avance,
    info_avance,
    is_select_avance,
    set_mode,
    is_editar_avance,
    set_info_avance,
  } = useContext(DataContext);

  let columns: GridColDef[] = [
    {
      field: 'id_evidencia_avance',
      headerName: 'No EVIDENCIA',
      sortable: true,
      width: 150,
    },
    {
      field: 'nombre_archivo',
      headerName: 'NOMBRE ARCHIVO',
      sortable: true,
      width: 250,
    },
  ];

  if (is_editar_avance) {
    columns = [
      ...columns,
      {
        field: 'ACCIONES',
        headerName: 'ACCIONES',
        sortable: true,
        width: 120,
        renderCell: (params) => (
          <>
            <Tooltip title="Editar Actividades">
              <Button
                variant="outlined"
                color="primary"
                size="small"
                startIcon={<EditIcon />}
                onClick={() => {
                  set_is_evidencia(true);
                  set_info_evidencia(params.row);
                  setValue('nombre_archivo_nuevo', params.row.nombre_archivo);
                }}
              />
            </Tooltip>
          </>
        ),
      },
    ];
  }

  const {
    register,
    reset,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const [is_saving, set_is_saving] = useState(false);
  const [is_evidencia, set_is_evidencia] = useState(false);
  const [archivos, set_archivos] = useState<Array<File | null>>([null]);
  const [nombres_archivos, set_nombres_archivos] = useState<string[]>(['']);
  const [rows_evidencia, set_rows_evidencia] = useState<Evidencia[]>([]);
  const [info_evidencia, set_info_evidencia] = useState<Evidencia>();
  const [fecha_reporte, set_fecha_reporte] = useState<Date | null>(null);

  useEffect(() => {
    if (info_avance) {
      setValue('accion', info_avance.accion);
      console.log(info_avance.descripcion, 'descripcion');
      setValue('descripcion', info_avance.descripcion);
      set_rows_evidencia(info_avance.evidencias);
      set_fecha_reporte(info_avance.fecha_reporte as any);
      setValue('fecha_reporte', info_avance.fecha_reporte);
    }
  }, [info_avance, setValue]);

  const agregar_otroarchivo = (): void => {
    set_archivos([...archivos, null]);
    set_nombres_archivos([...nombres_archivos, '']);
  };
  const handle_fecha_reporte_change = (date: Date | null): void => {
    setValue('fecha_reporte', date);
    set_fecha_reporte(date);
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

  const on_submit = async (data: any): Promise<void> => {
    try {
      set_is_saving(true);
      const datos_avance = new FormData();

      datos_avance.append('accion', data.accion);
      datos_avance.append('descripcion', data.descripcion);

      archivos.forEach((archivo, index) => {
        if (archivo != null) {
          datos_avance.append(`evidencia`, archivo);
          datos_avance.append(
            `nombre_archivo`,
            nombres_archivos[index]
          );
        }
      });

      if (!data.nombre_archivo_nuevo) {
        datos_avance.append('nombre_actualizar', JSON.stringify([]) as any);
      } else {
        const nombre_actualizar = [
          {
            id_evidencia_avance: info_evidencia?.id_evidencia_avance,
            nombre_archivo: data.nombre_archivo_nuevo,
          },
        ];
        datos_avance.append('nombre_actualizar', JSON.stringify(nombre_actualizar) as any);
      }

      await editar_avance(id_avance as number, datos_avance);
      set_is_saving(false);
      // reset();
      control_success('Se editó avance correctamente');

      // Actualizar la información del avance después de la edición
      const updatedInfoAvance: any = { ...info_avance }; // Copiar el objeto existente

      if (updatedInfoAvance) {
        updatedInfoAvance.accion = data.accion;
        updatedInfoAvance.descripcion = data.descripcion;

        if (info_evidencia) {
          updatedInfoAvance.evidencias = [
            {
              id_evidencia_avance: info_evidencia.id_evidencia_avance,
              nombre_archivo: data.nombre_archivo_nuevo,
            },
            ...updatedInfoAvance.evidencias.filter(
              (evidencia: any) =>
                evidencia.id_evidencia_avance !== info_evidencia.id_evidencia_avance
            ),
          ];
        }

        set_info_avance(updatedInfoAvance);
      }

    } catch (error) {
      set_is_saving(false);
      control_error(error);
    }
  };


  const is_form_valid = Object.keys(errors).length === 0;

  return (
    <>
      <Box
        component="form"
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(on_submit)}
        style={{ width: '100%' }} // Añadido estilo para ocupar toda la pantalla
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
              helperText={
                errors.accion?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
            />
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
              helperText={
                errors.descripcion?.type === 'required'
                  ? 'Este campo es obligatorio'
                  : ''
              }
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
                    {...register('fecha_reporte')}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
          {is_editar_avance && archivos.map((file, index) => (
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
                    : 'Seleccione archivo'}
                  <input
                    hidden
                    type="file"
                    disabled={is_select_avance}
                    required={false}
                    autoFocus
                    style={{ opacity: 0 }}
                    onChange={(e) => {
                      handle_file_select(e, index);
                    }}
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
                  required={false}
                  autoFocus
                  value={nombres_archivos[index]}
                  onChange={(e) => {
                    handle_nombre_archivo_change(e, index);
                  }}
                />
              </Grid>
            </Fragment>
          ))}
          {rows_evidencia.length > 0 && (
            <>
              <Grid item xs={12}>
                <Typography variant="subtitle1" fontWeight="bold">
                  Evidencias
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <DataGrid
                  autoHeight
                  rows={rows_evidencia}
                  columns={columns}
                  getRowId={(row) => row.id_evidencia_avance}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </Grid>
              {is_evidencia && (
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Nombre Archivo"
                    fullWidth
                    size="small"
                    margin="dense"
                    autoFocus
                    {...register('nombre_archivo_nuevo', { required: true })}
                  />
                </Grid>
              )}
            </>
          )}
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          {is_editar_avance && (
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
          )}
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
                  set_mode('editar_avance');
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

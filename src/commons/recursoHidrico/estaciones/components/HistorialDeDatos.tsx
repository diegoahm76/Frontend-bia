/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  Stack,
  TextField,
} from '@mui/material';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { control_error } from '../../../../helpers/controlError';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import esLocale from 'dayjs/locale/es'; // si deseas cambiar el idioma a español
import type { Datos, DatosMigracion } from '../interfaces/interfaces';
import { api } from '../../../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import { useForm, Controller } from 'react-hook-form';
import {
  consultar_datos_mes,
  consultar_datos_mes_migracion,
} from '../../requets/Request';
import Select from 'react-select';
import dayjs from 'dayjs';
import { Title } from '../../../../components/Title';
import type { AxiosError } from 'axios';
import ButtonGroup from '@mui/material/ButtonGroup';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
const columns: GridColDef[] = [
  {
    field: 'fecha_registro',
    headerName: 'FECHA REGISTRO',
    width: 170,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${date.getFullYear()}`;
      return formattedDate;
    },
  },
  { field: 'temperatura_ambiente', headerName: 'TEMPERATURA ', width: 170 },
  { field: 'humedad_ambiente', headerName: 'HUMEDAD ', width: 170 },
  {
    field: 'presion_barometrica',
    headerName: 'PRESIÓN BAROMETRICA',
    width: 170,
  },
  { field: 'velocidad_viento', headerName: 'VEL. VIENTO', width: 140 },
  { field: 'direccion_viento', headerName: 'DIR. VIENTO', width: 170 },
  { field: 'precipitacion', headerName: 'PRECIPITACIÓN', width: 170 },
  { field: 'luminosidad', headerName: 'LUMINOSIDAD', width: 170 },
  { field: 'nivel_agua', headerName: 'NIVEL AGUA', width: 170 },
  { field: 'velocidad_agua', headerName: 'VEL. AGUA', width: 170 },
  { field: 'id_estacion', headerName: 'NÚMERO ESTACIÓN', width: 170 },
];
const columns_migracion: GridColDef[] = [
  { field: 'id_migracion_estacion', headerName: 'NÚMERO DATO', width: 170 },
  { field: 'nombre', headerName: 'ESTACIÓN', width: 170 },
  {
    field: 'fecha',
    headerName: 'FECHA REGISTRO',
    width: 170,
    valueFormatter: (params) => {
      const date = new Date(params.value);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(
        date.getMonth() + 1
      )
        .toString()
        .padStart(2, '0')}-${date.getFullYear()}`;
      return formattedDate;
    },
  },
  { field: 'temperatura', headerName: 'TEMPERATURA ', width: 100 },
  { field: 'temperatura_max', headerName: 'TEMPERATURA MAX', width: 100 },
  { field: 'temperatura_min', headerName: 'TEMPERATURA MIN', width: 100 },
  { field: 'humedad_relativa', headerName: 'HUMEDAD ', width: 100 },

  { field: 'punto_de_rocio', headerName: 'PTO. ROCIO ', width: 100 },
  { field: 'presion_atm_abs', headerName: 'PRECION ABS', width: 100 },
  { field: 'presion_atm_rel', headerName: 'PRECION REL', width: 100 },
  { field: 'intensidad', headerName: 'INTENSIDAD', width: 100 },

  { field: 'precipitacion', headerName: 'PTO. ROCIO ', width: 100 },
  { field: 'nivel_agua', headerName: 'NIVEL AUGUA', width: 100 },
  { field: 'nivel_agua_max', headerName: 'NIVEL AUG. MIN', width: 100 },
  { field: 'nivel_agua_min', headerName: 'NIVEL AUG. MAX. ', width: 100 },
  { field: 'velocidad_rio', headerName: 'VEL. RIO', width: 100 },
  { field: 'caudal', headerName: 'CAUDAL ', width: 100 },
  { field: 'voltaje', headerName: 'VOLTAJE ', width: 100 },
];
// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialDeDatos: React.FC = () => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    control: control_filtrar,
    formState: { errors: errors_filtrar },
  } = useForm();

  const [loading, set_loading] = useState(false);
  const [estaciones_options, set_estaciones_options] = useState([]);
  const [selected_date, set_selected_date] = useState<Date | null>(new Date());
  const [dato, set_dato] = useState<Datos[]>([]);
  const [dato_migracion, set_dato_migracion] = useState<DatosMigracion[]>([]);

  const get_data_initial = async (): Promise<void> => {
    try {
      set_loading(true);
      const { data } = await api.get('/estaciones/consultar-estaciones/');
      const estaciones_maped = data.data.map(
        (estacion: {
          nombre_estacion: string;
          id_estacion: number | string;
        }) => ({
          label: estacion.nombre_estacion,
          value: estacion.id_estacion,
        })
      );
      set_estaciones_options(estaciones_maped);
      set_loading(false);
    } catch (err: any) {
      const temp_error = err as AxiosError;
      //  console.log('')('Error', temp_error.response?.status);
      if (temp_error.response?.status === 404) {
        control_error('No se encontraron estaciones');
        //  console.log('')('No hay datos');
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error(err.esponse.data.detail || 'Algo paso, intente de nuevo');
      }
    }
  };

  useEffect(() => {
    void get_data_initial();
  }, []);

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const handle_date_change = (date: Date | null) => {
    set_selected_date(date);
  };

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const submit_historial_datos = async (data: any) => {
    try {
      set_loading(true);
      const estacion_id = data.estacion.value;
      const fecha = dayjs(selected_date).format('YYYY-MM');
      const estacion = await consultar_datos_mes(estacion_id, fecha);
      const datos_mapeados = estacion.map((dato) => ({
        id_data: dato.id_data,
        fecha_registro: dato.fecha_registro,
        temperatura_ambiente: dato.temperatura_ambiente,
        humedad_ambiente: dato.humedad_ambiente,
        presion_barometrica: dato.presion_barometrica,
        velocidad_viento: dato.velocidad_viento,
        direccion_viento: dato.direccion_viento,
        precipitacion: dato.precipitacion,
        luminosidad: dato.luminosidad,
        nivel_agua: dato.nivel_agua,
        velocidad_agua: dato.velocidad_agua,
        id_estacion: dato.id_estacion,
      }));
      set_dato(datos_mapeados); // guardar el valor en el estado
      set_loading(false);
    } catch (err: any) {
      set_loading(false);
      const temp_error = err as AxiosError;
      if (temp_error.response?.status === 404) {
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
      }
    }
  };
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  const submit_historial_datos_migracion = async (data: any) => {
    try {
      set_loading(true);
      const estacion_id = data.estacion.value;
      const fecha = dayjs(selected_date).format('YYYY-MM');
      //  console.log('')('fecha', fecha);
      const estacion = await consultar_datos_mes_migracion(estacion_id, fecha);
      const datos_mapeados = estacion.map((dato) => ({
        id_migracion_estacion: dato.id_migracion_estacion,
        id_estacion: dato.id_estacion,
        nombre: dato.nombre,
        fecha: dato.fecha,
        temperatura: dato.temperatura,
        temperatura_max: dato.temperatura_max,
        temperatura_min: dato.temperatura_min,
        humedad_relativa: dato.humedad_relativa,
        punto_de_rocio: dato.punto_de_rocio,
        presion_atm_abs: dato.presion_atm_abs,
        presion_atm_rel: dato.presion_atm_rel,
        intensidad: dato.intensidad,
        precipitacion: dato.precipitacion,
        nivel_agua: dato.nivel_agua,
        nivel_agua_max: dato.nivel_agua_max,
        nivel_agua_min: dato.nivel_agua_min,
        velocidad_rio: dato.velocidad_rio,
        caudal: dato.caudal,
        voltaje: dato.voltaje,
      }));
      //  console.log('')('datos', datos_mapeados);
      set_dato_migracion(datos_mapeados); // guardar el valor en el estado
      set_loading(false);
    } catch (err: unknown) {
      set_loading(false);
      const temp_error = err as AxiosError;
      //  console.log('')('Error', temp_error.response?.status);
      if (temp_error.response?.status === 404) {
        control_error('No se encontraron datos para esta fecha');
        //  console.log('')('No hay datos');
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error(
          'Ha ocurrido un error, por favor intente de nuevo más tarde.'
        );
      }
    }
  };

  const submit_general = (data: any): void => {
    const {
      estacion: { value },
    } = data;
    //  console.log('')(value);
    set_dato([]);
    set_dato_migracion([]);
    if (value === 1 || value === 2 || value === 3 || value === 4) {
      void submit_historial_datos(data);
      return;
    }
    void submit_historial_datos_migracion(data);
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
        marginTop: '20px',
        marginLeft: '-5px',
      }}
    >
      <Grid item xs={12} sx={{ marginTop: '10px' }}>
        <Title title="Historial de datos" />
      </Grid>

      <Box component="form" onSubmit={handleSubmit(submit_general)}>
        <Stack sx={{ m: '10px 0 20px 0' }} direction="row" spacing={2}>
          <FormControl fullWidth>
            <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
              <DatePicker
                label="Mes"
                inputFormat="YYYY/MM"
                openTo="month"
                views={['year', 'month']}
                value={selected_date}
                onChange={handle_date_change}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
              />
            </LocalizationProvider>
          </FormControl>
          <FormControl fullWidth>
            <Controller
              name="estacion"
              control={control_filtrar}
              rules={{ required: true }}
              render={({ field }) => (
                <Select
                  {...field}
                  options={estaciones_options}
                  placeholder="Seleccionar"
                />
              )}
            />
            {errors_filtrar.estacion != null && (
              <FormHelperText error>
                Seleccione una estación para continuar
              </FormHelperText>
            )}
          </FormControl>
          <FormControl fullWidth>
            <Button
              variant="contained"
              type="submit"
              disabled={loading}
              className="search-button text-capitalize rounded-pill"
              startIcon={
                loading ? (
                  <CircularProgress
                    size={20}
                    key={1}
                    className="align-middle ml-1"
                  />
                ) : (
                  <SearchIcon />
                )
              }
              aria-label="Buscar "
              size="large"
            >
              Buscar
              {loading ? '' : ''}
            </Button>
          </FormControl>
        </Stack>
      </Box>
      {dato.length > 0 ? (
        <>
          <Title title="Historial de datos"></Title>
          <ButtonGroup
            style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
          >
            {download_xls({ nurseries: dato, columns })}
            {download_pdf({
              nurseries: dato,
              columns,
              title: 'Historial  de datos',
            })}
          </ButtonGroup>
          <Box sx={{ mt: '20px' }}>
            <DataGrid
              autoHeight
              rows={dato}
              columns={columns}
              getRowId={(row) => row.id_data}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </>
      ) : (
        ''
      )}
      {dato_migracion.length > 0 ? (
        <>
          <Title title="Historial de datos "></Title>
          <ButtonGroup
            style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
          >
            {download_xls({
              nurseries: dato_migracion,
              columns: columns_migracion,
            })}
            {download_pdf({
              nurseries: dato_migracion,
              columns: columns_migracion,
              title: 'Historial  de datos',
            })}
          </ButtonGroup>
          <Box sx={{ mt: '20px' }}>
            <DataGrid
              autoHeight
              rows={dato_migracion}
              columns={columns_migracion}
              getRowId={(row) => row.id_migracion_estacion}
              pageSize={10}
              rowsPerPageOptions={[10]}
            />
          </Box>
        </>
      ) : (
        ''
      )}
    </Grid>
  );
};

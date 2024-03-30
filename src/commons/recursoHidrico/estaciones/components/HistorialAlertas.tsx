/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import ButtonGroup from '@mui/material/ButtonGroup';
import { useEffect, useState } from 'react';
import { control_error } from '../../../../helpers/controlError';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import esLocale from 'dayjs/locale/es'; // si deseas cambiar el idioma a español
import type { HistorialAlerta } from '../interfaces/interfaces';
import { api } from '../../../../api/axios';
import SearchIcon from '@mui/icons-material/Search';
import { useForm, Controller } from 'react-hook-form';
import { consultar_historial_alertas } from '../../requets/Request';
import Select from 'react-select';
import dayjs from 'dayjs';
import { Title } from '../../../../components/Title';
import type { AxiosError } from 'axios';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

const columns: GridColDef[] = [
  {
    field: 'id_historial_alarma_enviada_estacion',
    headerName: 'NÚMERO',
    width: 170,
  },
  { field: 'nombre_estacion', headerName: 'ESTACIÓN ', width: 170 },
  { field: 'nombre_persona_envio', headerName: 'PERSONA ', width: 170 },
  { field: 'fecha_hora_envio', headerName: 'FECHA', width: 170 },
  { field: 'mensaje_enviado', headerName: 'MENSAJE', width: 300 },
  { field: 'dir_email_enviado', headerName: 'EMAIL', width: 170 },
  { field: 'nro_celular_enviado', headerName: 'TELÉFONO', width: 170 },
];

// eslint-disable-next-line @typescript-eslint/naming-convention
export const HistorialAlertas: React.FC = () => {
  const {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    handleSubmit,
    control: control_filtrar,
    formState: { errors: errors_filtrar },
  } = useForm();

  const [loading, set_loading] = useState(false);
  const [estaciones_options, set_estaciones_options] = useState([]);
  const [selected_date, set_selected_date] = useState<Date | null>(new Date());
  const [dato, set_dato] = useState<HistorialAlerta[]>([]);

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
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
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
      const estacion = await consultar_historial_alertas(estacion_id, fecha);
      const datos_mapeados = estacion.map((dato) => ({
        id_historial_alarma_enviada_estacion:
          dato.id_historial_alarma_enviada_estacion,
        nombre_estacion: dato.nombre_estacion,
        id_persona_estacion: dato.id_persona_estacion,
        fecha_hora_envio: dato.fecha_hora_envio,
        mensaje_enviado: dato.mensaje_enviado,
        dir_email_enviado: dato.dir_email_enviado,
        nro_celular_enviado: dato.nro_celular_enviado,
        nombre_persona_envio: dato.nombre_persona_envio,
      }));
      set_dato(datos_mapeados); // guardar el valor en el estado
      set_loading(false);
    } catch (err: any) {
      set_loading(false);
      const temp_error = err as AxiosError;
      //  console.log('')('Error', temp_error.response?.status);
      if (temp_error.response?.status === 404) {
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
        set_dato([]);
      } else {
        // Otro error, mostrar mensaje de error genérico
        control_error(err.response.data.detail || 'Algo paso, intente de nuevo');
      }
    }
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
        <Title title="Historial de alertas" />
      </Grid>
      <Box component="form" onSubmit={handleSubmit(submit_historial_datos)}>
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
          <Title title="Historial de alertas equipo estación"></Title>

          <ButtonGroup
            style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
          >
            {download_xls({ nurseries: dato, columns })}
          </ButtonGroup>
          <Box sx={{ mt: '20px' }}>
            <DataGrid
              autoHeight
              rows={dato}
              columns={columns}
              getRowId={(row) => row.id_historial_alarma_enviada_estacion}
              pageSize={5}
              rowsPerPageOptions={[5]}
            />
          </Box>
        </>
      ) : (
        ''
      )}
    </Grid>
  );
};

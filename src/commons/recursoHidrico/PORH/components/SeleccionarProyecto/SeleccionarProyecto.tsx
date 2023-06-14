import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Avatar, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
import esLocale from 'dayjs/locale/es';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { DataContext } from '../../context/contextData';
import { get_data_id } from '../../Request/request';
import { control_error } from '../../../../../helpers';

interface IProps {
  data: any;
  watch: any;
  register: any;
  set_value: any;
  set_id_proyecto: any;
}


// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarProyecto: React.FC<IProps> = (
  { data,
    register,
    set_value,
    set_id_proyecto,
    watch
  }:
    IProps) => {

  const {
    rows_actividades,
    set_rows_actividades,
  } = useContext(DataContext);

  const columns: GridColDef[] = [

    {
      field: 'id_actividades',
      headerName: 'No ACTIVIDAD',
      sortable: true,
      width: 170,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      sortable: true,
      width: 170,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA REGISTRO',
      sortable: true,
      width: 170,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <IconButton>
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                  onClick={() => {
                    // handle_open_editar();
                    // set_cargos(params.row);
                  }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              onClick={() => {
                // confirmar_eliminar_cargo(params.row.id_cargo as number)
              }}
            >
              <Avatar
                sx={{
                  width: 24,
                  height: 24,
                  background: '#fff',
                  border: '2px solid',
                }}
                variant="rounded"
              >
                <DeleteIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
          </>
        );
      },
    },


  ];

  const [is_agregar, set_is_agregar] = useState(false);

  const fetch_data = async (id_proyecto: number): Promise<void> => {
    try {
      await get_data_id(id_proyecto, set_rows_actividades, 'get/actividades/por/proyectos');
    } catch (error) {
      control_error(error);
    }
  };

  useEffect(() => {
    void fetch_data(data.id_proyecto);
  }, [data]);

  useEffect(() => {
    if (data !== undefined) {
      set_start_date(new Date(data.vigencia_inicial))
      set_value('vigencia_final', data.vigencia_final)
      set_value('vigencia_inicial', data.vigencia_inicial)
      set_end_date(new Date(data.vigencia_final))
    }
  }, [data !== undefined]);


  // fechas
  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const handle_start_date_change = (date: Date | null): void => {
    set_value('vigencia_inicial', date)
    set_start_date(date)
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_value('vigencia_final', date)
    set_end_date(date)
  };
  return (
    <>
      <Grid item xs={12}>
        <Title title="INFORMACIÓN DE PROYECTO" />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre del proyecto"
          fullWidth
          size="small"
          margin="dense"
          required
          defaultValue={data.nombre}
          autoFocus
          {...register("nombre", { required: true })}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Fecha Inical"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={start_date}
            onChange={handle_start_date_change}
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                size="small"
                {...params}
                {...register("vigencia_inicial", { required: true })}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <LocalizationProvider dateAdapter={AdapterDayjs} locale={esLocale}>
          <DatePicker
            label="Fecha Final"
            inputFormat="YYYY/MM/DD"
            openTo="day"
            views={['year', 'month', 'day']}
            value={end_date}
            onChange={handle_end_date_change}
            renderInput={(params) => (
              <TextField
                required
                fullWidth
                size="small"
                {...params}
                {...register("vigencia_final", { required: true })}
              />
            )}
          />
        </LocalizationProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Inversión total"
          fullWidth
          size="small"
          margin="dense"
          required
          autoFocus
          defaultValue={data.inversion}
          type="text"
          {...register("inversion", { required: true })}
        />
      </Grid>
      {rows_actividades.length > 0 && (
        <>

          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Actividades
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              density="compact"
              autoHeight
              rows={rows_actividades}
              columns={columns}
              getRowId={(row) => row.id_actividades}
              pageSize={5}
              rowsPerPageOptions={[5]}
              disableSelectionOnClick
            />
          </Grid>
        </>
      )}
      {is_agregar && (
        <>
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                onClick={() => { set_is_agregar(true) }}
              >
                Agregar Nueva Actividad
              </LoadingButton>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Descripción de la actividad
            </Typography>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción de la actividad"
              fullWidth
              size="small"
              margin="dense"
              required
              autoFocus
              multiline
              {...register("descripcion", { required: true })}
            />
          </Grid>
        </>
      )}
    </>
  );
};

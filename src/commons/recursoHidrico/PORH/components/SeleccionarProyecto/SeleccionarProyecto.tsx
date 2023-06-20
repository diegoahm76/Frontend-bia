/* eslint-disable @typescript-eslint/strict-boolean-expressions */
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
import ChecklistIcon from '@mui/icons-material/Checklist';
import type { GetActividades } from '../../Interfaces/interfaces';
import Swal from 'sweetalert2';
import { control_success } from '../../../requets/Request';
import { eliminar_id } from '../../Request/request';
import { control_error } from '../../../../../helpers';

interface IProps {
  data: any;
  watch: any;
  register: any;
  set_value: any;
  set_id_proyecto: any;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionarProyecto: React.FC<IProps> = (
  { data,
    register,
    set_value,
    set_id_proyecto,
    watch
  }:
    IProps) => {

  const {
    rows_actividades,
    is_agregar_actividad,
    set_is_agregar_actividad,
    is_editar_actividad,
    set_is_editar_actividad,
    is_seleccionar_actividad,
    set_is_seleccionar_actividad,
    set_id_actividad,
    fetch_data_actividades,
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
      headerName: 'DESCRIPCIÓN',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA REGISTRO',
      sortable: true,
      width: 250,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <IconButton
              onClick={() => {
                // set_id_programa(params.row.id_programa as number);
                set_data_actividad(params.row);
                set_id_actividad(params.row.id_actividades as number);
                set_is_agregar_actividad(false);
                set_is_editar_actividad(true);
                set_is_seleccionar_actividad(false);
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
                <EditIcon
                  sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                />
              </Avatar>
            </IconButton>
            <IconButton
              onClick={() => {
                confirmar_eliminar(params.row.id_actividades as number)
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
            <IconButton
              onClick={() => {
                set_data_actividad(params.row);
                set_id_actividad(params.row.id_actividades as number);
                set_is_agregar_actividad(false);
                set_is_editar_actividad(false);
                set_is_seleccionar_actividad(true);
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
                <ChecklistIcon
                  sx={{
                    color: 'primary.main',
                    width: '18px',
                    height: '18px',
                  }}
                />
              </Avatar>
            </IconButton>

          </>
        );
      },
    },


  ];

  useEffect(() => {
    void fetch_data_actividades();
  }, [data]);

  useEffect(() => {
    if (data !== undefined) {
      set_start_date(new Date(data.vigencia_inicial))
      set_value('vigencia_final', data.vigencia_final)
      set_value('vigencia_inicial', data.vigencia_inicial)
      set_end_date(new Date(data.vigencia_final))
      set_value('descripcion', data_actividad?.nombre)
    }
  }, [data !== undefined]);

  const descripcion = watch('descripcion');

  // fechas
  const [data_actividad, set_data_actividad] = useState<GetActividades>();
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
  const confirmar_eliminar = (id_actividad: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: "square-btn",
        cancelButton: "square-btn",
      },
      width: 350,
      text: "¿Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#0EC32C",
      cancelButtonColor: "#DE1616",
      confirmButtonText: "Si, elminar!",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminar_id(id_actividad, 'eliminar/actividad');
          void fetch_data_actividades()
          control_success('La actividad se eliminó correctamente')
        } catch (error: any) {
          control_error(error.response.data.detail || 'hubo un error al eliminar, intenta de nuevo');
        }
      }
    });
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
      {!is_editar_actividad && (
        <>
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                onClick={() => {
                  set_is_agregar_actividad(true);
                  set_is_editar_actividad(false);
                  set_is_seleccionar_actividad(false);
                }}
              >
                Agregar Nueva Actividad
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      )}
      {is_agregar_actividad || is_seleccionar_actividad || is_editar_actividad ? (
        <>
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
              disabled={is_seleccionar_actividad}
              value={descripcion}
              required
              autoFocus
              multiline
              {...register("descripcion", { required: true })}
            />
          </Grid>
        </>
      ) : null}

    </>
  );
};

import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import {
  Avatar,
  Divider,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AgregarProyectos } from '../AgregarProyectos/AgregarProyectos';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import 'react-datepicker/dist/react-datepicker.css';
import esLocale from 'dayjs/locale/es';
import { LoadingButton } from '@mui/lab';
// import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '../../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { EditarProyecto } from '../ActualizarProyecto/EditarProyectos';
import type { GetProyectos } from '../../Interfaces/interfaces';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { SeleccionarProyecto } from '../SeleccionarProyecto/SeleccionarProyecto';
import { eliminar_id } from '../../Request/request';
import { control_success } from '../../../requets/Request';
import { control_error } from '../../../../../helpers';
import Swal from 'sweetalert2';
import dayjs, { type Dayjs } from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionarPrograma: React.FC = () => {
  const {
    rows_proyectos,
    is_agregar_proyecto,
    is_editar_proyecto,
    is_seleccionar_proyecto,
    set_mode,
    set_id_proyecto,
    fetch_data_proyectos,
    setValue: set_value,
    data_programa,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'id_proyecto',
      headerName: 'No Proyecto',
      sortable: true,
      width: 120,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      sortable: true,
      width: 250,
    },
    {
      field: 'vigencia_inicial',
      headerName: 'VIGENCIA INICIAL',
      sortable: true,
      width: 250,
    },
    {
      field: 'vigencia_final',
      headerName: 'VIGENCIA FINAL',
      sortable: true,
      width: 250,
    },
    {
      field: 'inversion',
      headerName: 'INVERSIÓN',
      sortable: true,
      width: 250,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params: any) => {
        const fecha_fin = params.row.vigencia_final;
        if (fecha_fin !== null && new Date(fecha_fin) > new Date()) {
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                    onClick={() => {
                      set_id_proyecto(params.row.id_proyecto as number);
                      set_data_proyectos(params.row);
                      set_mode('editar_proyecto');
                    }}
                  />
                </Avatar>
              </IconButton>
              <IconButton
                onClick={() => {
                  confirmar_eliminar(params.row.id_proyecto as number);
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
                    sx={{
                      color: 'primary.main',
                      width: '18px',
                      height: '18px',
                    }}
                  />
                </Avatar>
              </IconButton>
              <IconButton
                onClick={() => {
                  set_id_proyecto(params.row.id_proyecto as number);
                  set_data_proyectos(params.row);
                  set_mode('select_proyecto');
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
        } else {
          return null;
        }
      },
    },
  ];

  // fechas
  const [start_date, set_start_date] = useState<Dayjs | null>(null);
  const [end_date, set_end_date] = useState<Dayjs | null>(null);

  const [data_proyectos, set_data_proyectos] = useState<GetProyectos>();

  const handle_start_date_change = (date: Dayjs | null): void => {
    set_value('fecha_inicio', dayjs(date));
    set_start_date(dayjs(date));
  };

  const handle_end_date_change = (date: Dayjs | null): void => {
    set_value('fecha_fin', dayjs(date));
    set_end_date(dayjs(date));
  };

  useEffect(() => {
    void fetch_data_proyectos();
  }, [data_programa]);

  useEffect(() => {
    if (data_programa !== undefined) {
      set_start_date(dayjs(data_programa.fecha_inicio));
      set_value('fecha_fin', data_programa.fecha_fin);
      set_value('fecha_inicio', data_programa.fecha_inicio);
      set_end_date(dayjs(data_programa.fecha_fin));
    }
  }, [data_programa !== undefined]);

  const confirmar_eliminar = (id_proyecto: number): void => {
    void Swal.fire({
      // title: "Estas seguro?",
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estas seguro?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await eliminar_id(id_proyecto, 'eliminar/proyecto');
          void fetch_data_proyectos();
          control_success('El proyecto se eliminó correctamente');
        } catch (error: any) {
          control_error(
            Boolean(error.response.data.detail) ||
              'hubo un error al eliminar, intenta de nuevo'
          );
        }
      }
    });
  };

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          p: '0px',
          m: '0 0 0 0',
          mb: '0px',
        }}
      >
        {' '}
        <Grid item xs={12}>
          <Title title="INFORMACIÓN DE PROGRAMA" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre del programa"
            fullWidth
            size="small"
            margin="dense"
            required
            name="nombre"
            disabled
            value={data_programa?.nombre}
            autoFocus
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
              disabled
              onChange={handle_start_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  disabled
                  size="small"
                  {...params}
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
              disabled
              onChange={handle_end_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
                  disabled
                  size="small"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
        {rows_proyectos.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Proyectos
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_proyectos}
                columns={columns}
                getRowId={(row) => row.id_proyecto}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        {!is_editar_proyecto && (
          <>
            <Grid item spacing={2} justifyContent="end" container>
              <Grid item>
                <LoadingButton
                  variant="outlined"
                  onClick={() => {
                    set_id_proyecto(null);
                    set_mode('register_proyecto');
                  }}
                >
                  Agregar Nuevo Proyecto
                </LoadingButton>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <Grid container spacing={2} mt={0.1}>
        {is_agregar_proyecto && (
          <>
            <AgregarProyectos
              fecha_inicial_programa={start_date as any}
              fecha_fin_programa={end_date as any}
            />
          </>
        )}
        {is_editar_proyecto && (
          <>
            <EditarProyecto data={data_proyectos} />
          </>
        )}
        {is_seleccionar_proyecto && (
          <>
            <SeleccionarProyecto data={data_proyectos} />
          </>
        )}
      </Grid>
    </>
  );
};

/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Avatar, Divider, IconButton, TextField, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { AgregarProyectos } from '../AgregarProyectos/AgregarProyectos';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "react-datepicker/dist/react-datepicker.css";
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
import { get_data_id } from '../../Request/request';
import { control_error } from '../../../../../helpers';
import { EditarProyecto } from '../ActualizarProyecto/EditarProyectos';
import type { GetProyectos } from '../../Interfaces/interfaces';

interface IProps {
  data: any;
  watch: any;
  register: any;
  set_value: any;
  set_id_proyecto: any;
  set_data: any;
  is_seleccionar_programa: boolean;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPrograma: React.FC<IProps> = (
  { data,
    register,
    set_value,
    set_id_proyecto,
    watch,
  }:
    IProps) => {

  const {
    rows_proyectos,
    set_rows_proyectos,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'id_proyecto',
      headerName: 'No Proyecto',
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
      field: 'vigencia_inicial',
      headerName: 'VIGENCIA INICIAL',
      sortable: true,
      width: 170,
    },
    {
      field: 'vigencia_final',
      headerName: 'VIGENCIA FINAL',
      sortable: true,
      width: 170,
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
                    sx={{ color: 'primary.main', width: '18px', height: '18px' }}
                    onClick={() => {
                      set_id_proyecto(params.row.id_proyecto as number)
                      set_data_proyectos(params.row)
                      set_is_agregar(false)
                      set_is_editar(true)
                      set_is_seleccionar(false)
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
        } else {
          return null;
        }
      },
    },


  ];


  const [form, setform] = useState({
    nombre: '',
    fecha_inicial: '',
    fecha_fin: '',
    id_programa: '',

  })

  const handle_change = (e: any) => {
    console.log('e.target.name', e.target.value)
    setform({
      ...data,
      [e.target.name]: e.target.value
    })
  }

  const [is_agregar, set_is_agregar] = useState(false);
  const [is_editar, set_is_editar] = useState(false);
  const [is_seleccionar, set_is_seleccionar] = useState(false);

  // fechas
  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const [data_proyectos, set_data_proyectos] = useState<GetProyectos>();

  const handle_start_date_change = (date: Date | null): void => {
    set_value('fecha_inicial', date)
    set_start_date(date)
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_value('fecha_fin', date)
    set_end_date(date)
  };

  const fetch_data = async (id_programa: number): Promise<void> => {
    try {
      await get_data_id(id_programa, set_rows_proyectos, 'get/proyectos/por/programas');
    } catch (error) {
      control_error(error);
    }
  };

  useEffect(() => {
    console.log('data editar programa', data)
    void fetch_data(data.id_programa);
  }, [data.id_programa]);

  useEffect(() => {
    if (data !== undefined) {
      set_start_date(new Date(data.fecha_inicio))
      set_value('fecha_fin', data.fecha_fin)
      set_value('fecha_inicio', data.fecha_inicio)
      set_end_date(new Date(data.fecha_fin))
    }
  }, [data !== undefined]);

  return (
    <>
      <Grid container spacing={2} mt={0.1}>
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
            onChange={handle_change
            }
            value={data.nombre}
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
              onChange={handle_start_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
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
              onChange={handle_end_date_change}
              renderInput={(params) => (
                <TextField
                  required
                  fullWidth
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
        {is_agregar && (
          <>
            <Grid item spacing={2} justifyContent="end" container>
              <Grid item>
                <LoadingButton
                  variant="outlined"
                  onClick={() => {
                    set_is_agregar(true)
                    set_is_editar(false)
                    set_is_seleccionar(false)
                    set_id_proyecto(null)
                  }}
                >
                  Agregar Nuevo Proyecto
                </LoadingButton>
              </Grid>
            </Grid>
          </>
        )}
      </Grid >
      <Grid container spacing={2} mt={0.1}>
        {is_agregar && (
          <>
            <AgregarProyectos
              register={register}
              watch={watch}
              set_value={set_value}
            />
          </>
        )}
        {is_editar && (
          <>
            <EditarProyecto
              data={data_proyectos}
              register={register}
              watch={watch}
              set_value={set_value}
              set_id_proyecto={set_id_proyecto}
            />
          </>
        )}
        {is_seleccionar && (
          <>
            {/* <AgregarPrograma /> */}
          </>
        )}

      </Grid>
    </>
  );
};

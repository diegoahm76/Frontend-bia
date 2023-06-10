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


// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarPrograma: React.FC = () => {

  const {
    rows_proyectos,
    set_rows_proyectos,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'id_programa',
      headerName: 'No Programa',
      sortable: true,
      width: 170,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE PROGRAMA',
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
        } else {
          return null;
        }
      },
    },


  ];

  const [is_agregar, set_is_agregar] = useState(false);

  useEffect(() => {
    void get_data_id(1, set_rows_proyectos, 'get/proyectos/por/programas');
  }, []);

  // fechas
  const [start_date, set_start_date] = useState<Date | null>(new Date());
  const [end_date, set_end_date] = useState<Date | null>(new Date());

  const handle_start_date_change = (date: Date | null): void => {
    set_start_date(date)
  };

  const handle_end_date_change = (date: Date | null): void => {
    set_end_date(date)
  };

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
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Proyectos
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          {rows_proyectos.length > 0 && (
            <>
              <DataGrid
                autoHeight
                rows={rows_proyectos}
                columns={columns}
                getRowId={(row) => row.nombre}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </>
          )}
          {/* <Grid item xs={12}>
                        <Grid container justifyContent="center" textAlign="center">
                            <Alert icon={false} severity="info">
                                <LinearProgress />
                                <Typography>No se encontraron resultados...</Typography>
                            </Alert>
                        </Grid>
                    </Grid> */}
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              onClick={() => { set_is_agregar(true) }}
            >
              Agregar Nuevo Proyecto
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              fullWidth
              color="success"
            // loading={is_saving}
            // disabled={is_saving}
            >
              Actualizar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid >
      <Grid container spacing={2} mt={0.1}>
        {is_agregar && (
          <>
            <AgregarProyectos />
          </>
        )}
      </Grid>
    </>
  );
};

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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const EditarProyecto: React.FC = () => {

  const {
    rows_actividades,
    set_rows_actividades,
  } = useContext(DataContext);

  const columns: GridColDef[] = [

    {
      field: 'id_proyecto',
      headerName: 'No PROYECTO',
      sortable: true,
      width: 170,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE PROYECTO',
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

  useEffect(() => {
    void get_data_id(1, set_rows_actividades, 'get/actividades/por/proyectos');
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
      <Grid item xs={12} sm={6}>
        <TextField
          label="Inversión total"
          fullWidth
          size="small"
          margin="dense"
          required
          autoFocus
          type="text"
        />
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Actividades
        </Typography>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        {rows_actividades.length > 0 && (
          <>
            <DataGrid
              density="compact"
              autoHeight
              rows={rows_actividades}
              columns={columns}
              getRowId={(row) => row.id_actividad}
              pageSize={10}
              rowsPerPageOptions={[10]}
              disableSelectionOnClick
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
            Agregar Nueva Actividad
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
            Guardar
          </LoadingButton>
        </Grid>
      </Grid>
      {is_agregar && (
        <>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Descripción de la actividad
            </Typography>
            {/* <Divider /> */}
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
            />
          </Grid>
          <Grid item spacing={2} justifyContent="end" container>
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
        </>
      )}
    </>
  );
};

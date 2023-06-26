/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Grid,
  TextField,
  Typography,
  Stack,
  IconButton,
  Avatar,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Title } from '../../../../components/Title';
import { LoadingButton } from '@mui/lab';
import { control_success } from '../../requets/Request';
import { control_error } from '../../../../helpers';
import { post_seccion_subscción } from '../request/request';
import { EditarSeccion } from './EditarSeccion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeccionSubseccionMain: React.FC = () => {
  const {
    register,
    handleSubmit: handle_submit,
    watch,
    reset,
    setValue: set_value,
    errors,
    rows_subseccion,
    id_seccion,
    id_subseccion,
    info_seccion,
    info_subseccion,
    is_editar_seccion,
    fetch_data_subseccion_por_seccion,
    fetch_data_seccion,
    set_info_subseccion,
    set_id_seccion,
    set_id_subseccion,
    set_mode,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    { field: 'id_subseccion', headerName: 'No SUBSECCIÓN', width: 120 },
    { field: 'nombre', headerName: 'NOMBRE', width: 200 },
    { field: 'descripcion', headerName: 'DESCRIPCIÓN', width: 300 },
    { field: 'fecha_creacion', headerName: 'FECHA CREACIÓN', width: 200 },
    { field: 'nombre_completo', headerName: 'PERSONA CREADORA', width: 300 },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 300,
      renderCell: (params) => (
        <>
          <IconButton onClick={() => {}}>
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
                titleAccess="Editar subsección"
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
              set_id_subseccion(params.row.id_subseccion);
              set_info_subseccion(params.row);
              // set_mode('subseccion');
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
                titleAccess="Seleccionar subsección"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
        </>
      ),
    },
  ];

  // watch
  const nombre_seccion = watch('nombre_seccion');
  const descripcion_seccion = watch('descripcion_seccion');
  const nombre_subseccion = watch('nombre_subseccion');
  const descripcion_subseccion = watch('descripcion_subseccion');

  const [is_saving, set_is_saving] = useState(false);
  const [current_date, set_current_date] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  useEffect(() => {
    void fetch_data_subseccion_por_seccion();
  }, [id_seccion]);

  useEffect(() => {
    set_current_date(dayjs().format('YYYY-MM-DD'));
    set_value('fecha_creacion', current_date);
    set_value('fecha_creacion_subseccion', current_date);
  }, []);

  useEffect(() => {
    if (info_seccion) {
      set_value('nombre_seccion', info_seccion.nombre);
      set_value('descripcion_seccion', info_seccion.descripcion);
    }
  }, [info_seccion]);
  
  useEffect(() => {
    if (info_subseccion) {
      set_value('nombre_subseccion', info_subseccion.nombre);
      set_value('descripcion_subseccion', info_subseccion.descripcion);
    }
  }, [info_subseccion]);
  
  const on_submit = handle_submit(async (form: any) => {
    try {
      set_is_saving(true);
      form.id_seccion = id_seccion;
      await post_seccion_subscción(form);
      control_success('Sección creada exitosamente');
      reset();
      await fetch_data_seccion();
      set_is_saving(false);
    } catch (error) {
      set_is_saving(false);
      control_error(error);
    }
  });
  return (
    <form
      onSubmit={(e) => {
        console.log(errors);
        void on_submit(e);
      }}
    >
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '20px',
          m: '10px 0 20px 0',
          mb: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Title title="ADMINISTRACION SECCIONES BIBLIOTECA" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Sección
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre sección"
            fullWidth
            required
            autoFocus
            size="small"
            value={nombre_seccion}
            {...register('nombre_seccion', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={current_date}
            disabled
            fullWidth
            required
            autoFocus
            size="small"
            {...register('fecha_creacion')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción sección"
            multiline
            fullWidth
            required
            autoFocus
            value={descripcion_seccion}
            size="small"
            {...register('descripcion_seccion', { required: true })}
          />
        </Grid>
        {is_editar_seccion && (
          <>
          <h1>EDITAR</h1>
          <EditarSeccion/>
          </>
          )}
        {rows_subseccion.length > 0 && (
          <>
            <Grid item xs={12}>
              <Title title="SUBSECCIÓN" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Listado de Subsecciones existentes
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_subseccion}
                columns={columns}
                getRowId={(row) => row.id_subseccion}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        <Stack
          justifyContent="flex-end"
          sx={{ m: '20px 20px 20px 20px' }}
          direction="row"
          spacing={2}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={() => {
              set_id_seccion(null);
              // set_mode('create');
            }}
          >
            Registrar nueva subsección
          </Button>
        </Stack>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Información subsección
          </Typography>
          <Divider />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre subsección"
            fullWidth
            required
            autoFocus
            size="small"
            value={nombre_subseccion}
            {...register('nombre_subseccion', { required: true })}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Fecha"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            value={current_date}
            disabled
            fullWidth
            required
            autoFocus
            size="small"
            {...register('fecha_creacion_subseccion')}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Descripción subsección"
            multiline
            fullWidth
            required
            autoFocus
            size="small"
            value={descripcion_subseccion}
            {...register('descripcion_subseccion', { required: true })}
          />
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              variant="outlined"
              color="primary"
              onClick={() => {
                reset();
              }}
              // startIcon={<SaveIcon />}
            >
              Limpiar
            </LoadingButton>
          </Grid>

          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              disabled={is_saving}
              loading={is_saving}
              // startIcon={<SaveIcon />}
            >
              Guardar
            </LoadingButton>
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

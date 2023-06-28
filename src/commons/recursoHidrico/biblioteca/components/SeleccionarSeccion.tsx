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
import { AgregarSubseccion } from './AgregarSubseccion';
import { EditarSubseccion } from './EditarSubseccion';
import { SeleccionarSubseccion } from './SeleccionarSubseccion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionarSeccion: React.FC = () => {
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
    is_register_subseccion,
    is_editar_subseccion,
    is_seleccionar_subseccion,
    fetch_data_subseccion_por_seccion,
    fetch_data_seccion,
    set_info_subseccion,
    set_id_seccion,
    set_id_subseccion,
    set_mode,
  } = useContext(DataContext);

  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 200,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    { field: 'fechaCreacion', headerName: 'FECHA CREACIÓN', width: 200 },
    {
      field: 'nombre_completo',
      headerName: 'PERSONA CREADORA',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 300,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              set_id_subseccion(params.row.id_subseccion);
              set_info_subseccion(params.row);
              set_mode('editar_subseccion');
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
              set_mode('select_subseccion');
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
    if (info_subseccion) {
      set_value('nombre_subseccion', info_subseccion.nombre);
      set_value('descripcion_subseccion', info_subseccion.descripcion);
    }
  }, [info_subseccion]);

  return (
    <>
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
          disabled
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
          value={info_seccion?.fecha_creacion}
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
          disabled
          autoFocus
          value={descripcion_seccion}
          size="small"
          {...register('descripcion_seccion', { required: true })}
        />
      </Grid>
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
              rowHeight={100}
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
            set_mode('register_subseccion');
          }}
        >
          Registrar nueva subsección
        </Button>
      </Stack>
      {is_register_subseccion && <AgregarSubseccion />}
      {is_editar_subseccion && <EditarSubseccion />}
      {is_seleccionar_subseccion && <SeleccionarSubseccion />}
    </>
  );
};

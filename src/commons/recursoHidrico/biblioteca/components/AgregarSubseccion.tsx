/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '../context/contextData';
import dayjs from 'dayjs';
import { LoadingButton } from '@mui/lab';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { type AuthSlice } from '../../../auth/interfaces';
import { v4 as uuidv4 } from 'uuid';
import type { TableAgregarSubseccion } from '../interfaces/interfaces';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSubseccion: React.FC = () => {
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
              set_edit_row(params.row);
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
              handle_eliminar(params.row);
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
                titleAccess="Eliminar subsección"
                sx={{
                  color: 'red',
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

  const { userinfo } = useSelector((state: AuthSlice) => state.auth);

  const {
    register,
    watch,
    setValue: set_value,
    id_seccion,
    rows_resgister_subseccion,
    fetch_data_subseccion_por_seccion,
    set_rows_register_subseccion,
    set_mode,
  } = useContext(DataContext);

  // watch
  const nombre_subseccion = watch('nombre_subseccion');
  const descripcion_subseccion = watch('descripcion_subseccion');

  const [is_form_valid, set_is_form_valid] = useState(false);
  const [edit_row, set_edit_row] = useState<TableAgregarSubseccion | null>(
    null
  );
  const [current_date, set_current_date] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  const check_form_validity = (): void => {
    const is_nombre_subseccion_valid = nombre_subseccion !== '';
    const is_descripcion_subseccion_valid = descripcion_subseccion !== '';

    set_is_form_valid(
      is_nombre_subseccion_valid && is_descripcion_subseccion_valid
    );
  };

  const handle_aceptar = (): void => {
    const new_subseccion = {
      id: uuidv4(),
      nombre: nombre_subseccion,
      descripcion: descripcion_subseccion,
      fechaCreacion: current_date,
      nombre_completo: userinfo.nombre,
    };

    if (edit_row) {
      // Actualizar la fila existente
      const updated_rows = rows_resgister_subseccion.map((row) => {
        if (row.id === edit_row.id) {
          return new_subseccion;
        }
        return row;
      });
      set_rows_register_subseccion(updated_rows);
      set_edit_row(null); // Restablecer el estado de edición
    } else {
      // Agregar una nueva fila
      set_rows_register_subseccion([
        ...rows_resgister_subseccion,
        new_subseccion,
      ]);
    }

    limpiar();
  };

  const handle_eliminar = (row: any): void => {
    const updated_rows = rows_resgister_subseccion.filter(
      (r) => r.id !== row.id
    );
    set_rows_register_subseccion(updated_rows);
  };

  const limpiar = (): void => {
    set_value('descripcion_subseccion', '');
    set_value('nombre_subseccion', '');
  };
  useEffect(() => {
    check_form_validity();
  }, [nombre_subseccion, descripcion_subseccion]);

  useEffect(() => {
    void fetch_data_subseccion_por_seccion();
  }, [id_seccion]);

  useEffect(() => {
    limpiar();
    set_current_date(dayjs().format('YYYY-MM-DD'));
    set_value('fecha_creacion_subseccion', current_date);
  }, []);

  useEffect(() => {
    if (edit_row) {
      set_value('nombre_subseccion', edit_row.nombre);
      set_value('descripcion_subseccion', edit_row.descripcion);
    } else {
      limpiar();
    }
  }, [edit_row]);

  return (
    <>
      <Grid item xs={12}>
        <Typography variant="subtitle1" fontWeight="bold">
          Información subsección
        </Typography>
        <Divider />
      </Grid>
      {rows_resgister_subseccion.length > 0 && (
        <Grid item xs={12}>
          <DataGrid
            autoHeight
            rows={rows_resgister_subseccion}
            columns={columns}
            getRowId={(row) => row.id}
            pageSize={5}
            rowsPerPageOptions={[5]}
            rowHeight={100}
          />
        </Grid>
      )}
      <Grid item xs={12} sm={6}>
        <TextField
          label="Persona Creadora"
          fullWidth
          disabled
          autoFocus
          size="small"
          value={userinfo.nombre}
          {...register('persona_creadora')}
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
          required={!(rows_resgister_subseccion.length > 0)}
          autoFocus
          size="small"
          {...register('fecha_creacion_subseccion')}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <TextField
          label="Nombre subsección"
          fullWidth
          required={!(rows_resgister_subseccion.length > 0)}
          autoFocus
          size="small"
          value={nombre_subseccion}
          {...register('nombre_subseccion', {
            required: !(rows_resgister_subseccion.length > 0),
          })}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          label="Descripción subsección"
          multiline
          fullWidth
          required={!(rows_resgister_subseccion.length > 0)}
          autoFocus
          size="small"
          value={descripcion_subseccion}
          {...register('descripcion_subseccion', {
            required: !(rows_resgister_subseccion.length > 0),
          })}
        />
      </Grid>
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="outlined"
            color="error"
            onClick={() => {
              set_mode('register_seccion');
            }}
            // startIcon={<SaveIcon />}
          >
            Descartar
          </LoadingButton>
        </Grid>
        <Grid item>
          <LoadingButton
            variant="outlined"
            color="warning"
            onClick={() => {
              limpiar();
            }}
            // startIcon={<SaveIcon />}
          >
            Limpiar
          </LoadingButton>
        </Grid>
        <Grid item>
          <LoadingButton
            variant="outlined"
            color="success"
            onClick={handle_aceptar}
            disabled={!is_form_valid}
          >
            Aceptar
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

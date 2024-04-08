/* eslint-disable @typescript-eslint/naming-convention */
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
  ButtonGroup,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistIcon from '@mui/icons-material/Checklist';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../components/Title';
import { AgregarSubseccion } from './AgregarSubseccion';
import { SeleccionarSubseccion } from './SeleccionarSubseccion';
import { LoadingButton } from '@mui/lab';
import { delete_seccion_id, delete_subseccion_id } from '../request/request';
import Swal from 'sweetalert2';
import { control_success } from '../../requets/Request';
import { control_error } from '../../../../helpers';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import SaveIcon from '@mui/icons-material/Save';
// eslint-disable-next-line @typescript-eslint/naming-convention
export const SeleccionarSeccion: React.FC = () => {
  const {
    register,
    watch,
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
    rows_to_delete_subseecion,
    is_saving,
    set_rows_to_delete_subseecion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
    set_info_subseccion,
    set_id_subseccion,
    set_rows_subseccion,
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
    { field: 'fechaCreacion', headerName: 'FECHA CREACIÓN', width: 200,
     valueFormatter: (params) => {
      const date = new Date(params.value);
      const formattedDate = `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
      return formattedDate;
    },
  },
    {
      field: 'nombre_completo',
      headerName: 'PERSONA CREADORA',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    { field: 'instrumentos_count', headerName: 'No. INSTRUMENTOS', width: 100 },
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
              set_value('nombre_subseccion', params.row.nombre);
              set_value('descripcion_subseccion', params.row.descripcion);
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
              void handle_eliminar(params.row);
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

  useEffect(() => {
    void fetch_data_subseccion_por_seccion();
  }, [id_seccion]);

  useEffect(() => {
    set_value('fecha_creacion', info_seccion?.fecha_creacion);
    set_value('fecha_creacion_subseccion', info_subseccion?.fechaCreacion);
  }, []);

  useEffect(() => {
    if (info_seccion) {
      set_value('nombre_seccion', info_seccion.nombre);
      set_value('descripcion_seccion', info_seccion.descripcion);
    }
  }, [info_seccion]);

  // watch
  const nombre_subseccion = watch('nombre_subseccion');
  const descripcion_subseccion = watch('descripcion_subseccion');

  useEffect(() => {
    if (info_subseccion) {
      set_value('nombre_subseccion', info_subseccion.nombre);
      set_value('descripcion_subseccion', info_subseccion.descripcion);
    }
  }, [info_subseccion]);

  const handle_actualizar_subseccion = (): void => {
    // Obtener los valores actualizados del formulario
    const nombre_subseccion = watch('nombre_subseccion');
    const descripcion_subseccion = watch('descripcion_subseccion');

    // Actualizar los datos en la lista rows_subseccion
    const updated_rows = rows_subseccion.map((row) => {
      if (row.id_subseccion === id_subseccion) {
        return {
          ...row,
          nombre: nombre_subseccion,
          descripcion: descripcion_subseccion,
        };
      }
      return row;
    });

    set_rows_subseccion(updated_rows);
    // Limpiar los valores del formulario
    set_value('nombre_subseccion', '');
    set_value('descripcion_subseccion', '');
  };

  // const handle_eliminar_subseccion = (row: any): void => {
  //   set_rows_to_delete_subseecion([
  //     ...rows_to_delete_subseecion,
  //     row.id_subseccion,
  //   ]);
  //   const updated_rows = rows_subseccion.filter(
  //     (r) => r.id_subseccion !== row.id_subseccion
  //   );
  //   set_rows_subseccion(updated_rows);
  // };

  useEffect(() => {
    //  console.log('')(rows_to_delete_subseecion, 'rows_to_delete_subseecion');
    //  console.log('')(rows_subseccion, 'rows_subseccion');
  }, [rows_to_delete_subseecion]);

  const handle_eliminar = async (row: any): Promise<void> => {
    const result = await Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro de eliminar esta subsección?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      try {
        await delete_subseccion_id(row.id_subseccion);
        await fetch_data_subseccion_por_seccion();
        control_success('Se eliminó correctamente');
        // handle_eliminar_subseccion(row);
      } catch (error: any) {
        control_error(error.response.data.detail);
      }
    }
  };
  const confirmar_eliminar = (id_seccion: number): void => {
    void Swal.fire({
      customClass: {
        confirmButton: 'square-btn',
        cancelButton: 'square-btn',
      },
      width: 350,
      text: '¿Estás seguro de eliminar esta sección?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0EC32C',
      cancelButtonColor: '#DE1616',
      confirmButtonText: 'Si, elminar!',
      cancelButtonText: 'Cancelar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await delete_seccion_id(id_seccion);
          void fetch_data_seccion();
          control_success('Se eliminó correctamente');
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
          {...register('nombre_seccion')}
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
          {...register('descripcion_seccion')}
        />
      </Grid>
      {rows_subseccion.length > 0 && (
        <>
          <Grid item xs={12}>
            <Title title="Subsección" />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Listado de Subsecciones existentes
            </Typography>
            <Divider />
            <ButtonGroup
              style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
            >
              {download_xls({ nurseries: rows_subseccion, columns })}
              {download_pdf({ nurseries: rows_subseccion, columns, title: ' Listado de Subsecciones' })}
            </ButtonGroup> 
          </Grid>
          <Grid item xs={12}>
            <DataGrid
              autoHeight
              rows={rows_subseccion}
              columns={columns}
              getRowId={(row) => row.id_subseccion}
              pageSize={10}
              rowsPerPageOptions={[10]}
              rowHeight={100}
            />
          </Grid>
        </>
      )}
      {!is_editar_subseccion && !is_seleccionar_subseccion && (
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
              // set_id_seccion(null);
              set_mode('register_subseccion');
            }}
          >
            Registrar nueva subsección
          </Button>
        </Stack>
      )}
      {is_register_subseccion && <AgregarSubseccion />}
      {is_editar_subseccion && (
        <>
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
              required={!(rows_subseccion.length > 0)}
              autoFocus
              size="small"
              value={nombre_subseccion}
              {...register('nombre_subseccion', {
                required: !(rows_subseccion.length > 0),
              })}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Fecha"
              type="text"
              value={info_subseccion?.fechaCreacion}
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
              required={!(rows_subseccion.length > 0)}
              autoFocus
              size="small"
              value={descripcion_subseccion}
              {...register('descripcion_subseccion', {
                required: !(rows_subseccion.length > 0),
              })}
            />
          </Grid>
          <Grid item spacing={2} justifyContent="end" container>
            <Grid item>
              <LoadingButton
                variant="outlined"
                color="primary"
                onClick={handle_actualizar_subseccion}
              >
                Aceptar
              </LoadingButton>
            </Grid>
          </Grid>
        </>
      )}
      {is_seleccionar_subseccion && <SeleccionarSubseccion />}
      <Grid item spacing={2} justifyContent="end" container>
        <Grid item>
          <LoadingButton
            variant="outlined"
            color="error"
            disabled={!(rows_subseccion.length === 0)}
            onClick={() => {
              confirmar_eliminar(id_seccion as number);
            }}
          >
            Borrar Sección
          </LoadingButton>
        </Grid>
        {is_register_subseccion && (
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              disabled={is_saving}
              loading={is_saving}
            >
              Guaradar
            </LoadingButton>
          </Grid>
        )}
        {!is_register_subseccion && (
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              startIcon={<SaveIcon />}
              disabled={is_saving}
              loading={is_saving}
            >
              Actualizar
            </LoadingButton>
          </Grid>
        )}
      </Grid>
    </>
  );
};

/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { AgregarSeccionSubSeccion } from '../components/AgregarSeccionSubSeccion';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BibliotecaScreen: React.FC = () => {
  const {
    rows_seccion,
    fetch_data_seccion,
    set_id_seccion,
    set_info_seccion,
    info_seccion,
  } = useContext(DataContext);

  const {
    register,
    handleSubmit: handle_submit,
    reset,
    setValue: set_value,
    formState: { errors },
  } = useForm();

  const [is_saving, set_is_saving] = useState(false);

  const columns: GridColDef[] = [
    { field: 'id_seccion', headerName: 'No SECCIÓN', width: 120 },
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
          <IconButton
            onClick={() => {
              set_info_seccion(params.row);
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
                titleAccess="Editar Sección"
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
              set_id_seccion(params.row.id_seccion);
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
                titleAccess="Seleccionar Sección"
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

  useEffect(() => {
    void fetch_data_seccion();
  }, []);

  return (
    <>
      {<AgregarSeccionSubSeccion />}
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
          <Title title="SECCIÓN" />
        </Grid>
        {rows_seccion.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Listado de secciones existentes
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_seccion}
                columns={columns}
                getRowId={(row) => row.id_seccion}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
      </Grid>
      {/* <form
        onSubmit={(e) => {
          console.log(errors);
          // void on_submit(e);
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
          {' '}
          <Grid item xs={12}>
            <Title title="EDICIÓN SECCIÓN" />
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
              value={info_seccion?.nombre}
              size="small"
              {...register('nombre_seccion', { required: true })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Descripción sección"
              multiline
              fullWidth
              required
              autoFocus
              value={info_seccion?.descripcion}
              size="small"
              {...register('descripcion_seccion', { required: true })}
            />
          </Grid>
        </Grid>
        <Grid item spacing={2} justifyContent="end" container>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="contained"
              color="success"
              disabled={is_saving}
              loading={is_saving}
              // startIcon={<SaveIcon />}
            >
              Actualizar
            </LoadingButton>
          </Grid>
          <Grid item>
            <LoadingButton
              type="submit"
              variant="outlined"
              color="error"
              disabled={is_saving}
              loading={is_saving}
              // startIcon={<SaveIcon />}
            >
              Borrar
            </LoadingButton>
          </Grid>
        </Grid>

      </form> */}
    </>
  );
};

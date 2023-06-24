import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';
import { Title } from '../../../../components/Title';
import { useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { control_success } from '../../requets/Request';
import { control_error } from '../../../../helpers';
import { post_seccion_subscción } from '../request/request';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSeccionSubSeccion: React.FC = () => {
  const {
    register,
    handleSubmit: handle_submit,
    reset,
    setValue: set_value,
    formState: { errors },
  } = useForm();

  const columns: GridColDef[] = [
    { field: 'id_subseccion', headerName: 'No SUBSECCIÓN', width: 120 },
    { field: 'nombre', headerName: 'NOMBRE', width: 200 },
    { field: 'descripcion', headerName: 'DESCRIPCIÓN', width: 300 },
    { field: 'fecha_creacion', headerName: 'FECHA CREACIÓN', width: 200 },
    { field: 'nombre_completo', headerName: 'PERSONA CREADORA', width: 300 },
    // {
    //   field: 'ACCIONES',
    //   headerName: 'ACCIONES',
    //   width: 300,
    //   renderCell: (params) => (
    //     <>
    //       <IconButton onClick={() => {}}>
    //         <Avatar
    //           sx={{
    //             width: 24,
    //             height: 24,
    //             background: '#fff',
    //             border: '2px solid',
    //           }}
    //           variant="rounded"
    //         >
    //           <EditIcon
    //             titleAccess="Editar Programa"
    //             sx={{
    //               color: 'primary.main',
    //               width: '18px',
    //               height: '18px',
    //             }}
    //           />
    //         </Avatar>
    //       </IconButton>
    //       <IconButton onClick={() => {}}>
    //         <Avatar
    //           sx={{
    //             width: 24,
    //             height: 24,
    //             background: '#fff',
    //             border: '2px solid',
    //           }}
    //           variant="rounded"
    //         >
    //           <ChecklistIcon
    //             titleAccess="Seleccionar Programa"
    //             sx={{
    //               color: 'primary.main',
    //               width: '18px',
    //               height: '18px',
    //             }}
    //           />
    //         </Avatar>
    //       </IconButton>
    //     </>
    //   ),
    // },
  ];

  const {
    rows_subseccion,
    fetch_data_subseccion_por_seccion,
    fetch_data_seccion,
    id_seccion,
  } = useContext(DataContext);

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

  const on_submit = handle_submit(async (form: any) => {
    try {
      set_is_saving(true);
      form.id_seccion = null;
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
        {' '}
        <Grid item xs={12}>
          <Title title="SECCIÓN" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Nombre sección"
            fullWidth
            required
            autoFocus
            size="small"
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
            size="small"
            {...register('descripcion_seccion', { required: true })}
          />
        </Grid>
        {rows_subseccion.length > 0 && (
          <>
            <Grid item xs={12}>
              <Title title="SUBSECCIONES" />
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

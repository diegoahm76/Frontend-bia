import type React from 'react';
import { useContext, useEffect, useState } from 'react';
import { Divider, Grid, TextField, Typography } from '@mui/material';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import dayjs from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const AgregarSeccionSubSeccion: React.FC = () => {
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

  const { rows_subseccion, fetch_data_subseccion_por_seccion } =
    useContext(DataContext);
  const [current_date, set_current_date] = useState(
    dayjs().format('YYYY-MM-DD')
  );

  useEffect(() => {
    void fetch_data_subseccion_por_seccion();
  }, []);

  useEffect(() => {
    set_current_date(dayjs().format('YYYY-MM-DD'));
  }, []);

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
          size="small"
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
        />
      </Grid>
      <Grid item xs={12}>
        {rows_subseccion.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Subsecciones
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
        />
      </Grid>
    </>
  );
};

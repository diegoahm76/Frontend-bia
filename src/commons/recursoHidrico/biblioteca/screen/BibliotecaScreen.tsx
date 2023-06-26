/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useForm } from 'react-hook-form';
import { SeccionSubseccionMain } from '../components/SeccionSubseccionMain';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BibliotecaScreen: React.FC = () => {
  const {
    rows_seccion,
    fetch_data_seccion,
    set_id_seccion,
    set_info_seccion,
    set_is_editar_seccion,
    set_is_seleccionar_seccion,
  } = useContext(DataContext);

  const {
    register,
    handleSubmit: handle_submit,
    reset,
    setValue: set_value,
    formState: { errors },
  } = useForm();

  const columns: GridColDef[] = [
    { field: 'id_seccion', headerName: 'No SECCIÓN', width: 120 },
    { field: 'nombre', headerName: 'NOMBRE', width: 200 },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      width: 400,
      renderCell: (params) => (
        <div
          style={{
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            height: 'auto',
            overflowWrap: 'break-word',
            wordBreak: 'break-word',
            maxHeight: '100px',
          }}
        >
          {params.value}
        </div>
      ),
    },
    { field: 'fecha_creacion', headerName: 'FECHA CREACIÓN', width: 200 },
    { field: 'nombre_completo', headerName: 'PERSONA CREADORA', width: 300 },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              set_info_seccion(params.row);
              set_is_editar_seccion(true);
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
              set_info_seccion(params.row);
              set_is_seleccionar_seccion(true);
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
      {<SeccionSubseccionMain />}
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
                columns={columns.map((column) => ({
                  ...column,
                  wrapText: true,
                }))}
                getRowId={(row) => row.id_seccion}
                pageSize={5}
                rowsPerPageOptions={[5]}
                rowHeight={100} // Aumenta la altura de las filas
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

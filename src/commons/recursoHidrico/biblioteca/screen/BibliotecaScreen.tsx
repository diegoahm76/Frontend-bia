/* eslint-disable @typescript-eslint/no-unused-vars */
import { Avatar, ButtonGroup, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Title } from '../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useForm } from 'react-hook-form';
import { SeccionSubseccionMain } from '../components/SeccionSubseccionMain';
import '../css/styles.css';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const BibliotecaScreen: React.FC = () => {
  const {
    rows_seccion,
    fetch_data_seccion,
    set_id_seccion,
    set_info_seccion,
    set_is_editar_seccion,
    set_mode,
  } = useContext(DataContext);

  const {
    register,
    handleSubmit: handle_submit,
    reset,
    setValue: set_value,
    formState: { errors },
  } = useForm();

  const columns: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      width: 400,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    { field: 'fecha_creacion', headerName: 'FECHA CREACIÓN', width: 200 },
    {
      field: 'nombre_completo',
      headerName: 'PERSONA CREADORA',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 120,
      renderCell: (params) => (
        <>
          <IconButton
            onClick={() => {
              set_info_seccion(params.row);
              set_id_seccion(params.row.id_seccion);
              set_mode('editar_seccion');
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
              set_mode('select_seccion');
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
          <Title title="Sección" />
        </Grid>
        {rows_seccion.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Listado de secciones existentes
              </Typography>
              <Divider />
              <ButtonGroup
                style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
              >
                {download_xls({ nurseries: rows_seccion, columns })}
                {download_pdf({ nurseries: rows_seccion, columns, title: '   Listado de secciones' })}
              </ButtonGroup> 
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_seccion}
                columns={columns}
                getRowId={(row) => row.id_seccion}
                pageSize={10}
                rowsPerPageOptions={[10]}
                rowHeight={150}
              />
            </Grid>
          </>
        )}
      <Grid item container justifyContent="flex-end" spacing={2}>
        <ButtonSalir/>
      </Grid>
      </Grid>
    </>
  );
};

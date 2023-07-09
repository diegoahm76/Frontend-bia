import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useContext, useEffect } from 'react';
import { DataContext } from '../context/contextData';
import '../css/styles.css';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaBibliotecaSreen: React.FC = () => {
  const columns_seccion: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 400,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      width: 600,
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
              set_id_seccion(params.row.id_seccion);
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
  const columns_subseccion: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCIÓN',
      width: 600,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
    { field: 'instrumentos', headerName: 'No. INSTRUMENTOS', width: 200 },
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

  const {
    id_seccion,
    rows_seccion,
    rows_subseccion,
    info_seccion,
    set_id_seccion,
    set_info_seccion,
    set_id_subseccion,
    set_info_subseccion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
  } = useContext(DataContext);

  useEffect(() => {
    void fetch_data_seccion();
  }, []);

  useEffect(() => {
    void fetch_data_subseccion_por_seccion();
  }, [id_seccion]);

  return (
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
        <Title title="VISUALIZACIÓN BIBLIOTECA" />
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
              columns={columns_seccion}
              getRowId={(row) => row.id_seccion}
              pageSize={5}
              rowsPerPageOptions={[5]}
              rowHeight={80}
            />
          </Grid>
        </>
      )}
      {rows_subseccion.length > 0 && (
        <>
        <Grid item xs={12}>
        <Title title="SUBSECCIONES" />
      </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1" fontWeight="bold">
              Sección seleccionada:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              size="small"
              disabled
              fullWidth
              value={info_seccion?.nombre}
            />
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
              columns={columns_subseccion}
              getRowId={(row) => row.id_subseccion}
              pageSize={5}
              rowsPerPageOptions={[5]}
              rowHeight={80}
            />
          </Grid>
        </>
      )}
      
    </Grid>
  );
};

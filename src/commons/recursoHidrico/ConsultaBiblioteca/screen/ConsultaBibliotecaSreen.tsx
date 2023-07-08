/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Avatar,
  Box,
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
import { v4 as uuidv4 } from 'uuid';
import '../css/styles.css';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { BusquedaInstrumentos } from '../components/BusquedaInstrumentos';
import { BusquedaInstrumentosBasica } from '../components/BusquedaInstrumentosBasica';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaBibliotecaSreen: React.FC = (): JSX.Element => {
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
  const columns_cuencas: GridColDef[] = [
    {
      field: 'ubicacion',
      headerName: 'UBICACIÓN',
      width: 300,
    },
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
  ];
  const columns_anexos: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      width: 300,
    },
    {
      field: 'archivo',
      headerName: 'ARCHIVO',
      width: 200,
      renderCell: (params) => (
        <DownloadButton
          fileUrl={params.value}
          fileName={params.row.nombre}
          condition={false}
        />
      ),
    },
  ];

  const {
    id_seccion,
    rows_seccion,
    rows_subseccion,
    info_seccion,
    info_subseccion,
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

  const info_instrumento = {
    nombre: 'PORH RIO GUATAQUIA',
    cuencas: [
      {
        ubicacion: 'META',
        nombre: 'CUENCA RIO GUATAQUIA',
      },
      {
        ubicacion: 'META',
        nombre: 'CUENCA RIO GUATAQUIA 2',
      },
    ],
    fecha_vigencia: '01/10/2022',
    resolucion: 'P.J-7.20-03-2008',
    anexos: [
      {
        nombre: 'ANEXO 1',
        archivo:
          'https://image.slidesharecdn.com/laresolucin-140622160742-phpapp02/85/la-resolucin-3-320.jpg?cb=1665748181',
      },
      {
        nombre: 'ANEXO 2',
        archivo:
          'https://static.docsity.com/documents_first_pages/2019/09/20/df0c20aa9b53e9265f863197def9b536.png',
      },
    ],
  };

  return (
    <>
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
                id="disabled-field"
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
        {info_subseccion && (
          <>
            <Grid item xs={12}>
              <Title title="INSTRUMENTOS" />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Subsección seleccionada:
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12}>
              <TextField
                size="small"
                disabled
                fullWidth
                value={info_subseccion?.nombre}
                id="disabled-field"
              />
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
              <BusquedaInstrumentosBasica />
            </Box>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Detalle de instrumento seleccionado:
              </Typography>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre del instrumento"
                size="small"
                disabled
                fullWidth
                value={info_instrumento?.nombre}
                id="disabled-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de vigencia"
                size="small"
                disabled
                fullWidth
                value={info_instrumento?.fecha_vigencia}
                id="disabled-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Resolución"
                size="small"
                disabled
                fullWidth
                value={info_instrumento?.resolucion}
                id="disabled-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Cuencas Asociadas:
              </Typography>
              <Divider />
              <DataGrid
                autoHeight
                rows={info_instrumento.cuencas}
                columns={columns_cuencas}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Anexos:
              </Typography>
              <Divider />
              <DataGrid
                autoHeight
                rows={info_instrumento.anexos}
                columns={columns_anexos}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
      </Grid>
      <Grid container justifyContent="flex-end" spacing={2}>
        <BusquedaInstrumentos />
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
    </>
  );
};

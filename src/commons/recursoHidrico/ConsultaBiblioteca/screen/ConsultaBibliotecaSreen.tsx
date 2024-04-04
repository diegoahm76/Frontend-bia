/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import { Title } from '../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/contextData';
import { v4 as uuidv4 } from 'uuid';
import '../css/styles.css';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';
import { ButtonSalir } from '../../../../components/Salir/ButtonSalir';
import { BusquedaInstrumentos } from '../components/BusquedaInstrumentos';
import { BusquedaInstrumentosBasica } from '../components/BusquedaInstrumentosBasica';
import { DialogLaboratorio } from '../components/DialogLaboratorio';
import { DialogCartera } from '../components/DialogCartera';
import { DialogBombeo } from '../components/DialogBombeo';
import { download_pdf } from '../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../documentos-descargar/XLS_descargar';

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
              set_nombre_seccion(params.row.nombre);
              set_nombre_subseccion('');
              set_info_instrumento({
                id_instrumento: 0,
                nombre: '',
                id_resolucion: 0,
                fecha_registro: '',
                fecha_creacion_instrumento: '',
                fecha_fin_vigencia: '',
                cod_tipo_agua: '',
                id_seccion: 0,
                id_subseccion: 0,
                id_persona_registra: 0,
                id_pozo: null,
              });
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
              set_nombre_subseccion(params.row.nombre);
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
      field: 'cuenca',
      headerName: 'NOMBRE CUENCA',
      width: 300,
      renderCell: (params) => <div className="container">{params.value}</div>,
    },
  ];
  const columns_anexos: GridColDef[] = [
    {
      field: 'nombre_archivo',
      headerName: 'NOMBRE ANEXO',
      width: 300,
    },
    {
      field: 'ruta_archivo',
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
    rows_anexos,
    nombre_seccion,
    nombre_subseccion,
    id_instrumento,
    rows_cuencas_instrumentos,
    info_instrumentos,
    set_info_instrumento,
    set_id_seccion,
    set_nombre_seccion,
    set_id_subseccion,
    set_nombre_subseccion,
    fetch_data_seccion,
    fetch_data_subseccion_por_seccion,
    fetch_data_cuencas_instrumentos,
    fetch_data_instrumento,
    fetch_data_anexos,
  } = useContext(DataContext);

  const [is_open_modal_laboratorio, set_is_open_modal_laboratorio] =
    useState(false);
  const [is_open_modal_cartera, set_is_open_modal_cartera] = useState(false);
  const [is_open_modal_bombeo, set_is_open_modal_bombeo] = useState(false);

  const handle_open_laboratorio = (): void => {
    set_is_open_modal_laboratorio(true);
  };

  const handle_open_cartera = (): void => {
    set_is_open_modal_cartera(true);
  };

  const handle_open_bombeo = (): void => {
    set_is_open_modal_bombeo(true);
  };

  useEffect(() => {
    void fetch_data_seccion();
  }, []);

  useEffect(() => {
    if (id_seccion) {
      void fetch_data_subseccion_por_seccion();
    }
  }, [id_seccion]);

  useEffect(() => {
    if (id_instrumento) {
      void fetch_data_cuencas_instrumentos();
      void fetch_data_instrumento();
      void fetch_data_anexos();
    }
  }, [id_instrumento]);

  useEffect(() => {
    if (info_instrumentos) {
      //  console.log('')(info_instrumentos);
    }
  }, [info_instrumentos]);

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
          <Title title="Visualización biblioteca" />
        </Grid>
        {rows_seccion.length > 0 ? (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Listado de secciones existentes
              </Typography>
              <Divider />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <ButtonGroup style={{ margin: 7 }}>
                  {download_xls({ nurseries: rows_seccion, columns: columns_seccion })}
                  {download_pdf({ nurseries: rows_seccion, columns: columns_seccion, title: 'Listado de secciones existentes' })}
                </ButtonGroup>
              </div>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_seccion}
                columns={columns_seccion}
                getRowId={(row) => row.id_seccion}
                pageSize={10}
                rowsPerPageOptions={[10]}
                rowHeight={80}
              />
            </Grid>
          </>
        ) : null}
        {rows_subseccion.length > 0 ? (
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
                value={nombre_seccion}
                id="disabled-field"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Listado de Subsecciones existentes
              </Typography>
              <Divider />
              <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

                {download_xls({ nurseries: rows_subseccion, columns:columns_subseccion })}
                {download_pdf({ nurseries: rows_subseccion, columns: columns_subseccion, title: 'Listado de Subsecciones existentes' })}

              </ButtonGroup>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_subseccion}
                columns={columns_subseccion}
                getRowId={(row) => row.id_subseccion}
                pageSize={10}
                rowsPerPageOptions={[10]}
                rowHeight={80}
              />
            </Grid>
          </>
        ) : null}
        {nombre_subseccion ? (
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
                value={nombre_subseccion}
                id="disabled-field"
              />
            </Grid>
            <Box sx={{ flexGrow: 1 }}>
              <BusquedaInstrumentosBasica />
            </Box>
          </>
        ) : null}
        {info_instrumentos ? (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Detalle de instrumento seleccionado:
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Nombre del instrumento
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Fecha de vigencia
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                disabled
                fullWidth
                value={info_instrumentos?.nombre}
                id="disabled-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                size="small"
                disabled
                fullWidth
                value={info_instrumentos?.fecha_fin_vigencia}
                id="disabled-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Resolución"
                size="small"
                disabled
                fullWidth
                value="RESOLUCION CORMACARENA"
                id="disabled-field"
              />
            </Grid>
            <Grid item xs={12} sm={6}></Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Cuencas Asociadas al instrumento:
              </Typography>
              <Divider />
              <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

                {download_xls({ nurseries: rows_cuencas_instrumentos, columns: columns_cuencas })}
                {download_pdf({ nurseries: rows_cuencas_instrumentos, columns: columns_cuencas, title: 'Cuencas Asociadas' })}

              </ButtonGroup>
              <DataGrid
                autoHeight
                rows={rows_cuencas_instrumentos}
                columns={columns_cuencas}
                getRowId={(row) => uuidv4()}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" fontWeight="bold">
                Anexos asociados al instrumento:
              </Typography>
              <ButtonGroup style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}>

                {download_xls({ nurseries: rows_anexos, columns: columns_anexos })}
                {download_pdf({ nurseries: rows_anexos, columns: columns_anexos, title: 'Anexos asociados' })}

              </ButtonGroup>
              <Divider />
              <DataGrid
                autoHeight
                rows={rows_anexos}
                columns={columns_anexos}
                getRowId={(row) => uuidv4()}
                pageSize={10}
                rowsPerPageOptions={[10]}
              />
            </Grid>
            {info_instrumentos?.cod_tipo_agua === 'SUP' ? (
              <>
                <Grid item xs={12} sm={6} md={3}></Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => {
                      handle_open_cartera();
                    }}
                  >
                    Ver Cartera de aforo
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => {
                      handle_open_laboratorio();
                    }}
                  >
                    Ver resultado de laboratorio
                  </Button>
                </Grid>
              </>
            ) : null}
            {info_instrumentos?.cod_tipo_agua === 'SUB' ? (
              <>
                <Grid item xs={12} sm={6} md={3}></Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => {
                      handle_open_bombeo();
                    }}
                  >
                    Prueba de bombeo
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <Button
                    variant="outlined"
                    fullWidth
                    color="primary"
                    onClick={() => {
                      handle_open_laboratorio();
                    }}
                  >
                    Ver resultado de laboratorio
                  </Button>
                </Grid>
              </>
            ) : null}
          </>
        ) : null}
      </Grid>
      <Grid
        container
        justifyContent="flex-end"
        spacing={2}
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
        <BusquedaInstrumentos />
        <Grid item>
          <ButtonSalir />
        </Grid>
      </Grid>
      <DialogLaboratorio
        is_modal_active={is_open_modal_laboratorio}
        set_is_modal_active={set_is_open_modal_laboratorio}
      />
      <DialogCartera
        is_modal_active={is_open_modal_cartera}
        set_is_modal_active={set_is_open_modal_cartera}
      />
      <DialogBombeo
        is_modal_active={is_open_modal_bombeo}
        set_is_modal_active={set_is_open_modal_bombeo}
      />
    </>
  );
};

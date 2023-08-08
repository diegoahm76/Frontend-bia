/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import type React from 'react';
import {
  useContext,
  type Dispatch,
  type SetStateAction,
  useEffect,
} from 'react';
import { DataContext } from '../context/contextData';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { Title } from '../../../../components/Title';
import { v4 as uuidv4 } from 'uuid';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogBombeo: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
}) => {
  const get_header_name = (code: string): any => {
    switch (code) {
      case 'ACC':
        return 'Abatimiento a Caudal Constante';
      case 'ACE':
        return 'Abatimiento a Caudal Escalonado';
      case 'RCE':
        return 'Recuperación a Caudal Escalonado';
      case 'RCC':
        return 'Recuperación a Caudal Constante';
      default:
        return '';
    }
  };
  const colums_bombeo: GridColDef[] = [
    {
      field: 'ubicacion_prueba',
      headerName: 'UBICACION PRUEBA',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA DE REGISTRO',
      sortable: true,
      width: 300,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                set_id_bombeo_general(params.row.id_prueba_bombeo);
                set_info_bombeo_general(params.row);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const columns_sesion: GridColDef[] = [
    {
      field: 'cod_tipo_sesion',
      headerName: 'SECCIÓN/CAUDAL',
      sortable: true,
      width: 400,
      valueGetter: (params) => get_header_name(params.value),
    },
    {
      field: 'fecha_inicio',
      headerName: 'HORA INICIO',
      sortable: true,
      width: 200,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 80,
      renderCell: (params) => (
        <>
          <Tooltip title="Seleccionar">
            <Button
              variant="outlined"
              color="primary"
              size="small"
              startIcon={<ChecklistOutlinedIcon />}
              onClick={() => {
                set_id_sesion_bombeo(params.row.id_sesion_prueba_bombeo);
                set_info_sesion_bombeo(params.row);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const columns_data_sesion: GridColDef[] = [
    {
      field: 'tiempo_transcurrido',
      headerName: 'TIEMPO TRANSCURRIDO',
      sortable: true,
      width: 150,
    },
    {
      field: 'hora',
      headerName: 'HORA',
      sortable: true,
      width: 150,
    },
    {
      field: 'nivel',
      headerName: 'NIVEL',
      sortable: true,
      width: 200,
    },
    {
      field: 'resultado',
      headerName: 'ABATIMIENTO/RECUPERACION',
      sortable: true,
      width: 200,
    },
    {
      field: 'caudal',
      headerName: 'CAUDAL',
      sortable: true,
      width: 200,
    },
  ];
  const columns_anexos: GridColDef[] = [
    {
      field: 'nombre_archivo',
      headerName: 'NOMBRE ARCHIVO',
      sortable: true,
      width: 300,
    },
    {
      field: 'ruta_archivo',
      headerName: 'ARCHIVO',
      width: 200,
      renderCell: (params) => (
        <DownloadButton
          fileUrl={params.value}
          fileName={params.row.nombre_archivo}
          condition={false}
        />
      ),
    },
  ];
  const {
    id_instrumento,
    id_bombeo_general,
    info_bombeo_general,
    info_sesion_bombeo,
    rows_bombeo_general,
    rows_sesion_bombeo,
    rows_data_sesion_bombeo,
    id_sesion_bombeo,
    rows_anexos_bombeo,
    set_id_bombeo_general,
    set_id_sesion_bombeo,
    set_info_sesion_bombeo,
    set_info_bombeo_general,
    fetch_data_general_bombeo,
    fetch_data_general_sesion,
    fetch_data_sesion,
    fetch_data_anexos_bombeo,
  } = useContext(DataContext);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    if (id_instrumento) {
      void fetch_data_general_bombeo();
    }
  }, [is_modal_active]);

  useEffect(() => {
    if (id_bombeo_general) {
      void fetch_data_anexos_bombeo(id_bombeo_general);
      void fetch_data_general_sesion();
    }
  }, [id_bombeo_general]);

  useEffect(() => {
    if (id_sesion_bombeo) {
      void fetch_data_sesion();
    }
  }, [id_sesion_bombeo]);

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Pruebas de bombeo</DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            {rows_bombeo_general.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Title title="Información General" />
                </Grid>
                <Grid item xs={12}>
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows_bombeo_general}
                      columns={colums_bombeo}
                      getRowId={(row) => uuidv4()}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </>
                </Grid>
                {info_bombeo_general && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Datos Generales" />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Fecha de prueba"
                        value={info_bombeo_general.fecha_prueba_bombeo}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Lugar de muestra"
                        value={info_bombeo_general.ubicacion_prueba}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Coordenadas geográficas de toma de ubicación de la
                        prueba de bombeo
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Latitud"
                        value={info_bombeo_general.latitud}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Longitud"
                        value={info_bombeo_general.longitud}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Descripción"
                        value={info_bombeo_general.descripcion}
                        fullWidth
                        disabled
                        multiline
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Pozo asociado"
                        value={info_bombeo_general.nombre_pozo}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>

                    {rows_sesion_bombeo.length > 0 && (
                      <>
                        <Grid item xs={12}>
                          <Title title="Datos de la Sesión" />
                        </Grid>
                        <Grid item xs={12}>
                          <>
                            <DataGrid
                              autoHeight
                              rows={rows_sesion_bombeo}
                              columns={columns_sesion}
                              getRowId={(row) => uuidv4()}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                            />
                          </>
                        </Grid>
                      </>
                    )}
                  </>
                )}
                {info_sesion_bombeo && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Secciones" />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Prueba de bombeo de: / caudal:"
                        value={get_header_name(
                          info_sesion_bombeo.cod_tipo_sesion
                        )}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha y hora de inicio"
                        value={info_sesion_bombeo.fecha_inicio}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    {rows_data_sesion_bombeo.length > 0 && (
                      <>
                        <Grid item xs={12}>
                          <Title title="Datos de la medición" />
                        </Grid>
                        <Grid item xs={12}>
                          <>
                            <DataGrid
                              autoHeight
                              rows={rows_data_sesion_bombeo}
                              columns={columns_data_sesion}
                              getRowId={(row) => uuidv4()}
                              pageSize={5}
                              rowsPerPageOptions={[5]}
                            />
                          </>
                        </Grid>
                      </>
                    )}
                  </>
                )}
                <Grid item xs={12}>
                  <Title title="Anexos Asociados" />
                </Grid>
                <Grid item xs={12}>
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows_anexos_bombeo}
                      columns={columns_anexos}
                      getRowId={(row) => uuidv4()}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </>
                </Grid>
              </>
            )}
          </Grid>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handle_close();
          }}
        >
          Cancelar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

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
export const DialogCartera: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
}) => {
  const colums_cartera: GridColDef[] = [
    {
      field: 'ubicacion_aforo',
      headerName: 'UBICACION AFORO',
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
                set_id_cartera(params.row.id_cartera_aforos);
                set_info_cartera(params.row);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const columns_data_afoto: GridColDef[] = [
    {
      field: 'distancia_a_la_orilla',
      headerName: 'DISTANCIA A LA ORILLA',
      sortable: true,
      width: 200,
    },
    {
      field: 'profundidad',
      headerName: 'PROFUNDIDAD',
      sortable: true,
      width: 200,
    },
    {
      field: 'profundidad_promedio',
      headerName: 'PROFUNDIDAD PROMEDIO',
      sortable: true,
      width: 200,
    },
    {
      field: 'velocidad_superficial',
      headerName: 'VELOCIDAD SUPERFICIAL',
      sortable: true,
      width: 200,
    },
    {
      field: 'velocidad_profunda',
      headerName: 'VELOCIDAD PROFUNDA',
      sortable: true,
      width: 200,
    },
    {
      field: 'velocidad_promedio',
      headerName: 'VELOCIDAD PROMEDIO',
      sortable: true,
      width: 200,
    },
    {
      field: 'transecto',
      headerName: 'TRANSECTO',
      sortable: true,
      width: 200,
    },
    {
      field: 'velocidad_transecto',
      headerName: 'VELOCIDAD TRANSECTO',
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
    id_cartera,
    info_cartera,
    rows_cartera,
    rows_data_cartera,
    rows_anexos_cartera,
    fetch_data_cartera,
    set_id_cartera,
    set_info_cartera,
    fetch_data_general_cartera,
    fetch_data_anexos_carteras,
  } = useContext(DataContext);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    if (id_instrumento) {
      void fetch_data_cartera();
    }
  }, [is_modal_active]);

  useEffect(() => {
    if (id_cartera) {
      void fetch_data_general_cartera();
      void fetch_data_anexos_carteras(id_cartera);
    }
  }, [id_cartera]);

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Cartera de aforo</DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            {rows_cartera.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Title title="Información General" />
                </Grid>
                <Grid item xs={12}>
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows_cartera}
                      columns={colums_cartera}
                      getRowId={(row) => uuidv4()}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </>
                </Grid>
                {info_cartera && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Datos Generales" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Fecha de aforo"
                        value={info_cartera.fecha_aforo}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Lugar de muestra"
                        value={info_cartera.ubicacion_aforo}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Tipo de aforo"
                        value={info_cartera.cod_tipo_aforo}
                        fullWidth
                        size="small"
                        disabled
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Molinete"
                        // value={info_cartera.molinete}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="No de serie"
                        value={info_cartera.numero_serie}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="No de helices"
                        value={info_cartera.numero_helice}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Coordenadas geográficas de toma de ubicación de la
                        cartera
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Latitud"
                        value={info_cartera.latitud}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Longitud"
                        value={info_cartera.longitud}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Descripción"
                        value={info_cartera.descripcion}
                        fullWidth
                        disabled
                        multiline
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Cuenca Asociada"
                        value={info_cartera.nombre_cuenca}
                        fullWidth
                        disabled
                        multiline
                        size="small"
                      />
                    </Grid>
                  </>
                )}
                {rows_data_cartera.length > 0 && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Datos de la medición" />
                    </Grid>
                    <Grid item xs={12}>
                      <>
                        <DataGrid
                          autoHeight
                          rows={rows_data_cartera}
                          columns={columns_data_afoto}
                          getRowId={(row) => uuidv4()}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                        />
                      </>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <Title title="Anexos asociados a la cartera" />
                </Grid>
                <Grid item xs={12}>
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows_anexos_cartera}
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

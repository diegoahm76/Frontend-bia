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
  MenuItem,
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
import { tipo_parametro_choices } from '../../Instrumentos/components/ResultadoLaboratorio/utils/choices/choices';
import { DownloadButton } from '../../../../utils/DownloadButton/DownLoadButton';

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogLaboratorio: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
}) => {
  const get_header_name = (code: string): any => {
    switch (code) {
      case 'SUB':
        return 'Subterraneo';
      case 'SUP':
        return 'Superficial';
      default:
        return '';
    }
  };

  const colums_laboratorio: GridColDef[] = [
    {
      field: 'lugar_muestra',
      headerName: 'LUGAR DE MUESTRA',
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
                set_id_resultado_laboratorio(
                  params.row.id_resultado_laboratorio
                );
                set_info_laboratorio(params.row);
              }}
            />
          </Tooltip>
        </>
      ),
    },
  ];
  const colums_parametros: GridColDef[] = [
    {
      field: 'parametro',
      headerName: 'PARAMETRO',
      sortable: true,
      width: 200,
    },
    {
      field: 'unidad',
      headerName: 'UNIDAD DE MEDIDA',
      sortable: true,
      width: 200,
    },
  ];
  const colums_resultado_laboratorio: GridColDef[] = [
    ...colums_parametros,
    {
      field: 'metodo',
      headerName: 'METODO',
      sortable: true,
      width: 200,
    },
    {
      field: 'fecha_analisis',
      headerName: 'FECHA DE ANALISIS',
      sortable: true,
      width: 200,
    },
    {
      field: 'resultado',
      headerName: 'RESULTADO',
      sortable: true,
      width: 150,
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
    info_laboratorio,
    id_resultado_laboratorio,
    rows_laboratorio,
    rows_anexos_laboratorio,
    rows_resultado_laboratorio,
    tipo_parametro,
    set_tipo_parametro,
    fetch_data_laboratorio,
    set_id_resultado_laboratorio,
    set_info_laboratorio,
    fetch_data_resultado_laboratorio,
    fetch_data_anexos_laboratorio,
  } = useContext(DataContext);

  const handle_close = (): void => {
    set_is_modal_active(false);
  };

  useEffect(() => {
    if (id_instrumento) {
      void fetch_data_laboratorio();
    }
  }, [is_modal_active]);

  useEffect(() => {
    if (id_resultado_laboratorio && tipo_parametro) {
      void fetch_data_resultado_laboratorio();
    }
  }, [id_resultado_laboratorio, tipo_parametro]);

  useEffect(() => {
    if (id_resultado_laboratorio) {
      void fetch_data_anexos_laboratorio(id_resultado_laboratorio);
    }
  }, [id_resultado_laboratorio]);

  return (
    <Dialog
      open={is_modal_active}
      onClose={handle_close}
      fullWidth
      maxWidth="lg"
    >
      <DialogTitle>Resultados de laboratorio</DialogTitle>
      <Divider />
      <DialogContent sx={{ mb: '0px' }}>
        <form noValidate autoComplete="off">
          <Grid container spacing={2}>
            {rows_laboratorio.length > 0 && (
              <>
                <Grid item xs={12}>
                  <Title title="Resultados de laboratorio" />
                </Grid>
                <Grid item xs={12}>
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows_laboratorio}
                      columns={colums_laboratorio}
                      getRowId={(row) => uuidv4()}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                    />
                  </>
                </Grid>
                {info_laboratorio && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Datos Generales" />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Lugar de muestra"
                        value={info_laboratorio.lugar_muestra}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Fecha toma de muestra"
                        value={info_laboratorio.fecha_toma_muestra}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Analisis realizado en:"
                        value={get_header_name(
                          info_laboratorio.cod_clase_muestra
                        )}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha de envio a laboratorio"
                        value={info_laboratorio.fecha_envio_lab}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha de laboratorio"
                        value={info_laboratorio.fecha_resultados_lab}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Coordenadas geográficas de toma de muestra
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Latitud"
                        value={info_laboratorio.latitud}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Longitud"
                        value={info_laboratorio.longitud}
                        fullWidth
                        disabled
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Descripción de la muestra"
                        value={info_laboratorio.descripcion}
                        fullWidth
                        disabled
                        multiline
                        size="small"
                      />
                    </Grid>
                    {info_laboratorio.cod_clase_muestra === 'SUP' && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Cuenca Asociada"
                            value={info_laboratorio.nombre_cuenca}
                            fullWidth
                            disabled
                            multiline
                            size="small"
                          />
                        </Grid>
                      </>
                    )}
                    {info_laboratorio.cod_clase_muestra === 'SUB' && (
                      <>
                        <Grid item xs={12} sm={6}>
                          <TextField
                            label="Pozo Asociado"
                            value={info_laboratorio.nombre_pozo}
                            fullWidth
                            disabled
                            multiline
                            size="small"
                          />
                        </Grid>
                      </>
                    )}

                    <Grid item xs={12}>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Selecciones un tipo de parámetro
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Tipo parámetro "
                        select
                        fullWidth
                        size="small"
                        value={tipo_parametro}
                        margin="dense"
                        disabled={false}
                        name="tipo_parametro"
                        onChange={(e) => {
                          set_tipo_parametro(e.target.value);
                        }}
                      >
                        {tipo_parametro_choices.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  </>
                )}
                {rows_resultado_laboratorio.length > 0 && (
                  <>
                    <Grid item xs={12}>
                      <Title title="Analisis de laboratorio" />
                    </Grid>
                    <Grid item xs={12}>
                      <>
                        <DataGrid
                          autoHeight
                          rows={rows_resultado_laboratorio}
                          columns={colums_resultado_laboratorio}
                          getRowId={(row) => uuidv4()}
                          pageSize={5}
                          rowsPerPageOptions={[5]}
                        />
                      </>
                    </Grid>
                  </>
                )}
                <Grid item xs={12}>
                  <Title title="Resultados de laboratorio" />
                </Grid>
                <Grid item xs={12}>
                  <>
                    <DataGrid
                      autoHeight
                      rows={rows_laboratorio}
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

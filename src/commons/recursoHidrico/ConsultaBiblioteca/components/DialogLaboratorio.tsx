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

interface IProps {
  is_modal_active: boolean;
  set_is_modal_active: Dispatch<SetStateAction<boolean>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export const DialogLaboratorio: React.FC<IProps> = ({
  is_modal_active,
  set_is_modal_active,
}) => {
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
  const {
    id_instrumento,
    info_laboratorio,
    id_resultado_laboratorio,
    rows_laboratorio,
    rows_resultado_laboratorio,
    tipo_parametro,
    set_tipo_parametro,
    fetch_data_laboratorio,
    set_id_resultado_laboratorio,
    set_info_laboratorio,
    fetch_data_resultado_laboratorio,
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
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Fecha toma de muestra"
                        value={info_laboratorio.fecha_toma_muestra}
                        fullWidth
                        disabled
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Analisis realizado en:"
                        value={info_laboratorio.cod_clase_muestra}
                        fullWidth
                        disabled
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha de envio a laboratorio"
                        value={info_laboratorio.fecha_envio_lab}
                        fullWidth
                        disabled
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        label="Fecha de laboratorio"
                        value={info_laboratorio.fecha_resultados_lab}
                        fullWidth
                        disabled
                        size='small'
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
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Longitud"
                        value={info_laboratorio.longitud}
                        fullWidth
                        disabled
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4}>
                      <TextField
                        label="Cuanca o pozo"
                        value={
                          info_laboratorio.id_cuenca ?? info_laboratorio.id_pozo
                        }
                        fullWidth
                        disabled
                        size='small'
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Descripción de la muestra"
                        value={info_laboratorio.descripcion}
                        fullWidth
                        disabled
                        multiline
                        size='small'
                      />
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

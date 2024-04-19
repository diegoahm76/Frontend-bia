/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  IconButton,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import {
  DataGrid,
  type GridColDef,
  // type GridValueFormatterParams,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { useAppDispatch } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_seguimiento_paoi,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextSeguimientoPOAI } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarSeguiminetoPOAI: React.FC = () => {
  const columns_seguimiento: GridColDef[] = [
    {
      field: 'nombre_programa',
      headerName: 'NOMBRE PROGRAMA',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE PROYECTO',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_producto',
      headerName: 'NOMBRE PRODUCTO',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_actividad',
      headerName: 'NOMBRE ACTIVIDAD',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_unidad',
      headerName: 'NOMBRE UNIDAD',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_indicador',
      headerName: 'NOMBRE INDICADOR',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_meta',
      headerName: 'NOMBRE META',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'codigo_modalidad',
      headerName: 'CODIGO MODALIDAD',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'concepto',
      headerName: 'CONCEPTO',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'sector',
      headerName: 'SECTOR',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'nombre_fuente',
      headerName: 'NOMBRE FUENTE',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'objeto_contrato',
      headerName: 'OBJETO CONTRATO',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'ubicacion',
      headerName: 'UBICACION',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'porcentaje_pto',
      headerName: 'PORCENTAJE PTO',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'valor_total',
      headerName: 'VALOR TOTAL',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueFormatter: (params) => {
        const valorTotal = Number(params.value);
        return valorTotal.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      field: 'numero_cdp_paa',
      headerName: 'NUMERO CDP PAA',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'numero_rp_paa',
      headerName: 'NUMERO RP PAA',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'valor_seguimiento_banco_paa',
      headerName: 'VALOR SEGUIMIENTO BANCO PAA',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueFormatter: (params) => {
        const valorSeguimiento = Number(params.value);
        return valorSeguimiento.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex: 1,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_mode_planes({
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              dispatch(set_current_seguimiento_paoi(params.row));
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
                titleAccess="Editar seguimiento poai"
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

  const { rows_seguimiento, fetch_data_seguimiento } = useContext(
    DataContextSeguimientoPOAI
  );

  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);s

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (id_indicador) {
    fetch_data_seguimiento();
    // }
  }, []);

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
          <Title title="Listado de Seguimientos " />
        </Grid>
        <>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <>
                <ButtonGroup
                  style={{
                    margin: 7,
                    display: 'flex',
                    justifyContent: 'flex-end',
                  }}
                >
                  {download_xls({
                    nurseries: rows_seguimiento,
                    columns: columns_seguimiento,
                  })}
                  {download_pdf({
                    nurseries: rows_seguimiento,
                    columns: columns_seguimiento,
                    title: 'Seguimineto POAI',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_seguimiento}
                  columns={columns_seguimiento}
                  pageSize={10}
                  // rowHeight={150}
                  rowsPerPageOptions={[10]}
                  getRowId={() => uuidv4()}
                  getRowHeight={() => 'auto'}
                />
              </>
            </Box>
          </Grid>
        </>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item>
            <Button
              variant="outlined"
              color="primary"
              disabled={false}
              onClick={() => {
                dispatch(
                  set_current_mode_planes({
                    ver: true,
                    crear: true,
                    editar: false,
                  })
                );
              }}
            >
              Agregar Seguimiento POAI
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

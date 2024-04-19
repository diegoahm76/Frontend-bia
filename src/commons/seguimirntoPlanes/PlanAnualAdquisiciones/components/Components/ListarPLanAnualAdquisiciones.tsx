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
import {
  DataGrid,
  type GridColDef,
  // type GridValueFormatterParams,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_plan_adquisiciones,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextAdquisiciones } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { DialogPaaCodigos } from './DialogPaaCodigos';
import AddIcon from '@mui/icons-material/Add';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPLanAnualAdquisiciones: React.FC = () => {
  const columns_adquisiciones: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE PLAN',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_intervalo',
      headerName: 'NOMBRE INTERVALO',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'nombre_modalidad',
      headerName: 'NOMBRE MODALIDAD',
      sortable: true,
      minWidth: 200,
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
      field: 'nombre_fuente',
      headerName: 'NOMBRE FUENTE',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_estado',
      headerName: 'NOMBRE ESTADO',
      sortable: true,
      minWidth: 150,
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
      field: 'nombre_ubicacion',
      headerName: 'NOMBRE UBICACION',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'email_persona_responsable',
      headerName: 'EMAIL PERSONA RESPONSABLE',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'telefono_persona_responsable',
      headerName: 'TELEFONO PERSONA RESPONSABLE',
      sortable: true,
      minWidth: 200,
      flex: 1
    },
    {
      field: 'persona_responsable',
      headerName: 'PERSONA RESPONSABLE',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'descripcion',
      headerName: 'DESCRIPCION',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'mes_inicio',
      headerName: 'MES INICIO',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'mes_oferta',
      headerName: 'MES OFERTA',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'duracion',
      headerName: 'DURACION',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'valor_total_estimado',
      headerName: 'VALOR TOTAL ESTIMADO',
      sortable: true,
      minWidth: 200,
      flex: 1,
      valueFormatter: (params) => {
        const valorTotalEstimado = Number(params.value);
        return valorTotalEstimado.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      field: 'valor_vigencia_actual',
      headerName: 'VALOR VIGENCIA ACTUAL',
      sortable: true,
      minWidth: 200,
      flex: 1,
      valueFormatter: (params) => {
        const valorVigenciaActual = Number(params.value);
        return valorVigenciaActual.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });
      },
    },
    {
      field: 'vigencia_futura',
      headerName: 'VIGENCIA FUTURA',
      sortable: true,
      minWidth: 150,
      flex: 1
    },
    {
      field: 'decreto_paa',
      headerName: 'DECRETO PAA',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => (params.value ? 'Sí' : 'No'),
    },
    {
      field: 'suministro_paa',
      headerName: 'SUMINISTRO PAA',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueGetter: (params) => (params.value ? 'Sí' : 'No'),
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
              dispatch(set_current_plan_adquisiciones(params.row));
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
                titleAccess="Editar Plan Anual De Adquisiciones"
                sx={{
                  color: 'primary.main',
                  width: '18px',
                  height: '18px',
                }}
              />
            </Avatar>
          </IconButton>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(set_current_plan_adquisiciones(params.row));
              handle_click_open();
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
              <AddIcon
                titleAccess="Agregar Códigos UNSPSC"
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
    rows_plan_adquisiciones,
    fetch_data_plan_adquisiciones,
    fetch_data_paa_codigos,
  } = useContext(DataContextAdquisiciones);

  const [open_dialog, set_open_dialog] = useState<boolean>(false);

  const handle_click_open = (): void => {
    set_open_dialog(true);
  };

  const {
    plan_adquisiciones: { id_plan_anual },
  } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_plan_anual) {
      fetch_data_paa_codigos();
    }
  }, [id_plan_anual]);

  useEffect(() => {
    // if (id_indicador) {
    fetch_data_plan_adquisiciones();
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
        {/* <Grid item xs={12}>
          <Title title="Listado de planes " />
        </Grid> */}
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
                    nurseries: rows_plan_adquisiciones,
                    columns: columns_adquisiciones,
                  })}
                  {download_pdf({
                    nurseries: rows_plan_adquisiciones,
                    columns: columns_adquisiciones,
                    title: 'CREAR',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_plan_adquisiciones ?? []}
                  columns={columns_adquisiciones ?? []}
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
              Agregar PAA
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <DialogPaaCodigos
        open_dialog={open_dialog}
        set_open_dialog={set_open_dialog}
      />
    </>
  );
};

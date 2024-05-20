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
  type GridValueFormatterParams,
} from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { useAppDispatch } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_fuente,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextFuentesFinanciacion } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarFuentesFinanciacion: React.FC = () => {
  const columns_fuente: GridColDef[] = [
    {
      field: 'concepto',
      headerName: 'CONCEPTO',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'nombre_fuente',
      headerName: 'Nombre de la Fuente',
      sortable: true,
      minWidth: 250,
      flex: 1
    },
    {
      field: 'vano_1',
      headerName: 'AÑO 1',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        const inversion = Number(params.value); // Convertir a número
        const formattedInversion = inversion.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedInversion;
      },
    },
    {
      field: 'vano_2',
      headerName: 'AÑO 2',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        const inversion = Number(params.value); // Convertir a número
        const formattedInversion = inversion.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedInversion;
      },
    },
    {
      field: 'vano_3',
      headerName: 'AÑO 3',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        const inversion = Number(params.value); // Convertir a número
        const formattedInversion = inversion.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedInversion;
      },
    },
    {
      field: 'vano_4',
      headerName: 'AÑO 4',
      sortable: true,
      minWidth: 150,
      flex: 1,
      valueFormatter: (params: GridValueFormatterParams) => {
        const inversion = Number(params.value); // Convertir a número
        const formattedInversion = inversion.toLocaleString('es-AR', {
          style: 'currency',
          currency: 'ARS',
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        });

        return formattedInversion;
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
              dispatch(set_current_fuente(params.row));
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
                titleAccess="Editar fuente de financiación"
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

  const { rows_fuentes, fetch_data_fuente_financiacion } = useContext(
    DataContextFuentesFinanciacion
  );

  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);s

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (id_indicador) {
    fetch_data_fuente_financiacion();
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
          <Title title="Listado de Fuentes de Financiación " />
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
                    nurseries: rows_fuentes,
                    columns: columns_fuente,
                  })}
                  {download_pdf({
                    nurseries: rows_fuentes,
                    columns: columns_fuente,
                    title: 'CREAR',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_fuentes ?? []}
                  columns={columns_fuente ?? []}
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
              Agregar fuente de financiación
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

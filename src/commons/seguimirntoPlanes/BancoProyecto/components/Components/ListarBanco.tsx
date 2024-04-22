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
  set_current_banco,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { DataContextBancos } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarBanco: React.FC = () => {
  const columns_banco: GridColDef[] = [
    {
      field: 'nombre_proyecto',
      headerName: 'NOMBRE PROYECTO',
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
      field: 'rubro',
      headerName: 'RUBRO',
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
      field: 'banco_valor',
      headerName: 'BANCO VALOR',
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
              dispatch(set_current_banco(params.row));
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
                titleAccess="Editar banco proyecto"
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

  const { rows_bancos, id_meta, fetch_data_bancos_by_meta_id } = useContext(
    DataContextBancos
  );

  // const {
  //   indicador: { id_indicador },
  // } = useAppSelector((state) => state.planes);s

  const dispatch = useAppDispatch();

  useEffect(() => {
    // if (id_indicador) {
      fetch_data_bancos_by_meta_id()
    // }
  }, [id_meta]);

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
          <Title title="Listado de Bancos " />
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
                    nurseries: rows_bancos,
                    columns: columns_banco,
                  })}
                  {download_pdf({
                    nurseries: rows_bancos,
                    columns: columns_banco,
                    title: 'CREAR',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_bancos}
                  columns={columns_banco}
                  pageSize={10}
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
              Agregar Banco Proyecto
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

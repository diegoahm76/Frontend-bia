/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Chip,
  Grid,
  IconButton,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_paa_codigos,
  set_current_mode_paa_codigos,
} from '../../../store/slice/indexPlanes';
import { DataContextAdquisiciones } from '../../context/context';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPaaCodigos: React.FC = () => {
  const columns_paa_codigos: GridColDef[] = [
    {
      field: 'nombre_paa',
      headerName: 'NOMBRE DEL PAA',
      sortable: true,
      minWidth: 300,
      flex: 2
    },
    // {
    //   field: 'nombre_producto_unsp',
    //   headerName: 'NOMBRE DEL PRODUCTO UNSPSC',
    //   sortable: true,
    //   width: 300,
    // },
    {
      field: 'codigo_unsp',
      headerName: 'CODIGO UNSPSC',
      sortable: true,
      minWidth: 300,
      flex: 2
    },
    {
      field: 'acciones',
      headerName: 'ACCIONES',
      sortable: true,
      minWidth: 120,
      flex: 2,
      renderCell: (params) => (
        <>
          <IconButton
            size="small"
            onClick={() => {
              dispatch(
                set_current_mode_paa_codigos({
                  ver: true,
                  crear: false,
                  editar: true,
                })
              );
              //  console.log('')(params.row, 'params.row');
              dispatch(set_current_paa_codigos(params.row));
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
                titleAccess="Editar PAA Códigos"
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

  const { rows_paa_codigos, fetch_data_paa_codigos } = useContext(
    DataContextAdquisiciones
  );

  //* declaracion context
  const {
    plan_adquisiciones: { id_plan_anual },
  } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id_plan_anual) {
      fetch_data_paa_codigos();
    }
  }, [id_plan_anual]);

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
          <Title title="Listado codigos por plan " />
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
                    nurseries: rows_paa_codigos,
                    columns: columns_paa_codigos,
                  })}
                  {download_pdf({
                    nurseries: rows_paa_codigos,
                    columns: columns_paa_codigos,
                    title: 'CREAR',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_paa_codigos ?? []}
                  columns={columns_paa_codigos ?? []}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
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
                  set_current_mode_paa_codigos({
                    ver: true,
                    crear: true,
                    editar: false,
                  })
                );
              }}
            >
              Agregar Código a PAA
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

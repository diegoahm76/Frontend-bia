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
import { DataContextEjeEstrategico } from '../../context/context';
import { useAppDispatch, useAppSelector } from '../../../../../hooks';
import EditIcon from '@mui/icons-material/Edit';
import {
  set_current_eje_estrategico,
  set_current_mode_planes,
} from '../../../store/slice/indexPlanes';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarEjeEstrategico: React.FC = () => {
  const {
    id_plan,
    id_objetivo,
    rows_eje_estrategico,
    set_id_plan,
    fetch_data_tipo_eje,
    fetch_data_eje_estrategico,
    fetch_data_eje_estrategico_id_obj,
  } = useContext(DataContextEjeEstrategico);

  const columns_eje: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE DEL PLAN',
      sortable: true,
      minWidth: 300,
      flex: 1
    },
    ...(id_plan ? [{
      field: 'sigla_plan',
      headerName: 'SIGLA DEL PLAN',
      sortable: true,
      minWidth: 350,
      flex: 2
    }] : [{
      field: 'nombre_objetivo',
      headerName: 'NOMBRE DEL OBJETIVO',
      sortable: true,
      minWidth: 350,
      flex: 2
    }]),
    {
      field: 'nombre',
      headerName: 'NOMBRE DEL EJE ESTRATEGICO',
      sortable: true,
      minWidth: 300,
      flex: 1
    },
    {
      field: 'nombre_tipo_eje',
      headerName: 'TIPO DE EJE ESTRATEGICO',
      sortable: true,
      minWidth: 300,
      flex: 1
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
              dispatch(set_current_eje_estrategico(params.row));
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
                titleAccess="Editar Eje Estrategico"
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

  // const {
  //   plan: { id_plan },
  // } = useAppSelector((state) => state.planes);

  const dispatch = useAppDispatch();

  useEffect(() => {
    fetch_data_tipo_eje();
  }, []);

  useEffect(() => {
    if (id_plan) {
      fetch_data_eje_estrategico();
    }
  }, [id_plan]);

  useEffect(() => {
    if (id_objetivo) {
      fetch_data_eje_estrategico_id_obj();
    }
  }, [id_objetivo]);

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
          <Title title="Listado de ejes estrategicos " />
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
                    nurseries: rows_eje_estrategico,
                    columns: columns_eje,
                  })}
                  {download_pdf({
                    nurseries: rows_eje_estrategico,
                    columns: columns_eje,
                    title: 'CREAR EJE ESTRATEGICO',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_eje_estrategico ?? []}
                  columns={columns_eje ?? []}
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
              sx={{ marginTop: 2 }}
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
              Agregar Eje Estrategico
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

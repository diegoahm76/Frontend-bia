/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import {
  Box,
  ButtonGroup,
  Chip,
  Grid,
} from '@mui/material';
import { Title } from '../../../../../components/Title';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { useContext, useEffect } from 'react';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { DataContextConsularPlanes } from '../../context/context';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ListarPlanes: React.FC = () => {
  const columns_planes: GridColDef[] = [
    {
      field: 'nombre_plan',
      headerName: 'NOMBRE DEL PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'sigla_plan',
      headerName: 'SIGLA DEL PLAN',
      sortable: true,
      width: 250,
    },
    {
      field: 'tipo_plan',
      headerName: 'TIPO DE PLAN',
      sortable: true,
      width: 200,
    },
    {
      field: 'agno_inicio',
      headerName: 'AÑO INICIO',
      sortable: true,
      width: 150,
    },
    {
      field: 'agno_fin',
      headerName: 'AÑO FIN',
      sortable: true,
      width: 150,
    },

    {
      field: 'activo',
      headerName: 'VIGENCIA',
      sortable: true,
      width: 200,
      renderCell: (params) => {
        return params.row.estado_vigencia === true ? (
          <Chip
            size="small"
            label="vigente"
            color="success"
            variant="outlined"
          />
        ) : (
          <Chip
            size="small"
            label="No vigente"
            color="error"
            variant="outlined"
          />
        );
      },
    },
    {
      field: 'nombre_objetivo',
      headerName: 'NOMBRE OBJETIVO',
      sortable: true,
      width: 250,
    },
  ];

  const { rows_planes, fetch_data_planes } = useContext(
    DataContextConsularPlanes
  );

  useEffect(() => {
    console.log('useEffect');
    void fetch_data_planes();
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
          <Title title="Consulta de planes " />
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
                    nurseries: rows_planes,
                    columns: columns_planes,
                  })}
                  {download_pdf({
                    nurseries: rows_planes,
                    columns: columns_planes,
                    title: 'CREAR PLAN',
                  })}
                </ButtonGroup>
                <DataGrid
                  density="compact"
                  autoHeight
                  rows={rows_planes}
                  columns={columns_planes}
                  pageSize={10}
                  rowsPerPageOptions={[10]}
                  getRowId={(row) => uuidv4()}
                />
              </>
            </Box>
          </Grid>
        </>
        <Grid container spacing={2} justifyContent="flex-end"></Grid>
      </Grid>
    </>
  );
};

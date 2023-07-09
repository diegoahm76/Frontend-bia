import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { Divider, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/contextData';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const ConsultaPorh: React.FC = () => {
  const {
    info_programa,
    fetch_data_proyectos,
    rows_proyectos,
    rows_actividades,
    fetch_data_actividades,
  } = useContext(DataContext);

  const columns_proyectos: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'NOMBRE',
      sortable: true,
      width: 250,
    },
    {
      field: 'vigencia_inicial',
      headerName: 'VIGENCIA INICIAL',
      sortable: true,
      width: 250,
    },
    {
      field: 'vigencia_final',
      headerName: 'VIGENCIA FINAL',
      sortable: true,
      width: 250,
    },
    {
      field: 'inversion',
      headerName: 'INVERSIÓN',
      sortable: true,
      width: 250,
    },
  ];
  const columns_actividades: GridColDef[] = [
    {
      field: 'nombre',
      headerName: 'DESCRIPCIÓN',
      sortable: true,
      width: 300,
    },
    {
      field: 'fecha_registro',
      headerName: 'FECHA REGISTRO',
      sortable: true,
      width: 250,
    },
    {
      field: 'ACCIONES',
      headerName: 'ACCIONES',
      width: 200,
      renderCell: (params) => {
        return <></>;
      },
    },
  ];

  useEffect(() => {
    void fetch_data_proyectos();
    void fetch_data_actividades();
  }, [info_programa]);

  return (
    <>
      <Grid
        container
        spacing={2}
        m={2}
        p={2}
        sx={{
          p: '0px',
          m: '0 0 0 0',
          mb: '0px',
        }}
      >
        <Grid item xs={12}>
          <Title title="INFORMACIÓN DE PROGRAMA" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight="bold">
            Programa {info_programa?.nombre_programa}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        {rows_proyectos.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Proyectos
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                autoHeight
                rows={rows_proyectos}
                columns={columns_proyectos}
                getRowId={(row) => row.id_proyecto}
                pageSize={5}
                rowsPerPageOptions={[5]}
              />
            </Grid>
          </>
        )}
        {rows_actividades.length > 0 && (
          <>
            <Grid item xs={12}>
              <Typography variant="subtitle1" fontWeight="bold">
                Actividades
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_actividades}
                columns={columns_actividades}
                getRowId={(row) => row.id_actividades}
                pageSize={5}
                rowsPerPageOptions={[5]}
                disableSelectionOnClick
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

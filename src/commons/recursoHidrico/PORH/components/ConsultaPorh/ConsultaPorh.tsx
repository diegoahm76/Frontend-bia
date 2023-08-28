/* eslint-disable @typescript-eslint/naming-convention */
import Grid from '@mui/material/Grid';
import { Title } from '../../../../../components/Title';
import { ButtonGroup, Divider, Typography } from '@mui/material';
import { useContext, useEffect } from 'react';
import { DataContext } from '../../context/contextData';
import {
  DataGrid,
  type GridValueFormatterParams,
  type GridColDef,
} from '@mui/x-data-grid';
import { download_xls } from '../../../../../documentos-descargar/XLS_descargar';
import { download_pdf } from '../../../../../documentos-descargar/PDF_descargar';

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
              <ButtonGroup
                style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
              >
                {download_xls({ nurseries: rows_proyectos, columns: columns_proyectos })}
                {download_pdf({ nurseries: rows_proyectos, columns: columns_proyectos, title: 'Proyectos' })}
              </ButtonGroup> 
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
              <ButtonGroup
                style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
              >
                {download_xls({ nurseries: rows_actividades, columns: columns_actividades })}
                {download_pdf({ nurseries: rows_actividades, columns: columns_actividades, title: 'Actividades' })}
              </ButtonGroup> 
            </Grid>
            <Grid item xs={12}>
              <DataGrid
                density="compact"
                autoHeight
                rows={rows_actividades}
                columns={columns_actividades}
                getRowId={(row) => row.id_actividades}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick
              />
            </Grid>
          </>
        )}
      </Grid>
    </>
  );
};

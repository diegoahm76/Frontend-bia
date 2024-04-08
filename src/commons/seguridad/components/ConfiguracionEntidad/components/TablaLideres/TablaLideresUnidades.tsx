import { Box, Grid, Button, ButtonGroup, Typography } from '@mui/material';
import { Title } from '../../../../../../components/Title';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { api } from '../../../../../../api/axios';
import type { ItablaUnidades } from '../../interfaces/interfacesConEntidad';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { useNavigate } from 'react-router-dom';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaLineresUnidadesOrganizacionales: React.FC = () => {
  const datos_asignacion: ItablaUnidades[] = [];

  const [data_lideres, setdata_lideres] =
    useState<ItablaUnidades[]>(datos_asignacion);

  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = '/transversal/lideres/get-list-actual/';
      const res = await api.get(url);
      const facilidad_pago_data = res.data.data;
      setdata_lideres(facilidad_pago_data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);

  const columns = [
    {
      field: 'codigo_unidad_org',
      headerName: 'Código Unidad Org',
      width: 200,
      flex: 1,
    },
    {
      field: 'nombre_unidad_org',
      headerName: 'Nombre Unidad Org',
      width: 200,
      flex: 1,
    },
    {
      field: 'nombre_completo',
      headerName: 'Nombre Completo',
      width: 200,
      flex: 1,
    },
    {
      field: 'nombre_organigrama',
      headerName: 'Nombre del Organigrama',
      width: 200,
      flex: 1,
    },
    {
      field: 'version_organigra',
      headerName: 'Versión del Organigrama',
      width: 200,
      flex: 1,
    },
    {
      field: 'fecha_asignacion',
      headerName: 'Fecha de Asignación',
      width: 200,
      flex: 1,
    },
    {
      field: 'observaciones_asignacion',
      headerName: 'Observaciones',
      width: 200,
      flex: 1,
    },
  ];
  const navigate = useNavigate();
  return (
    <Grid
      container
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '20px',
        mb: '20px',
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Grid item xs={12}>
        <Title title="Lideres de Unidades Organizacionales" />
        <ButtonGroup
          style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
        >
          {download_xls({ nurseries: data_lideres, columns })}
          {download_pdf({
            nurseries: data_lideres,
            columns,
            title: 'Unidades Organizacionales',
          })}
        </ButtonGroup>
        <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
          {data_lideres && data_lideres.length > 0 ? (
            <DataGrid
              density="compact"
              autoHeight
              columns={columns ?? []}
              rows={data_lideres ?? []}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id_persona}
            />
          ) : (
            <Typography variant="h6" component="h2">
              No hay datos disponibles
            </Typography>
          )}
        </Box>
      </Grid>

      <Button
        style={{ margin: 8 }}
        color="primary"
        variant="contained"
        startIcon={<ArrowOutwardIcon />}
        onClick={() => {
          navigate(
            '/app/transversal/corporativo/lideres_unidad_organizacional'
          );
        }}
      >
        Ir a lideres de grupo
      </Button>
    </Grid>
  );
};

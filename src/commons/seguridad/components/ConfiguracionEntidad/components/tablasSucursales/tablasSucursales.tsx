import {
  Box,
  Button,
  Grid,
  Chip,
  ButtonGroup,
  Typography,
} from '@mui/material';
import { Title } from '../../../../../../components/Title';
import { DataGrid } from '@mui/x-data-grid';
import { api } from '../../../../../../api/axios';
import { useEffect, useState } from 'react';
import type { Itablaucursales } from '../../interfaces/interfacesConEntidad';
import { download_xls } from '../../../../../../documentos-descargar/XLS_descargar';
import { useNavigate } from 'react-router-dom';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import { download_pdf } from '../../../../../../documentos-descargar/PDF_descargar';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const TablaSucursales: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const initialData: Itablaucursales[] = [];

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [dataEntidad, setDataEntidad] =
    useState<Itablaucursales[]>(initialData);

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const fetchDataGet = async (): Promise<void> => {
    try {
      const url = '/transversal/sucursales/sucursales-empresa-lista/3';
      const res = await api.get(url);
      // eslint-disable-next-line @typescript-eslint/naming-convention
      const sucursalesData = res.data.data;
      setDataEntidad(sucursalesData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataGet().catch((error) => {
      console.error(error);
    });
  }, []);

  const columns = [
    {
      field: 'numero_sucursal',
      headerName: 'Número de Sucursal',
      width: 100,
      flex: 1,
    },
    {
      field: 'descripcion_sucursal',
      headerName: 'Descripción',
      width: 200,
      flex: 1,
    },
    {
      field: 'es_principal',
      headerName: 'Es Principal',
      width: 150,
      flex: 1,
      renderCell: (params: any) => {
        const value = params.value as boolean; // Asegurarse de que el tipo sea booleano
        if (typeof value === 'boolean') {
          return value ? (
            <Chip
              size="small"
              label="Activo"
              color="success"
              variant="outlined"
            />
          ) : (
            <Chip
              size="small"
              label="Inactivo"
              color="error"
              variant="outlined"
            />
          );
        } else {
          // Manejar el caso en el que el tipo no sea booleano (opcional)
          return null; // O muestra algún otro valor predeterminado
        }
      },
    },
  ];
  const filtered_data = dataEntidad.filter((row) => row.es_principal);

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
        <Title title="Tabla sucursales" />
        <ButtonGroup
          style={{ margin: 7, display: 'flex', justifyContent: 'flex-end' }}
        >
          {download_xls({ nurseries: filtered_data, columns })}
          {download_pdf({
            nurseries: filtered_data,
            columns,
            title: 'Tabla sucursales',
          })}
        </ButtonGroup>

        <Box component="form" sx={{ mt: '20px' }} noValidate autoComplete="off">
          {filtered_data && filtered_data.length > 0 ? (
            <DataGrid
              density="compact"
              autoHeight
              columns={columns ?? []}
              rows={filtered_data ?? []}
              pageSize={10}
              rowsPerPageOptions={[10]}
              getRowId={(row) => row.id_sucursal_empresa}
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
          navigate('/app/Seguridad/sucursal_entidad');
        }}
      >
        Ir a sucursales
      </Button>
    </Grid>
  );
};

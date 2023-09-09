/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, MenuItem, Select } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';

export const UnidadesOrganizacionalesAutorizadas: React.FC = () => {
  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<string>('');

  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/gestor/choices/cod-tipo-pqrs/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_tipos_pqr(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };

  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [dataEntidad, setDataEntidad] = useState<any[]>([]);

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
    },
  ];

  useEffect(() => {
    fetch_data_get().catch((error) => {
      console.error(error);
    });
  }, []);
  return (
    <>
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
          <Title title="Unidad organizacional autorizada" />
        </Grid>

        <Grid item container spacing={1} style={{ margin: 1 }}>
          <Grid item xs={12} sm={4} md={2}>
            <h5>Unidad organizacional :</h5>
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl fullWidth>
              <Select
              style={{height:50}}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PQR_seleccionado}
                label="PQR_seleccionado"
                onChange={(event): any => {
                  set_PQR_seleccionado(event.target.value);
                }}
              >
                {tipos_pqr?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item.value}>
                    {item.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <Button fullWidth variant="contained">
              Agregar
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={dataEntidad}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => row.id_sucursal_empresa}
          />
        </Grid>
      </Grid>
    </>
  );
};

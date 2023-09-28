/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, MenuItem, Select } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';


interface UnidadOrganizacional {
  id_unidad_organizacional: number;
  nombre_unidad_org_actual_admin_series: string;
  codigo_unidad_org_actual_admin_series: string;
  nombre: string;
  codigo: string;
  cod_tipo_unidad: string;
  cod_agrupacion_documental: string;
  unidad_raiz: boolean;
  item_usado: boolean;
  activo: boolean;
  id_organigrama: number;
  id_nivel_organigrama: number;
  id_unidad_org_padre: number | null;
  id_unidad_org_actual_admin_series: number;
}


export const UnidadesOrganizacionalesAutorizadas: React.FC = () => {
  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  console.log(tipos_pqr);

  const [PQR_seleccionado, set_PQR_seleccionado] = useState<any>([]);
  console.log(PQR_seleccionado);




const handleAcumularDatos=()=>{

  set_PQR_seleccionado([...PQR_seleccionado,PQR_seleccionado]);
}




  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/transversal/organigrama/unidades/get-list/organigrama-actual/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      console.log(numero_consulta);
      set_tipos_pqr(numero_consulta);
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
      field: 'nombre',
      headerName: 'ID Unidad Organizacional',
      width: 200,
      flex: 1,
    },
    {
      field: 'id_unidad_organizacional',
      headerName: 'ID Unidad Organizacional',
      width: 200,
      flex: 1,
    },
    {
      field: 'nombre_unidad_org_actual_admin_series',
      headerName: 'ID Unidad Organizacional (Otra vez)',
      width: 250,
      flex: 1,
    }
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
                style={{ height: 50 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PQR_seleccionado} // Esto debería ser un array de datos, no un solo elemento
                onChange={(event): any => {
                  // Actualiza PQR_seleccionado con un array de datos basados en el elemento seleccionado
                  const selectedItem = event.target.value;
                  set_PQR_seleccionado([selectedItem]); // Esto convierte el elemento seleccionado en un array
                }}
              >
                {tipos_pqr?.map((item: any, index: number) => (
                  <MenuItem key={index} value={item}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <Button fullWidth variant="contained"  onClick={handleAcumularDatos}>
              Agregar
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={PQR_seleccionado}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => uuidv4()}
          />
        </Grid>
      </Grid>
    </>
  );
};

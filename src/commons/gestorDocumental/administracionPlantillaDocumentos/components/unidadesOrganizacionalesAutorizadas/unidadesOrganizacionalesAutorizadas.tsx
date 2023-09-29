/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, MenuItem, Select } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';



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

const {form,set_form}=useContext(FormCreacionContext);
const HandleCompletarDatos = (e: any) => {
  set_form({
    ...form,
    [e.target.name]: e.target.value
  });
}

  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<any>([]);
const[alerta,set_alerta]=useState<any[]>([]);
const[variable_concatenada,set_variable_concatenada]=useState<any[]>([]);

console.log(variable_concatenada);

const handleAcumularDatos = () => {
  if (PQR_seleccionado.length > 0) {
    // Obtiene el elemento seleccionado
    const selectedItem = PQR_seleccionado[0];

    // Agrega el elemento seleccionado a la alerta
     set_alerta([...alerta, selectedItem]);
  }
  if (PQR_seleccionado.length > 0) {
    // Obtiene el elemento seleccionado
    const selectedItem = PQR_seleccionado[0];

    // Crea un nuevo objeto con la propiedad id_unidad_organizacional
    const unidadOrganizacional = { id_unidad_organizacional: selectedItem.id_unidad_organizacional };

    // Agrega el nuevo objeto a la alerta
    set_variable_concatenada([...variable_concatenada, unidadOrganizacional]);
    set_form({
            ...form,
            acceso_unidades: [...variable_concatenada, unidadOrganizacional]
          });
  }
};
// const handleAcumularDatos = () => {
//   if (PQR_seleccionado.length > 0) {
//     // Obtiene el elemento seleccionado
//     const selectedItem = PQR_seleccionado[0];

//     // Agrega el elemento seleccionado a la alerta
//     set_alerta([...alerta, selectedItem]);

//     // Envía la variable_concatenada al formulario en el contexto
//     set_form({
//       ...form,
//       acceso_unidades: [...variable_concatenada, selectedItem]
//     });
//   }
// };




const handleEliminarDato = (id: number) => {
  const updatedAlerta = alerta.filter((item) => item.id_unidad_organizacional !== id);
  set_alerta(updatedAlerta);
  set_variable_concatenada(updatedAlerta);
};
  
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
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params: any) => (
        // Celda personalizada con el botón
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleEliminarDato(params.row.id_unidad_organizacional)}
        >
          Eliminar
        </Button>
      ),
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
                style={{ height: 50 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PQR_seleccionado[0]?.id_unidad_organizacional || ''} // Obtener la ID del primer elemento seleccionado
                onChange={(event): any => {
                  // Actualiza PQR_seleccionado con el elemento seleccionado
                  const selectedItem = tipos_pqr.find(
                    (item:any) => item.id_unidad_organizacional === event.target.value
                  );
                  set_PQR_seleccionado([selectedItem]);
                }}
              >
                {tipos_pqr?.map((item: UnidadOrganizacional) => (
                  <MenuItem key={item.id_unidad_organizacional} value={item.id_unidad_organizacional}>
                    {item.nombre}
                  </MenuItem>
                ))}
              </Select>

              
            </FormControl>
          </Grid>
          <Grid item md={3}>
            <Button fullWidth variant="contained" onClick={() => handleAcumularDatos()} >
              AgregarR
            </Button>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={alerta}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => uuidv4()}
          />
        </Grid>
        
      </Grid>
    </>
  );
};

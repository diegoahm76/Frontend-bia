/* eslint-disable @typescript-eslint/naming-convention */
import { Button, FormControl, Grid, IconButton, MenuItem, Select, Tooltip } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { useContext, useEffect, useState } from 'react';
import { api } from '../../../../../api/axios';
import { DataGrid, GridColumns } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import { FormCreacionContext } from '../../context/CreaccionPlantillaContex';
import DeleteIcon from '@mui/icons-material/Delete';
import { control_warning } from '../../../../almacen/configuracion/store/thunks/BodegaThunks';
import { UnidadOrganizacional } from '../../interfaces/interfacesAdministradorPlantillas';



export const UnidadesOrganizacionalesAutorizadas: React.FC = () => {

  const { form, set_form } = useContext(FormCreacionContext);

  const [tipos_pqr, set_tipos_pqr] = useState<any>(null);
  const [PQR_seleccionado, set_PQR_seleccionado] = useState<any>([]);
  const [alerta, set_alerta] = useState<any[]>([]);




  const handleAcumularDatos = () => {
    if (PQR_seleccionado.length > 0) {
      // Obtiene el elemento seleccionado
      const selectedItem = PQR_seleccionado[0];
  
      // Verifica si el elemento seleccionado ya está presente en variable_concatenada
      // const alreadyExists = alerta.some(item => item.id_unidad_organizacional === selectedItem.id_unidad_organizacional);
      const alreadyExists = form.acceso_unidades_dos.some((item) => item.id_unidad_organizacional === selectedItem.id_unidad_organizacional);
  
      if (!alreadyExists) {
        // Agrega el elemento seleccionado a la alerta
        set_alerta([...alerta, selectedItem]);
  
        set_form({
          ...form,
          // acceso_unidades: [...variable_concatenada, unidadOrganizacional],
          acceso_unidades_dos: [...form.acceso_unidades_dos, selectedItem]
        });
      } else {
        // El elemento ya existe en variable_concatenada, puedes mostrar un mensaje o realizar otra acción
        control_warning('El elemento ya ha sido agregado');
      }
    }
  };
  

  const handleEliminarDato = (id: number) => {
    const updatedAlerta = alerta.filter((item) => item.id_unidad_organizacional !== id);
    set_alerta(updatedAlerta);

  set_form({
    ...form,
    acceso_unidades_dos: updatedAlerta,
  });
  
  };

  const fetch_data_get = async (): Promise<void> => {
    try {
      const url = `/transversal/organigrama/unidades/get-list/organigrama-actual/`;
      const res: any = await api.get(url);
      const numero_consulta: any = res.data.data;
      set_tipos_pqr(numero_consulta);
    } catch (error) {
      console.error(error);
    }
  };





  const columns:GridColumns = [
    {
      field: 'nombre',
      headerName: 'Unidad Organizacional',
      width: 200,
      flex: 1,
      align: 'center', // Centrar el texto en esta columna
      headerAlign: 'center', // Alineación centrada en el encabezado
    },
    {
      field: 'acciones',
      headerName: 'Acciones',
      width: 150,
      renderCell: (params: any) => (
        // Celda personalizada con el botón
        <Tooltip title="Borrar unidad organizacional" placement="right">
        <Button
        
          onClick={() => handleEliminarDato(params.row.id_unidad_organizacional)}
        >
           <DeleteIcon style={{ color: "red" }} />
        </Button>
        </Tooltip>
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
          <Grid item  xs={2.5}>
            <h5>Unidad organizacional :</h5>
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <Select
                style={{ height: 50 }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={PQR_seleccionado[0]?.id_unidad_organizacional || ''} // Obtener la ID del primer elemento seleccionado
                onChange={(event): any => {
                  // Actualiza PQR_seleccionado con el elemento seleccionado
                  const selectedItem = tipos_pqr.find(
                    (item: any) => item.id_unidad_organizacional === event.target.value
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
          <Grid item xs={12} sm={3}>
            <Button fullWidth variant="contained" onClick={() => handleAcumularDatos()} >
              Agregar
            </Button>
          </Grid>
        </Grid>
     
        <Grid item xs={12} style={{marginLeft:70,marginRight:70}}>
          <DataGrid
            density="compact"
            autoHeight
            columns={columns}
            rows={form.acceso_unidades_dos}
            pageSize={10}
            rowsPerPageOptions={[10]}
            getRowId={(row) => uuidv4()}
          />
        </Grid>

      </Grid>
    </>
  );
};

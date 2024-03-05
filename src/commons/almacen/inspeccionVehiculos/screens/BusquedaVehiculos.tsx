import { Box, Button, Dialog, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaVehiculos from '../tables/TableBusquedaVehiculos';
import { useAppDispatch } from '../../../../hooks';
import { data_busqueda_vehiculos, response_busqueda_vehiculos } from '../interfaces/types';
import { buscar_vehiculos } from '../thunks/inspeccion_vehiculos';
import { control_error } from '../../../../helpers';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";



interface props {
  set_vehiculo_arrendado_encontrado:React.Dispatch<React.SetStateAction<data_busqueda_vehiculos>>;
  set_mostrar_busqueda_vehiculo:React.Dispatch<React.SetStateAction<boolean>>;
  set_refrescar_input_vehiculo_buscado:React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_busqueda_vehiculo: boolean;
  refrescar_input_vehiculo_buscado: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaVehiculos: React.FC<props> = ({
  set_vehiculo_arrendado_encontrado,
  set_mostrar_busqueda_vehiculo,
  set_refrescar_input_vehiculo_buscado,
  refrescar_input_vehiculo_buscado,
  mostrar_busqueda_vehiculo
  }) => {

  const dispatch = useAppDispatch();
  
  const [placa, set_placa] = useState<string>('');
  const [nombre, set_nombre] = useState<string>('');
  const [empresa_contratista, set_empresa_contratista] = useState<string>('');
  const [marca, set_marca] = useState<string>('');



  //Estado que almacena los datos de búsqueda de vehículos.
  const [data_busqueda_vehiculos, set_data_busqueda_vehiculos] = useState<data_busqueda_vehiculos[]>([]);

  //Estado que almacena los datos del vehículo arrendado temporalmente.
  const [vehiculo_arrendado_temp, set_vehiculo_arrendado_temp] = useState<data_busqueda_vehiculos>(Object);

  //Función que obtiene los vehículos de la base de datos.
  const obtener_vehiculos: () => void = () => {
    dispatch(buscar_vehiculos(placa,nombre,empresa_contratista,marca))
      .then((response: response_busqueda_vehiculos) => {
        if (!response.success) {
          control_error('No se encontraron vehículos con los filtros seleccionados');
          set_data_busqueda_vehiculos([]);
        } else {
          set_data_busqueda_vehiculos(response.data);
        }
      })
  }

  //Hook de efecto que se ejecuta al montar el componente.
  useEffect(()=>{
    obtener_vehiculos();
  },[])

  /**
   * Función que limpia los campos del formulario de búsqueda de vehículos.
   * 
   * @returns {void}
   */
  const limpiar_form_vehiculos = () => {
    set_marca('');
    set_placa('');
    set_empresa_contratista('');
    set_nombre('');
  }

  /**
   * Función que consulta los vehículos de los servicios.
   * 
   * @param {React.FormEvent<Element>} e - Evento de formulario de React.
   * @returns {void}
   */
  const consultar_vehiculos = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    obtener_vehiculos();
  }

  /**
   * Función que envía el vehículo arrendado seleccionado.
   * 
   * @returns {void}
   */
  const enviar_id_vehiculo_arrendado = () => {
    set_refrescar_input_vehiculo_buscado(!refrescar_input_vehiculo_buscado)
    set_vehiculo_arrendado_encontrado(vehiculo_arrendado_temp);
    set_mostrar_busqueda_vehiculo(false);
  }

  return (
    <Dialog
	  	open={mostrar_busqueda_vehiculo}
	  	onClose={() => {
	  		set_mostrar_busqueda_vehiculo(false);
	  	}}
	  	fullWidth maxWidth="lg" >
      <DialogContent>
        <Grid
        container
        spacing={2}
        marginTop={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '30px',
          mb: '20px',
          margin:'10px auto',
          width:'100%',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
        >
          <Title title='Búsqueda de Vehículos' />

          <Box
            component="form"
            onSubmit={consultar_vehiculos}
            noValidate
            autoComplete="off"
            sx={{width:'100%'}}
            >
            <Grid container spacing={1} my={2} >
              <Grid item xs={12} md={2}>
                <TextField
                  label='Placa:'
                  fullWidth
                  placeholder='Buscar'
                  value={placa}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_placa(e.target.value)}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  label='Nombre:'
                  fullWidth
                  placeholder='Buscar'
                  value={nombre}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre(e.target.value)}
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={2}>
                <TextField
                  label='Nombre del contratista:'
                  fullWidth
                  value={empresa_contratista}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_empresa_contratista(e.target.value)}
                  placeholder='Buscar'
                  size="small"
                />
              </Grid>

              <Grid item xs={12} md={1.8}>
                 <TextField
                   label='Marca:'
                   fullWidth
                   value={marca}
                   onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_marca(e.target.value)}
                   placeholder='Buscar'
                   size="small"
                 />
              </Grid>
              
              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SearchIcon />}
                  type='submit'
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} md={2}>
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={limpiar_form_vehiculos}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </Box>


          <Grid container item xs={12}>
            <TableBusquedaVehiculos
              set_vehiculo_arrendado_temp={set_vehiculo_arrendado_temp}
              data_busqueda_vehiculos={data_busqueda_vehiculos}
            />
          </Grid>

          <Grid container item xs={12} spacing={1} sx={{display:'flex', justifyContent:'end'}}>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                color='primary'
                variant='contained'
                startIcon={<SaveIcon />}
                onClick={enviar_id_vehiculo_arrendado}
              >
                Seleccionar
              </Button>
            </Grid>
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                color="error"
                variant="contained"
                startIcon={<ClearIcon />}
                onClick={()=>set_mostrar_busqueda_vehiculo(false)}
              >
                Salir
              </Button>
            </Grid>
          </Grid>

        </Grid>
      </DialogContent>
    </Dialog>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaVehiculos;
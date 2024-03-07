import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from "@mui/material";
import { Title } from '../../../../components';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from "@mui/icons-material/Clear";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from '@mui/icons-material/Search';
import { buscar_vehiculos_general } from '../thunks/agendamiento_vehiculos';
import { data_buscar_vehiculo, response_buscar_vehiculo } from '../interfaces/types';
import { useAppDispatch } from '../../../../hooks';
import { control_error, control_success } from '../../../../helpers';
import TableBusquedaVehiculos from '../tables/TableBusquedaVehiculos';
import { v4 as uuidv4 } from 'uuid';



interface props {
  mostrar_buscar_vehiculo: boolean;
  set_mostrar_buscar_vehiculo: React.Dispatch<React.SetStateAction<boolean>>;
  set_vehiculo_encontrado: React.Dispatch<React.SetStateAction<data_buscar_vehiculo>>;
  refrescar_tabla: boolean;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BuscarVehiculo: React.FC<props> = ({mostrar_buscar_vehiculo, set_mostrar_buscar_vehiculo,set_vehiculo_encontrado,refrescar_tabla}) => {
  const dispatch = useAppDispatch();

  const [placa, set_placa] = useState<string>('');
  const [nombre, set_nombre] = useState<string>('');
  const [empresa_contratista, set_empresa_contratista] = useState<string>('');
  const [marca, set_marca] = useState<string>('');
  const [nombre_conductor, set_nombre_conductor] = useState<string>('');
  const [tiene_platon, set_tiene_platon] = useState<string>("");
  const [arrendado, set_arrendado] = useState<string>("");

  const [data_busqueda_vehiculos, set_data_busqueda_vehiculos] = useState<data_buscar_vehiculo[]>([]);

  const [vehiculo_encontrado_temp, set_vehiculo_encontrado_temp] = useState<data_buscar_vehiculo>(Object);


/*
  placa: string,
  nombre: string,
  marca: string,
  empresa_contratista: string,
  persona_conductor: string,
  tiene_platon: string,
  arrendado: string,
*/


  const obtener_vehiculos: () => void = () => {
    dispatch(buscar_vehiculos_general(
      placa,
      nombre,
      marca,
      empresa_contratista,
      nombre_conductor,
      tiene_platon,
      arrendado
      ))
      .then((response: response_buscar_vehiculo) => {
        if (!response.success) {
          control_error('No se encontraron vehículos con los filtros seleccionados');
          set_data_busqueda_vehiculos([]);
        } else {
          set_data_busqueda_vehiculos(response.data.map((respuesta: data_buscar_vehiculo)=>{
            return {
              empresa_contratista:respuesta.empresa_contratista,
              es_arrendado: respuesta.es_arrendado,
              id_articulo: respuesta.id_articulo,
              id_hoja_vida_vehiculo: respuesta.id_hoja_vida_vehiculo,
              id_marca: respuesta.id_marca,
              id_persona_conductor: respuesta.id_persona_conductor,
              id_vehiculo_arrendado: respuesta.id_vehiculo_arrendado,
              id_vehiculo_conductor: respuesta.id_vehiculo_conductor,
              marca: respuesta.marca,
              nombre: respuesta.nombre,
              persona_conductor: respuesta.persona_conductor,
              placa: respuesta.placa,
              tiene_platon: respuesta.tiene_platon,
              id_unico: uuidv4(),
            }
          }));
        }
      })
  }

  useEffect(()=>{
    obtener_vehiculos();
  },[refrescar_tabla]);

  const limpiar_form_vehiculos = () => {
    set_marca('');
    set_placa('');
    set_empresa_contratista('');
    set_nombre('');
    set_nombre_conductor('');
    set_tiene_platon('');
    set_arrendado('');
  }

  const consultar_vehiculos = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    obtener_vehiculos();
  }

  const enviar_data_vehiculo_encontrado = () => {
    /*set_refrescar_input_vehiculo_buscado(!refrescar_input_vehiculo_buscado)
    set_vehiculo_arrendado_encontrado(vehiculo_encontrado);
    set_mostrar_busqueda_vehiculo(false);*/
    if (Object.keys(vehiculo_encontrado_temp).length !== 0) {
      set_vehiculo_encontrado(vehiculo_encontrado_temp);
      set_mostrar_buscar_vehiculo(false);
      control_success('Vehículo encontrado con éxito');
    } else {
      control_error('Seleccione un vehículo de la tabla');
    }
  }

  return (
    <Dialog
	  	open={mostrar_buscar_vehiculo}
	  	onClose={() => {
	  		set_mostrar_buscar_vehiculo(false);
	  	}}
	  	fullWidth maxWidth="lg" >
      <DialogContent>
        <Grid
        container
        spacing={2}
        rowSpacing={3}
        marginTop={2}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          p: '30px',
          margin:'10px auto',
          width:'100%',
        }}
        >
          <Title title='Buscar vehículo' />

          <Box
            component="form"
            onSubmit={consultar_vehiculos}
            noValidate
            autoComplete="off"
            sx={{width:'100%', mt:'20px'}}
            >
            <Grid
              container
              sx={{
                marginTop: '10px'
              }}
              spacing={1}
              >
                <Grid item xs={12} md={4} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  }} >
                    <TextField
                      label='Placa:'
                      fullWidth
                      placeholder='Buscar'
                      value={placa}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_placa(e.target.value)}
                      size="small"
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  }} >
                    <TextField
                      label='Nombre:'
                      fullWidth
                      placeholder='Buscar'
                      value={nombre}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre(e.target.value)}
                      size="small"
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  }} >
                    <TextField
                      label='Marca:'
                      fullWidth
                      value={marca}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_marca(e.target.value)}
                      placeholder='Buscar'
                      size="small"
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  }} >
                    <TextField
                      label='Nombre del contratista:'
                      fullWidth
                      value={empresa_contratista}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_empresa_contratista(e.target.value)}
                      placeholder='Buscar'
                      size="small"
                    />
                </Grid>

                <Grid item xs={12} md={4} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  }} >
                    <TextField
                      label='Nombre Conductor:'
                      fullWidth
                      value={nombre_conductor}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre_conductor(e.target.value)}
                      placeholder='Buscar'
                      size="small"
                    />
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl required size='small' fullWidth>
                    <InputLabel>¿Con platón?</InputLabel>
                    <Select
                      label="tiene_platon"
                      value={tiene_platon}
                      fullWidth
                      onChange={(e: SelectChangeEvent) => set_tiene_platon(e.target.value)}
                    >
                      <MenuItem value={'True'}>Si</MenuItem>
                      <MenuItem value={'False'}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item xs={12} md={4}>
                  <FormControl required size='small' fullWidth>
                    <InputLabel>¿Arrendado?</InputLabel>
                    <Select
                      label="¿Arrendado?"
                      value={arrendado}
                      fullWidth
                      onChange={(e: SelectChangeEvent) => set_arrendado(e.target.value)}
                    >
                      <MenuItem value={'True'}>Si</MenuItem>
                      <MenuItem value={'False'}>No</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} md={4} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center'
                  }} >
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
                <Grid item xs={12} md={4} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  }} >
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

            <Grid container sx={{
                display:'flex',
                justifyContent:'center',
                width:'100%'
              }}>
              <TableBusquedaVehiculos
                set_vehiculo_encontrado_temp={set_vehiculo_encontrado_temp}
                data_busqueda_vehiculos={data_busqueda_vehiculos}
              />
            </Grid>

            <Grid container item xs={12} spacing={1} sx={{display:'flex', justifyContent:'end'}}>
              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center'
                }} >
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SaveIcon />}
                  onClick={enviar_data_vehiculo_encontrado}
                >
                  Seleccionar
                </Button>
              </Grid>
              <Grid item xs={12} md={2} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                <Button
                  fullWidth
                  color="error"
                  variant="contained"
                  startIcon={<ClearIcon />}
                  onClick={()=>set_mostrar_buscar_vehiculo(false)}
                >
                  Salir
                </Button>
              </Grid>
            </Grid>

          </Box>
        </Grid>
      </DialogContent>
    </Dialog>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default BuscarVehiculo;
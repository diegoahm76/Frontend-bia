/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/naming-convention */
import React, { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogContent, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaConductores from '../tables/TableBusquedaCondutores';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { data_busqueda_conductores } from '../interfaces/types';
import { useAppDispatch } from '../../../../hooks';
import { buscar_conductores } from '../thunks/bitacora_viajes';
import { control_error } from '../../../../helpers';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';

interface props {
  set_conductor_buscado:React.Dispatch<React.SetStateAction<data_busqueda_conductores>>;
  set_mostrar_busqueda_vehiculos: React.Dispatch<React.SetStateAction<boolean>>;
  mostrar_busqueda_vehiculos: boolean;
}


const BusquedaConductores: React.FC<props> = ({
  set_conductor_buscado,
  set_mostrar_busqueda_vehiculos,
  mostrar_busqueda_vehiculos
}) => {
  const dispatch = useAppDispatch();
  const [tipo_conductor, set_tipo_conductor] = useState<string>('');
  const [nombre_conductor, set_nombre_conductor] = useState<string>('');
  const [msj_error_tipo_conductor, set_msj_error_tipo_conductor] = useState<string>('');

  const [data_busqueda_conductores, set_data_busqueda_conductores] = useState<data_busqueda_conductores[]>([]);

  const [conductor_buscado_temp, set_conductor_buscado_temp] = useState<data_busqueda_conductores>(Object);

  const obtener_conductores: () => Promise<boolean> = async() => {
    const validado = dispatch(buscar_conductores(
      tipo_conductor,
      nombre_conductor))
      .then((response: any) => {
        if (response.data.length === 0) {
          set_data_busqueda_conductores([]);
          return false;
        } else {
          set_data_busqueda_conductores(response.data);
          return true
        }
      })
      return validado;
  }

  useEffect(()=>{
    if(mostrar_busqueda_vehiculos){
      obtener_conductores();
    }
  },[mostrar_busqueda_vehiculos])

  const cambio_tipo_conductor: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_conductor(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tipo_conductor("");
  }

  const limpiar_form_conductores = () => {
    set_tipo_conductor('');
    set_nombre_conductor('');
  }

  const consultar_conductores = async(e: React.FormEvent<Element>) => {
    e.preventDefault();
    const enviar_consulta = await obtener_conductores();
    if(!enviar_consulta){
      control_error('No se encontraron vehículos con los filtros seleccionados');
    }
  }

  const enviar_conductor_seleccionado = () => {
    if(Object.keys(conductor_buscado_temp).length !== 0){
      set_conductor_buscado(conductor_buscado_temp);
      set_mostrar_busqueda_vehiculos(false);
    } else {
      control_error('Haga clic en una fila de la tabla para seleccionar el conductor')
    }
  }

  return (
    <Dialog
	  	open={mostrar_busqueda_vehiculos}
	  	onClose={() => {
	  		set_mostrar_busqueda_vehiculos(false);
	  	}}
	  	fullWidth maxWidth="lg" >
      <DialogContent>
        <Grid
          container
          marginTop={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '30px',
            mb: '10px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
          >
          <Title title='Búsqueda de Conductores' />

          <Box
            component="form"
            onSubmit={consultar_conductores}
            noValidate
            autoComplete="off"
            sx={{width:'100%', mt:'20px'}}
            >
            <Grid item container spacing={1}  xs={12} sx={{
                display:'flex',
                marginTop: '15px'
              }}>
                <Grid item xs={12} md={3}
                  sx={{
                    display:'flex',
                    alignItems:'center',
                    justifyContent:'center'
                  }}
                  >
                    <FormControl required size='small' fullWidth>
                      <InputLabel>
                        Tipo de Conductor:
                      </InputLabel>
                      <Select
                        label='Tipo de Conductor:'
                        fullWidth
                        value={tipo_conductor}
                        onChange={cambio_tipo_conductor}
                        error={msj_error_tipo_conductor !== ""}
                      >
                          <MenuItem value={'IN'}>Interno</MenuItem>
                          <MenuItem value={'EX'}>Externo</MenuItem>
                      </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
                  }} >
                  <TextField
                    fullWidth
                    label='Conductor:'
                    placeholder='Buscar'
                    size="small"
                    value={nombre_conductor}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre_conductor(e.target.value)}
                  />
                </Grid>

                <Grid item xs={12} md={2} sx={{
                  display:'flex',
                  justifyContent: 'center',
                  alignItems:'center',
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
                <Grid item xs={12} md={2} sx={{
                    display:'flex',
                    justifyContent: 'center',
                    alignItems:'center',
                    }} >
                    <Button
                      fullWidth
                      color="inherit"
                      variant="outlined"
                      startIcon={<CleanIcon />}
                      onClick={limpiar_form_conductores}
                    >
                      Limpiar
                    </Button>
                  </Grid>
            </Grid>
          </Box>

          <Grid item container xs={12} sx={{
              display:'flex',
              justifyContent:'center'
            }}>
            <TableBusquedaConductores
              set_conductor_buscado_temp={set_conductor_buscado_temp}
              data_busqueda_conductores={data_busqueda_conductores}/>
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
                disabled={Object.keys(conductor_buscado_temp).length === 0}
                onClick={enviar_conductor_seleccionado}
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
                onClick={()=>set_mostrar_busqueda_vehiculos(false)}
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
export default BusquedaConductores;
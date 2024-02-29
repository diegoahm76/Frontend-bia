import { Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaVehiculos from '../tables/TableBusquedaVehiculos';
import { useAppDispatch } from '../../../../hooks';
import { data_busqueda_vehiculos } from '../interfaces/types';
import { buscar_vehiculos } from '../thunks/asignacion_vehiculos';
import { control_error } from '../../../../helpers';
import CleanIcon from '@mui/icons-material/CleaningServices';

interface props {
  set_id_hoja_vida_vehiculo:React.Dispatch<React.SetStateAction<number>>
  set_vehiculo_placa:React.Dispatch<React.SetStateAction<string>>
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaVehiculos: React.FC<props> = ({set_id_hoja_vida_vehiculo, set_vehiculo_placa}) => {
  const dispatch = useAppDispatch();
  const [tipo_vehiculo, set_tipo_vehiculo] = useState<string>('');
  const [msj_error_tipo_vehiculo, set_msj_error_tipo_vehiculo] = useState<string>('');
  const [marca, set_marca] = useState<string>('');
  const [placa, set_placa] = useState<string>('');


  const [data_busqueda_vehiculos, set_data_busqueda_vehiculos] = useState<data_busqueda_vehiculos[]>([]);

  const obtener_vehiculos: () => Promise<boolean> = async() => {
    const validado = await dispatch(buscar_vehiculos(
      tipo_vehiculo,
      marca,
      placa,))
      .then((response: any) => {
        if (response?.data.length === 0) {
          set_data_busqueda_vehiculos([]);
          return false;
        } else {
          set_data_busqueda_vehiculos(response.data);
          return true;
        }
      })
    return validado;
  }

  useEffect(()=>{
    obtener_vehiculos();
  },[])

  const cambio_tipo_vehiculo: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_vehiculo(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
    set_msj_error_tipo_vehiculo("");
  }

  const limpiar_form_vehiculos = () => {
    set_marca('');
    set_placa('');
    set_tipo_vehiculo('');
    set_msj_error_tipo_vehiculo('');
  }

  const consultar_vehiculos = async(e: React.FormEvent<Element>) => {
    e.preventDefault();
    const envio_consulta = await obtener_vehiculos();
    if(!envio_consulta){
      control_error('No se encontraron vehículos con los filtros seleccionados');
    }
  }

  return (
    <Grid
    container
    spacing={2}
    marginTop={2}
    sx={{
      position: 'relative',
      background: '#FAFAFA',
      borderRadius: '15px',
      p: '20px',
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
        sx={{width:'100%', mt:'20px'}}
        >
        <Grid
          container
          sx={{
            marginTop: '10px'
          }}
          spacing={1}
          >
            <Grid item xs={12} md={3}
              sx={{
                display:'flex',
                alignItems:'center',
                justifyContent:'center'
              }}
              >
              <FormControl required size='small' fullWidth>
                <InputLabel>
                  Tipo de Vehículo:
                </InputLabel>
                <Select
                  fullWidth
                  label='Tipo de Vehículo:'
                  value={tipo_vehiculo}
                  onChange={cambio_tipo_vehiculo}
                  error={msj_error_tipo_vehiculo !== ""}
                >
                    <MenuItem value={'C'}>Carro</MenuItem>
                    <MenuItem value={'M'}>Moto</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={1.8} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems:'center',
              }} >
                <TextField
                  label='Marca:'
                  fullWidth
                  placeholder='Buscar'
                  value={marca}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_marca(e.target.value)}
                  size="small"
                />
            </Grid>

            <Grid item xs={12} md={1.8} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems:'center',
              }} >
                <TextField
                  label='Placa:'
                  fullWidth
                  value={placa}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_placa(e.target.value)}
                  placeholder='Buscar'
                  size="small"
                />
            </Grid>
            
            <Grid item xs={12} md={3} sx={{
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
                onClick={limpiar_form_vehiculos}
              >
                Limpiar
              </Button>
            </Grid>
        </Grid>
      </Box>


      <Grid container sx={{
          display:'flex',
          justifyContent:'center',
          width:'100%'
        }}>
        <TableBusquedaVehiculos
          set_vehiculo_placa={set_vehiculo_placa}
          set_id_hoja_vida_vehiculo={set_id_hoja_vida_vehiculo}
          data_busqueda_vehiculos={data_busqueda_vehiculos}
        />
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaVehiculos;
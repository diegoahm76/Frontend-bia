import { Button, FormControl, FormLabel, Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { busqueda_vehiculos } from '../interfaces/types';
import BusquedaConductores from './BusquedaConductores';
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid';
import TableBusquedaVehiculos from '../tables/TableBusquedaVehiculos';


// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaVehiculos: React.FC<busqueda_vehiculos> = ({set_mostrar_busqueda_vehiculos}) => {
  const [tipo_vehiculo, set_tipo_vehiculo] = useState<string>('');
  const [msj_error_tipo_vehiculo, set_msj_error_tipo_vehiculo] = useState<string>('');


  const cambio_tipo_vehiculo: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_vehiculo(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
    set_msj_error_tipo_vehiculo("");
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

      <Grid
        container
        sx={{
          marginTop: '10px'
        }}
        spacing={2}
        >
        <Grid item container xs={12} sx={{
            display:'flex',
            gap:'10px',
          }}>
          <Grid item xs={3}
            sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
            >
            <FormLabel sx={{marginRight:'10px'}}>
              Tipo de Vehículo:
            </FormLabel>
            <Grid item xs={6}>
              <FormControl required size='small' fullWidth>
                <Select
                  value={tipo_vehiculo}
                  onChange={cambio_tipo_vehiculo}
                  error={msj_error_tipo_vehiculo !== ""}
                >
                    <MenuItem value={'carro'}>Carro</MenuItem>
                    <MenuItem value={'moto'}>Moto</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={2} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap:1
            }} >
            <FormLabel htmlFor='marca'>
              Marca:
            </FormLabel>
            <Grid item xs={11}>
              <TextField
                fullWidth
                id='marca'
                placeholder='Buscar'
                size="small"
              />
            </Grid>
          </Grid>

          <Grid item xs={2} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap:1
            }} >
            <FormLabel htmlFor='placa'>
              Placa:
            </FormLabel>
            <Grid item xs={8}>
              <TextField
                fullWidth
                id='placa'
                placeholder='Buscar'
                size="small"
              />
            </Grid>
          </Grid>
          
          <Grid item xs={1} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap:1
            }} >
            <Button
              color='primary'
              variant='contained'
              startIcon={<SearchIcon />}
              onClick={() => {}}
            >
              Buscar
            </Button>
          </Grid>
        </Grid>
      </Grid>

      <Grid container sx={{
          display:'flex',
          justifyContent:'center',
          width:'100%'
        }}>
        <TableBusquedaVehiculos />
      </Grid>

      <BusquedaConductores />
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaVehiculos;
import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaVehiculos from '../tables/TableBusquedaVehiculos';


// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaVehiculos: React.FC = () => {
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
                  <MenuItem value={'carro'}>Carro</MenuItem>
                  <MenuItem value={'moto'}>Moto</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={3} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            }} >
              <TextField
                label='Marca:'
                fullWidth
                placeholder='Buscar'
                size="small"
              />
          </Grid>

          <Grid item xs={12} md={3} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            }} >
              <TextField
                label='Placa:'
                fullWidth
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
              onClick={() => {}}
            >
              Buscar
            </Button>
          </Grid>
      </Grid>

      <Grid container sx={{
          display:'flex',
          justifyContent:'center',
          width:'100%'
        }}>
        <TableBusquedaVehiculos />
      </Grid>
    </Grid>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default BusquedaVehiculos;
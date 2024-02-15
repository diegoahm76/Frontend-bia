import { Button, FormControl, FormLabel, Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import BusquedaVehiculos from './BusquedaVehiculos';
import TableAsignacionVehiculos from '../tables/TableAsignacionVehiculos';
import BusquedaConductores from './BusquedaConductores';



// eslint-disable-next-line @typescript-eslint/naming-convention
const AsignacionVehiculos: React.FC = () => {
  const [mostrar_busqueda_vehiculos, set_mostrar_busqueda_vehiculos] = useState<boolean>(false);
  const [tipo_conductor, set_tipo_conductor] = useState<string>('');
  const [msj_error_tipo_conductor, set_msj_error_tipo_conductor] = useState<string>('');
  const [tipo_vehiculo, set_tipo_vehiculo] = useState<string>('');
  const [msj_error_tipo_vehiculo, set_msj_error_tipo_vehiculo] = useState<string>('');


  const cambio_tipo_conductor: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_conductor(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tipo_conductor("");
  }

  const cambio_tipo_vehiculo: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_vehiculo(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
    set_msj_error_tipo_vehiculo("");
  }

  return (
    <>
      <Grid
        container
        spacing={2}
        marginTop={2}
        width={'100%'}
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          boxShadow: '0px 3px 6px #042F4A26',
          borderRadius: '15px',
          margin: 'auto',
          p: '20px',
          mb: '20px',
        }}
        >
        <Title title='Vehículos Asignados' />

        <Grid
          container
          sx={{
            marginTop: '10px'
          }}
          spacing={1}
          >
            <Grid item container xs={12} sx={{
              display:'flex',
              gap:'10px'
            }}>
              <Grid item xs={3}
                sx={{
                  display:'flex',
                  alignItems:'center',
                  justifyContent:'center'
                }}
                >
                <FormLabel sx={{marginRight:'5px'}}>
                  Tipo de Conductor:
                </FormLabel>
                <Grid item xs={6}>
                  <FormControl required size='small' fullWidth>
                    <Select
                      value={tipo_conductor}
                      onChange={cambio_tipo_conductor}
                      error={msj_error_tipo_conductor !== ""}
                    >
                        <MenuItem value={'interno'}>Interno</MenuItem>
                        <MenuItem value={'externo'}>Externo</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

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

              <Grid item xs={1.5} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                gap:1
                }} >
                <FormLabel htmlFor='placa'>
                  Placa:
                </FormLabel>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    id='placa'
                    placeholder='Buscar'
                    size="small"
                  />
                </Grid>
              </Grid>

              <Grid item xs={2.5} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                gap:1
                }} >
                <FormLabel htmlFor='conductor'>
                  Conductor:
                </FormLabel>
                <Grid item xs={7}>
                  <TextField
                    fullWidth
                    id='conductor'
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

            <Grid item container xs={12} sx={{
              display:'flex',
              justifyContent:'center'
            }}>
              
            <Grid item container xs={12} sx={{
              display:'flex',
              justifyContent:'center'
            }}>
              <TableAsignacionVehiculos />
            </Grid>
            
            {!mostrar_busqueda_vehiculos &&
              <Button
                color='success'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={()=>set_mostrar_busqueda_vehiculos(true)}
              >
                Asignar Vehículo
              </Button>
            }
          </Grid>
        </Grid>
      </Grid>


      {mostrar_busqueda_vehiculos && 
        <>
          <BusquedaVehiculos />
          <BusquedaConductores />
        </>
      }


    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default AsignacionVehiculos;
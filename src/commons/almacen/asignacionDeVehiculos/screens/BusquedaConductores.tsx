import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaConductores from '../tables/TableBusquedaCondutores';
import CleanIcon from '@mui/icons-material/CleaningServices';
import { data_busqueda_conductores } from '../interfaces/types';
import { useAppDispatch } from '../../../../hooks';
import { buscar_conductores } from '../thunks/asignacion_vehiculos';
import { control_error } from '../../../../helpers';

interface props {
  set_id_persona_conductor:React.Dispatch<React.SetStateAction<number>>;
  set_nro_documento:React.Dispatch<React.SetStateAction<string>>;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaConductores: React.FC<props> = ({set_id_persona_conductor, set_nro_documento}) => {
  const dispatch = useAppDispatch();
  const [tipo_conductor, set_tipo_conductor] = useState<string>('');
  const [nombre_conductor, set_nombre_conductor] = useState<string>('');
  const [msj_error_tipo_conductor, set_msj_error_tipo_conductor] = useState<string>('');

  const [data_busqueda_conductores, set_data_busqueda_conductores] = useState<data_busqueda_conductores[]>([]);

  const obtener_conductores: () => void = () => {
    dispatch(buscar_conductores(
      tipo_conductor,
      nombre_conductor))
      .then((response: any) => {
        if (response.data.length === 0) {
          control_error('No se encontraron vehículos con los filtros seleccionados');
          set_data_busqueda_conductores([]);
        } else {
          set_data_busqueda_conductores(response.data);
        }
      })
  }

  useEffect(()=>{
    obtener_conductores();
  },[])

  const cambio_tipo_conductor: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_conductor(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tipo_conductor("");
  }

  const limpiar_form_conductores = () => {
    set_tipo_conductor('');
    set_nombre_conductor('');
  }

  const consultar_conductores = (e: React.FormEvent<Element>) => {
    e.preventDefault();
    obtener_conductores();
  }

  return (
    <Grid
      container
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '10px',
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
          set_nro_documento={set_nro_documento}
          set_id_persona_conductor={set_id_persona_conductor}
          data_busqueda_conductores={data_busqueda_conductores}/>
      </Grid>
    </Grid>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default BusquedaConductores;
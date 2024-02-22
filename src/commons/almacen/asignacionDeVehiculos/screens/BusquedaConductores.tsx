import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import TableBusquedaConductores from '../tables/TableBusquedaCondutores';


// eslint-disable-next-line @typescript-eslint/naming-convention
const BusquedaConductores: React.FC = () => {
  const [tipo_conductor, set_tipo_conductor] = useState<string>('');
  const [msj_error_tipo_conductor, set_msj_error_tipo_conductor] = useState<string>('');

  const cambio_tipo_conductor: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_tipo_conductor(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_tipo_conductor("");
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
                    <MenuItem value={'interno'}>Interno</MenuItem>
                    <MenuItem value={'externo'}>Externo</MenuItem>
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
        <TableBusquedaConductores />
      </Grid>
    </Grid>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default BusquedaConductores;
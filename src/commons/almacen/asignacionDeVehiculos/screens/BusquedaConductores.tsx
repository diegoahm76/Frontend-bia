import React, { useState } from 'react';
import { Button, FormControl, FormLabel, Grid, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';


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
      spacing={2}
      marginTop={2}
      sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '10px',
        mb: '10px',
        border: 'solid 1px #e5e5e5'
      }}
      >
      <Title title='Búsqueda de Conductores' />
      <Grid item container xs={12} sx={{
          display:'flex',
          gap:'10px'
        }}>
          <Grid item xs={4}
            sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
            >
            <FormLabel sx={{marginRight:'10px'}}>
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

          <Grid item xs={2} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap:1
            }} >
            <FormLabel htmlFor='conductor'>
              Conductor:
            </FormLabel>
            <Grid item xs={8}>
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
        Aqui va tabla con resultados
      </Grid>
    </Grid>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default BusquedaConductores;
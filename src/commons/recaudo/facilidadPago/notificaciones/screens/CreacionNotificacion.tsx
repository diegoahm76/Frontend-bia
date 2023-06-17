import { Box, FormControl, Grid, InputLabel, MenuItem, Select } from '@mui/material';
import { Title } from '../../../../../components/Title';
import { type event } from '../../interfaces/interfaces';
import { useState } from 'react';
import { Email, Fisico, Edicto } from '../componentes/RegistroCreacion';

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CreacionNotificacion: React.FC = () => {
  const [filter, set_filter] = useState('');

  return (
    <>
      <Title title={`Crear Notificación ${filter}`} />
      <Grid
        container
        sx={{
          position: 'relative',
          background: '#FAFAFA',
          borderRadius: '15px',
          mb: '20px',
          mt: '20px',
          p: '20px',
          boxShadow: '0px 3px 6px #042F4A26',
        }}
      >
        <Grid item xs={12}>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <Grid item xs={12} sm={2.9}>
              <FormControl fullWidth>
                <InputLabel>Selecciona Medio Notificación</InputLabel>
                  <Select
                    label="Selecciona Medio Notificación"
                    defaultValue={''}
                    size='small'
                    onChange={(event: event)=>{
                      const { value } = event.target
                      set_filter(value)
                    }}
                  >
                    <MenuItem value='- Email'>Correo Electrónico</MenuItem>
                    <MenuItem value='- Despacho Físico'>Dirección Física</MenuItem>
                    <MenuItem value='- Publicación en Edicto'>Publicación Web</MenuItem>
                  </Select>
              </FormControl>
            </Grid>
          </Box>
        </Grid>
      </Grid>
      {
        filter === '- Email' ? <Email /> : filter === '- Despacho Físico' ? <Fisico /> : filter === '- Publicación en Edicto' ? <Edicto /> : null
      }
    </>
  )
}

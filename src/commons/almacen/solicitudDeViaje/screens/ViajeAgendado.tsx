import React, { useEffect, useState } from 'react';
import { FormLabel, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { viajes_agendados } from '../interfaces/types';
import { parseHora } from '../thunks/viajes';

interface props {
  solicitud_respondida: viajes_agendados;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ViajeAgendado: React.FC<props> = ({solicitud_respondida}) => {
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [hora_salida, set_hora_salida] = useState<Date | null>(new Date());
  const [hora_retorno, set_hora_retorno] = useState<Date | null>(new Date());
  const [conductor, set_conductor] = useState<string>('');
  const [vehiculo, set_vehiculo] = useState<string>('');


  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
    }
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
    }
  };

  const cambio_hora_salida = (newTime: dayjs.Dayjs | null) => {
    set_hora_salida(newTime?.toDate() || null);
  };


  const cambio_hora_retorno = (newTime:  dayjs.Dayjs | null) => {
    set_hora_retorno(newTime?.toDate() || null);
  };

  useEffect(()=>{
    console.log(solicitud_respondida);
  },[solicitud_respondida])
  
  useEffect(()=>{
    if(Object.keys(solicitud_respondida).length !== 0){
      cambio_fecha_salida(dayjs(solicitud_respondida.fecha_partida_asignada));
      cambio_fecha_retorno(dayjs(solicitud_respondida.fecha_retorno_asignada));
      cambio_hora_salida(parseHora(solicitud_respondida.hora_partida));
      cambio_hora_retorno(parseHora(solicitud_respondida.hora_retorno));
      set_conductor(solicitud_respondida.apellido_conductor + ' ' + solicitud_respondida.nombre_conductor);
      set_vehiculo(solicitud_respondida.marca + ' - ' + solicitud_respondida.placa);
    }
  },[solicitud_respondida])

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
        border: 'solid 1px #e5e5e5'
      }}
    >
      <Title title="Viaje agendado" />
      <Grid
        item
        container
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Grid
          item
          xs={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
          >
          <FormLabel htmlFor="conductor">
            Conductor:
          </FormLabel>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              id="conductor" 
              size="small"
              disabled
              value={conductor}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_conductor(e.target.value)}
              />
          </Grid>
        </Grid>
        <Grid
          item
          xs={5}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 1,
          }}
          >
          <FormLabel htmlFor="vehiculo">
            Vehículo:
          </FormLabel>
          <Grid item xs={6}>
            <TextField 
              fullWidth 
              id="vehiculo" 
              size="small"
              disabled
              value={vehiculo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_vehiculo(e.target.value)}
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Grid item xs={5} sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
          }}>
          <FormLabel style={{marginRight:'15px'}}>
            Fecha de salida*:
          </FormLabel>
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Desde:"
                value={fecha_salida}
                onChange={(newValue) => { cambio_fecha_salida(newValue); }}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    size="small"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item xs={5} sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            }}>
            <FormLabel style={{marginRight:'10px'}}>
              Hora*:
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  disabled
                  label="Seleccionar hora"
                  openTo="hours"
                  value={hora_salida}
                  onChange={cambio_hora_salida}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" helperText="" />
                  )}
                />
            </LocalizationProvider>
          </Grid>
      </Grid>

      <Grid
        item
        container
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Grid item xs={5} sx={{
          display:'flex',
          justifyContent:'center',
          alignItems:'center'
          }}>
          <FormLabel style={{marginRight:'15px'}}>
            Fecha de retorno*:
          </FormLabel>
          <Grid item xs={5}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                disabled
                label="Desde:"
                value={fecha_retorno}
                onChange={(newValue) => { cambio_fecha_retorno(newValue); }}
                renderInput={(params) => (
                  <TextField
                    required
                    fullWidth
                    size="small"
                    {...params}
                  />
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>

        <Grid item xs={5} sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            }}>
            <FormLabel style={{marginRight:'10px'}}>
              Hora*:
            </FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <MobileTimePicker
                  disabled
                  label="Seleccionar hora"
                  openTo="hours"
                  value={hora_retorno}
                  onChange={cambio_hora_retorno}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" helperText="" />
                  )}
                />
            </LocalizationProvider>
          </Grid>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ViajeAgendado;
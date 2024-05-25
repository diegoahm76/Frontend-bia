import React, { useEffect, useState } from 'react';
import { FormLabel, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { parseHora } from '../thunks/viajes';
import { interface_solicitud_respondida } from '../interfaces/types';

interface props {
  solicitud_respondida: interface_solicitud_respondida;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
const ViajeAgendado: React.FC<props> = ({solicitud_respondida}) => {
  const [fecha_autorizacion, set_fecha_autorizacion] = useState<Dayjs | null>(dayjs());
  const [fecha_salida, set_fecha_salida] = useState<Dayjs | null>(dayjs());
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs | null>(dayjs());
  const [hora_salida, set_hora_salida] = useState<Date | null>(new Date());
  const [hora_retorno, set_hora_retorno] = useState<Date | null>(new Date());
  const [nombres_conductor, set_nombres_conductor] = useState<string>('');
  const [apellidos_conductor, set_apellidos_conductor] = useState<string>('');
  const [nombre_vehiculo, set_nombre_vehiculo] = useState<string>('');
  const [documento_conductor, set_documento_conductor] = useState<string>('');
  const [marca_vehiculo, set_marca_vehiculo] = useState<string>('');
  const [placa_vehiculo, set_placa_vehiculo] = useState<string>('');


  const cambio_fecha_autorizacion = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_autorizacion(date);
    } else {
      set_fecha_autorizacion(dayjs());
    }
  };

  const cambio_fecha_salida = (date: Dayjs | null): void => {
    console.log(date);
    if (date !== null) {
      set_fecha_salida(date);
    } else {
      set_fecha_salida(dayjs());
    }
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
    } else {
      set_fecha_retorno(dayjs());
    }
  };

  const cambio_hora_salida = (newTime: dayjs.Dayjs | null) => {
    set_hora_salida(newTime?.toDate() || null);
  };


  const cambio_hora_retorno = (newTime:  dayjs.Dayjs | null) => {
    set_hora_retorno(newTime?.toDate() || null);
  };
  
  useEffect(()=>{
    if(Object.keys(solicitud_respondida).length !== 0){
      cambio_fecha_salida(dayjs(solicitud_respondida.fecha_partida_asignada ?? '2024-01-01'));
      cambio_fecha_retorno(dayjs(solicitud_respondida.fecha_retorno_asignada ?? '2024-01-01'));
      cambio_hora_salida(parseHora(solicitud_respondida.hora_partida));
      cambio_hora_retorno(parseHora(solicitud_respondida.hora_retorno));
      set_nombres_conductor(solicitud_respondida.nombre_conductor);
      set_apellidos_conductor(solicitud_respondida.apellido_conductor);
      set_documento_conductor(solicitud_respondida.numero_documento);
      set_nombre_vehiculo(solicitud_respondida.nombre);
      set_marca_vehiculo(solicitud_respondida.marca);
      set_placa_vehiculo(solicitud_respondida.placa);
      cambio_fecha_autorizacion(dayjs(solicitud_respondida.fecha_autorizacion ?? '2024-01-01'));
    }
  },[solicitud_respondida])

  return (
    <Grid container columnSpacing={2} rowSpacing={4} marginTop={2} sx={{
        position: 'relative',
        background: '#FAFAFA',
        borderRadius: '15px',
        p: '30px',
        my: '40px',
        mx: '20px',
        boxShadow: "0px 3px 6px #042F4A26",
        border: 'solid 1px #e5e5e5'
      }}
    >
      <Title title="Viaje agendado" />

      <Grid item xs={12} lg={2}>
        <TextField 
          label="Nombres del conductor:"
          fullWidth 
          size="small"
          disabled
          value={nombres_conductor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombres_conductor(e.target.value)}
          />
      </Grid>

      <Grid item xs={12} lg={2}>
        <TextField 
          label="Apellidos del conductor:"
          fullWidth 
          size="small"
          disabled
          value={apellidos_conductor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_apellidos_conductor(e.target.value)}
          />
      </Grid>

      <Grid item xs={12} lg={2}>
        <TextField
          label="Documento conductor:"
          fullWidth 
          size="small"
          disabled
          value={documento_conductor}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_documento_conductor(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} lg={2}>
        <TextField
          label="Nombre vehículo:"
          fullWidth 
          size="small"
          disabled
          value={nombre_vehiculo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre_vehiculo(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} lg={2}>
        <TextField
          label="Marca de vehículo:"
          fullWidth 
          size="small"
          disabled
          value={marca_vehiculo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_marca_vehiculo(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} lg={2}>
        <TextField
          label="Placa vehículo:"
          fullWidth 
          size="small"
          disabled
          value={placa_vehiculo}
          onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_placa_vehiculo(e.target.value)}
        />
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de salida:"
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

      <Grid item xs={12} lg={1.5}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              disabled
              label="Hora de salida:"
              openTo="hours"
              value={hora_salida}
              onChange={cambio_hora_salida}
              renderInput={(params) => (
                <TextField {...params} fullWidth variant="standard" helperText="" />
              )}
            />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de retorno:"
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

      <Grid item xs={12} md={1.5} >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileTimePicker
              disabled
              label="Hora de retorno:"
              openTo="hours"
              value={hora_retorno}
              onChange={cambio_hora_retorno}
              renderInput={(params) => (
                <TextField {...params} fullWidth variant="standard" helperText="" />
              )}
            />
        </LocalizationProvider>
      </Grid>

      <Grid item xs={12} lg={3}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            disabled
            label="Fecha de autorizacion:"
            value={fecha_autorizacion}
            onChange={(newValue) => { cambio_fecha_autorizacion(newValue); }}
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
  );
};

// eslint-disable-next-line no-restricted-syntax
export default ViajeAgendado;
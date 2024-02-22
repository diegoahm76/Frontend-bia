import React, { useState } from 'react';
import { FormLabel, Grid, TextField } from '@mui/material';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

// eslint-disable-next-line @typescript-eslint/naming-convention
const ViajeAgendado: React.FC = () => {
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");
  const [hora_salida, set_hora_salida] = useState<Date | null>(new Date());
  const [hora_retorno, set_hora_retorno] = useState<Date | null>(new Date());

  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
      set_msj_error_fecha_salida("");
    } else {
      set_msj_error_fecha_salida("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
      set_msj_error_fecha_retorno("");
    } else {
      set_msj_error_fecha_retorno("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_hora_salida = (newTime: Date | null) => {
    set_hora_salida(newTime);
  };

  const cambio_hora_retorno = (newTime: Date | null) => {
    set_hora_retorno(newTime);
  };

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
            <TextField fullWidth id="conductor" size="small" />
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
            <TextField fullWidth id="vehiculo" size="small" />
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
                minDate={dayjs()}
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
                minDate={dayjs()}
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
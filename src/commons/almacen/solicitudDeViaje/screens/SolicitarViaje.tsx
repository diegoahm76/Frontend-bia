import { FormControl, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import React, { useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';

// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitarViaje: React.FC = () => {
  const [switch_expediente_asociado, set_switch_expediente_asociado] = useState<boolean>(false);
  const [departamento, set_departamento] = useState<string>('');
  const [msj_error_departamento, set_msj_error_departamento] = useState<string>('');
  const [municipio, set_municipio] = useState<string>('');
  const [msj_error_municipio, set_msj_error_municipio] = useState<string>('');
  const [numero_pasajeros, set_numero_pasajeros] = useState<string>("");
  const [mensaje_error_numero_pasajeros, set_mensaje_error_numero_pasajeros] = useState<string>("");
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");
  const [selected_time, set_selected_time] = useState<Date | null>(new Date());
  const [switch_requiere_carga, set_switch_requiere_carga] = useState<boolean>(false);


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
      set_fecha_salida(date);
      set_msj_error_fecha_salida("");
    } else {
      set_msj_error_fecha_salida("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_departamento: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_departamento(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_departamento("");
  }

  const cambio_municipio: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_municipio(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
    set_msj_error_municipio("");
  }

  const cambio_numero_pasajeros: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_numero_pasajeros(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_mensaje_error_numero_pasajeros("");
  };

  const handle_time_change = (newTime: Date | null) => {
    set_selected_time(newTime);
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
        boxShadow: '0px 3px 6px #042F4A26',
      }}
    >
      <Title title="Solicitar Viaje" />
      <Grid
        container
        sx={{
          marginTop: '10px',
        }}
        spacing={2}
      >
        <Grid item xs={12}>
          <FormLabel htmlFor='motivo_viaje'>
            Motivo del viaje*:
          </FormLabel>
          <TextField
            id='motivo_viaje'
            required
            fullWidth
            placeholder='Escriba aqui el motivo de viaje'
            size="small"
            multiline
            rows={6}
          />
        </Grid>

        <Grid item container xs={12} display={'flex'} justifyContent={'center'} margin={'10px 0px'}>
          <Grid item xs={4}>
            <FormLabel htmlFor='expediente_asociado'>
              ¿Tiene Expediente asociado?
            </FormLabel>
            <Switch id='expediente_asociado' checked={switch_expediente_asociado} onChange={()=>set_switch_expediente_asociado(!switch_expediente_asociado)} />
          </Grid>
          
          <Grid item xs={5} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap:1
          }} >
            <FormLabel htmlFor='buscar_expediente'>
              Buscar expediente:
            </FormLabel>
            <Grid item xs={3}>
              <TextField
                fullWidth
                id='buscar_expediente'
                required
                placeholder='Buscar'
                size="small"
              />
            </Grid>
            <SearchIcon style={{width:'40px',cursor:'pointer'}}/>
          </Grid>
        </Grid>

        <Grid item container xs={12} sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:'20px'
          }}>
          <Grid item xs={3.5} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap:1
          }} >
            <FormLabel htmlFor='buscar_expediente'>
              Dirección*:
            </FormLabel>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id='buscar_expediente'
                required
                size="small"
              />
            </Grid>
          </Grid>

          <Grid item xs={3.5}
            sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <FormLabel>
              Departamento*:
            </FormLabel>
            <Grid item xs={6}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Departamento</InputLabel>
                <Select
                  label="Estado"
                  value={departamento}
                  required
                  onChange={cambio_departamento}
                  error={msj_error_departamento !== ""}
                >
                    <MenuItem value={'En espera'}>Meta</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid item xs={3.5}
            sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}
          >
            <FormLabel>
              Municipio*:
            </FormLabel>
            <Grid item xs={6}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Municipio</InputLabel>
                <Select
                  label="Estado"
                  value={municipio}
                  required
                  onChange={cambio_municipio}
                  error={msj_error_municipio !== ""}
                >
                    <MenuItem value={'En espera'}>Villavicencio</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container xs={12} sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:'20px'
          }}>
          <Grid item xs={5} sx={{
            display:'flex',
            justifyContent: 'center',
            alignItems:'center',
            gap:1
            }} >
            <FormLabel htmlFor='buscar_expediente'>
              Idicadores de destino:
            </FormLabel>
            <Grid item xs={6}>
              <TextField
                fullWidth
                id='buscar_expediente'
                size="small"
              />
            </Grid>
          </Grid>
          <Grid item xs={4.4} sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            }}>
            <FormLabel sx={{marginRight:'10px'}} htmlFor='numero_pasajeros'>
              Número de pasajeros*:
            </FormLabel>
            <OutlinedInput
              sx={{width:'80px'}}
              id='numero_pasajeros'
              type={'number'}
              value={numero_pasajeros}
              size='small'
              onChange={cambio_numero_pasajeros}
              error={mensaje_error_numero_pasajeros !== ""}
              placeholder={"0"}
            />
          </Grid>
        </Grid>

        <Grid item container xs={11} sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:'20px',
            marginX:'auto'
          }}>
          <Grid item xs={4} sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            }}>
            <FormLabel style={{width:'70%'}}>
              Fecha de salida*:
            </FormLabel>
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
          
          <Grid item xs={2} sx={{
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
                  value={selected_time}
                  onChange={handle_time_change}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" helperText="" />
                  )}
                />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3.5} sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}>
            <FormLabel htmlFor='expediente_asociado'>
              ¿Requiere Carga?
            </FormLabel>
            <Switch id='expediente_asociado' checked={switch_requiere_carga} onChange={()=>set_switch_requiere_carga(!switch_requiere_carga)} />
          </Grid>
        </Grid>

        <Grid item container xs={11} sx={{
            display:'flex',
            justifyContent:'space-between',
            alignItems:'center',
            marginTop:'20px',
            marginX:'auto'
          }}>
          <Grid item xs={4} sx={{
            display:'flex',
            justifyContent:'center',
            alignItems:'center'
            }}>
            <FormLabel style={{width:'70%'}}>
              Fecha de salida*:
            </FormLabel>
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
          
          <Grid item xs={2} sx={{
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
                  value={selected_time}
                  onChange={handle_time_change}
                  renderInput={(params) => (
                    <TextField {...params} variant="standard" helperText="" />
                  )}
                />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={3.5} sx={{
              display:'flex',
              alignItems:'center',
              justifyContent:'center'
            }}>
            <FormLabel htmlFor='expediente_asociado'>
              ¿Requiere Carga?
            </FormLabel>
            <Switch id='expediente_asociado' checked={switch_requiere_carga} onChange={()=>set_switch_requiere_carga(!switch_requiere_carga)} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitarViaje;

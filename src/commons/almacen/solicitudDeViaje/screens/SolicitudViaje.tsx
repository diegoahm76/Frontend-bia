import React, { useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import SolicitarViaje from './SolicitarViaje';
import { RenderDataGrid } from '../../../gestorDocumental/tca/Atom/RenderDataGrid/RenderDataGrid';
import { data_solicitud_viaje } from '../interfaces/types';


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitudViaje: React.FC = () => {
  const [data_solicitudes_viajes, set_data_solicitudes_viajes] = useState<data_solicitud_viaje[]>([
    {
      estado: "Respondida",
      fechaSolicitud: "2024-02-13",
      numPasajeros: 3,
      fechaSalida: "2024-02-20",
      fechaRetorno: "2024-02-25",
      municipioDestino: "Medellín"
    },
    {
      estado: "Finalizada",
      fechaSolicitud: "2024-02-15",
      numPasajeros: 2,
      fechaSalida: "2024-03-10",
      fechaRetorno: "2024-03-15",
      municipioDestino: "Bogotá"
    },
    {
      estado: "En Espera",
      fechaSolicitud: "2024-02-18",
      numPasajeros: 1,
      fechaSalida: "2024-03-05",
      fechaRetorno: "2024-03-08",
      municipioDestino: "Cali"
    },
    {
      estado: "Rechazada",
      fechaSolicitud: "2024-02-20",
      numPasajeros: 4,
      fechaSalida: "2024-04-01",
      fechaRetorno: "2024-04-10",
      municipioDestino: "Cartagena"
    },
    {
      estado: "Respondida",
      fechaSolicitud: "2024-02-22",
      numPasajeros: 2,
      fechaSalida: "2024-03-15",
      fechaRetorno: "2024-03-20",
      municipioDestino: "Barranquilla"
    },
    {
      estado: "Finalizada",
      fechaSolicitud: "2024-02-25",
      numPasajeros: 5,
      fechaSalida: "2024-03-20",
      fechaRetorno: "2024-03-25",
      municipioDestino: "Pereira"
    },
    {
      estado: "En Espera",
      fechaSolicitud: "2024-03-01",
      numPasajeros: 1,
      fechaSalida: "2024-03-10",
      fechaRetorno: "2024-03-15",
      municipioDestino: "Manizales"
    },
    {
      estado: "Rechazada",
      fechaSolicitud: "2024-03-05",
      numPasajeros: 3,
      fechaSalida: "2024-04-05",
      fechaRetorno: "2024-04-15",
      municipioDestino: "Santa Marta"
    },
    {
      estado: "Respondida",
      fechaSolicitud: "2024-03-08",
      numPasajeros: 2,
      fechaSalida: "2024-04-10",
      fechaRetorno: "2024-04-18",
      municipioDestino: "Ibagué"
    },
    {
      estado: "Finalizada",
      fechaSolicitud: "2024-03-12",
      numPasajeros: 4,
      fechaSalida: "2024-04-15",
      fechaRetorno: "2024-04-20",
      municipioDestino: "Cúcuta"
    }
  ])
  const [fecha_inicio, set_fecha_inicio] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_inicio, set_msj_error_fecha_inicio] = useState<string>("");
  const [fecha_fin, set_fecha_fin] = useState<Dayjs>(dayjs());
  const [msj_error_fecha_fin, set_msj_error_fecha_fin] = useState<string>("");
  const [estado, set_estado] = useState<string>("");
  const [msj_error_estado, set_msj_error_estado] = useState<string>("");
  const [mostrar_solicitud_viaje,set_mostrar_solicitud_viaje] = useState<boolean>(false);


  //Podemos formatear la fecha guardada en el estado de esta manera
  //let fecha_formateada = fecha_inicio.format("YYYY-MM-DD");

  const cambio_fecha_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio(date);
      set_msj_error_fecha_inicio("");
    } else {
      set_msj_error_fecha_inicio("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_fecha_fin = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_fin(date);
      set_msj_error_fecha_fin("");
    } else {
      set_msj_error_fecha_fin("El campo Fecha inicio es obligatorio.");
    }
  };

  const cambio_estado: (event: SelectChangeEvent) => void = (e: SelectChangeEvent) => {
    set_estado(e.target.value);
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_estado("");
  }

  const columns = [
    {field: 'estado', headerName:'Estado', width:150, flex:1},
    {field: 'fechaSolicitud', headerName:'Fecha Solicitud', width:150, flex:1},
    {field: 'numPasajeros', headerName:'N° Pasajeros', width:150, flex:1},
    {field: 'fechaSalida', headerName:'Fecha Salida', width:150, flex:1},
    {field: 'fechaRetorno', headerName:'Fecha Retorno', width:150, flex:1},
    {field: 'municipioDestino', headerName:'Municipio Destino', width:150, flex:1}
  ]

  return (
    <>
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
        <Title title='Solicitudes de viajes' />
        <Grid 
          container 
          sx={{
            marginTop: '10px'
          }}
          spacing={2}
        >
          <Grid item xs={2}>
            <FormControl required size='small' fullWidth>
              <InputLabel>Estado</InputLabel>
              <Select
                label="Estado"
                value={estado}
                required
                onChange={cambio_estado}
                error={msj_error_estado !== ""}
              >
                  <MenuItem value={'En espera'}>En Espera</MenuItem>
                  <MenuItem value={'Respondida'}>Respondida</MenuItem>
                  <MenuItem value={'Rechazada'}>Rechazada</MenuItem>
                  <MenuItem value={'Finalizada'}>Finalizada</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Desde:"
                value={fecha_inicio}
                onChange={(newValue) => { cambio_fecha_inicio(newValue); }}
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
      
          <Grid item xs={2}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                label="Hasta:"
                value={fecha_fin}
                onChange={(newValue) => { cambio_fecha_fin(newValue); }}
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

          <Grid item xs={2}>
            <Button
              color='primary'
              variant='contained'
              startIcon={<SearchIcon />}
            >
              Buscar
            </Button>
          </Grid>

          <Grid item width={'100%'} display={'flex'} justifyContent={'center'}>
            <RenderDataGrid columns={columns} title='Titulo tabla' rows={data_solicitudes_viajes}  />
          </Grid>

          <Grid item width={'100%'} display={'flex'} justifyContent={'center'}>
            {!mostrar_solicitud_viaje &&
              <Button
                color='success'
                variant='contained'
                startIcon={<AddIcon />}
                onClick={()=>set_mostrar_solicitud_viaje(true)}
              >
                Crear nueva solicitud
              </Button>
            }
          </Grid>
        </Grid>
      </Grid>

      {mostrar_solicitud_viaje && 
        <SolicitarViaje set_mostrar_solicitud_viaje={set_mostrar_solicitud_viaje}/>
      }
    </>
  );
}
 
// eslint-disable-next-line no-restricted-syntax
export default SolicitudViaje;
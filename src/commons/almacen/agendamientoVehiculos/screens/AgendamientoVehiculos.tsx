import React, { useEffect, useRef, useState } from 'react';
import { Button, FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useAppDispatch } from '../../../../hooks';
import { Title } from '../../../../components';
import { DatePicker, LocalizationProvider, MobileTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import SearchIcon from '@mui/icons-material/Search';
import { data_buscar_vehiculo, interface_data_agendamiento_vehiculos, interface_detalles_vehiculos_agendados, interface_ver_agendamiento, response_data_agendamiento_vehiculos, response_detalles_vehiculos_agendados, response_ver_agendamiento } from '../interfaces/types';
import TablaAgendamientoVehiculos from '../tables/TablaAgendamientoVehiculos';
import { buscar_detalles_vehiculos_agendados, buscar_solicitudes_agendamientos, editar_aprobacion_viaje, enviar_aprobacion_viaje, obtener_ver_agendamiento } from '../thunks/agendamiento_vehiculos';
import { control_error, control_success } from '../../../../helpers';
import RechazoSolicitud from './RechazoSolicitud';
import TablaVehiculosAgendados from '../tables/TablaVehiculosAgendados';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import BuscarVehiculo from './BuscarVehiculo';
import Swal from 'sweetalert2';
import { parseHora } from '../../solicitudDeViaje/thunks/viajes';



// eslint-disable-next-line @typescript-eslint/naming-convention
const AgendamientoVehiculos: React.FC = () => {
  const dispatch = useAppDispatch();
  const [fecha_solicitud_inicio, set_fecha_solicitud_inicio] = useState<Dayjs | null>(null);
  const [fecha_solicitud_fin, set_fecha_solicitud_fin] = useState<Dayjs | null>(null);
  const [estado_solicitud, set_estado_solicitud] = useState<string>("");
  const [requiere_carga, set_requiere_carga] = useState<string>("");
  const [numero_pasajeros, set_numero_pasajeros] = useState<number>(0);
  const [fecha_inicio_viaje, set_fecha_inicio_viaje] = useState<Dayjs | null>(null);
  const [fecha_fin_viaje, set_fecha_fin_viaje] = useState<Dayjs | null>(null);

  const [conductor, set_conductor] = useState<string>('');
  const [placa_vehiculo, set_placa_vehiculo] = useState<string>('');
  const [nombre_vehiculo, set_nombre_vehiculo] = useState<string>('');
  const [marca, set_marca] = useState<string>('');
  const [conductor_agregado, set_conductor_agregado] = useState<string>('');
  const [placa_vehiculo_agregado, set_placa_vehiculo_agregado] = useState<string>('');
  const [nombre_vehiculo_agregado, set_nombre_vehiculo_agregado] = useState<string>('');
  const [marca_agregado, set_marca_agregado] = useState<string>('');
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [hora_retorno, set_hora_retorno] = useState<Date | null>(new Date());
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [hora_salida, set_hora_salida] = useState<Date | null>(new Date());

  const [refrescar_tabla, set_refrescar_tabla] = useState<boolean>(false); 
  
  const [msj_error_numero_pasajeros, set_msj_error_numero_pasajeros] = useState<string>("");

  const [id_solicitud_viaje, set_id_solicitud_viaje] = useState<number>(0);

  const [accion, set_accion] = useState<string>("");

  const [mostrar_input_no_aprobado, set_mostrar_input_no_aprobado] = useState<boolean>(false);

  const [mostrar_buscar_vehiculo, set_mostrar_buscar_vehiculo] = useState<boolean>(false);
  const [mostrar_vehiculo_agregado, set_mostrar_vehiculo_agregado] = useState<boolean>(false);
  const [mostrar_agendamiento_vehiculo, set_mostrar_agendamiento_vehiculo] = useState<boolean>(false);
  const [mostrar_vehiculos_agendados, set_mostrar_vehiculos_agendados] = useState<boolean>(false);


  const [vehiculo_encontrado, set_vehiculo_encontrado] = useState<data_buscar_vehiculo>(Object);
  const [data_solicitud_a_aprobar, set_data_solicitud_a_aprobar] = useState<interface_data_agendamiento_vehiculos>(Object);

  const [data_agendamiento_vehiculo, set_data_agendamiento_vehiculo] = useState<interface_data_agendamiento_vehiculos[]>([]);
  const [data_detalles_vehiculos_agendados, set_data_detalles_vehiculos_agendados] = useState<interface_detalles_vehiculos_agendados[]>([]);
  const [data_ver_agendamiento, set_data_ver_agendamiento] = useState<interface_ver_agendamiento>(Object);
  const [data_editar_agendamiento, set_data_editar_agendamiento] = useState<interface_detalles_vehiculos_agendados>(Object);
  


  const obtener_asignaciones_vehiculos_filtros: () => void = () => {
    dispatch(buscar_solicitudes_agendamientos(
      fecha_solicitud_inicio?.format('YYYY-MM-DD') ?? '',
      fecha_solicitud_fin?.format('YYYY-MM-DD')  ?? '',
      /*departamento*/'',
      /*municipio*/'',
      numero_pasajeros === 0 ? '' : numero_pasajeros,
      requiere_carga,
      fecha_inicio_viaje?.format('YYYY-MM-DD')  ?? '',
      fecha_fin_viaje?.format('YYYY-MM-DD')  ?? '',
      estado_solicitud
      ))
      .then((response: response_data_agendamiento_vehiculos) => {
        if ('data' in response) {
          set_data_agendamiento_vehiculo(response.data);
        } else {
          control_error('No se encontraron agendamientos');
          set_data_agendamiento_vehiculo([]);
        }
      })
      .catch((error: any) => {
        console.error(error);
      })
  }


  const agendamientos_obtenidos = useRef(false);
  useEffect(() => {
    if (!agendamientos_obtenidos.current) {
      obtener_asignaciones_vehiculos_filtros();
      agendamientos_obtenidos.current = true;
    }
  }, [refrescar_tabla])

  const obtener_detalles_vehiculos_agendados: () => void = () => {
    dispatch(buscar_detalles_vehiculos_agendados())
      .then((response: response_detalles_vehiculos_agendados) => {
        if (response.data?.length === 0) {
          set_data_detalles_vehiculos_agendados([]);
        } else {
          set_data_detalles_vehiculos_agendados(response.data);
        }
      })
  }

  const obtener_ver_agendamiento_fc: () => void = async() => {
    await dispatch(obtener_ver_agendamiento(id_solicitud_viaje))
      .then((response: response_ver_agendamiento) => {       
        if (response?.success === true) {       
          set_data_ver_agendamiento(response.data.viajes_agendados);
        } else {
          set_data_ver_agendamiento(Object);
        }
      })
  }

  useEffect(() => {
    if(accion === 'ver_agendamiento'){
      obtener_ver_agendamiento_fc();
    }    
    obtener_detalles_vehiculos_agendados();
  }, [accion,id_solicitud_viaje, refrescar_tabla])
  

  const cambio_numero_pasajeros: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_numero_pasajeros(Number(e.target.value));
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_numero_pasajeros("");
  };

  const cambio_fecha_solicitud_inicio = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_solicitud_inicio(date);
    }
  };

  const cambio_fecha_solicitud_fin = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_solicitud_fin(date);
    }
  };

  const cambio_fecha_inicio_viaje = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_inicio_viaje(date);
    }
  };

  const cambio_fecha_fin_viaje = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_fin_viaje(date);
    }
  };

  const cambio_fecha_salida = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_salida(date);
    }
  };

  const cambio_hora_salida = (newTime:  dayjs.Dayjs | null) => {
    set_hora_salida(newTime?.toDate() || null);
  };

  const cambio_fecha_retorno = (date: Dayjs | null): void => {
    if (date !== null) {
      set_fecha_retorno(date);
    }
  };

  const cambio_hora_retorno = (newTime:  dayjs.Dayjs | null) => {
    set_hora_retorno(newTime?.toDate() || null);
  };

  useEffect(()=>{
    if(accion === 'ver_agendamiento'){
      console.log(data_ver_agendamiento);
      
      if(Object.keys(data_ver_agendamiento).length !== 0){
        set_conductor(data_ver_agendamiento.apellido_conductor + ' ' + data_ver_agendamiento.nombre_conductor);
        set_placa_vehiculo(data_ver_agendamiento.placa);
        set_nombre_vehiculo(data_ver_agendamiento.nombre);
        set_marca(data_ver_agendamiento.marca);
        set_placa_vehiculo_agregado(data_ver_agendamiento.placa);
        set_conductor_agregado(data_ver_agendamiento.apellido_conductor + ' ' + data_ver_agendamiento.nombre_conductor);
        set_nombre_vehiculo_agregado(data_ver_agendamiento.nombre);
        set_marca_agregado(data_ver_agendamiento.marca);
        set_fecha_salida(dayjs(data_ver_agendamiento.fecha_partida_asignada));
        set_fecha_retorno(dayjs(data_ver_agendamiento.fecha_retorno_asignada));
        set_hora_salida(parseHora(data_ver_agendamiento.hora_partida ?? '00:00:00')?.toDate() || null);
        set_hora_retorno(parseHora(data_ver_agendamiento.hora_retorno ?? '00:00:00')?.toDate() || null);
      } 
    }
    if(accion === 'editar_agendamiento'){
      if(Object.keys(data_editar_agendamiento).length !== 0){
        set_conductor(data_editar_agendamiento.persona_conductor ?? '');
        set_placa_vehiculo(data_editar_agendamiento.placa);
        set_conductor_agregado(data_editar_agendamiento.persona_conductor);
        set_nombre_vehiculo(data_editar_agendamiento.nombre);
        set_marca(data_editar_agendamiento.marca);
        set_placa_vehiculo_agregado(data_editar_agendamiento.placa);
        set_nombre_vehiculo_agregado(data_editar_agendamiento.nombre);
        set_marca_agregado(data_editar_agendamiento.marca);
        set_fecha_salida(dayjs(data_editar_agendamiento.fecha_partida_asignada));
        set_fecha_retorno(dayjs(data_editar_agendamiento.fecha_retorno_asignada));
        set_hora_salida(parseHora(data_editar_agendamiento.hora_partida ?? '00:00:00')?.toDate() || null);
        set_hora_retorno(parseHora(data_editar_agendamiento.hora_retorno ?? '00:00:00')?.toDate() || null);
      } 
    }
  },[data_ver_agendamiento,accion,id_solicitud_viaje])


  const salir_agendamiento = () => {
    eliminar_vehiculo_agregado();
    set_mostrar_agendamiento_vehiculo(false);
    set_conductor('');
    set_conductor_agregado('');
    set_placa_vehiculo('');
    set_nombre_vehiculo('');
    set_marca('');
    set_placa_vehiculo_agregado('');
    set_nombre_vehiculo_agregado('');
    set_marca_agregado('');
  }

  const limpiar_form_agendamiento = () => {
    set_fecha_solicitud_inicio(null);
    set_fecha_solicitud_fin(null);
    set_estado_solicitud('');
    set_requiere_carga('');
    set_numero_pasajeros(0);
    set_fecha_inicio_viaje(null);
    set_fecha_fin_viaje(null); 
  }
  
  const validar_form_solicitudes:() => Promise<boolean> = async() => {
    if(fecha_solicitud_inicio?.isValid() === false){
      control_error('Fecha de solicitud inicio inválida')
      return false;
    } else if(fecha_solicitud_fin?.isValid() === false){
      control_error("Fecha de 'solicitud hasta' inválida")
      return false;
    }
    return true;
  }

  const obtener_resultados_solicitudes = async() => {
    const form_validado = await validar_form_solicitudes();
    if(form_validado){
      obtener_asignaciones_vehiculos_filtros();
      limpiar_form_agendamiento();
    }
  }

  useEffect(()=>{
    if (Object.keys(vehiculo_encontrado).length !== 0) {
      set_conductor(vehiculo_encontrado.persona_conductor ?? '');
      set_placa_vehiculo(vehiculo_encontrado.placa ?? '');
      set_nombre_vehiculo(vehiculo_encontrado.nombre ?? '');
      set_marca(vehiculo_encontrado.marca ?? '');
    } else {
      set_conductor('');
      set_placa_vehiculo('');
      set_nombre_vehiculo('');
      set_marca('');
    }
  },[vehiculo_encontrado])

  const eliminar_vehiculo_agregado = () => {
    set_mostrar_vehiculo_agregado(false);
    set_placa_vehiculo_agregado('');
    set_nombre_vehiculo_agregado('');
    set_marca_agregado('');
    cambio_fecha_salida(dayjs());
    cambio_fecha_retorno(dayjs());
    cambio_hora_salida(dayjs());
    cambio_hora_retorno(dayjs());
  }

  const limpiar_forms_agendamiento_aprobacion = () => {
    eliminar_vehiculo_agregado();
  }


  useEffect(()=>{
    console.log(data_solicitud_a_aprobar);
  },[data_solicitud_a_aprobar])

  const agregar_vehiculo = () => {
    if (Object.keys(vehiculo_encontrado).length !== 0) {
      set_mostrar_vehiculo_agregado(true);
      set_conductor_agregado(vehiculo_encontrado.persona_conductor ?? '');
      set_placa_vehiculo_agregado(vehiculo_encontrado.placa ?? '');
      set_nombre_vehiculo_agregado(vehiculo_encontrado.nombre ?? '');
      set_marca_agregado(vehiculo_encontrado.marca ?? '');
      if (Object.keys(data_solicitud_a_aprobar).length !== 0) {
        cambio_fecha_salida(dayjs(data_solicitud_a_aprobar.fecha_partida));
        cambio_fecha_retorno(dayjs(data_solicitud_a_aprobar.fecha_retorno));
        cambio_hora_salida(parseHora(data_solicitud_a_aprobar.hora_partida ?? ''));
        cambio_hora_retorno(parseHora(data_solicitud_a_aprobar.hora_retorno ?? ''));
      }
    } else {
      control_error('Busque un vehículo antes de agregar')
    }
  }

  const enviar_aprobacion_solicitud_viaje = () => {
    if (Object.keys(vehiculo_encontrado).length !== 0 && Object.keys(data_solicitud_a_aprobar).length !== 0){
      Swal.fire({
        title: '¿Está de seguro de aprobar la solicitud?',
        showDenyButton: true,
        confirmButtonText: `Si`,
        denyButtonText: `Cancelar`,
        confirmButtonColor: '#042F4A',
        cancelButtonColor: '#DE1616',
        icon: 'question',
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          if(accion === 'aprobar_agendamiento'){
            dispatch(enviar_aprobacion_viaje({
              id_solicitud_viaje: data_solicitud_a_aprobar.id_solicitud_viaje,
              id_persona_conductor: vehiculo_encontrado.id_vehiculo_conductor
            })).then((response: { success: boolean, detail: string, data: any }) => {
              if(response?.success){
                control_success('Se aprobó la solicitud correctamente');
                set_mostrar_vehiculos_agendados(true);
                set_refrescar_tabla(!refrescar_tabla);
                return;
              } else if (response?.detail) {
                set_refrescar_tabla(!refrescar_tabla);
                return;
              }
            })
          } else if(accion === 'editar_agendamiento'){
            dispatch(editar_aprobacion_viaje(data_solicitud_a_aprobar.id_viaje_agendado ,{id_vehiculo_conductor: vehiculo_encontrado.id_vehiculo_conductor}))
            .then((response: any) => {
              console.log(response);
              
              if(Object.keys(response)?.length !== 0){
                control_success('Se editó el agendamiento correctamente');
                set_refrescar_tabla(!refrescar_tabla);
                return;
              } else if (response?.detail) {
                set_refrescar_tabla(!refrescar_tabla);
                return;
              }
            })
            set_accion('ver_agendamiento');
          }
          return;
        } else if(result.isDenied){
          return;
        }
      });
    } else {
      control_error('Busque un vehículo antes de aprobar la solicitud')
    }
  }
  return (
    <>
      {!mostrar_agendamiento_vehiculo &&
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
          
          <Title title='Agendamiento de vehículos' />
          
          <Grid container spacing={3} item xs={12} mt={0.5} mb={2}>
            <Grid item xs={12} lg={4} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha de solicitud desde: '
                  value={fecha_solicitud_inicio}
                  onChange={(newValue) => {
                    cambio_fecha_solicitud_inicio(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={4} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha de solicitud hasta: '
                  value={fecha_solicitud_fin}
                  onChange={(newValue) => {
                    cambio_fecha_solicitud_fin(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Departamento de destino</InputLabel>
                <Select
                  label="Departamento de destino"
                  value={estado_solicitud}
                  required
                  fullWidth
                  onChange={(e: SelectChangeEvent) => set_estado_solicitud(e.target.value)}
                >
                  <MenuItem value={''}></MenuItem>
                  <MenuItem value={'ES'}>PENDIENTE</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Municipio de destino</InputLabel>
                <Select
                  label="Municipio de destino"
                  value={estado_solicitud}
                  required
                  fullWidth
                  onChange={(e: SelectChangeEvent) => set_estado_solicitud(e.target.value)}
                >
                  <MenuItem value={'ES'}>PENDIENTE</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={4} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TextField
                fullWidth
                label='Número de pasajeros*:'
                type={"number"}
                value={numero_pasajeros}
                error={msj_error_numero_pasajeros !== ''}
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={cambio_numero_pasajeros}
              />
            </Grid>

            <Grid item xs={12} lg={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>¿Requiere carga?</InputLabel>
                <Select
                  label='¿Requiere carga?'
                  value={requiere_carga}
                  required
                  fullWidth              
                  onChange={(e: SelectChangeEvent) => set_requiere_carga(e.target.value)}
                >
                  <MenuItem value={'true'}>Si</MenuItem>
                  <MenuItem value={'false'}>No</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} lg={4} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha inicio de viaje:'
                  value={fecha_inicio_viaje}
                  onChange={(newValue) => {
                    cambio_fecha_inicio_viaje(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={4} sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              >
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker
                  label='Fecha fin de viaje:'
                  value={fecha_fin_viaje}
                  onChange={(newValue) => {
                    cambio_fecha_fin_viaje(newValue);
                  }}
                  renderInput={(params) => (
                    <TextField required fullWidth size="small" {...params} />
                  )}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={12} lg={4}>
              <FormControl required size='small' fullWidth>
                <InputLabel>Estado_solicitud</InputLabel>
                <Select
                  label="Estado_solicitud"
                  value={estado_solicitud}
                  required
                  fullWidth
                  onChange={(e: SelectChangeEvent) => set_estado_solicitud(e.target.value)}
                >
                  <MenuItem value={'ES'}>En Espera</MenuItem>
                  <MenuItem value={'RE'}>Respondida</MenuItem>
                  <MenuItem value={'RC'}>Rechazada</MenuItem>
                  <MenuItem value={'FN'}>Finalizada</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item container spacing={2} xs={12} sx={{display:'flex', justifyContent:'end'}} >
              <Grid item xs={12} lg={4} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center'
                }} >
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SearchIcon />}
                  onClick={obtener_resultados_solicitudes}
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} lg={4} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                <Button
                  fullWidth
                  color="inherit"
                  variant="outlined"
                  startIcon={<CleanIcon />}
                  onClick={limpiar_form_agendamiento}
                >
                  Limpiar
                </Button>
              </Grid>
            </Grid>
          </Grid>

          {!mostrar_input_no_aprobado && 
            <TablaAgendamientoVehiculos
              set_accion={set_accion}
              set_data_solicitud_a_aprobar={set_data_solicitud_a_aprobar}
              set_mostrar_agendamiento_vehiculo={set_mostrar_agendamiento_vehiculo}
              set_id_solicitud_viaje={set_id_solicitud_viaje}
              set_mostrar_input_no_aprobado={set_mostrar_input_no_aprobado}
              data_agendamiento_vehiculo={data_agendamiento_vehiculo}
              set_mostrar_vehiculo_agregado={set_mostrar_vehiculo_agregado}
              set_mostrar_vehiculos_agendados={set_mostrar_vehiculos_agendados}
            />
          }
        </Grid>
      }

      {mostrar_input_no_aprobado &&
        <RechazoSolicitud 
          refrescar_tabla={refrescar_tabla}
          set_refrescar_tabla={set_refrescar_tabla}
          id_solicitud_viaje={id_solicitud_viaje}
          set_mostrar_input_no_aprobado={set_mostrar_input_no_aprobado}
        />
      }

      {mostrar_agendamiento_vehiculo &&
        <Grid
          container
          spacing={2}
          marginTop={2}
          sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '40px',
            mb: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}
        >
          <BuscarVehiculo
            refrescar_tabla={refrescar_tabla}
            set_vehiculo_encontrado={set_vehiculo_encontrado}
            mostrar_buscar_vehiculo={mostrar_buscar_vehiculo}
            set_mostrar_buscar_vehiculo={set_mostrar_buscar_vehiculo}
          />

          <Title title='Agendar viaje con vehículo' />

          {mostrar_vehiculos_agendados &&
            <TablaVehiculosAgendados
              set_accion={set_accion}
              set_data_solicitud_a_aprobar={set_data_solicitud_a_aprobar}
              set_data_editar_agendamiento={set_data_editar_agendamiento}
              data_detalles_vehiculos_agendados={data_detalles_vehiculos_agendados}
            />
          }


          <Grid container spacing={1} rowSpacing={3} item xs={12} my={1} sx={{
            position: 'relative',
            background: '#FAFAFA',
            borderRadius: '15px',
            p: '20px',
            my: '20px',
            boxShadow: '0px 3px 6px #042F4A26',
          }}>
            <Title title='Seleccionar vehículo' />

            <Grid item xs={12} lg={3} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems:'center',
              }} >
                <TextField
                  label='Conductor:'
                  fullWidth
                  disabled
                  placeholder='Buscar'
                  value={conductor}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_conductor(e.target.value)}
                  size="small"
                />
            </Grid>

            <Grid item xs={12} lg={3} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems:'center',
              }} >
                <TextField
                  label='Placa vehículo:'
                  fullWidth
                  disabled
                  placeholder='Buscar'
                  value={placa_vehiculo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_placa_vehiculo(e.target.value)}
                  size="small"
                />
            </Grid>

            <Grid item xs={12} lg={3} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems:'center',
              }} >
                <TextField
                  label='Nombre de vehículo:'
                  fullWidth
                  disabled
                  placeholder='Buscar'
                  value={nombre_vehiculo}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre_vehiculo(e.target.value)}
                  size="small"
                />
            </Grid>

            <Grid item xs={12} lg={3} sx={{
              display:'flex',
              justifyContent: 'center',
              alignItems:'center',
              }} >
                <TextField
                  label='Marca:'
                  fullWidth
                  disabled
                  placeholder='Buscar'
                  value={marca}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_marca(e.target.value)}
                  size="small"
                />
            </Grid>

            <Grid item container spacing={2} xs={12} sx={{
              display:'flex',
              justifyContent: 'end',
            }}>
              <Grid item xs={12} lg={3} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center'
                }} >
                <Button
                  fullWidth
                  color='primary'
                  variant='contained'
                  startIcon={<SearchIcon />}
                  disabled={accion !== 'aprobar_agendamiento' && accion !== 'editar_agendamiento'}
                  onClick={()=>set_mostrar_buscar_vehiculo(true)}
                >
                  Buscar
                </Button>
              </Grid>

              <Grid item xs={12} lg={3} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center'
                }} >
                <Button
                  fullWidth
                  color='success'
                  variant='contained'
                  disabled={Object.keys(vehiculo_encontrado).length === 0 || accion === 'ver_agendamiento'}
                  startIcon={<AddIcon />}
                  onClick={agregar_vehiculo}
                >
                  Agregar
                </Button>
              </Grid>
            </Grid>

          </Grid>

          {mostrar_vehiculo_agregado &&
            <Grid container spacing={3} item xs={12}
              sx={{
                position: 'relative',
                background: '#FAFAFA',
                borderRadius: '15px',
                p: '20px',
                mt: '20px',
                boxShadow: '0px 3px 6px #042F4A26',
                display:'flex',
                justifyContent:'space-between'
              }}
              >
              <Title title='Vehículo agregado' />
              <Grid item xs={12} lg={3} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                  <TextField
                    label='Conductor:'
                    fullWidth
                    disabled
                    placeholder='Buscar'
                    value={conductor_agregado}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_conductor_agregado(e.target.value)}
                    size="small"
                  />
              </Grid>
              
              <Grid item xs={12} lg={3} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                  <TextField
                    label='Placa:'
                    fullWidth
                    disabled
                    placeholder='Buscar'
                    value={placa_vehiculo_agregado}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_placa_vehiculo_agregado(e.target.value)}
                    size="small"
                  />
              </Grid>

              <Grid item xs={12} lg={3} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                  <TextField
                    label='Nombre de vehículo:'
                    fullWidth
                    disabled
                    placeholder='Buscar'
                    value={nombre_vehiculo_agregado}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_nombre_vehiculo_agregado(e.target.value)}
                    size="small"
                  />
              </Grid>

              <Grid item xs={12} lg={3} sx={{
                display:'flex',
                justifyContent: 'center',
                alignItems:'center',
                }} >
                  <TextField
                    label='Marca:'
                    fullWidth
                    disabled
                    placeholder='Buscar'
                    value={marca_agregado}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_marca_agregado(e.target.value)}
                    size="small"
                  />
              </Grid>

              <Grid item xs={12} lg={3} sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    label='Fecha inicio del viaje: '
                    value={fecha_salida}
                    disabled
                    onChange={(newValue) => {
                      cambio_fecha_salida(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField required fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} lg={3} sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    disabled
                    label="Hora"
                    openTo="hours"
                    value={hora_salida}
                    onChange={cambio_hora_salida}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} variant="standard" helperText="" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} lg={3} sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    disabled
                    label='Fecha fin del viaje: '
                    value={fecha_retorno}
                    onChange={(newValue) => {
                      cambio_fecha_retorno(newValue);
                    }}
                    renderInput={(params) => (
                      <TextField required fullWidth size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} lg={3} sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                >
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <MobileTimePicker
                    disabled
                    label="Hora"
                    openTo="hours"
                    value={hora_retorno}
                    onChange={cambio_hora_retorno}
                    renderInput={(params) => (
                      <TextField fullWidth {...params} variant="standard" helperText="" />
                    )}
                  />
                </LocalizationProvider>
              </Grid>

              <Grid item xs={12} sx={{
                  display: "flex",
                  justifyContent: "end",
                  alignItems: "center",
                }}
                >
                {accion !== 'ver_agendamiento' &&
                  <Grid item xs={0.4} >
                    <DeleteForeverIcon
                      style={{cursor:'pointer', color:'#e74c3c',fontSize:'40px'}}
                      onClick={eliminar_vehiculo_agregado}
                    />
                  </Grid>
                }
              </Grid>
            </Grid>
          }


          <Grid item xs={12} sx={{
              display: "flex",
              justifyContent: "end",
              alignItems: "center",
              marginTop: "20px",
              gap: 4,
            }}
            >

            <Button
              color="success"
              variant="contained"
              startIcon={<SaveIcon />}
              disabled={accion === 'ver_agendamiento'}
              onClick={enviar_aprobacion_solicitud_viaje}
            >
              {accion === 'editar_agendamiento' ? 'Actualizar' : accion === 'aprobar_agendamiento' ? 'Guardar' : 'Actualizar'}
            </Button>
            <Button
              color="error"
              variant="contained"
              startIcon={<ClearIcon />}
              onClick={()=>salir_agendamiento()}
            >
              Salir
            </Button>
            <Button
              color="inherit"
              variant="outlined"
              disabled={accion === 'ver_agendamiento'}
              startIcon={<CleanIcon />}
              onClick={limpiar_forms_agendamiento_aprobacion}
            >
              Limpiar
            </Button>
          </Grid>
        </Grid>
      }
      
    </>
  );
}

// eslint-disable-next-line no-restricted-syntax
export default AgendamientoVehiculos;
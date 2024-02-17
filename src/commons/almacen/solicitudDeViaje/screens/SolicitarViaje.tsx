import { Button, FormControl, FormLabel, Grid, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Switch, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Title } from '../../../../components';
import SearchIcon from '@mui/icons-material/Search';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { MobileTimePicker } from '@mui/x-date-pickers/MobileTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import SaveIcon from '@mui/icons-material/Save';
import CleanIcon from '@mui/icons-material/CleaningServices';
import ClearIcon from '@mui/icons-material/Clear';
import { interface_solicitar_viaje, props_solicitar_viaje } from '../interfaces/types';
import ViajeAgendado from './ViajeAgendado';
import { control_error, control_success } from '../../../../helpers';
import Swal from 'sweetalert2';


// eslint-disable-next-line @typescript-eslint/naming-convention
const SolicitarViaje: React.FC<props_solicitar_viaje> = ({set_mostrar_solicitud_viaje}) => {
  const [motivo_viaje, set_motivo_viaje] = useState<string>('');
  const [switch_expediente_asociado, set_switch_expediente_asociado] = useState<boolean>(false);
  const [direccion, set_direccion] = useState<string>('');
  const [departamento, set_departamento] = useState<string>('');
  const [municipio, set_municipio] = useState<string>("");
  const [indicadores_destino, set_indicadores_destino] = useState<string>('');
  const [numero_pasajeros, set_numero_pasajeros] = useState<number>(0);
  const [fecha_salida, set_fecha_salida] = useState<Dayjs>(dayjs());
  const [hora_salida, set_hora_salida] = useState<Date | null>(new Date());
  const [fecha_retorno, set_fecha_retorno] = useState<Dayjs>(dayjs());
  const [hora_retorno, set_hora_retorno] = useState<Date | null>(new Date());
  const [switch_requiere_carga, set_switch_requiere_carga] = useState<boolean>(false);
  const [switch_requiere_acompanamiento_militar, set_switch_requiere_acompanamiento_militar] = useState<boolean>(false);
  const [consideraciones_adicionales, set_consideraciones_adicionales] = useState<string>('');

  const [msj_error_expediente_asociado, set_msj_error_expediente_asociado] = useState<string>("");
  const [msj_error_departamento, set_msj_error_departamento] = useState<string>("");
  const [msj_error_municipio, set_msj_error_municipio] = useState<string>("");
  const [msj_error_numero_pasajeros, set_msj_error_numero_pasajeros] = useState<string>("");
  const [msj_error_fecha_salida, set_msj_error_fecha_salida] = useState<string>("");
  const [msj_error_fecha_retorno, set_msj_error_fecha_retorno] = useState<string>("");
  const [msj_error_hora_salida, set_msj_error_hora_salida] = useState<string>("");
  const [msj_error_hora_retorno, set_msj_error_hora_retorno] = useState<string>("");
  const [msj_error_switch_requiere_carga, set_msj_error_switch_requiere_carga] = useState<string>("");
  const [msj_error_acompanamiento_militar, set_msj_error_acompanamiento_militar] = useState<string>("");
  const [msj_error_direccion, set_msj_error_direccion] = useState<string>("");
  const [msj_error_indicadores_destino, set_msj_error_indicadores_destino] = useState<string>("");
  const [msj_error_consideraciones_adicionales, set_msj_error_consideraciones_adicionales] = useState<string>("");
  const [msj_error_motivo_viaje, set_msj_error_motivo_viaje] = useState<string>("");


  const [datos_solicitar_viaje, set_datos_solicitar_viaje] = useState<interface_solicitar_viaje>();

  useEffect(()=>{
    set_datos_solicitar_viaje({
      motivo_viaje_solicitado: motivo_viaje,  // Motivo del viaje
      cod_municipio: municipio,  // Código del municipio de destino
      cod_departamento: departamento,  // Código del departamento de destino
      tiene_expediente_asociado: switch_expediente_asociado,  // Indica si tiene un expediente asociado
      id_expediente_asociado: 0,  // ID del expediente asociado, si corresponde
      direccion: direccion,  // Dirección del destino
      nro_pasajeros: numero_pasajeros,  // Número de pasajeros
      fecha_partida: fecha_salida.format('YYYY-MM-DD'),  // Fecha de partida
      hora_partida: dayjs(hora_salida).format('hh:mm A'),  // Hora de partida
      fecha_retorno: fecha_retorno.format('YYYY-MM-DD'),  // Fecha de retorno
      hora_retorno: dayjs(hora_retorno).format('hh:mm A'),  // Hora de retorno
      req_compagnia_militar: switch_requiere_acompanamiento_militar,  // Indica si se requiere compañía militar
      consideraciones_adicionales: consideraciones_adicionales,
      indicaciones_destino: indicadores_destino 
    });
  },[switch_expediente_asociado,
    departamento,
    msj_error_departamento,
    municipio,
    msj_error_municipio,
    numero_pasajeros,
    msj_error_numero_pasajeros,
    fecha_salida,
    fecha_retorno,
    hora_salida,
    hora_retorno,
    switch_requiere_carga,
    switch_requiere_acompanamiento_militar,
    direccion,
    indicadores_destino,
    consideraciones_adicionales,
    motivo_viaje
  ]);

    

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

  const cambio_numero_pasajeros: any = (e: React.ChangeEvent<HTMLInputElement>) => {
    set_numero_pasajeros(Number(e.target.value));
    if (e.target.value !== null && e.target.value !== "")
      set_msj_error_numero_pasajeros("");
  };

  const cambio_hora_salida = (newTime: Date | null) => {
    set_hora_salida(newTime);
  };


  const cambio_hora_retorno = (newTime: Date | null) => {
    set_hora_retorno(newTime);
  };
  
  const limpiar_formulario_solicitar_viaje = () => {
    //Se limpian los datos de envio a la API
    
    //Se limpiam los estados de los inputs
    set_motivo_viaje('');
    set_switch_expediente_asociado(false);
    set_direccion('');
    set_departamento('');
    set_municipio('');
    set_indicadores_destino('');
    set_numero_pasajeros(0);
    set_fecha_salida(dayjs());
    set_hora_salida(new Date());
    set_switch_requiere_carga(false);
    set_fecha_retorno(dayjs());
    set_hora_retorno(new Date());
    set_switch_requiere_acompanamiento_militar(false);
    set_consideraciones_adicionales('');
    //Se limpian los estaos de las propiedades de error de los inputs
    set_msj_error_expediente_asociado('');
    set_msj_error_departamento('');
    set_msj_error_municipio('');
    set_msj_error_numero_pasajeros('');
    set_msj_error_fecha_salida('');
    set_msj_error_fecha_retorno('');
    set_msj_error_hora_salida('');
    set_msj_error_hora_retorno('');
    set_msj_error_switch_requiere_carga('');
    set_msj_error_acompanamiento_militar('');
    set_msj_error_direccion('');
    set_msj_error_indicadores_destino('');
    set_msj_error_consideraciones_adicionales('');
    set_msj_error_motivo_viaje('');
  }
  
  const validar_datos: ()=>  Promise<boolean | undefined> = async () => {
    let fecha_hoy = dayjs();

    if(motivo_viaje.trim() === ''){
      control_error('Escriba el motivo del viaje');
      set_msj_error_motivo_viaje('Escriba el motivo del viaje');
      return false;
    } else if(direccion.trim() === ''){
      set_msj_error_direccion('Escriba una dirección');
      control_error('Escriba una dirección');
      return false;
    } else if(departamento === '' || departamento === null){
      set_msj_error_departamento('Seleccione un departamento');
      control_error('Seleccione un departamento');
      return false;
    } else if(municipio === '' || municipio === null){
      set_msj_error_municipio('Seleccione un municipio');
      control_error('Seleccione un municipio')
      return false;
    } else if(numero_pasajeros <= 0){
      set_msj_error_numero_pasajeros('El número de pasajeros no puede ser menor o igual a 0');
      control_error('El número de pasajeros no puede ser menor o igual a 0');
      return false;
    } else if(fecha_salida.isBefore(fecha_hoy, 'day')){
      set_msj_error_fecha_salida('La fecha de salida no puede ser anterior a la de hoy');
      control_error('La fecha de salida no puede ser anterior a la de hoy');
    } else if(fecha_salida.isValid() === false){
      set_msj_error_fecha_salida('La fecha de salida es invalida');
      control_error('La fecha de salida es invalida');
      return false
    } else if(fecha_retorno.isBefore(fecha_hoy, 'day')){
      set_msj_error_fecha_retorno('La fecha de salida no puede ser anterior a la de hoy');
      control_error('La fecha de salida no puede ser anterior a la de hoy');
    } else if(fecha_retorno.isValid() === false){
      set_msj_error_fecha_retorno('La fecha de salida es invalida');
      control_error('La fecha de salida es invalida');
      return false
    }
    Swal.fire({
      title: '¿Está seguro que desea enviar la solicitud?',
      showDenyButton: true,
      confirmButtonText: `Si`,
      denyButtonText: `No`,
      confirmButtonColor: '#042F4A',
      cancelButtonColor: '#DE1616',
      icon: 'question',
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        control_success('Se ha enviado la solicitud de viaje correctamente');
        limpiar_formulario_solicitar_viaje();
        return true;
      } else if(result.isDenied){
        return false;
      }
    });
  }



  const enviar_solicitud_viaje = async () => {
    
    const validacion = await validar_datos();
    console.log(validacion);
    
    if(validacion){
      console.log(datos_solicitar_viaje);
    } else if(validacion === false) {
      console.log('No se han enviado los datos');
      
    }
  }
  return (
    <Grid
      container
      spacing={2}
      marginTop={2}
      sx={{
        position: "relative",
        background: "#FAFAFA",
        borderRadius: "15px",
        p: "20px",
        mb: "20px",
        boxShadow: "0px 3px 6px #042F4A26",
      }}
    >
      
      <Title title="Solicitar viaje" />
      <Grid
        container
        sx={{
          marginTop: "10px",
        }}
        spacing={2}
      >
        <Grid item xs={12} sx={{
          display:'flex',
          flexDirection:'column',
          alignItems:'start'
        }}>
          <FormLabel error={msj_error_motivo_viaje !== ''} htmlFor="motivo_viaje">Motivo del viaje*:</FormLabel>
          <TextField
            id="motivo_viaje"
            required
            error={msj_error_motivo_viaje !== ''}
            value={motivo_viaje}
            onChange={(e: React.ChangeEvent<HTMLInputElement>)=> {
              set_msj_error_motivo_viaje('');
              set_motivo_viaje(e.target.value)
            }}
            fullWidth
            placeholder="Escriba aqui el motivo de viaje"
            size="small"
            multiline
            rows={2}
          />
        </Grid>

        <Grid
          item
          container
          xs={12}
          display={"flex"}
          justifyContent={"center"}
          margin={"10px 0px"}
        >
          <Grid item xs={3}>
            <FormLabel htmlFor="expediente_asociado">
              ¿Tiene expediente asociado?
            </FormLabel>
            <Switch
              id="expediente_asociado"
              checked={switch_expediente_asociado}
              onChange={() =>
                set_switch_expediente_asociado(!switch_expediente_asociado)
              }
            />
          </Grid>

          <Grid
            item
            xs={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormLabel htmlFor="buscar_expediente">
              Buscar expediente:
            </FormLabel>
            <Grid item xs={4}>
              <TextField
                fullWidth
                id="buscar_expediente"
                required
                placeholder="Buscar"
                size="small"
              />
            </Grid>
            <SearchIcon style={{ width: "40px", cursor: "pointer" }} />
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormLabel htmlFor="buscar_expediente" error={msj_error_direccion !== ''}>Dirección*:</FormLabel>
            <Grid item xs={10}>
              <TextField
                fullWidth
                value={direccion}
                error={msj_error_direccion !== ''}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>{
                  set_msj_error_direccion('')
                  set_direccion(e.target.value)
                }}
                id="buscar_expediente"
                required
                size="small"
                />
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl required size="small" fullWidth>
              <InputLabel error={msj_error_departamento !== ''}>Departamento</InputLabel>
              <Select
                label="Estado"
                value={departamento}
                required
                error={msj_error_departamento !== ''}
                onChange={(e: SelectChangeEvent<string>)=>{set_msj_error_departamento(''),set_departamento(e.target.value)}}
              >
                <MenuItem value={'50'}>Meta</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FormControl required size="small" fullWidth>
              <InputLabel>Municipio</InputLabel>
              <Select
                label="Estado"
                value={municipio}
                required
                onChange={(e: SelectChangeEvent<string>)=>{set_msj_error_municipio(''),set_municipio(e.target.value)}}
                error={msj_error_municipio !== ""}
              >
                <MenuItem value={"001"}>Villavicencio</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FormLabel htmlFor="indicadores_destino">
              Idicadores de destino:
            </FormLabel>
            <Grid item xs={6}>
              <TextField
                value={indicadores_destino}
                onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_indicadores_destino(e.target.value)}
                fullWidth 
                id="indicadores_destino" 
                size="small" />
            </Grid>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel 
              error={msj_error_numero_pasajeros !== ''}    
              sx={{ marginRight: "10px" }} 
              htmlFor="numero_pasajeros">
              Número de pasajeros*:
            </FormLabel>
            <OutlinedInput
              sx={{ width: "60px" }}
              id="numero_pasajeros"
              type={"number"}
              value={numero_pasajeros}
              error={msj_error_numero_pasajeros !== ''}
              size="small"
              onChange={cambio_numero_pasajeros}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={11}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            marginX: "auto",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ width: "70%" }}>Fecha de salida*:</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={fecha_salida}
                onChange={(newValue) => {
                  cambio_fecha_salida(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>Hora*:</FormLabel>
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

          <Grid
            item
            xs={3.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={6} sx={{
              display:'flex',
              justifyContent:'start'
            }}>
              <FormLabel htmlFor="requiere_recarga">¿Requiere carga?</FormLabel>
            </Grid>
            <Switch
              id="requiere_recarga"
              checked={switch_requiere_carga}
              onChange={() => set_switch_requiere_carga(!switch_requiere_carga)}
            />
          </Grid>
        </Grid>

        <Grid
          item
          container
          xs={11}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "20px",
            marginX: "auto",
          }}
        >
          <Grid
            item
            xs={4}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ width: "70%" }}>Fecha de retorno*:</FormLabel>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker
                value={fecha_retorno}
                onChange={(newValue) => {
                  cambio_fecha_retorno(newValue);
                }}
                renderInput={(params) => (
                  <TextField required fullWidth size="small" {...params} />
                )}
                minDate={dayjs()}
              />
            </LocalizationProvider>
          </Grid>

          <Grid
            item
            xs={2}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FormLabel style={{ marginRight: "10px" }}>Hora*:</FormLabel>
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

          <Grid
            item
            xs={3.5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Grid item xs={12} sx={{
              display:'flex',
              justifyContent:'start'
            }}>
              <FormLabel style={{textAlign:'start'}} htmlFor="requiere_compania_militar">
                ¿Requiere acompañamiento militar?
              </FormLabel>
            </Grid>
            <Switch
              id="requiere_compania_militar"
              checked={switch_requiere_acompanamiento_militar}
              onChange={() =>
                set_switch_requiere_acompanamiento_militar(
                  !switch_requiere_acompanamiento_militar
                )
              }
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
            gap: 2,
          }}
        >
          <FormLabel htmlFor="consideraciones_adicionales">
            Consideraciones adicionales:
          </FormLabel>
          <Grid item xs={9.5}>
            <TextField
              fullWidth
              id="consideraciones_adicionales"
              size="small"
              value={consideraciones_adicionales}
              onChange={(e: React.ChangeEvent<HTMLInputElement>)=>set_consideraciones_adicionales(e.target.value)}
            />
          </Grid>
        </Grid>

        <Grid
          item
          xs={12}
          sx={{
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
            onClick={enviar_solicitud_viaje}
          >
            {"Guardar"}
          </Button>
          <Button
            color="error"
            variant="contained"
            startIcon={<ClearIcon />}
            onClick={() => {
              set_mostrar_solicitud_viaje(false);
            }}
          >
            Salir
          </Button>
          <Button
            color="inherit"
            variant="outlined"
            startIcon={<CleanIcon />}
            onClick={limpiar_formulario_solicitar_viaje}
          >
            Limpiar
          </Button>
        </Grid>
      </Grid>

      <ViajeAgendado />

      <Grid
        item
        xs={12}
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Button
          color="error"
          variant="contained"
          startIcon={<ClearIcon />}
          onClick={()=>{set_mostrar_solicitud_viaje(false)}}
        >
          Salir
        </Button>
      </Grid>
    </Grid>
  );
};

// eslint-disable-next-line no-restricted-syntax
export default SolicitarViaje;